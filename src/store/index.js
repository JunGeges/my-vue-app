import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hasLoginState: null,
    fundGroup: [{
      id: 0,
      groupTitle: "默认分组",
      groupCount: 1,
    }],
  },
  mutations,
  actions,
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]

})

export default store