import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, View, Text } from 'react-native';
import { globalStyles } from '../ScreenStyles'
import HeaderRight from '../../components/HeaderRight'
import Footer from '../../components/Footer'
import { getExamReport  } from '../../store/Parents/actionCreator'
import InformationBlock from '../../components/InformationBlock'
import StudentReport from '../../screens/Parents/StudentReport'
import { isEmpty } from '../../helper/helper'

export class ReportDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state= {}
    }

   static getDerivedStateFromProps(props, state) {

    console.log('derived .... start')
    console.log(props.navigation.getParam('student_id'))
    console.log(props.studentExamReport)
    console.log('derived .... end')
       if(isEmpty(props.studentExamReport) || props.studentExamReport.student_id !== props.navigation.getParam('student_id')) {
            props.getExamReport(
                props.navigation.getParam('exam_id'), 
                props.navigation.getParam('school_grade_id'),
                props.navigation.getParam('student_id')
            )
       }
        return null
   }


    static navigationOptions = ({navigation}) => ({
      headerTitle: navigation.getParam("student_name")+"'s Report",
      headerRight: (
        <HeaderRight navigation={navigation} />
      )
    })

      
  render() {
    const { navigation, studentExamReport } = this.props
    const infoBlockContent = {
        "Grade":navigation.getParam("grade_name"),
        "Academic Year":navigation.getParam("academic_year"),
        "Exam Name": navigation.getParam("exam_name"),
        "Exam Start Date": navigation.getParam("exam_start_date"),
        "Exam End Date": navigation.getParam("exam_end_date"),
        "Student Name": navigation.getParam("student_name")
       }
    return (
      <React.Fragment>
        <ScrollView style={globalStyles.rootContainer}>
            <InformationBlock 
              informationContent={infoBlockContent}
            /> 
            {!isEmpty(studentExamReport) && 
                <StudentReport
                    studentExamReport = {studentExamReport}
                    examName = {navigation.getParam("exam_name")}
                />
            }
            <View style={globalStyles.footerBlank}><Text></Text></View>
        </ScrollView>
        <Footer {...this.props} />
        </React.Fragment>            
    );
    
  }
}

const mapStateToProps = state => ({
    studentExamReport: state.Parents.studentExamReport
  })
    
    const mapDispatchToProps = dispatch =>
      bindActionCreators({
        getExamReport
      }, dispatch)
    
   export default connect(mapStateToProps, mapDispatchToProps)(ReportDetails)