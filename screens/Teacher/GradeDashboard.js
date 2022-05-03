import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Text,
    View,
    ScrollView,
  } from 'react-native';
import { globalStyles } from '../ScreenStyles'
import HeaderRight from '../../components/HeaderRight'
import Footer from '../../components/Footer'
import DashboardBlock from '../../components/DashboardBlock'
import InformationBlock from '../../components/InformationBlock'
import { getAcademicStudents } from '../../store/Teacher/actionCreator'

  export class GradeDashboard extends React.Component {

    static navigationOptions = ({navigation}) => ({
      headerTitle: "Grade Dashboard",
      headerRight: () => (
        <HeaderRight navigation={navigation} />
      )
    })

    componentDidMount() {
      this.props.getAcademicStudents(
          this.props.navigation.getParam('school_id'), 
          this.props.navigation.getParam('academic_year_id'), 
          this.props.navigation.getParam('id')
      )
  }

    dashboardNavigate = (scName, param) => {
      this.props.navigation.navigate(scName, param)
    }
    

       render() {
         const { navigation } = this.props
         const infoBlockContent = {
          "Teacher Name":navigation.getParam("teacher_name"),
          "Grade":navigation.getParam("grade_name"),
          "Academic Year":navigation.getParam("academic_year")
         }

         const sendParam = {
          school_grade_id: this.props.navigation.getParam('id'),
          school_id: this.props.navigation.getParam('school_id'),
          academic_year_id: this.props.navigation.getParam('academic_year_id'),
          grade_name: navigation.getParam("grade_name"),
          academic_year: navigation.getParam("academic_year"),
          listAcademicStudents: this.props.listAcademicStudents
         }
       
          return (
            <React.Fragment>
              <ScrollView style={globalStyles.rootContainer}>
                <Text style={globalStyles.loginText}>Grade Dashboard screen</Text>
                <InformationBlock 
                  informationContent={infoBlockContent}
                />
                <View style={globalStyles.btnContainer}>
                  <DashboardBlock
                      onPressCB={this.dashboardNavigate}
                      screenName='ClassTimeTable'
                      iconName='table'
                      title='Grade Time Table'
                      navigationParam={sendParam}
                  />
                  <DashboardBlock
                      onPressCB={this.dashboardNavigate}
                      screenName='AcademicStudents'
                      iconName='table'
                      title='Academic Students'
                      navigationParam={sendParam}
                  />
                  <DashboardBlock
                      onPressCB={this.dashboardNavigate}
                      screenName='AddAttendance'
                      iconName='solution1'
                      title='Add Attendance'
                      navigationParam={sendParam}
                  />
                  <DashboardBlock
                      onPressCB={this.dashboardNavigate}
                      screenName='ExamTimeTable'
                      iconName='table'
                      title='Exam Time Table'
                      navigationParam={sendParam}
                  />
                  <DashboardBlock
                      onPressCB={this.dashboardNavigate}
                      screenName='AddMarks'
                      iconName='table'
                      title='Add Marks'
                      navigationParam={sendParam}
                  />
                </View>
                <View style={globalStyles.footerBlank}><Text></Text></View>
              </ScrollView>
              <Footer {...this.props} />
            </React.Fragment>
          )
        }
  }

  const mapStateToProps = state => ({
    listAcademicStudents: state.Teacher.listAcademicStudents,
})
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getAcademicStudents
    }, dispatch)
  
 export default connect(mapStateToProps, mapDispatchToProps)(GradeDashboard)


  
  