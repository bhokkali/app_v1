import React from 'react';
import _ from 'lodash'
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../ScreenStyles'
import { Col, Row, Grid } from "react-native-easy-grid";

export const styles = StyleSheet.create({   
  
})

export default class GradeTimeTable extends React.Component {
    constructor(props) {
      super(props)
      
    }
    
  render() {
    const { listExamTimeTable, examName } = this.props

    return (
      <React.Fragment>
        <ScrollView>
            {listExamTimeTable.length > 0 ? (
                <React.Fragment>
                <Grid style={globalStyles.gridBlock}>
                    <Text style={globalStyles.headText}>{examName} Time Table</Text>
                </Grid>
              <Grid>
                  <Row style={globalStyles.gridHeadRow}>
                    <Col size={3} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Subject</Text></Col>
                    <Col size={3} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Date</Text></Col>
                    <Col size={2} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>From</Text></Col>
                    <Col size={2} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>To</Text></Col>
                    <Col size={1.5} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Max</Text></Col>
                  </Row>
                  {listExamTimeTable.map((exam, key) => {
                    const rowStyle = (key % 2) ? globalStyles.gridDataRow1 : globalStyles.gridDataRow2
                    return (
                      <Row key={key} style={rowStyle}>
                        <Col size={3} style={globalStyles.girdColumn}><Text>{exam.subject_name}</Text></Col>
                        <Col size={3} style={globalStyles.girdColumn}><Text>{exam.exam_date}</Text></Col>
                        <Col size={2} style={globalStyles.girdColumn}><Text>{exam.time_from}</Text></Col>
                        <Col size={2} style={globalStyles.girdColumn}><Text>{exam.time_to}</Text></Col>
                        <Col size={1.5} style={globalStyles.girdColumn}><Text>{exam.max_mark}</Text></Col>
                      </Row>
                    )
                  })}
                  
              </Grid>
              </React.Fragment>
            ) : (
              <View style={globalStyles.generalErrorBlock}>
                <Text>Exam timetable not available</Text>
              </View>
            )
          }
          
          <View style={globalStyles.footerBlank}><Text></Text></View>
        </ScrollView>
      </React.Fragment>
    );
  }
}