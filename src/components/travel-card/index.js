import React, {Component} from 'react';
import Travel from "./travel.svg"
import {connect} from "react-redux";
import {open, close} from "../../actions/mapAction";

import StartDateSVG from "./startDate.svg";
import DaysSVG from "./days.svg";
import DistanceSVG from "./distance.svg";
import ArrowSVG from "./next.svg";
import {Link} from "react-router-dom";

class TravelCard extends Component {
    openCreatable = e => {
        e.preventDefault();
        const {dispatch} = this.props;
        dispatch(open());
    }

    render() {
        return (
            <div>
                <div className="bg-custom-gray flex flex-col mb-4 p-2">
                    <div className="flex mx-2 items-center font-bold">
                        <div>
                            <img className="w-4 h-4 mr-2 text-dark-green" src={StartDateSVG} alt=""/>
                        </div>
                        <div className="text-dark-green">
                            {new Date(this.props.trip.startDate).toLocaleDateString()}
                        </div>
                    </div>
                    <div className="flex my-8">
                        <img src={Travel} alt="" className="mx-2"/>
                        <div className="flex flex-col">
                            <h4 className="font-bold text-xl">{this.props.trip.name}</h4>
                            <h4 className="italic text-sm text-dark-green mt-2">{this.props.trip.name}</h4>
                        </div>
                    </div>
                    <div className="flex justify-between mx-2 font-bold">
                        <div className="flex justify-center items-center">
                            <img className="w-6 h-6 mr-1" src={DaysSVG} alt=""/>
                            <div className="flex flex-col">
                                <div className="m-0 p-0 text-m">13</div>
                                <div className="m-0 p-0 text-xs">days</div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <img className="w-6 h-6 mr-1" src={DistanceSVG} alt=""/>
                            <div className="flex flex-col">
                                <div className="m-0 p-0 text-m">1000</div>
                                <div className="m-0 p-0 text-xs">km</div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <Link to={`/step/${this.props.trip.name}`} className="rounded-full bg-white outline-none w-6 h-6 flex justify-center items-center">
                                <img src={ArrowSVG} alt=""/>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {creatable} = state.map;
    return {
        creatable
    }
}

export default connect(mapStateToProps)(TravelCard);
