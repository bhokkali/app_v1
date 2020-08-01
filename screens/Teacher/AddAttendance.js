import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../ScreenStyles'
import HeaderRight from '../../components/HeaderRight'
import Footer from '../../components/Footer'
import { Col, Row, Grid } from "react-native-easy-grid";
import InformationBlock from '../../components/InformationBlock'
import MyDatePicker from '../../components/MyDatePicker';
import { getAttendanceDateRanges, getCurrentDate } from '../../helper/helper'
import * as Constants from '../../constants/Constants'
import { getStudentGradeAttendance, submitAttendance, deleteAttendance } from '../../store/Teacher/actionCreator'
import { AntDesign } from '@expo/vector-icons';

export const styles = StyleSheet.create({   
  gridCol1: {
    width: '30%'
  },
  dateRow: {
      padding: 10
  },
  selectedDate: {
    paddingTop: 10
  }
})

export class AddAttendance extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedDate: getCurrentDate(),
            dateRange: getAttendanceDateRanges(Constants.attendanceDateRange),
            currentDate: getCurrentDate()
        }
      }

      componentDidMount() {
          this.getAttendanceDetails(this.state.selectedDate)
      }



    static navigationOptions = ({navigation}) => ({
      headerTitle: "Add Attendance",
      headerRight: (
        <HeaderRight navigation={navigation} />
      )
    })

    dateChanged = (selectedDate) => {
        this.setState({selectedDate})
        this.getAttendanceDetails(selectedDate)
    }
    
    getAttendanceDetails = (selDate) => {
        this.props.getStudentGradeAttendance(
          this.props.navigation.getParam("school_grade_id"), 
          selDate
        )
    }

      
  render() {
    const { navigation, listStudentGradeAttendance, attendanceMessage, submitAttendance, deleteAttendance } = this.props
    const { selectedDate, dateRange, currentDate } = this.state
    const infoBlockContent = {
        "Grade":navigation.getParam("grade_name"),
        "Academic Year":navigation.getParam("academic_year")
       }
    const academicStudents = navigation.getParam('listAcademicStudents')
   
    return (
      <React.Fragment>
        <ScrollView style={globalStyles.rootContainer}>
            <Text style={globalStyles.loginText}>Student Attendance</Text>
            <InformationBlock 
              informationContent={infoBlockContent}
            />
            <View>
            {selectedDate ? (
                <Row style={styles.dateRow}>
                    <Col size={2} style={styles.selectedDate}><Text>Selected Date: {selectedDate}</Text></Col>
                    <Col size={1}>
                        <TouchableOpacity 
                            style={globalStyles.generalBtn}
                            onPress={() => this.setState({selectedDate: ''})}
                        >
                            <Text style={globalStyles.generalBtnText}>Change</Text>
                        </TouchableOpacity>
                    </Col>
                </Row>
            ) : (
              <View style={styles.dateRow}>
                <MyDatePicker 
                    currentDate = {currentDate}
                    minDate={dateRange.min}
                    maxDate={dateRange.max}
                    dateChangeCB={this.dateChanged}
                />
              </View>
            )}

            </View> 
            <Grid>
                  <Row style={globalStyles.gridHeadRow}>
                    <Col size={1} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>S.No</Text></Col>
                    <Col size={2} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Name</Text></Col>
                    <Col size={3} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Action</Text></Col>
                  </Row>
                  {academicStudents.map((opt, key) => {
                    const studObj = _.find(listStudentGradeAttendance, (n) => {
                      return n.academic_student_id === opt.id
                    })

                    const sendParam = {
                      attendanceInfo: studObj,
                      academic_student_id: opt.id,
                      absent_date: selectedDate,
                      grade_name: navigation.getParam("grade_name"),
                      academic_year: navigation.getParam("academic_year"),
                      school_grade_id: navigation.getParam("school_grade_id"),
                      student_name: opt.student_name,
                      submitAttendance: submitAttendance,
                      deleteAttendance: deleteAttendance
                    }
                    
                    const rowStyle = (key % 2) ? globalStyles.gridDataRow1 : globalStyles.gridDataRow2
                    return (
                      <Row key={key} style={rowStyle}>
                        <Col size={1} style={globalStyles.girdColumn}><Text>{key+1}</Text></Col>
                        <Col size={2} style={globalStyles.girdColumn}><Text>{opt.student_name}</Text></Col>
                        {studObj ? (
                          <Col size={3} style={globalStyles.girdColumn}>
                            <AntDesign name="closecircle" size={12} color="red" />
                            <Text style={globalStyles.gridTextPaddingLeft10}>{studObj.reason}({studObj.absent_period})</Text>
                            <TouchableOpacity 
                                style={globalStyles.generalBtn}
                                onPress={() => navigation.navigate('AttendanceForm', sendParam)}
                            >
                              <Text style={globalStyles.generalBtnText}>Update</Text>
                            </TouchableOpacity>
                          </Col>
                        ) : (
                          <Col size={3} style={globalStyles.girdColumn}>
                            <AntDesign name="checkcircle" size={12} color="green" />
                            <TouchableOpacity 
                                style={globalStyles.generalBtn}
                                onPress={() => navigation.navigate('AttendanceForm', sendParam)}
                            >
                              <Text style={globalStyles.generalBtnText}>Mark Absent</Text>
                            </TouchableOpacity>
                          </Col>
                        )}
                      </Row>
                    )
                  })}
            </Grid>
            <View style={globalStyles.footerBlank}><Text></Text></View>
        </ScrollView>
        <Footer {...this.props} />
        </React.Fragment>            
    );
    
  }
}

const mapStateToProps = state => ({
  listStudentGradeAttendance: state.Teacher.listStudentGradeAttendance,
  attendanceMessage: state.Teacher.attendanceMessage
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getStudentGradeAttendance,
    submitAttendance,
    deleteAttendance
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddAttendance)