import React from 'react'
import {
    Text,
    TouchableOpacity,
  } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { globalStyles } from '../screens/ScreenStyles'

export default function SelectExam(props) {
    const { listExams, btnText, btnCB } = props
    return (<Grid>
        <Row style={globalStyles.gridHeadRow}>
          <Col style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Exam Name</Text></Col>
          <Col style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Time Table</Text></Col>
        </Row>
        {listExams.map((exam, key) => {
          const rowStyle = (key % 2) ? globalStyles.gridDataRow1 : globalStyles.gridDataRow2
          return (
            <Row key={key} style={rowStyle}>
              <Col style={globalStyles.girdColumn}><Text>{exam.exam_name}</Text></Col>
              <Col style={globalStyles.girdColumn}>
                <TouchableOpacity 
                    style={globalStyles.generalBtn}
                    onPress={() => btnCB(exam)}
                >
                  <Text style={globalStyles.generalBtnText}>{btnText}</Text>
                </TouchableOpacity>
              </Col>
            </Row>
          )
        })}
    </Grid>)
}