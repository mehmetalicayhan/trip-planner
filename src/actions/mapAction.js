
export const OPEN_CREATABLE = "OPEN_CREATABLE";
export const CLOSE_CREATABLE = "CLOSE_CREATABLE";
export const UPDATE_COORDINATES = "UPDATE_COORDINATES";

const openCreatable = () => {
    return {
        type: OPEN_CREATABLE,

    };
};

const closeCreatable = () => {
    return {
        type: CLOSE_CREATABLE,
    };
};

export const setCoordinates = (lat, lng) => {
    return {
        type: UPDATE_COORDINATES,
        lat:lat,
        lng:lng
    };
}

export const open = () => {

    return dispatch => {
        dispatch(openCreatable())
    }
}

export const close = () => {
    return dispatch => {
        dispatch(closeCreatable())
    }
}

export const updateCoordinates = (lat,lng) => {
    return dispatch => {
        dispatch(setCoordinates(lat,lng))
    }
}

