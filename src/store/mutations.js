import { CHANGE_LOGIN_STATE } from './mutations-type'
export default {
  [CHANGE_LOGIN_STATE](state, payload) {
    state.hasLoginState = payload
  }
}