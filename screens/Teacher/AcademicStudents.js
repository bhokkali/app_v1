import React from 'react';
import _ from 'lodash'

import { ScrollView, View, Text } from 'react-native';
import { globalStyles } from '../ScreenStyles'
import HeaderRight from '../../components/HeaderRight'
import Footer from '../../components/Footer'
import { Col, Row, Grid } from "react-native-easy-grid";
import InformationBlock from '../../components/InformationBlock'

export default class AcademicStudents extends React.Component {
    
   

    static navigationOptions = ({navigation}) => ({
      headerTitle: "Academic Students",
      headerRight: (
        <HeaderRight navigation={navigation} />
      )
    })

      
  render() {
    const { navigation } = this.props
    const infoBlockContent = {
        "Grade":navigation.getParam("grade_name"),
        "Academic Year":navigation.getParam("academic_year")
       }
    const listAcademicStudents = navigation.getParam('listAcademicStudents')
    return (
      <React.Fragment>
        <ScrollView style={globalStyles.rootContainer}>
            <InformationBlock 
              informationContent={infoBlockContent}
            /> 
            <Grid>
                  <Row style={globalStyles.gridHeadRow}>
                    <Col size={1} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>S.No</Text></Col>
                    <Col size={3} style={globalStyles.girdColumn}><Text style={globalStyles.gridHeadText}>Student Name</Text></Col>
                  </Row>
                  {listAcademicStudents.map((opt, key) => {
                    const rowStyle = (key % 2) ? globalStyles.gridDataRow1 : globalStyles.gridDataRow2
                    return (
                      <Row key={key} style={rowStyle}>
                        <Col size={1} style={globalStyles.girdColumn}><Text>{key+1}</Text></Col>
                        <Col size={3} style={globalStyles.girdColumn}><Text>{opt.student_name}</Text></Col>
                      </Row>
                    )
                  })}
            </Grid>
            <View style={globalStyles.footerBlank}><Text></Text></View>
        </ScrollView>
        <Footer {...this.props} />
        </React.Fragment>            
    );
    
  }
}