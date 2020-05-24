import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity
  } from 'react-native';
import { globalStyles } from './ScreenStyles'
import HeaderRight from '../components/HeaderRight'
import Footer from '../components/Footer'
import InformationBlock from '../components/InformationBlock'

export const styles = StyleSheet.create({   
  btnBlock: {
    padding: 10,
    textAlign: 'right'
  }
})

  export class Profile extends React.Component {

    static navigationOptions = ({navigation}) => {
      return ({
        headerTitle: "Profile",
        headerRight: (
          <HeaderRight navigation={navigation} />
        )
      })
  }


       render() {
         const { authInfo, navigation } = this.props
         let infoBlockContent = {}
         if(authInfo.login_as === 'Parent') {
          infoBlockContent = {
            "Name": authInfo.parent_name,
            "Qualification":authInfo.qualification,
            "Relationship":authInfo.relationship,
            "Designation":authInfo.designation,
            "Email":authInfo.email,
            "Mobile Number":authInfo.mobile_no,
            "Aadhar Number":authInfo.aadhar_no,
            "Address": authInfo.address,
            "Status":authInfo.status
          }
        } else if(authInfo.login_as === 'Teacher') {
          infoBlockContent = {
            "Name": authInfo.teacher_name,
            "Qualification":authInfo.qualification,
            "Designation":authInfo.designation,
            "Email":authInfo.email,
            "Mobile Number":authInfo.mobile_no,
            "Aadhar Number":authInfo.aadhar_no,
            "Address": authInfo.address,
            "Join Date": authInfo.joining_date,
            "Status":authInfo.status
          }
        }
       
          return (
            <React.Fragment>
              <ScrollView style={globalStyles.rootContainer}>
                <Text style={globalStyles.loginText}>{authInfo.login_as} Profile Details</Text>
                <InformationBlock 
                  informationContent={infoBlockContent}
                />
                <View style={styles.btnBlock}>
                 <TouchableOpacity 
                      style={globalStyles.generalBtn}
                      onPress={() => navigation.navigate('ChangePassword') }
                  >
                    <Text style={globalStyles.generalBtnText}>Change Password</Text>
                  </TouchableOpacity>
                </View>
                <View style={globalStyles.footerBlank}><Text></Text></View>
              </ScrollView>
              <Footer {...this.props} />
            </React.Fragment>
          )
        }
  }

  const mapStateToProps = state => ({
    authInfo: state.Auth.authInfo
  })
    
    const mapDispatchToProps = dispatch =>
      bindActionCreators({
       
      }, dispatch)
    
   export default connect(mapStateToProps, mapDispatchToProps)(Profile)