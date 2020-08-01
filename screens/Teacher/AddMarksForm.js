import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, TextInput, View, Text, TouchableOpacity } from 'react-native';
import HeaderRight from '../../components/HeaderRight'
import Footer from '../../components/Footer'
import { globalStyles } from '../ScreenStyles'
import { Col, Row, Grid } from "react-native-easy-grid";
import { AntDesign } from '@expo/vector-icons';
import InformationBlock from '../../components/InformationBlock'
import { isEmpty, GetFormattedDate } from '../../helper/helper'
import { createUpdateExamMarks } from '../../store/Teacher/actionCreator'

export class AddMarksForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            markInfo: {},
            updateStatus: false,
            submitBtnEnabledStatus: true
        }
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: "Add Marks Form",
        headerRight: (
          <HeaderRight navigation={navigation} />
        )
      })
    
      componentDidMount() {
        const listAcademicStudents = this.props.navigation.getParam("listAcademicStudents")
        let newMarksObj = {}
        listAcademicStudents.map((student) => {
                newMarksObj[student.student_id] = {
                    'attended_status': false,
                    'mark_obtained': ''
                }
        })
        this.setState({markInfo : newMarksObj})
    }

    static getDerivedStateFromProps(props, state) {
        const { listExamGradeMarks, navigation } = props
        const { markInfo, updateStatus } = state

        

        if(!updateStatus && !isEmpty(markInfo)) {
            const subjectListMarks = _.filter(listExamGradeMarks, (n) => { return n.exam_grade_id === navigation.getParam("exam_grade_id") } )
            subjectListMarks.map((markObj) => {
                if(markInfo[markObj.student_id]) {
                    markInfo[markObj.student_id] = {
                        'attended_status': markObj.attended_status === 'Yes' ? true : false,
                        'mark_obtained': (markObj.attended_status === 'Yes' && markObj.mark_obtained) ? markObj.mark_obtained.toString() : ''
                    }
                }
                
            })
            return {
                markInfo: markInfo,
                updateStatus: true
            }
        }
        
        return null
    }

    changeAttendedStatus = (stInfo) => {
        const { markInfo } = this.state
        this.setState({
            markInfo: {
                ...this.state.markInfo,
                [stInfo.student_id]: {
                    ...markInfo[stInfo.student_id],
                    "attended_status": !markInfo[stInfo.student_id].attended_status
                }
            }
        })
    }

    changeMark = (stInfo) => event => {
        const { text } = event.nativeEvent;
        const { markInfo } = this.state
        const maxMark = this.props.navigation.getParam("max_mark")
        if(!text || parseInt(text) <= parseInt(maxMark)) {
            this.setState({
                markInfo: {
                    ...this.state.markInfo,
                    [stInfo.student_id]: {
                        ...markInfo[stInfo.student_id],
                        "mark_obtained": text
                    }
                }
            })
            setTimeout(() => { this.validateBeforeGenerateReport() }, 100)
        } 
    }

    validateBeforeGenerateReport = () => {
        const { markInfo } = this.state
        let retStatus = true
        const listAcademicStudents = this.props.navigation.getParam("listAcademicStudents")
        listAcademicStudents.map((studentObj) => {
            if(retStatus && markInfo[studentObj.student_id].attended_status) { 
                if(!markInfo[studentObj.student_id].mark_obtained || markInfo[studentObj.student_id].mark_obtained === null) {
                    retStatus = false
                }
            } 
        })
        this.setState({ submitBtnEnabledStatus: retStatus })
    }

    submitMark = () => {
        const { markInfo } = this.state
        const { navigation, listExamGradeMarks, createUpdateExamMarks } = this.props
        let sendArray = []
        Object.keys(markInfo).map((studentId) => {
            const markObtained = (markInfo[studentId].attended_status) ? parseInt(markInfo[studentId].mark_obtained) : ''
            const newMarkObj = {
                student_id: studentId,
                exam_grade_id: navigation.getParam("exam_grade_id"),
                attended_status: markInfo[studentId].attended_status ? 'Yes' : 'No',
                mark_obtained: markObtained,
            }
            const subjectListMarks = _.filter(listExamGradeMarks, (n) => { return n.exam_grade_id === navigation.getParam("exam_grade_id") } )
            const curObj = _.find(subjectListMarks, (n) => {
                return (n.student_id === parseInt(studentId))
            })
            if(curObj) {
                newMarkObj.id = curObj.id 
            } 
            sendArray.push(newMarkObj)
        })

        createUpdateExamMarks(sendArray, navigation.getParam("exam_id"), navigation.getParam("school_grade_id"))
        navigation.goBack()
    }

      
  render() {
    const { navigation } = this.props
    const { markInfo, submitBtnEnabledStatus } = this.state
    const infoBlockContent = {
        "Grade":navigation.getParam("grade_name"),
        "Academic Year":navigation.getParam("academic_year"),
        "Exam Name": navigation.getParam("exam_name"),
        "Subject Name": navigation.getParam("subject_name"),
        "Exam Date": GetFormattedDate(navigation.getParam("exam_date")),
        "Max Mark": navigation.getParam("max_mark")
       }
    const listAcademicStudents = navigation.getParam("listAcademicStudents")

    return (
      <React.Fragment>
          <ScrollView style={globalStyles.rootContainer}>
            <View>
                <Text style={globalStyles.loginText}>{navigation.getParam("exam_name")} - Add Mark</Text>
                <InformationBlock 
                    informationContent={infoBlockContent}
                />
                <View style={globalStyles.optionsBlock}>
                    <View style={globalStyles.optionView}>
                        <TouchableOpacity style={globalStyles.optionViewDirection}>
                            <AntDesign name="checkcircle" size={24} color="green" />
                            <Text style={globalStyles.optionText}>Attended</Text>
                        </TouchableOpacity>
                    </View> 
                    <View style={globalStyles.optionView}>
                        <TouchableOpacity style={globalStyles.optionViewDirection}>
                            <AntDesign name="closecircle" size={24} color="red" />
                            <Text style={globalStyles.optionText}>Absent</Text>
                        </TouchableOpacity>
                    </View> 
                </View>
                <Grid>
                    <Row style={globalStyles.gridHeadRow}>
                        <Col size={1} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>S.No</Text></Col>
                        <Col size={3} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Student Name</Text></Col>
                        <Col size={4} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Action</Text></Col>
                    </Row>
                    {listAcademicStudents.map((opt, key) => {
                        const rowStyle = (key % 2) ? globalStyles.gridDataRow1 : globalStyles.gridDataRow2
                        return (
                            <Row key={key} style={rowStyle}>
                                <Col size={1} style={globalStyles.girdColumn}><Text>{key+1}</Text></Col>
                                <Col size={3} style={globalStyles.girdColumn}><Text>{opt.student_name}</Text></Col>
                                <Col size={4} style={globalStyles.girdColumn}>
                                    <View style={globalStyles.optionsBlock}>
                                        {(markInfo[opt.student_id] && markInfo[opt.student_id].attended_status) ? (
                                            <View style={globalStyles.optionView}>
                                                <TouchableOpacity onPress={() => this.changeAttendedStatus(opt)} style={globalStyles.optionViewDirection}>
                                                    <AntDesign name="checkcircle" size={24} color="green" />
                                                </TouchableOpacity>
                                            </View> 
                                        ) : (
                                            <View style={globalStyles.optionView}>
                                                <TouchableOpacity onPress={() => this.changeAttendedStatus(opt)} style={globalStyles.optionViewDirection}>
                                                    <AntDesign name="closecircle" size={24} color="red" />
                                                </TouchableOpacity>
                                            </View> 
                                        ) }
                                    </View>
                                    {(markInfo[opt.student_id] && markInfo[opt.student_id].attended_status) &&
                                        <View>
                                            <TextInput
                                                style={globalStyles.input}
                                                placeholder="Mark"
                                                value={markInfo[opt.student_id].mark_obtained}
                                                onChange={this.changeMark(opt)}
                                                keyboardType='numeric' 
                                            />
                                        </View>
                                    }
                                </Col>
                            </Row>
                        )
                    })}
                    <Row>
                        <Col size={2}><Text></Text></Col>
                        <Col size={2}>
                            {submitBtnEnabledStatus && 
                                <TouchableOpacity 
                                    style={globalStyles.generalBtn}
                                    onPress={this.submitMark}
                                >
                                    <Text style={globalStyles.generalBtnText}>Submit</Text>
                                </TouchableOpacity>
                            }
                        </Col>
                    </Row>
                </Grid>
            </View>
            <View style={globalStyles.keyboardBlank}><Text></Text></View>
            </ScrollView>
            <Footer {...this.props} />
        </React.Fragment>            
    );
    
  }
}

const mapStateToProps = state => ({
    listExamGradeMarks: state.Teacher.listExamGradeMarks,
    listExamReports: state.Teacher.listExamReports
  })
    
    const mapDispatchToProps = dispatch =>
      bindActionCreators({
        createUpdateExamMarks
      }, dispatch)
    
   export default connect(mapStateToProps, mapDispatchToProps)(AddMarksForm)