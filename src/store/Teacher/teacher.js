import state from './teacherState'
import mutations from './teacherMutations'
import actions from './teacherActions'
import getters from './teacherGetters'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
