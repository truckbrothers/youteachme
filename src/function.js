let state = {
    name: 'wyatt',
    navHide: 'nav-links-hidden',
    mentorStatus: ''
}

module.exports = {
    handleChange(e, key) {
        return state[key] = e.target.value
    },
    isNull: () => null,
    // return an undefined value
    isUndefined: () => undefined,
    // return a truthy value
    isTruthy: () => true,
    // return a falsy value
    isFalsy: () => false,
    navHide() {
        return state.navHide
    },
    mentorStatusValue() {
        return state.mentorStatus
    }
}