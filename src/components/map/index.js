import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, {useState, useRef, useCallback, useEffect} from "react";
import axios from "axios";
import MapGL, {Marker} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import Pin from "./Pin";
import PolylineOverlay from "./PolylineOverlay";
import AddStepSVG from "./addStep.svg";
import {useDispatch} from "react-redux";
import {setCoordinates} from "../../actions/mapAction"

export const MAPBOX_TOKEN =
    "pk.eyJ1IjoibWVobWV0YWxpY3lobm4iLCJhIjoiY2tucndzYWFwMGpkcDJ1cXQ1aWNldW9icSJ9.5Me5o9d5x1DUfGtYSipbiw";

const Map = () => {

    const [viewport, setViewport] = useState({
        latitude: 39.1667,
        longitude: 35.6667,
        zoom: 5
    });

    const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
    ];

    const [allLocs, setAllLocs] = useState([]);
    const [markerLatitude, setMarkerLatitude] = useState(35);
    const [markerLongitude, setMarkerLongitude] = useState(37);

    const dispatch = useDispatch();

    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );


    const getTripCoordinates = () => {
        axios.get(`https://trip-planner-mm.herokuapp.com/trips/coordinates`).then((res) => {
            const tripSteps = res.data[0]?.tripSteps;
            tripSteps && tripSteps.forEach((loc, i) => {
                setAllLocs(l => [...l, loc])
            })
        })
    }


    useEffect(() => {
        getTripCoordinates();
    }, [])
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
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

        setMarkerLatitude(lat)
        setMarkerLongitude(lng)

        dispatch(setCoordinates(lat, lng));

    }

    return (
        <div style={{height: "100vh"}}>
            <MapGL
                style={{cursor: window.location.pathname.split("/")[1] === "step" && "cell"}}
                ref={mapRef}
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={handleViewportChange}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onNativeClick={(e) => clicked(e)}
            >
                {
                    allLocs.map((coordinate, index) => {
                        console.log("coordinate", coordinate)
                        return coordinate.locations.map((loc, i) => {
                            console.log("loc", loc)
                            return <Marker className="z-10" key={i} longitude={loc[0].longitude} offsetLeft={-15}
                                           offsetBottom={-15} offsetRight={-15} offsetTop={-15}
                                           latitude={loc[0].latitude}>
                                <Pin size={22} pinStyle={{fill: colorArray[index], stroke: "none"}}/>
                            </Marker>
                        })

                    })
                }

                { window.location.pathname.split("/")[1] === "step" &&
                    <Marker latitude={markerLatitude} longitude={markerLongitude}>
                        <img src={AddStepSVG} width={26} height={26} alt="Add"/>
                    </Marker>

                }

                {allLocs.map((loc, i) => {
                    const test = [];

                    loc.locations.forEach((e) => {
                        test.push([e[0].longitude, e[0].latitude])
                    })


                    return <PolylineOverlay style={{zIndex: -1}} key={i} color={colorArray[i]} points={test}/>

                })
                }


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