import React from 'react';
import _ from 'lodash'

import { ScrollView, View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { globalStyles } from '../screens/ScreenStyles'
import * as Constants from '../constants/Constants'
import { isEmpty } from '../helper/helper'
import { Col, Row, Grid } from "react-native-easy-grid";


export const styles = StyleSheet.create({   
  gridCol1: {
    width: '30%'
  },
  gridRowData1: {
    backgroundColor: "#ebebeb",
    padding: 5
  },
  gridRowData2: {
    backgroundColor: "#f1f1f1",
    padding: 5
  }
})

export default class TimeTable extends React.Component {
    

      
  render() {
    const { listSchoolPeriods, listTimeTable, mode } = this.props
   

    const subjectsGroup = Object.keys(_.groupBy(listTimeTable, (n) => {return n.subject_name}))
    
    return (
      <React.Fragment>
        <Grid>
            <Row style={globalStyles.gridHeadRow}>
              <Col style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Days</Text></Col>
              {Constants.weekDays.map((weekday, key) => {
                return (
                  <Col key={key} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>{weekday.substring(0,3)}</Text></Col>
                )
              })}
            </Row>
            {listSchoolPeriods.map((item, key) => {
              if(item.period_type === "Non-Teaching") {
                return (
                  <Row key={key}>
                    <Col><Text style={globalStyles.columnBreak}>{item.period_name}</Text></Col>
                  </Row>
                )
              } else {
                const rowStyle = (key % 2) ? globalStyles.gridDataRow1 : globalStyles.gridDataRow2
                return (
                  <Row key={key} style={rowStyle}>
                    <Col style={globalStyles.girdHeadColumn}><Text style={globalStyles.gridHeadText}>{item.period_short_name}</Text></Col>
                    {Constants.weekDays.map((weekday, key) => {
                      const periodData = _.find(listTimeTable, (n) => { return (n.period_id === item.id && n.weekday === weekday) })
                      return (<Col key={key} style={globalStyles.girdColumn}>
                        <Text>
                          {(!isEmpty(periodData) && mode === 'Teacher') &&
                            <React.Fragment>{periodData.grade_name} - {periodData.subject_name.substring(0,3)}</React.Fragment>
                          }
                          {(!isEmpty(periodData) && mode === 'Parent') &&
                            <React.Fragment>{periodData.subject_name.substring(0,3)}</React.Fragment>
                          }
                        </Text>
                      </Col>)
                    })}
                  </Row>
                )
              }
            } )}
          </Grid>

          <Grid style={globalStyles.gridBlock}>
            <Row><Text style={globalStyles.headText}>Period Timings</Text></Row>
            {listSchoolPeriods.map((item, key) => {
                const rowStyle = key % 2 === 1 ? styles.gridRowData1 : styles.gridRowData2
                return (
                  <Row key={key} style={rowStyle}>
                    <Col size={1} style={styles.gridCol1}><Text>{item.period_short_name}</Text></Col>
                    <Col size={2} style={styles.gridCol1}><Text>{item.period_name}</Text></Col>
                    <Col size={3}><Text>{item.time_from} to {item.time_to}</Text></Col>
                  </Row>
                )
              })
            }
          </Grid>
          <Grid style={globalStyles.gridBlock}>
            <Row><Text style={globalStyles.headText}>Subject Info</Text></Row>
            {subjectsGroup.map((item, key) => {
                const rowStyle = key % 2 === 1 ? styles.gridRowData1 : styles.gridRowData2
                return (
                  <Row key={key} style={rowStyle}>
                    <Col style={styles.gridCol1}><Text>{item.substring(0,3)}</Text></Col>
                    <Col><Text>{item}</Text></Col>
                  </Row>
                )
              })
            }
          </Grid>
        </React.Fragment>            
    );
    
  }
}