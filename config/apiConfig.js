const config = {
    //commonPath: 'http://192.168.0.4:8090/api/v1/', //local
    commonPath: 'https://bhokkali.com/api/v1/', //prod
    auth: {
        parentsLogin: 'parentsLogin',
        teacherLogin: 'teacherLogin',
        parentChangePassword: 'parentChangePassword',
        teacherChangePassword: 'teacherChangePassword'
    },
    school: {
        getSchoolCalendar: 'getSchoolCalendar',
        listSchoolCirculars: 'listSchoolCirculars'
    },
    parents: {
        getParentStudents: 'getParentStudents',
        getGradeTimeTable: 'getGradeTimeTable',
        getSchoolPeriods: 'getSchoolPeriods',
        getStudentAttendance: 'getStudentAttendance',
        listExams: 'listExams',
        listGradeExams: 'listGradeExams',
        getStudentExamReport: 'getStudentExamReport'
    },
    teacher: {
        getTeacherTimeTable: 'getTeacherTimeTable',
        getTeacherGrades: 'getTeacherGrades',
        listAcademicStudents: 'listAcademicStudents',
        listStudentGradeAttendance: 'listStudentGradeAttendance',
        submitAttendance: 'submitAttendance',
        deleteAttendance: 'deleteAttendance',
        listExamGradeMarks: 'listExamGradeMarks',
        listExamReports: 'listExamReports',
        createUpdateExamMarks: 'createUpdateExamMarks',
        createUpdateExamReport: 'createUpdateExamReport'
    }
}

export default config