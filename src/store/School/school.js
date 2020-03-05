import state from './schoolState'
import mutations from './schoolMutations'
import actions from './schoolActions'
import getters from './schoolGetters'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
