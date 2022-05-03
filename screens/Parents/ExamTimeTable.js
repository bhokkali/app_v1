import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { globalStyles } from '../ScreenStyles'
import { getExams, getExamTimeTable  } from '../../store/Parents/actionCreator'
import { Col, Row, Grid } from "react-native-easy-grid";
import HeaderRight from '../../components/HeaderRight'
import Footer from '../../components/Footer'
import GradeTimeTable from './GradeTimeTable'
import { isEmpty } from '../../helper/helper';
import SelectExam from '../../components/SelectExam'

export const styles = StyleSheet.create({   
  
})

export class ExamTimeTable extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        isModalVisible : false,
        examName: ''
      }
    }
    
    componentDidMount() {
      if(this.props.listExams.length <= 0) {
        this.props.getExams(this.props.navigation.getParam('school_id'), this.props.navigation.getParam('academic_year_id'))
      }
    }

    static navigationOptions = ({navigation}) => ({
      headerTitle: "Exams",
      headerRight: () => (
        <HeaderRight navigation={navigation} />
      )
    })

    getExamTimeTable = (exam) => {
        this.props.getExamTimeTable(
            exam.id, 
            this.props.navigation.getParam('school_grade_id')
          )
        this.setState({examName: exam.exam_name})
    }
      
  render() {
    const { listExams, listExamTimeTable } = this.props
    const { examName } = this.state

    return (
      <React.Fragment>
        <ScrollView style={globalStyles.rootContainer}>
            {listExams.length > 0 ? (
              <SelectExam 
                listExams={listExams}
                btnText="Show Time Table"
                btnCB={this.getExamTimeTable}
              />
            ) : (
              <View style={globalStyles.generalErrorBlock}>
                <Text>No Exams found</Text>
              </View>
            )
          }

        {(!isEmpty(listExamTimeTable) && examName !== '') && 
            <GradeTimeTable
            listExamTimeTable = {listExamTimeTable}
            examName = {examName}
            />
        }
        {(isEmpty(listExamTimeTable) && examName !== '') && 
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
  listExamTimeTable: state.Parents.listExamTimeTable
})
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators({
      getExams,
      getExamTimeTable
    }, dispatch)
  
 export default connect(mapStateToProps, mapDispatchToProps)(ExamTimeTable)