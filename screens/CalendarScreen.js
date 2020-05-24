import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import HeaderRight from '../components/HeaderRight'
import Footer from '../components/Footer'
import { getSchoolCalendarList } from '../store/School/actionCreator'
import { isEmpty } from '../helper/helper'
import { globalStyles } from './ScreenStyles';

export class CalendarScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        //title: "Parent Dashboard screen"
    }
}

componentDidMount() {
  if(!isEmpty(this.props.authInfo)) {
    this.props.getSchoolCalendarList(
      this.props.authInfo.school_id, 
      this.props.authInfo.current_academic_year_info.id
    )
  }
}

static navigationOptions = ({navigation}) => ({
  headerTitle: "Calendar",
  headerRight: (
    <HeaderRight navigation={navigation} />
  )
})
  
  render() {
    const { listSchoolCalendar } = this.props
    return (
      <React.Fragment>
        <ScrollView style={styles.container}>
          {listSchoolCalendar.map((item, key) => {
            return (
              <View style={globalStyles.rowContainer} key={key}>
                <Text style={globalStyles.rowTitle}>{item.event_name}</Text>
                <Text style={globalStyles.rowSubTitle}>{item.event_date}({item.event_type})</Text>
              </View>
            )
          })}
          
          <Calendar
            // Collection of dates that have to be colored in a special way. Default = {}
            markedDates={{
                '2020-04-20': {textColor: 'green'},
                '2020-04-22': {startingDay: true, color: 'green'},
                '2020-04-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
                '2020-05-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
            }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => ({
  authInfo: state.Auth.authInfo,
  listSchoolCalendar: state.School.listSchoolCalendar
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      getSchoolCalendarList
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen)
