import React from 'react';
import _ from 'lodash'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../ScreenStyles'
import { Col, Row, Grid } from "react-native-easy-grid";
import { AntDesign } from '@expo/vector-icons';
import ModalComponent from '../../components/ModalComponent'
import { GetFormattedDate } from '../../helper/helper'

export const styles = StyleSheet.create({   
  
})

export default class SelectTimeTable extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        generatBtnDisplayStatus: false,
        modalOpenState: false
      }
    }

    componentDidMount() {
      this.findBtnStatus(this.props)
    }

    componentWillReceiveProps(nextProps) {
      this.findBtnStatus(nextProps)
    }

    findBtnStatus = (props) => {
      let retFlag = true
      props.listExamTimeTable.map((opt) => {
        const marksObj = _.filter(props.listExamGradeMarks, (n) => { return n.exam_grade_id === opt.id } )
        if(retFlag && marksObj.length <= 0) {
          retFlag = false
        }
      })
      this.setState({ generatBtnDisplayStatus: retFlag })
    }

    closeModel = () => {
      this.setState({modalOpenState: false})
    }

    confirmGenerateReport = () => {
      this.props.generateReportCB()
      this.closeModel()
    }
    
  render() {
    const { listExamTimeTable, examName, btnCB, btnText, listExamGradeMarks } = this.props
    const { generatBtnDisplayStatus, modalOpenState } = this.state

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
                    <Col size={2} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Subject</Text></Col>
                    <Col size={2} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Date</Text></Col>
                    <Col size={2} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Mark</Text></Col>
                    
                  </Row>
                  {listExamTimeTable.map((exam, key) => {
                    const rowStyle = (key % 2) ? globalStyles.gridDataRow1 : globalStyles.gridDataRow2
                    const marksObj = _.filter(listExamGradeMarks, (n) => { return n.exam_grade_id === exam.id } )
                    const newBtnText = marksObj.length > 0 ? "Update" : "Add Mark"
                    return (
                      <Row key={key} style={rowStyle}>
                        <Col size={2} style={globalStyles.girdColumn}><Text>{exam.subject_name}</Text></Col>
                        <Col size={2} style={globalStyles.girdColumn}><Text>{GetFormattedDate(exam.exam_date)}</Text></Col>
                        <Col size={2} style={globalStyles.girdColumn}>
                          {marksObj.length > 0 &&
                            <AntDesign name="checkcircle" size={10} color="green" />
                          }
                          <TouchableOpacity 
                                style={globalStyles.generalBtn}
                                onPress={() => btnCB(exam)}
                            >
                              <Text style={globalStyles.generalBtnText}>{newBtnText}</Text>
                            </TouchableOpacity>
                          
                        </Col>
                      </Row>
                    )
                  })}
              </Grid>
              {generatBtnDisplayStatus && 
                <Grid>
                  <TouchableOpacity 
                      style={globalStyles.generalBtn}
                      onPress={() => this.setState({modalOpenState: true}) }
                  >
                    <Text style={globalStyles.generalBtnText}>Generate Report</Text>
                  </TouchableOpacity>
                </Grid>
              }
              </React.Fragment>
            ) : (
              <View style={globalStyles.generalErrorBlock}>
                <Text>Exam timetable not available</Text>
              </View>
            )
          }

            <ModalComponent
                dispText="Are you sure to generate report? (Once report generate you cannot modify marks.)"
                isVisible={modalOpenState}
                closeCB={this.closeModel}
                confirmCB={this.confirmGenerateReport}
            />          
          <View style={globalStyles.footerBlank}><Text></Text></View>
        </ScrollView>
      </React.Fragment>
    );
  }
}