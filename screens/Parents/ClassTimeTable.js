import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { globalStyles } from '../ScreenStyles'
import { getGradeTimeTable, getSchoolPeriods  } from '../../store/Parents/actionCreator'
import HeaderRight from '../../components/HeaderRight'
import Footer from '../../components/Footer'
import TimeTable from '../../components/TimeTable'
import InformationBlock from '../../components/InformationBlock'

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

export class ClassTimeTable extends React.Component {
    
    componentDidMount() {
       const sendData = {
          id: this.props.navigation.getParam('school_grade_id'),
          school_id: this.props.navigation.getParam('school_id'),
          academic_year_id: this.props.navigation.getParam('academic_year_id')
        }
        this.props.getGradeTimeTable(sendData)
        this.props.getSchoolPeriods(this.props.navigation.getParam('school_id'))
    }

    static navigationOptions = ({navigation}) => ({
      headerTitle: "Time Table",
      headerRight: () => (
        <HeaderRight navigation={navigation} />
      )
    })

      
  render() {
    const { listSchoolPeriods, listGradeTimeTable, navigation } = this.props
    const infoBlockContent = {
      "Grade":navigation.getParam("grade_name"),
      "Academic Year":navigation.getParam("academic_year")
     }
    return (
      <React.Fragment>
        <ScrollView style={globalStyles.rootContainer}>
            <InformationBlock 
              informationContent={infoBlockContent}
            />  
           <TimeTable
              listSchoolPeriods = {listSchoolPeriods}
              listTimeTable = {listGradeTimeTable}
              mode= "Parent"
            />
          <View style={globalStyles.footerBlank}><Text></Text></View>
        </ScrollView>
        <Footer {...this.props} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
   listGradeTimeTable: state.Parents.listGradeTimeTable,
   listSchoolPeriods: state.Parents.listSchoolPeriods
})
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getGradeTimeTable,
        getSchoolPeriods
    }, dispatch)
  
 export default connect(mapStateToProps, mapDispatchToProps)(ClassTimeTable)