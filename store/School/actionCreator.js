import * as types from './actionType'
import config from '../../config/apiConfig'
import { getServiceFetch, postServiceFetch } from '../../service/service'


export function getSchoolCalendarList(school_id, academic_year_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getServiceFetch(config.school.getSchoolCalendar+"/"+school_id+"/"+academic_year_id)
    .then((resp) => {
      dispatch({ payload: resp, type: types.LIST_SCHOOL_CALENDAR })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch({payload: [], type: types.LIST_SCHOOL_CALENDAR})
      dispatch(toggleLoader(false))
    })
  }
}

export function getSchoolCircularList(school_id, academic_year_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getServiceFetch(config.school.listSchoolCirculars+"?school_id="+school_id+"&academic_year_id="+academic_year_id)
    .then((resp) => {
      dispatch({ payload: resp, type: types.LIST_SCHOOL_CIRCULAR })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch({payload: [], type: types.LIST_SCHOOL_CIRCULAR})
      dispatch(toggleLoader(false))
    })
  }
}

export function toggleLoader(loaderStatus) {
  return dispatch => {
    dispatch({ payload: loaderStatus, type: types.LOADER_STATUS })
  }
}




  



