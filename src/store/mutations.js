import { CHANGE_LOGIN_STATE, CALC_POSITION_AMOUNT, SET_UID } from './mutations-type'

export default {
  [CHANGE_LOGIN_STATE](state, payload) {
    // console.log('state', state, this)
    state.hasLoginState = payload
  },

  [CALC_POSITION_AMOUNT](state, payload) {
    console.log({ payload })
    console.log(state.totalPositionAmount)
    state.totalPositionAmount += parseFloat(payload.positionAmount)
    // state.totalPositionAmount = state.totalPositionAmount.toFixed(2)
  },

  [SET_UID](state, payload) {
    console.log(payload.uid)
    state.uid = payload.uid;
    var vuexStorage = JSON.parse(localStorage.getItem('vuex'))
    vuexStorage['uid'] = payload.uid
    localStorage.setItem('vuex', JSON.stringify(vuexStorage))
  }
}