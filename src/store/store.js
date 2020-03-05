import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

import school from "./School/school"

Vue.use(Vuex)


export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,modules:{
        school
    },
    strict: process.env.NODE_ENV !== 'production'
})
