import {
  CHANGE_LOGIN_STATE,
  SET_UID,
  SET_GROUP_INDEX,
  SET_USER_INFO
} from './mutations-type'

import {
  updateStorage
} from 'common/utils'

export default {
  [CHANGE_LOGIN_STATE](state, payload) {
    // console.log('state', state, this)
    state.hasLoginState = payload
  },

  [SET_UID](state, payload) {
    console.log(payload.uid)
    state.uid = payload.uid;
    updateStorage(payload.uid)
  },

  [SET_GROUP_INDEX](state, payload) {
    state.groupIndex = payload.groupIndex
    updateStorage(payload.groupIndex)
  },

  [SET_USER_INFO](state, payload) {
    state.userInfo = payload.userInfo
    updateStorage(payload.userInfo)
  }
}