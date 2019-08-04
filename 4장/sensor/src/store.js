import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './store/actions.js'
import * as mutations from './store/mutations.js'
import * as state from './store/state.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions
})
