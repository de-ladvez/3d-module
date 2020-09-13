export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const DANGERES_MOMENTS_NOTIFICATION = "DANGERES_MOMENTS_NOTIFICATION";

export function addNotification(data) {
    return {
        type: ADD_NOTIFICATION,
        data
    }
}

export function deleteNotification(data) {
    return {
        type: DELETE_NOTIFICATION,
        data
    }
}

export function dendersMomentsNotification(data) {
    return {
        type: DANGERES_MOMENTS_NOTIFICATION,
        data
    }
}