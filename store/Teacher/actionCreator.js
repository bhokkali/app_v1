import * as types from './actionType'
import * as parentTypes from '../Parents/actionType'
import config from '../../config/apiConfig'
import { getServiceFetch, putServiceFetch, deleteServiceFetch } from '../../service/service'
import { toggleLoader } from '../School/actionCreator'

  export function getTeacherTimeTable (school_id, academic_year_id, teacher_id) {
    return dispatch => {
      dispatch(toggleLoader(true))
      return getServiceFetch(config.teacher.getTeacherTimeTable
        +"?school_id="+school_id
        +"&academic_year_id="+academic_year_id
        +"&teacher_id="+teacher_id
        )
      .then((resp) => {
          dispatch({payload: resp, type: types.TEACHER_TIME_TABLE})
          dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({payload: [], type: types.TEACHER_TIME_TABLE})
        dispatch(toggleLoader(false))
      })
    } 
  }

  export function getTeacherGrades (school_id, academic_year_id, teacher_id) {
    return dispatch => {
      dispatch(toggleLoader(true))
      return getServiceFetch(config.teacher.getTeacherGrades
        +"?school_id="+school_id
        +"&academic_year_id="+academic_year_id
        +"&teacher_id="+teacher_id
        )
      .then((resp) => {
          dispatch({payload: resp, type: types.LIST_TEACHER_GRADES})
          dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({payload: [], type: types.LIST_TEACHER_GRADES})
        dispatch(toggleLoader(false))
      })
    } 
  }

  export function getAcademicStudents (school_id, academic_year_id, school_grade_id) {
    return dispatch => {
      dispatch(toggleLoader(true))
      return getServiceFetch(config.teacher.listAcademicStudents
        +"?school_id="+school_id
        +"&academic_year_id="+academic_year_id
        +"&school_grade_id="+school_grade_id
        )
      .then((resp) => {
          dispatch({payload: resp, type: types.LIST_ACADEMIC_STUDENTS})
          dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({payload: [], type: types.LIST_ACADEMIC_STUDENTS})
        dispatch(toggleLoader(false))
      })
    } 
  }

  export function getStudentGradeAttendance (school_grade_id, absent_date) {
    return dispatch => {
      dispatch(toggleLoader(true))
      return getServiceFetch(config.teacher.listStudentGradeAttendance
        +"?school_grade_id="+school_grade_id
        +"&absent_date="+absent_date
        )
      .then((resp) => {
          dispatch({payload: resp, type: types.LIST_STUDENT_GRADE_ATTENDANCE})
          dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({payload: [], type: types.LIST_STUDENT_GRADE_ATTENDANCE})
        dispatch(toggleLoader(false))
      })
    } 
  }

  export function submitAttendance (payload, schoolGradeId) {
    return dispatch => {
      dispatch(toggleLoader(true))
      return putServiceFetch(config.teacher.submitAttendance, payload)
      .then((resp) => {
          if(resp.error) {
            dispatch({payload: resp.message, type: types.ATTENDANCE_MESSAGE})
          } else {
            dispatch(getStudentGradeAttendance(schoolGradeId, payload.absent_date))
            dispatch({payload: resp, type: types.ATTENDANCE_MESSAGE})
          }
          dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({payload: "Issue while submit attendance", type: types.ATTENDANCE_MESSAGE})
        dispatch(toggleLoader(false))
      })
    } 
  }

  export function deleteAttendance (id, schoolGradeId, absent_date) {
    return dispatch => {
      dispatch(toggleLoader(true))
      return deleteServiceFetch(config.teacher.deleteAttendance+"?id="+id)
      .then((resp) => {
          if(resp.error) {
            dispatch({payload: resp.message, type: types.ATTENDANCE_MESSAGE})
          } else {
            dispatch(getStudentGradeAttendance(schoolGradeId, absent_date))
            dispatch({payload: resp, type: types.ATTENDANCE_MESSAGE})
          }
          dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({payload: "Issue while delete attendance", type: types.ATTENDANCE_MESSAGE})
        dispatch(toggleLoader(false))
      })
    } 
  }

  export function getExamGradeMarks(exam_id, school_grade_id) {
    return dispatch => {
      dispatch(toggleLoader(true))
      dispatch({ payload: [], type: types.LIST_EXAM_GRADE_MARKS })
      return getServiceFetch(config.teacher.listExamGradeMarks
        +"?exam_id="+exam_id
        +"&school_grade_id="+school_grade_id
      )
      .then((resp) => {
        dispatch({ payload: resp, type: types.LIST_EXAM_GRADE_MARKS })
        dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({ payload: [], type: types.LIST_EXAM_GRADE_MARKS })
        dispatch(toggleLoader(false))
      })
    }
  }

  export function getExamReports(exam_id, school_grade_id) {
    return dispatch => {
      dispatch(toggleLoader(true))
      dispatch({ payload: [], type: types.LIST_EXAM_REPORTS })
      return getServiceFetch(config.teacher.listExamReports
        +"?exam_id="+exam_id
        +"&school_grade_id="+school_grade_id
      )
      .then((resp) => {
        dispatch({ payload: resp, type: types.LIST_EXAM_REPORTS })
        dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({ payload: [], type: types.LIST_EXAM_REPORTS })
        dispatch(toggleLoader(false))
      })
    }
  }

  export function createUpdateExamMarks(payload, exam_id, school_grade_id) {
    return dispatch => {
      dispatch(toggleLoader(true))
      dispatch({ payload: '', type: types.MARK_UPDATED_MSG })
      return putServiceFetch(config.teacher.createUpdateExamMarks, payload)
      .then((resp) => {
        dispatch({ payload: "Mark added successfully", type: types.MARK_UPDATED_MSG })
        dispatch(getExamGradeMarks(exam_id, school_grade_id))
        dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({ payload: '', type: types.MARK_UPDATED_MSG })
        dispatch(toggleLoader(false))
      })
    }
  }

  export function createUpdateExamReport(payload, exam_id, school_grade_id) {
    return dispatch => {
      dispatch(toggleLoader(true))
      dispatch({ payload: '', type: types.MARK_UPDATED_MSG })
      return putServiceFetch(config.teacher.createUpdateExamReport, payload)
      .then((resp) => {
        dispatch({ payload: "Report generated successfully", type: types.MARK_UPDATED_MSG })
        dispatch(getExamGradeMarks(exam_id, school_grade_id))
        dispatch(getExamReports(exam_id, school_grade_id))
        dispatch(toggleLoader(false))
      })
      .catch((error) => {
        dispatch({ payload: '', type: types.MARK_UPDATED_MSG })
        dispatch(toggleLoader(false))
      })
    }
  }

  export function removeMessage() {
    return dispatch => {
      dispatch({ payload: '', type: types.MARK_UPDATED_MSG })
    }
  }

  export function removeTeacherDetails() {
    return dispatch => {
      dispatch({payload: [], type: types.LIST_EXAM_GRADE_MARKS})
      dispatch({payload: {}, type: types.LIST_EXAM_REPORTS})
      dispatch({payload: [], type: parentTypes.LIST_EXAM_TIME_TABLE})
      dispatch({payload: [], type: parentTypes.STUDENT_EXAM_REPORT})
    } 
}
  

  

  

  



  


  



