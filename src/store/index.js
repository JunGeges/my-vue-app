import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hasLoginState: null,
    fundGroup: [
      {
        id: 0,
        groupTitle: "默认分组",
        groupCount: 1,
      },
      {
        id: 1,
        groupTitle: "新分组",
        groupCount: 0,
      },
    ],
  },
  mutations,
  actions,
  modules: {

  },
  getters
})

export default store
