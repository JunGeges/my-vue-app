import { CHANGE_LOGIN_STATE, CALC_POSITION_AMOUNT } from './mutations-type'

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
  }
}