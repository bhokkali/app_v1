import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderRight from '../components/HeaderRight'
import Footer from '../components/Footer'
import { getSchoolCircularList } from '../store/School/actionCreator'
import { isEmpty } from '../helper/helper'
import { globalStyles } from './ScreenStyles';

export class Circular extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        //title: "Parent Dashboard screen"
    }
}

componentDidMount() {
  if(!isEmpty(this.props.authInfo)) {
    this.props.getSchoolCircularList(
      this.props.authInfo.school_id, 
      this.props.authInfo.current_academic_year_info.id
    )
  }
}

static navigationOptions = ({navigation}) => ({
  headerTitle: "Circular",
  headerRight: (
    <HeaderRight navigation={navigation} />
  )
})
  
  render() {
    const { listSchoolCircular } = this.props
    return (
      <React.Fragment>
        <ScrollView style={styles.container}>
          {listSchoolCircular.map((item, key) => {
            return (
              <View style={globalStyles.rowContainer} key={key}>
                <Text style={globalStyles.rowTitle}>{item.circular_title}</Text>
                <Text style={globalStyles.rowSubTitle}>{item.circular_date}</Text>
                <Text style={globalStyles.rowContent}>{item.circular_message}</Text>
              </View>
            )
          })}
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
  listSchoolCircular: state.School.listSchoolCircular
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getSchoolCircularList
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Circular)