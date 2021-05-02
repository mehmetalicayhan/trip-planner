export const OPEN_CREATABLE = "OPEN_CREATABLE";
export const CLOSE_CREATABLE = "CLOSE_CREATABLE";

const openCreatable = () => {
    console.log("Mehmet")
    return {
        type: OPEN_CREATABLE,

    };
};

const closeCreatable = () => {
    return {
        type: CLOSE_CREATABLE,
    };
};

export const open = () => {
    console.log("tAYFUR")

    return dispatch => {
        dispatch(openCreatable())
    }
}

export const close = () => {
    return dispatch => {
        dispatch(closeCreatable())
    }
}

