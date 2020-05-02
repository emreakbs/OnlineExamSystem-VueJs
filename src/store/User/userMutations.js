export default {
    setAuthUser(state, payload) {
debugger
        localStorage.setItem(btoa("authUser"),JSON.stringify(payload))
        state.authUser = payload
    }
}