import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Text,
    View,
    Image
  } from 'react-native';
import { getParentStudents, removeStudentDetails } from '../store/Parents/actionCreator'
import { getTeacherGrades } from '../store/Teacher/actionCreator'
import { globalStyles } from './ScreenStyles'
import DashboardBlock from '../components/DashboardBlock'
import logo from '../assets/images/logo.png'

export class DashboardScreen extends React.Component {
      constructor (props) {
          super(props)
          this.state = {
              //title: "Parent Dashboard screen"
          }
      }

      componentDidMount() {
            this.props.getParentStudents(this.props.authInfo.id)
            this.props.getTeacherGrades(
                this.props.authInfo.school_id, 
                this.props.authInfo.current_academic_year_info.id, 
                this.props.authInfo.id
            )
      }

      dashboardNavigate = (scName, param) => {
        this.props.navigation.navigate(scName, param)
      }
      
     
    

      render() {
          const { listParentStudents, authInfo, listTeacherGrades } = this.props
          
          return (
            <View style={globalStyles.rootContainer}>
                <View style={globalStyles.textAlignCenter}>
                    <Image 
                        source={require('../assets/images/logo.png')} 
                    />
                </View>
                {(authInfo.login_as === 'Parent') &&
                    <View>
                        <Text style={globalStyles.loginText}>Dear {authInfo.parent_name},</Text>
                        <Text style={globalStyles.generalContent}>
                            Greetings from {authInfo.school_info.school_name}({authInfo.current_academic_year_info.academic_year}), from this application you can view all school calendar, school circular and your child progress. - School Admin
                        </Text>
                    </View>
                }
                {(authInfo.login_as === 'Teacher') &&
                    <View>
                        <Text style={globalStyles.loginText}>Dear {authInfo.teacher_name},</Text>
                        <Text style={globalStyles.generalContent}>
                            Greetings from {authInfo.school_info.school_name}({authInfo.current_academic_year_info.academic_year}), from this application you can view all school calendar, school circular and you can feed attendance,mark and so on... - School Admin
                        </Text>
                    </View>
                }
                <View style={globalStyles.btnContainer}>
                    <DashboardBlock
                        onPressCB={this.dashboardNavigate}
                        screenName='Calendar'
                        iconName='calendar'
                        title='Calendar'
                    />
                    <DashboardBlock
                        onPressCB={this.dashboardNavigate}
                        screenName='Circular'
                        iconName='exception1'
                        title='Circular'
                    />
                    <DashboardBlock
                        onPressCB={this.dashboardNavigate}
                        screenName='Profile'
                        iconName='profile'
                        title='Profile'
                    />
                    <DashboardBlock
                        onPressCB={this.dashboardNavigate}
                        screenName='Exams'
                        iconName='barchart'
                        title='Exams'
                    />
                    {authInfo.login_as === 'Parent' &&
                    <React.Fragment>
                        {listParentStudents.map((student, key) => {
                            return (
                                <React.Fragment key={key}>
                                    <DashboardBlock
                                        onPressCB={this.dashboardNavigate}
                                        screenName='StudentDashboard'
                                        iconName='user'
                                        title={student.student_name}
                                        navigationParam={student}
                                    />
                                </React.Fragment>
                            )
                        })}
                    </React.Fragment>
                    }
                    {authInfo.login_as === 'Teacher' &&
                        <React.Fragment>
                            <DashboardBlock
                                onPressCB={this.dashboardNavigate}
                                screenName='TeacherTimeTable'
                                iconName='table'
                                title='My Timetable'
                            />
                            {listTeacherGrades.map((grade, key) => {
                            return (
                                    <React.Fragment key={key}>
                                        <DashboardBlock
                                            onPressCB={this.dashboardNavigate}
                                            screenName='GradeDashboard'
                                            iconName='user'
                                            title={grade.grade_name}
                                            navigationParam={grade}
                                        />
                                    </React.Fragment>
                                )
                            })}
                        </React.Fragment>
                    }
                </View>
            </View>
          )
      }
  }
  
  const mapStateToProps = state => ({
    authInfo: state.Auth.authInfo,
    listParentStudents: state.Parents.listParentStudents,
    listTeacherGrades: state.Teacher.listTeacherGrades
  })
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getParentStudents,
        removeStudentDetails,
        getTeacherGrades
    }, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)

  
  