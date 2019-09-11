const initialState = {
    user_id: '',
    username: '',
    user_image: '',
    toggleStatus: false
}

const SET_USER = 'SET_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const MENTOR_TOGGLE = 'MENTOR_TOGGLE'

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

export function mentorToggle() {
    return {
        type: MENTOR_TOGGLE
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
        case MENTOR_TOGGLE:
            const { toggleStatus } = state
            return {
                ...state,
                toggleStatus: !toggleStatus
            }
        default: return state 
    }
}