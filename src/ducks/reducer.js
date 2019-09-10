const initialState = {
    user_id: null,
    username: null,
    user_image: null
}

const SET_USER = 'SET_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER
    }
}

export default function reducer(state=initialState, action) {
    const { type, payload } = action
    switch (type) {
        case SET_USER:
            const { user_id, username, user_image } = payload
            return {...state, user_id, username, user_image}
        case LOGOUT_USER:
            return initialState
        default: return state 
    }
}