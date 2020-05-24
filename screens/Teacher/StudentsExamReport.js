import React from 'react';
import _ from 'lodash'

import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../ScreenStyles'
import HeaderRight from '../../components/HeaderRight'
import Footer from '../../components/Footer'
import { Col, Row, Grid } from "react-native-easy-grid";
import InformationBlock from '../../components/InformationBlock'

export default class StudentsExamReport extends React.Component {
    
   

    static navigationOptions = ({navigation}) => ({
      headerTitle: "Students Exam Report",
      headerRight: (
        <HeaderRight navigation={navigation} />
      )
    })

    showReport = (studInfo) => event => {
      let sendParams = this.props.navigation.state.params
      sendParams.student_name = studInfo.student_name
      sendParams.student_id = studInfo.student_id
      this.props.navigation.navigate('ReportDetails', sendParams)
    }

      
  render() {
    const { navigation } = this.props
    const infoBlockContent = {
        "Grade":navigation.getParam("grade_name"),
        "Academic Year":navigation.getParam("academic_year"),
        "Exam Name": navigation.getParam("exam_name"),
        "Exam Start Date": navigation.getParam("exam_start_date"),
        "Exam End Date": navigation.getParam("exam_end_date")
       }
    const listAcademicStudents = navigation.getParam('listAcademicStudents')
    return (
      <React.Fragment>
        <ScrollView style={globalStyles.rootContainer}>
            <InformationBlock 
              informationContent={infoBlockContent}
            /> 
            <Grid>
                  <Row style={globalStyles.gridHeadRow}>
                    <Col size={1} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>S.No</Text></Col>
                    <Col size={3} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Student Name</Text></Col>
                    <Col size={3} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Report</Text></Col>
                  </Row>
                  {listAcademicStudents.map((opt, key) => {
                      

                    const rowStyle = (key % 2) ? globalStyles.gridDataRow1 : globalStyles.gridDataRow2
                    return (
                      <Row key={key} style={rowStyle}>
                        <Col size={1} style={globalStyles.girdColumn}><Text>{key+1}</Text></Col>
                        <Col size={3} style={globalStyles.girdColumn}><Text>{opt.student_name}</Text></Col>
                        <Col size={3} style={globalStyles.girdColumn}>
                            <TouchableOpacity 
                                style={globalStyles.generalBtn}
                                onPress={this.showReport(opt)}
                            >
                              <Text style={globalStyles.generalBtnText}>View Report</Text>
                            </TouchableOpacity>
                        </Col>
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