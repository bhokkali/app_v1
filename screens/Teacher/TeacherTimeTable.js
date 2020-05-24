import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { globalStyles } from '../ScreenStyles'
import { getSchoolPeriods  } from '../../store/Parents/actionCreator'
import { getTeacherTimeTable } from '../../store/Teacher/actionCreator'
import HeaderRight from '../../components/HeaderRight'
import Footer from '../../components/Footer'
import TimeTable from '../../components/TimeTable'

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

export class TeacherTimeTable extends React.Component {
    
    componentDidMount() {
      if(this.props.authInfo && this.props.listTeacherTimeTable.length <= 0) {
        this.props.getTeacherTimeTable(
            this.props.authInfo.school_id, 
            this.props.authInfo.current_academic_year_info.id, 
            this.props.authInfo.id)
      }
      if(this.props.listSchoolPeriods.length <= 0) {
        this.props.getSchoolPeriods(this.props.authInfo.school_id)
      }
    }

    static navigationOptions = ({navigation}) => ({
      headerTitle: "My Time Table",
      headerRight: (
        <HeaderRight navigation={navigation} />
      )
    })

      
  render() {
    const { listSchoolPeriods, listTeacherTimeTable } = this.props
    
    return (
      <React.Fragment>
        <ScrollView style={globalStyles.rootContainer}>
            <TimeTable
                listSchoolPeriods = {listSchoolPeriods}
                listTimeTable = {listTeacherTimeTable}
                mode= "Teacher"
            />
            <View style={globalStyles.footerBlank}><Text></Text></View>
        </ScrollView>
        <Footer {...this.props} />
        </React.Fragment>            
    );
    
  }
}

const mapStateToProps = state => ({
    authInfo: state.Auth.authInfo,
    listTeacherTimeTable: state.Teacher.listTeacherTimeTable,
    listSchoolPeriods: state.Parents.listSchoolPeriods
})
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getTeacherTimeTable,
        getSchoolPeriods
    }, dispatch)
  
 export default connect(mapStateToProps, mapDispatchToProps)(TeacherTimeTable)