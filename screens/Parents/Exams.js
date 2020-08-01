import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, View, Text } from 'react-native';
import { globalStyles } from '../ScreenStyles'
import { getExams  } from '../../store/Parents/actionCreator'
import { Col, Row, Grid } from "react-native-easy-grid";
import HeaderRight from '../../components/HeaderRight'
import Footer from '../../components/Footer'
import { getCurrentAcademicYear, GetFormattedDate } from '../../helper/helper'
import InformationBlock from '../../components/InformationBlock'

export class Exams extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        isModalVisible : false
      }
    }
    
    componentDidMount() {
      if(this.props.listExams.length <= 0) {
        //this.props.getExams(this.props.navigation.getParam('school_id'), this.props.navigation.getParam('academic_year_id'))
        this.props.getExams(this.props.authInfo.school_id, this.props.authInfo.current_academic_year_info.id)
      }
    }

    static navigationOptions = ({navigation}) => ({
      headerTitle: "Exams",
      headerRight: (
        <HeaderRight navigation={navigation} />
      )
    })
      
  render() {
    const { listExams, navigation } = this.props

    const infoBlockContent = {
      "Academic Year":getCurrentAcademicYear()
     }

    return (
      <React.Fragment>
        <ScrollView style={globalStyles.rootContainer}>
            <Text style={globalStyles.loginText}>Exams</Text>
            <InformationBlock 
              informationContent={infoBlockContent}
            />
            {listExams.length > 0 ? (
              <Grid>
                  <Row style={globalStyles.gridHeadRow}>
                    <Col style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Exam Name</Text></Col>
                    <Col style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Start Date</Text></Col>
                    <Col style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>End Date</Text></Col>
                  </Row>
                  {listExams.map((exam, key) => {
                    const rowStyle = (key % 2) ? globalStyles.gridDataRow1 : globalStyles.gridDataRow2
                    return (
                      <Row key={key} style={rowStyle}>
                        <Col style={globalStyles.girdColumn}><Text>{exam.exam_name}</Text></Col>
                        <Col style={globalStyles.girdColumn}><Text>{GetFormattedDate(exam.start_date)}</Text></Col>
                        <Col style={globalStyles.girdColumn}><Text>{GetFormattedDate(exam.end_date)}</Text></Col>
                      </Row>
                    )
                  })}
              </Grid>
            ) : (
              <View style={globalStyles.generalErrorBlock}>
                <Text>NoExams</Text>
              </View>
            )
          }
          <View style={globalStyles.footerBlank}><Text></Text></View>
        </ScrollView>
        <Footer {...this.props} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authInfo: state.Auth.authInfo,
  listExams: state.Parents.listExams
})
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators({
      getExams
    }, dispatch)
  
 export default connect(mapStateToProps, mapDispatchToProps)(Exams)