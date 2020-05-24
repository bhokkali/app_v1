import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { globalStyles } from '../ScreenStyles'
import { getStudentAttendance  } from '../../store/Parents/actionCreator'
import { Calendar } from 'react-native-calendars';
import HeaderRight from '../../components/HeaderRight'
import Footer from '../../components/Footer'
import { getSchoolCalendarList } from '../../store/School/actionCreator'
import { isEmpty } from '../../helper/helper'

export const styles = StyleSheet.create({   
  headContainer: {
    margin: 5,
    flex: 1,
    flexDirection: 'row',
    flexWrap: "nowrap"
  },
  fullDayIndicator: {
    backgroundColor: '#ff0000',
    width: 20,
    height: 20,
    borderRadius: 9
  },
  halfDayIndicator: {
    backgroundColor: '#ff9900',
    width: 20,
    height: 20,
    borderRadius: 9
  },
  holidayIndicator: {
    backgroundColor: '#2bad36',
    width: 20,
    height: 20,
    borderRadius: 9
  },
  dayText: {
    margin: 4,
    fontSize: 12
  }
})

export class StudentAttendance extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        markedDates : {},
        fillDayColor: '#ff0000',
        halfDayColor: '#ff9900',
        holidayColor: "#2bad36"
      }
    }
    
    componentDidMount() {
      //if(this.props.listStudentAttendance.length <= 0) {
        this.props.getStudentAttendance(this.props.navigation.getParam('academic_student_id'))
      //}
      if(!isEmpty(this.props.authInfo) && this.props.listSchoolCalendar.length <= 0 ) {
        this.props.getSchoolCalendarList(
          this.props.authInfo.school_id, 
          this.props.authInfo.current_academic_year_info.id
        )
      }
    }

    static getDerivedStateFromProps(props, state) {
      let markedDates = {}
      props.listStudentAttendance.map((obj) => {
        markedDates[obj.absent_date] = {
          disabled: true, 
          startingDay: true, 
          endingDay: true
        }
        markedDates[obj.absent_date].color = (obj.absent_period === "Half Day") ?  state.halfDayColor : state.fillDayColor
      })

      const holidayList = _.filter(props.listSchoolCalendar, (n) => { return n.event_type === 'Holiday' })
      holidayList.map((opt) => {
        markedDates[opt.event_date] = {
          disabled: true, 
          startingDay: true, 
          endingDay: true,
          color: state.holidayColor
        }
      })

      return {
        markedDates
      }
    }

    static navigationOptions = ({navigation}) => ({
      headerTitle: "Attendance",
      headerRight: (
        <HeaderRight navigation={navigation} />
      )
    })
      
  render() {
    const { markedDates } = this.state
    return (
      <React.Fragment>
        <ScrollView style={globalStyles.rootContainer}>
            <View style={styles.headContainer}>
              <View style={styles.fullDayIndicator}></View>
              <Text style={styles.dayText}> Full Day</Text>
              <View style={styles.halfDayIndicator}></View>
              <Text style={styles.dayText}> Half Day</Text>
              <View style={styles.holidayIndicator}></View>
              <Text style={styles.dayText}> Holiday</Text>
              
            </View>  
            <Calendar
                // Collection of dates that have to be colored in a special way. Default = {}
                markedDates={markedDates}
                // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                markingType={'period'}
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
  listStudentAttendance: state.Parents.listStudentAttendance,
  listSchoolCalendar: state.School.listSchoolCalendar
})
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators({
      getStudentAttendance,
      getSchoolCalendarList
    }, dispatch)
  
 export default connect(mapStateToProps, mapDispatchToProps)(StudentAttendance)