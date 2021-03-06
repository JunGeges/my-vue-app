import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    uid: '',
    userInfo: null,
    hasLoginState: null,
    totalPositionAmount: 0,
    groupIndex: 0
  },
  mutations,
  actions,
  getters,
  // plugins: [
  //   createPersistedState({
  //     storage: window.sessionStorage
  //   })
  // ]

})

export default store