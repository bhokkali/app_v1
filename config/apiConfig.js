const config = {
    commonPath: 'http://192.168.0.2:8090/api/v1/', //local
    // commonPath: 'http://eduhelp.live:8080/cgn/v1/', // stage
    // commonPath: 'https://cgn247.com/cgn/v1/', //prod
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