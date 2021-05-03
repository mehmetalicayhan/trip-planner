import {CLOSE_CREATABLE, OPEN_CREATABLE, UPDATE_COORDINATES} from "../actions/mapAction";

const initState = {
    creatable: false,

    lat: 37.00,
    lng: 35.00,
}

const mapReducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {

        case CLOSE_CREATABLE:
            return {
                ...state,
                creatable: false,
            };
        case OPEN_CREATABLE:
            return {
                ...state,
                creatable: true,
            };
        case UPDATE_COORDINATES:
            return {
                ...state,
                lat: action.lat,
                lng: action.lng
            };
        default:
            return state;
    }
}

export default mapReducer;