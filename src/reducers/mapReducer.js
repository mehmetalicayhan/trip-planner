import { CLOSE_CREATABLE, OPEN_CREATABLE } from "../actions/mapAction";

const initState = {
    creatable:false
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
        default:
            return state;
    }
}

export default mapReducer;