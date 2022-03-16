import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import AppState from '../../lib/appState';

Vue.use(Vuex)

const state = {
  app: AppState,
  loading: false,
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
})
