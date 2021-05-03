import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, {useState, useRef, useCallback, useEffect} from "react";
import axios from "axios";
import MapGL, {Marker} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import Pin from "./Pin";

import {useDispatch} from "react-redux";
import {setCoordinates} from "../../actions/mapAction"
import MarkerSVG from "./marker2.svg";
export const MAPBOX_TOKEN =
    "pk.eyJ1IjoibWVobWV0YWxpY3lobm4iLCJhIjoiY2tucndzYWFwMGpkcDJ1cXQ1aWNldW9icSJ9.5Me5o9d5x1DUfGtYSipbiw";

const Map = () => {
    const [viewport, setViewport] = useState({
        latitude: 39.1667,
        longitude: 35.6667,
        zoom: 5
    });

    const [markerLat, setMarkerLat] = useState(39.1667);
    const [markerLong, setMarkerLong] = useState(35.6667);
    const [steps, setSteps] = useState([]);

    const dispatch = useDispatch();

    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    const getAllSteps = () => {
        axios.get(`https://trip-planner-mm.herokuapp.com/steps?tripId=12`).then((res) => {
            setSteps(res.data)
        })

    }

    useEffect(() => {
        getAllSteps();
    });
    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            console.log(newViewport)
            const geocoderDefaultOverrides = {transitionDuration: 1000};

            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides
            });
        },
        [handleViewportChange]
    );

    const clicked = (e) => {
        const lng = e.lngLat[0];
        const lat = e.lngLat[1];

        setMarkerLat(lat);
        setMarkerLong(lng);


        dispatch(setCoordinates(lat, lng));


        /*const URL = `https://api.tiles.mapbox.com/v4/geocode/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`;
        axios.get(URL)
            .then(res => {
                console.log(res);
            })
*/

    }

    return (
        <div style={{height: "100vh"}}>
            <MapGL
                ref={mapRef}
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={handleViewportChange}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onNativeClick={(e) => clicked(e)}
            >
                {window.location.pathname === "/" &&
                steps.map((step, key) => {
                    return <Marker longitude={step.location.longitude} latitude={step.location.latitude}>
                        <Pin size={20}/>
                    </Marker>
                })
                }

                <Marker
                    longitude={markerLong}
                    latitude={markerLat}
                    draggable={true}
                >
                    <img width={26} height={26} src={MarkerSVG} alt=""/>
                </Marker>

                <Geocoder
                    mapRef={mapRef}
                    reverseGeocode={true}
                    onViewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    position="top-left"

                />
            </MapGL>
        </div>
    );
};

export default Map;