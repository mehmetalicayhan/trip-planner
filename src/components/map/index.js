import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, {useState, useRef, useCallback, useEffect} from "react";
import axios from "axios";
import MapGL, {Marker, Popup} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import Markers from "./markers/index"
import PolylineOverlay from "./utilities/PolylineOverlay";
import {useDispatch} from "react-redux";
import {setCoordinates} from "../../actions/mapAction"
import {colorArray} from "./utilities/Colors";
import "./index.module.css";
import {AddStep} from "../icons/index";
import BlogPopup from "./blog-popup";

export const MAPBOX_TOKEN =
    "pk.eyJ1IjoibWVobWV0YWxpY3lobm4iLCJhIjoiY2tucndzYWFwMGpkcDJ1cXQ1aWNldW9icSJ9.5Me5o9d5x1DUfGtYSipbiw";

const Map = (props) => {

    const [viewport, setViewport] = useState({
        latitude: 39.1667,
        longitude: 35.6667,
        zoom: 5
    });

    const [isMyProfile, setMyProfile] = useState(false);

    const checkUser = () => {
        axios.get(`https://trip-planner-mm.herokuapp.com/users/${props.userId}`).then((res) => {
            const localStorageUserId = JSON.parse(localStorage.getItem("user")).id;
            if (localStorageUserId === res.data.id) {
                setMyProfile(true)
            }
        })
            .catch((errors) => {
                console.log(errors);
            });
    }


    const [allLocs, setAllLocs] = useState([]);
    const [steps, setSteps] = useState([]);

    const [popupInfo, setPopupInfo] = useState(null);

    const [markerLatitude, setMarkerLatitude] = useState(35);
    const [markerLongitude, setMarkerLongitude] = useState(37);

    const dispatch = useDispatch();

    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );


    const getTripCoordinates = () => {
        axios.get(`https://trip-planner-mm.herokuapp.com/trips/coordinates/user/${props.userId}`).then((res) => {
            const tripSteps = res.data[0]?.tripSteps;
            tripSteps && tripSteps.forEach((loc, i) => {
                setAllLocs(l => [...l, loc])
            })
        })
    }

    const getAllSteps = () => {
        axios.get(`https://trip-planner-mm.herokuapp.com/steps/me`).then((res) => {
            setSteps(res.data);
        })
    }


    useEffect(() => {
        getTripCoordinates();
        getAllSteps();
        checkUser();
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
        if (window.location.pathname.split("/")[3] === "step") {
            const lng = e.lngLat[0];
            const lat = e.lngLat[1];

            setMarkerLatitude(lat)
            setMarkerLongitude(lng)

            dispatch(setCoordinates(lat, lng));
        }

    }

    return (
        <div style={{height: "100vh"}}>
            <MapGL
                style={{cursor: window.location.pathname.split("/")[3] === "step" && "cell"}}
                ref={mapRef}
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={handleViewportChange}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onNativeClick={(e) => clicked(e)}
            >
                <Markers data={allLocs} onClick={setPopupInfo}/>

                {popupInfo && (
                    <Popup
                        tipSize={5}
                        anchor="top"
                        longitude={popupInfo.location.longitude}
                        latitude={popupInfo.location.latitude}
                        closeOnClick={false}
                        onClose={setPopupInfo}
                        className="z-30 w-1/3"
                    >
                        <BlogPopup isMyProfile={isMyProfile} step={popupInfo}/>
                    </Popup>
                )}

                {
                    /*allLocs.map((coordinate, index) => {
                        console.log("coordinate", coordinate)
                        return coordinate.locations.map((loc, i) => {
                            console.log("loc", loc)
                            return <Marker className="z-10" key={i} longitude={loc[0].longitude} offsetLeft={-15}
                                           offsetBottom={-15} offsetRight={-15} offsetTop={-15}
                                           latitude={loc[0].latitude}>
                                <Pin size={22} pinStyle={{fill: colorArray[index], stroke: "none"}}/>
                            </Marker>
                        })

                    })*/
                }

                {window.location.pathname.split("/")[3] === "step" &&
                <Marker latitude={markerLatitude} longitude={markerLongitude}>
                    <AddStep width={26} height={26} style={{color: "blue"}}/>
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