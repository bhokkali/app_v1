import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import CalendarScreen from '../screens/CalendarScreen'
import StudentDashboard from '../screens/Parents/StudentDashboard'
import ClassTimeTable from '../screens/Parents/ClassTimeTable'
import StudentAttendance from '../screens/Parents/StudentAttendance'
import Exams from '../screens/Parents/Exams'
import ExamTimeTable from '../screens/Parents/ExamTimeTable'
import StudentReport from '../screens/Parents/StudentReport'
import HomeScreen from '../screens/HomeScreen'
import ExamReports from '../screens/Parents/ExamReports'
import Circular from '../screens/Circular'
import Profile from '../screens/Profile'
import ChangePassword from '../screens/ChangePassword'
import TeacherTimeTable from '../screens/Teacher/TeacherTimeTable'
import GradeDashboard from '../screens/Teacher/GradeDashboard'
import AcademicStudents from '../screens/Teacher/AcademicStudents'
import AddAttendance from '../screens/Teacher/AddAttendance'
import AttendanceForm from '../screens/Teacher/AttendanceForm'
import AddMarks from '../screens/Teacher/AddMarks'
import AddMarksForm from '../screens/Teacher/AddMarksForm'
import StudentsExamReport from '../screens/Teacher/StudentsExamReport'
import ReportDetails from '../screens/Teacher/ReportDetails'

export default createAppContainer(
  createStackNavigator({
    Home: HomeScreen,
    Calendar: CalendarScreen,
    StudentDashboard: StudentDashboard,
    ClassTimeTable: ClassTimeTable,
    StudentAttendance: StudentAttendance,
    Exams: Exams,
    ExamTimeTable: ExamTimeTable,
    StudentReport: StudentReport,
    ExamReports: ExamReports,
    Circular: Circular,
    Profile: Profile,
    ChangePassword: ChangePassword,
    TeacherTimeTable: TeacherTimeTable,
    GradeDashboard: GradeDashboard,
    AcademicStudents: AcademicStudents,
    AddAttendance: AddAttendance,
    AttendanceForm: AttendanceForm,
    AddMarks: AddMarks,
    AddMarksForm: AddMarksForm,
    StudentsExamReport: StudentsExamReport,
    ReportDetails: ReportDetails
  })
);
