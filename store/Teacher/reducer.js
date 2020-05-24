import * as types from './actionType'

const initialState = {
    listTeacherTimeTable: [],
    listTeacherGrades: [],
    listAcademicStudents: [],
    listStudentGradeAttendance: [],
    attendanceMessage: '',
    listExamGradeMarks: [],
    listExamReports: [],
    markUpdatedMsg: ''
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      
      
      case types.TEACHER_TIME_TABLE:
        return Object.assign({}, state, {
          listTeacherTimeTable: action.payload
        }) 
      case types.LIST_TEACHER_GRADES:
        return Object.assign({}, state, {
          listTeacherGrades: action.payload
        })
      case types.LIST_ACADEMIC_STUDENTS:
        return Object.assign({}, state, {
          listAcademicStudents: action.payload
        }) 
      case types.LIST_STUDENT_GRADE_ATTENDANCE:
        return Object.assign({}, state, {
          listStudentGradeAttendance: action.payload
        })
      case types.ATTENDANCE_MESSAGE:
        return Object.assign({}, state, {
          attendanceMessage: action.payload
        })
      case types.LIST_EXAM_GRADE_MARKS:
        return Object.assign({}, state, {
          listExamGradeMarks: action.payload
        })
      case types.LIST_EXAM_REPORTS:
        return Object.assign({}, state, {
          listExamReports: action.payload
        })
      case types.MARK_UPDATED_MSG:
        return Object.assign({}, state, {
          markUpdatedMsg: action.payload
        })          
        
        
      default:
        return state
    }
  }