import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../ScreenStyles'
import { getExams, getExamTimeTable  } from '../../store/Parents/actionCreator'
import HeaderRight from '../../components/HeaderRight'
import Footer from '../../components/Footer'
import SelectTimeTable from './SelectTimeTable'
import { isEmpty } from '../../helper/helper';
import SelectExam from '../../components/SelectExam'
import InformationBlock from '../../components/InformationBlock'
import { getExamGradeMarks, getExamReports, removeMessage, createUpdateExamReport, removeTeacherDetails } from '../../store/Teacher/actionCreator'

export const styles = StyleSheet.create({   
  reportBlock: {
    padding: 20,
    textAlign: "center"
    
  },
  reportBlockText: {
    fontSize: 15
  }
})

export class AddMarks extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        isModalVisible : false,
        examName: '',
        examInfo: {}
      }
    }
    
    componentDidMount() {
      if(this.props.listExams.length <= 0) {
        this.props.getExams(this.props.navigation.getParam('school_id'), this.props.navigation.getParam('academic_year_id'))
        this.props.removeTeacherDetails()
      }
    }

    static navigationOptions = ({navigation}) => ({
      headerTitle: "Add Marks",
      headerRight: (
        <HeaderRight navigation={navigation} />
      )
    })

    static getDerivedStateFromProps(props, state) {
      const {markUpdatedMsg, removeMessage } = props
      if(markUpdatedMsg) {
        setTimeout(()=> removeMessage(), 6000)
      }
      return null
    }

    getExamTimeTable = (exam) => {
      const school_grade_id = this.props.navigation.getParam('school_grade_id')
      this.props.getExamTimeTable(exam.id, school_grade_id)
      this.props.getExamGradeMarks(exam.id, school_grade_id)
      this.props.getExamReports(exam.id, school_grade_id)
  
      this.setState({examName: exam.exam_name, examInfo: exam})
    }

    addMark = (timeTableInfo) => {
      let sendParams = this.props.navigation.state.params

      sendParams.exam_name = this.state.examInfo.exam_name
      sendParams.exam_id = this.state.examInfo.id
      sendParams.subject_name = timeTableInfo.subject_name
      sendParams.subject_id = timeTableInfo.subject_id
      sendParams.exam_grade_id = timeTableInfo.id
      sendParams.exam_date = timeTableInfo.exam_date
      sendParams.max_mark = timeTableInfo.max_mark
      
      this.props.navigation.navigate('AddMarksForm', sendParams)
      
    }

    showExamReport = () => {
      let sendParams = this.props.navigation.state.params

      sendParams.exam_name = this.state.examInfo.exam_name
      sendParams.exam_id = this.state.examInfo.id
      sendParams.exam_start_date = this.state.examInfo.start_date
      sendParams.exam_end_date = this.state.examInfo.end_date
      
      this.props.navigation.navigate('StudentsExamReport', sendParams)
    }

    generateReport = () => {
      const listAcademicStudents = this.props.navigation.getParam("listAcademicStudents")
      let sendArray = []
      listAcademicStudents.map((studObj) => {
          const sendData = {
              student_id: studObj.student_id,
              exam_id: this.state.examInfo.id,
              school_grade_id: this.props.navigation.getParam("school_grade_id")
          }
          sendArray.push(sendData)
        })
      
        this.props.createUpdateExamReport(sendArray, this.state.examInfo.id, this.props.navigation.getParam("school_grade_id"))
      
    }
      
  render() {
    const { listExams, listExamTimeTable, navigation, listExamGradeMarks, markUpdatedMsg, listExamReports } = this.props
    const { examName } = this.state
    const infoBlockContent = {
        "Grade":navigation.getParam("grade_name"),
        "Academic Year":navigation.getParam("academic_year")
       }    
       
    return (
      <React.Fragment>
        <ScrollView style={globalStyles.rootContainer}>
            {(markUpdatedMsg !== '') && 
              <View>
                <Text style={globalStyles.successMsg}>{markUpdatedMsg}</Text>
              </View>
            }
            <InformationBlock 
              informationContent={infoBlockContent}
            />
            {listExams.length > 0 ? (
              <SelectExam 
                listExams={listExams}
                btnText="Select Exam"
                btnCB={this.getExamTimeTable}
              />
            ) : (
              <View style={globalStyles.generalErrorBlock}>
                <Text>No Exams found</Text>
              </View>
            )
          }

        {(listExamTimeTable.length > 0 && listExamReports.length <= 0 && !isEmpty(this.state.examInfo)) && 
            <SelectTimeTable
                listExamTimeTable = {listExamTimeTable}
                examName = {examName}
                btnCB = {this.addMark}
                btnText = "Add Mark"
                listExamGradeMarks={listExamGradeMarks}
                generateReportCB={this.generateReport}
            />
        }

        {(listExamReports.length > 0 && !isEmpty(this.state.examInfo)) && 
            <View style={styles.reportBlock}>
              <Text style={styles.reportBlockText}>Report generated for {examName}</Text>
              <TouchableOpacity 
                  style={globalStyles.generalBtn}
                  onPress={this.showExamReport}
              >
                  <Text style={globalStyles.generalBtnText}>View Report</Text>
              </TouchableOpacity>
            </View>
        }

        {(listExamTimeTable.length <= 0 && listExamReports.length <= 0 && !isEmpty(this.state.examInfo)) &&
          <View style={globalStyles.generalErrorBlock}>
            <Text>Time table not crated for {examName}</Text>
          </View>
        }

        <View style={globalStyles.footerBlank}><Text></Text></View>
        </ScrollView>
        <Footer {...this.props} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  listExams: state.Parents.listExams,
  listExamTimeTable: state.Parents.listExamTimeTable,
  listExamGradeMarks: state.Teacher.listExamGradeMarks,
  listExamReports: state.Teacher.listExamReports,
  markUpdatedMsg: state.Teacher.markUpdatedMsg
})
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators({
      getExams,
      getExamTimeTable,
      getExamGradeMarks, 
      getExamReports,
      removeMessage,
      createUpdateExamReport,
      removeTeacherDetails
    }, dispatch)
  
 export default connect(mapStateToProps, mapDispatchToProps)(AddMarks)