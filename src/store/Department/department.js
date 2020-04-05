import state from './departmentState'
import mutations from './departmentMutations'
import actions from './departmentActions'
import getters from './departmentGetters'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
