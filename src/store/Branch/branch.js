import state from './branchState'
import mutations from './branchMutations'
import actions from './branchActions'
import getters from './branchGetters'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
