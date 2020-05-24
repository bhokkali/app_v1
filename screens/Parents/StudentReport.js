import React from 'react';
import _ from 'lodash'
import { ScrollView, StyleSheet, Text } from 'react-native';
import { globalStyles } from '../ScreenStyles'
//import { getExams  } from '../../store/Parents/actionCreator'
import { Col, Row, Grid } from "react-native-easy-grid";

export const styles = StyleSheet.create({   
  
})

export default function StudentReport(props) {
  const { studentExamReport, examName} = props
  console.log('studentExamReport <><>')
  console.log(studentExamReport)
    
    const { exam_report_dto, exam_marks_dto_list } = studentExamReport
    return (
      <ScrollView>
            {(exam_report_dto && exam_marks_dto_list) ? (
              <React.Fragment>
            <Grid style={globalStyles.gridBlock}>
                <Text style={globalStyles.headText}>{examName} - Report</Text>
            </Grid>
            <Grid>
                <Row style={globalStyles.gridHeadRow}>
                  <Col size={2} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Subject</Text></Col>
                  <Col size={1} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Mark</Text></Col>
                  <Col size={1} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Max</Text></Col>
                  <Col size={1} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>%</Text></Col>
                  <Col size={1} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Grade</Text></Col>
                </Row>
                {exam_marks_dto_list.map((report, key) => {
                  const rowStyle  = (key % 2) ? globalStyles.gridDataRow1 : globalStyles.gridDataRow2
                  return (
                    <Row key={key} style={rowStyle}>
                      <Col size={2} style={globalStyles.girdColumn}><Text>{report.subject_name}</Text></Col>
                      <Col size={1} style={globalStyles.girdColumn}><Text>{report.mark_obtained}</Text></Col>
                      <Col size={1} style={globalStyles.girdColumn}><Text>{report.max_mark}</Text></Col>
                      <Col size={1} style={globalStyles.girdColumn}><Text>{parseFloat(report.mark_percentage).toFixed(2)}</Text></Col>
                      <Col size={1} style={globalStyles.girdColumn}><Text>{report.mark_grade}</Text></Col>
                    </Row>
                  )
                })}
                <Row style={globalStyles.gridHeadRow}>
                  <Col size={2} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Total</Text></Col>
                  <Col size={1} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>{exam_report_dto.total_marks}</Text></Col>
                  <Col size={1} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>{exam_report_dto.total_max_marks}</Text></Col>
                  <Col size={1} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>{parseFloat(exam_report_dto.overall_percentage).toFixed(2)}</Text></Col>
                  <Col size={1} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>{exam_report_dto.overall_grade}</Text></Col>
                </Row>
                
            </Grid>
            </React.Fragment>
            ) : (
              <React.Fragment>
                <Grid style={globalStyles.generalErrorBlock}>
                    <Text>Report not generated for {examName}</Text>
                </Grid>
            </React.Fragment>
            )
          }
         
      </ScrollView>
    )
}