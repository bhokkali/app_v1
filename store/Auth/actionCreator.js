import * as types from './actionType'
import config from '../../config/apiConfig'
import { putServiceFetch, postServiceFetch } from '../../service/service'
import { getCurrentAcademicYear, retrieveData } from '../../helper/helper'
import { toggleLoader } from '../School/actionCreator'

export function schoolLogin (payload, loginAs) {
    let apiUrl = config.auth.parentsLogin
    if(loginAs === 'Teacher') {
      apiUrl = config.auth.teacherLogin
    } 
    
    const currentAcademicYear = getCurrentAcademicYear()
    return dispatch => {
      return postServiceFetch(apiUrl+"/"+currentAcademicYear, payload)
      .then((resp) => {
        if(resp.error) {
          dispatch({payload: resp.message, type: types.LOGIN_FAILURE})
        } else {
          resp.login_as = loginAs
          dispatch({payload: resp, type: types.LOGIN_SUCCESS})
        }
      })
      .catch((error) => {
        dispatch({payload: "Invalid Usermame or Password", type: types.LOGIN_FAILURE})
      })
    } 
  }

export function removeFailureMessage() {
  return dispatch => {
    dispatch({payload: '', type: types.LOGIN_FAILURE})
  }
}

export function storeAuthData(data) {
  return dispatch => {
    dispatch({payload: data, type: types.STORE_DATA})
  }
}

export function authLogout() {
  return dispatch => {
    dispatch({payload: {}, type: types.AUTH_LOGOUT})
  }
}


export function changePassword (payload, loginAs) {
  let apiUrl = config.auth.parentChangePassword
  if(loginAs === 'Teacher') {
    apiUrl = config.auth.teacherChangePassword
  } 
  
  return dispatch => {
    dispatch(toggleLoader(true))
    return putServiceFetch(apiUrl, payload)
    .then(async (resp) => {
        const retData = await retrieveData('authInfo')
        let newData = JSON.parse(retData);
        newData.login_pwd = payload.login_pwd
        dispatch(storeAuthData(newData))
        dispatch({payload: "Password changed successfully", type: types.CP_MESSAGE})
        dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch({payload: "Issue while change password", type: types.CP_MESSAGE})
      dispatch(toggleLoader(false))
    })
  } 
}

export function removeCpMessage() {
  return dispatch => {
    dispatch({payload: '', type: types.CP_MESSAGE})
  }
}



