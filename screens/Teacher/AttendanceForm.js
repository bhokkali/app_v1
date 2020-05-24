import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { globalStyles } from '../ScreenStyles'
import HeaderRight from '../../components/HeaderRight'
import Footer from '../../components/Footer'
import InformationBlock from '../../components/InformationBlock'
import * as Constants from '../../constants/Constants'
import { getStudentGradeAttendance } from '../../store/Teacher/actionCreator'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { isEmpty } from '../../helper/helper'

export const styles = StyleSheet.create({   
  
})

export class AttendanceForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          attendanceInfo: {},
          absent_date: '',
          absent_period: 'Full Day',
          academic_student_id: '',
          reason: ''
        }
      }

      componentDidMount() {
          this.setState({
            absent_date: this.props.navigation.getParam("absent_date"),
            academic_student_id: this.props.navigation.getParam("academic_student_id")
          })
          if(this.props.navigation.getParam("attendanceInfo")) {
            const attendanceInfo = this.props.navigation.getParam("attendanceInfo")
            this.setState({
              absent_period: attendanceInfo.absent_period,
              reason: attendanceInfo.reason,
              attendanceInfo: attendanceInfo
            })
          }
      }



    static navigationOptions = ({navigation}) => ({
      headerTitle: "Attendance Form",
      headerRight: (
        <HeaderRight navigation={navigation} />
      )
    })

    handleChange = (stName) => event => {
        const { text } = event.nativeEvent;
        this.setState({[stName]: text})
    }

    submitAttendance = event => {
        
        const submitAttendance = this.props.navigation.getParam("submitAttendance")
        const schoolGradeId = this.props.navigation.getParam("school_grade_id")
        const sendata = this.state
        if(!isEmpty(sendata.attendanceInfo)) {
          sendata.id = sendata.attendanceInfo.id
        }
        delete sendata.attendanceInfo
        submitAttendance(sendata, schoolGradeId)
        this.props.navigation.goBack()
    }

    deleteAttendance = event => {
      const schoolGradeId = this.props.navigation.getParam("school_grade_id")
      const deleteAttendance = this.props.navigation.getParam("deleteAttendance")
      deleteAttendance(this.state.attendanceInfo.id, schoolGradeId, this.state.absent_date)
      this.props.navigation.goBack()
    }

    
      
  render() {
    const { navigation } = this.props
    const { reason, attendanceInfo } = this.state
    const infoBlockContent = {
        "Student Name": navigation.getParam("student_name"),
        "Grade":navigation.getParam("grade_name"),
        "Academic Year":navigation.getParam("academic_year"),
        "Attendance Date": navigation.getParam("absent_date"),
       }

       let btnText = "Submit"
       if(!isEmpty(attendanceInfo)) {
        btnText = "Update"
       }
    
   
    return (
      <React.Fragment>
        <ScrollView style={globalStyles.rootContainer}>
            <Text style={globalStyles.loginText}>Attendance Form</Text>
            <InformationBlock 
              informationContent={infoBlockContent}
            />
            <View style={globalStyles.optionsBlock}>
                {Constants.listAbsentPeriod.map((data, key) => {
                        return (
                            <View key={key} style={globalStyles.optionView}>
                                {this.state.absent_period == data ?
                                    <TouchableOpacity style={globalStyles.optionViewDirection}>
                                        <AntDesign name="checkcircle" size={24} color="green" />
                                        <Text style={globalStyles.optionText}>{data}</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={()=>{this.setState({absent_period: data})}} style={globalStyles.optionViewDirection}>
                                        <Entypo name="circle" size={24} color="red" />
                                        <Text style={globalStyles.optionText}>{data}</Text>
                                    </TouchableOpacity>
                                }
                            </View> 
                        )
                    })
                }
            </View>
            <TextInput
                style={globalStyles.input}
                placeholder="reason"
                value={reason}
                onChange={this.handleChange('reason')}
            />
            <TouchableOpacity 
                style={globalStyles.generalBtn}
                onPress={this.submitAttendance}
            >
                <Text style={globalStyles.generalBtnText}>{btnText}</Text>
            </TouchableOpacity>
            {(!isEmpty(attendanceInfo)) &&
              <TouchableOpacity 
                  style={globalStyles.generalBtn}
                  onPress={this.deleteAttendance}
              >
                  <Text style={globalStyles.generalBtnText}>Remove from absent</Text>
              </TouchableOpacity>
            }
            <View style={globalStyles.footerBlank}><Text></Text></View>
        </ScrollView>
        <Footer {...this.props} />
        </React.Fragment>            
    );
    
  }
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceForm)