import * as types from './actionType'

const initialState = {
    listParentStudents: [],
    listGradeTimeTable: [],
    listSchoolPeriods: [],
    listStudentAttendance: [],
    listExams: [],
    listExamTimeTable: [],
    studentExamReport: {}
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      
      case types.LIST_PARENT_STUDENTS:
        return Object.assign({}, state, {
          listParentStudents: action.payload
        })
      case types.GRADE_TIME_TABLE:
        return Object.assign({}, state, {
          listGradeTimeTable: action.payload
        })
      case types.LIST_SCHOOL_PERIODS:
        return Object.assign({}, state, {
          listSchoolPeriods: action.payload
        })
      case types.LIST_STUDENT_ATTENDANCE:
        return Object.assign({}, state, {
          listStudentAttendance: action.payload
        })
      case types.LIST_EXAMS:
        return Object.assign({}, state, {
          listExams: action.payload
        })
      case types.LIST_EXAM_TIME_TABLE:
        return Object.assign({}, state, {
          listExamTimeTable: action.payload
        })
      case types.STUDENT_EXAM_REPORT:
        return Object.assign({}, state, {
          studentExamReport: action.payload
        })
        
        
      default:
        return state
    }
  }