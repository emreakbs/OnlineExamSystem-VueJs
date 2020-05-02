import state from './userState'
import mutations from './userMutations'
import actions from './userActions'
import getters from './userGetters'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
