import * as types from './actionType'
import { storeData } from '../../helper/helper'

const initialState = {
    authInfo: {},
    loginFailureMessage: '',
    cpMessage: ''
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      
      case types.LOGIN_SUCCESS:
          let stringObject = JSON.stringify(action.payload)
          storeData('authInfo', stringObject)
          return Object.assign({}, state, {
            authInfo: action.payload
          })
        case types.LOGIN_FAILURE:
          return Object.assign({}, state, {
            loginFailureMessage: action.payload
          })
        case types.STORE_DATA:
          return Object.assign({}, state, {
            authInfo: action.payload
          })
        case types.AUTH_LOGOUT:
          return Object.assign({}, state, {
            authInfo: {}
          })
        case types.CP_MESSAGE:
          return Object.assign({}, state, {
            cpMessage: action.payload
          })
          
          
          


      default:
        return state
    }
  }