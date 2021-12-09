import { CHANGE_LOGIN_STATE } from './mutations-type'
export default {
  [CHANGE_LOGIN_STATE](state, payload) {
    console.log('state', state,this)
    state.hasLoginState = payload
  }
}