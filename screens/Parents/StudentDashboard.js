import React from 'react';
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

  export default class StudentDashboardScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
      headerTitle: "Student Dashboard",
      headerRight: () => (
        <HeaderRight navigation={navigation} />
      )
    })

    dashboardNavigate = (scName, param) => {
      this.props.navigation.navigate(scName, param)
    }
    

       render() {
         const { navigation } = this.props
         const infoBlockContent = {
          "Student Name":navigation.getParam("student_name"),
          "Grade":navigation.getParam("grade_name"),
          "Academic Year":navigation.getParam("academic_year")
         }

         const ClassTimeTableSendData = {
          school_grade_id: this.props.navigation.getParam('school_grade_id'),
          school_id: this.props.navigation.getParam('school_id'),
          academic_year_id: this.props.navigation.getParam('academic_year_id'),
          grade_name: navigation.getParam("grade_name"),
          academic_year: navigation.getParam("academic_year")
         }
       
          return (
            <React.Fragment>
              <ScrollView style={globalStyles.rootContainer}>
                <Text style={globalStyles.loginText}>Student Dashboard screen</Text>
                <InformationBlock 
                  informationContent={infoBlockContent}
                />
                <View style={globalStyles.btnContainer}>
                  <DashboardBlock
                      onPressCB={this.dashboardNavigate}
                      screenName='ClassTimeTable'
                      iconName='table'
                      title='Time Table'
                      navigationParam={ClassTimeTableSendData}
                  />
                  <DashboardBlock
                      onPressCB={this.dashboardNavigate}
                      screenName='StudentAttendance'
                      iconName='solution1'
                      title='Attendance'
                      navigationParam={navigation.state.params}
                  />
                  {/*<DashboardBlock
                      onPressCB={this.dashboardNavigate}
                      screenName='Exams'
                      iconName='barchart'
                      title='Exams'
                      navigationParam={navigation.state.params}
                  />*/}
                  <DashboardBlock
                      onPressCB={this.dashboardNavigate}
                      screenName='ExamTimeTable'
                      iconName='table'
                      title='Exam Time Table'
                      navigationParam={navigation.state.params}
                  />
                  <DashboardBlock
                      onPressCB={this.dashboardNavigate}
                      screenName='ExamReports'
                      iconName='carryout'
                      title='Exam Report'
                      navigationParam={navigation.state.params}
                  />
                </View>
                <View style={globalStyles.footerBlank}><Text></Text></View>
              </ScrollView>
              <Footer {...this.props} />
            </React.Fragment>
          )
        }
  }


  
  