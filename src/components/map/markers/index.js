import * as React from 'react';
import {Marker} from 'react-map-gl';
import {colorArray} from "../utilities/Colors";
import axios from "axios";

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;


function Markers(props) {
    const {data, onClick} = props;
    const getStepById = (stepId) => {
        axios.get(`https://trip-planner-mm.herokuapp.com/steps/${stepId}`).then((res) => {
            onClick(res.data);
        })

    }

    return data.map((coordinate, index) => {
        return coordinate.locations.map((loc, i) => {
            return <Marker className="z-10" key={`marker-${i}`} longitude={loc[0].longitude}
                           latitude={loc[0].latitude}>
                <svg
                    height={22}
                    viewBox="0 0 24 24"
                    style={{
                        cursor: 'pointer',
                        stroke: 'none',
                        transform: `translate(${-22 / 2}px,${-22}px)`
                    }}
                    onClick={() => getStepById(loc[0].stepId)}
                >
                    <path fill={colorArray[index]} d={ICON}/>
                    <text fill="black" style={{zIndex: 100}} x="50%" y="50%" dominantBaseline="middle"
                          textAnchor="middle">{i + 1}</text>

                </svg>
            </Marker>

        })

    })

}

export default Markers;