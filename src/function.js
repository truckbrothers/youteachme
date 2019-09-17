let state = {
    name: 'wyatt',
    navHide: 'nav-links-hidden',
    mentorStatus: '',
    languages: [],
    tags: [],
    requests: [],
    usernameInput: "TruckBrothers"
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
    },
    handleLanguage() {
        return state.languages
    },
    handleTags() {
        return state.tags
    },
    getRequests() {
        return state.requests
    },
    login() {
        return state.usernameInput
    }
}