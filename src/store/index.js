import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
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
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {

  },
  modules: {

  },
  getters: {

  }
})

export default store
