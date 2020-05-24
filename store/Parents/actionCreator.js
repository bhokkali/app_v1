import * as types from './actionType'
import config from '../../config/apiConfig'
import { getServiceFetch, postServiceFetch } from '../../service/service'
import { toggleLoader } from '../School/actionCreator'

export function getParentStudents (parent_id) {
    return dispatch => {
      dispatch(toggleLoader(true))
      return getServiceFetch(config.parents.getParentStudents+"?parent_id="+parent_id)
      .then((resp) => {
          dispatch({payload: resp, type: types.LIST_PARENT_STUDENTS})
          dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({payload: [], type: types.LIST_PARENT_STUDENTS})
        dispatch(toggleLoader(false))
        //dispatch({payload: "Error while fetch user details", type: types.LIST_PARENT_STUDENTS})
      })
    } 
  }

  export function getGradeTimeTable (payload) {
    return dispatch => {
      dispatch(toggleLoader(true))
      return postServiceFetch(config.parents.getGradeTimeTable,payload)
      .then((resp) => {
          dispatch({payload: resp, type: types.GRADE_TIME_TABLE})
          dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({payload: [], type: types.GRADE_TIME_TABLE})
        dispatch(toggleLoader(false))
        //dispatch({payload: "Error while fetch user details", type: types.LIST_PARENT_STUDENTS})
      })
    } 
  }

  export function getSchoolPeriods (school_id) {
    return dispatch => {
      dispatch(toggleLoader(true))
      return getServiceFetch(config.parents.getSchoolPeriods+"/"+school_id)
      .then((resp) => {
          dispatch({payload: resp, type: types.LIST_SCHOOL_PERIODS})
          dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({payload: [], type: types.LIST_SCHOOL_PERIODS})
        dispatch(toggleLoader(false))
        //dispatch({payload: "Error while fetch user details", type: types.LIST_PARENT_STUDENTS})
      })
    } 
  }

  export function getStudentAttendance(academic_student_id) {
    return dispatch => {
      dispatch(toggleLoader(true))
      return getServiceFetch(config.parents.getStudentAttendance+"?academic_student_id="+academic_student_id)
      .then((resp) => {
          dispatch({payload: resp, type: types.LIST_STUDENT_ATTENDANCE})
          dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({payload: [], type: types.LIST_STUDENT_ATTENDANCE})
        dispatch(toggleLoader(false))
        //dispatch({payload: "Error while fetch user details", type: types.LIST_PARENT_STUDENTS})
      })
    } 
  }

  export function getExams(school_id, academic_year_id) {
    return dispatch => {
      dispatch(toggleLoader(true))
      return getServiceFetch(config.parents.listExams+"?school_id="+school_id+"&academic_year_id="+academic_year_id)
      .then((resp) => {
          dispatch({payload: resp, type: types.LIST_EXAMS})
          dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({payload: [], type: types.LIST_EXAMS})
        dispatch(toggleLoader(false))
      })
    } 
  }

  export function getExamTimeTable(exam_id, school_grade_id) {
    return dispatch => {
      dispatch(toggleLoader(true))
      return getServiceFetch(config.parents.listGradeExams+"?exam_id="+exam_id+"&school_grade_id="+school_grade_id)
      .then((resp) => {
          dispatch({payload: resp, type: types.LIST_EXAM_TIME_TABLE})
          dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({payload: [], type: types.LIST_EXAM_TIME_TABLE})
        dispatch(toggleLoader(false))
      })
    } 
  }

  export function getExamReport(exam_id, school_grade_id, student_id) {
    return dispatch => {
      dispatch(toggleLoader(true))
      return getServiceFetch(config.parents.getStudentExamReport+"?exam_id="+exam_id+"&school_grade_id="+school_grade_id+"&student_id="+student_id)
      .then((resp) => {
        if(resp.error) {
          dispatch({payload: resp.message, type: types.STUDENT_EXAM_REPORT})
        } else {
          dispatch({payload: resp, type: types.STUDENT_EXAM_REPORT})
        }
        dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({payload: {}, type: types.STUDENT_EXAM_REPORT})
        dispatch(toggleLoader(false))
      })
    } 
  }

  

  

  export function removeStudentDetails() {
    return dispatch => {
      dispatch({payload: [], type: types.GRADE_TIME_TABLE})
      dispatch({payload: [], type: types.LIST_SCHOOL_PERIODS})
      dispatch({payload: [], type: types.LIST_STUDENT_ATTENDANCE})
      dispatch({payload: [], type: types.LIST_EXAMS})
      dispatch({payload: [], type: types.LIST_EXAM_TIME_TABLE})
      dispatch({payload: {}, type: types.STUDENT_EXAM_REPORT})
    } 
}


  



