import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput
  } from 'react-native';
import { globalStyles } from './ScreenStyles'
import HeaderRight from '../components/HeaderRight'
import Footer from '../components/Footer'
import InformationBlock from '../components/InformationBlock'
import { changePassword, removeCpMessage } from '../store/Auth/actionCreator'

export const styles = StyleSheet.create({   
  btnBlock: {
    padding: 10,
    textAlign: 'right'
  },
  loginSubText: {
    paddingLeft: 5,
    paddingTop: 5,
    fontSize: 14
  },
  inputBlock: {
    padding: 5
  },
  errorText: {
      color: "#ff0000",
      fontSize: 11,
      padding: 2
  }

})

  export class ChangePassword extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            old_password: "",
            new_password: "",
            confirm_password: "",
            error: {
                old_password: "",
                new_password: "",
                confirm_password: ""
            }

        }
    }

    static getDerivedStateFromProps(props, state) {
        const {cpMessage, removeCpMessage } = props
        if(cpMessage) {
          setTimeout(()=> removeCpMessage(), 6000)
        }
        return null
      }

    static navigationOptions = ({navigation}) => {
      return ({
        headerTitle: "Change Password",
        headerRight: () => (
          <HeaderRight navigation={navigation} />
        )
      })
  }

  handleSubmit = () => {
    if(this.validatePassword()) {
        const sendData = {
            id: this.props.authInfo.id,
            login_pwd: this.state.new_password
        }
        this.props.changePassword(sendData, this.props.authInfo.login_as)
        this.setState({
            old_password: "",
            new_password: "",
            confirm_password: ""
        })
    }
}

handleChange = (stName) => event => {
    const { text } = event.nativeEvent;
    this.setState({
        [stName]: text,
        error: {
            ...this.state.error,
            [stName]: ''
        }
    })
    
}

validatePassword = () => {
    const { authInfo } = this.props
    const { old_password, new_password, confirm_password, error } = this.state

    if(old_password === "") {
        error.old_password = "Please enter old password"
    } else if(old_password !== authInfo.login_pwd) {
        error.old_password = "Invalid old password"
    } 

    if(new_password === "") {
        error.new_password = "Please enter New password"
    } else if(/^[a-zA-Z0-9]*$/.test(new_password) === false) {
        error.new_password = "Password contains only alphabets and number"
    }

    if(confirm_password === "") {
        error.confirm_password = "Please confirm password"
    } else if(new_password !== confirm_password) {
        error.confirm_password = "Password and confirm password must be same"
    }

    this.setState({error})

    if(error.old_password === "" &&  error.new_password === "" && error.confirm_password === "") {
        return true
    } else {
        return false
    }

}


       render() {
         const { authInfo, cpMessage } = this.props
         const { old_password, new_password, confirm_password, error } = this.state

         let infoBlockContent = {}
         if(authInfo.login_as === 'Parent') {
          infoBlockContent = {
            "Name": authInfo.parent_name,
            "Mobile Number":authInfo.mobile_no,
            "Status":authInfo.status
          }
        } else if(authInfo.login_as === 'Teacher') {
          infoBlockContent = {
            "Name": authInfo.teacher_name,
            "Mobile Number":authInfo.mobile_no,
            "Status":authInfo.status
          }
        }
       
          return (
            <React.Fragment>
              <ScrollView style={globalStyles.rootContainer}>
                <Text style={globalStyles.loginText}>{authInfo.login_as} Change Password</Text>
                {(cpMessage !== '') && 
                    <View>
                        <Text style={globalStyles.successMsg}>{cpMessage}</Text>
                    </View>
                }
                <InformationBlock 
                  informationContent={infoBlockContent}
                />
                <View style={styles.inputBlock}>
                    <Text style={styles.loginSubText}>Old Password</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Enter Old Password"
                        secureTextEntry
                        value={old_password}
                        onChange={this.handleChange('old_password')}
                    />
                    {(error.old_password !== '') && 
                        <View>
                            <Text style={styles.errorText}>{error.old_password}</Text>
                        </View>
                    }
                </View>
                <View style={styles.inputBlock}>
                    <Text style={styles.loginSubText}>New Password</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Enter New Password"
                        secureTextEntry
                        value={new_password}
                        onChange={this.handleChange('new_password')}
                    />
                    {(error.new_password !== '') && 
                        <View>
                            <Text style={styles.errorText}>{error.new_password}</Text>
                        </View>
                    }
                </View>
                <View style={styles.inputBlock}>
                    <Text style={styles.loginSubText}>Confirm New Password</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Confirm New Password"
                        secureTextEntry
                        value={confirm_password}
                        onChange={this.handleChange('confirm_password')}
                    />
                    {(error.confirm_password !== '') && 
                        <View>
                            <Text style={styles.errorText}>{error.confirm_password}</Text>
                        </View>
                    }
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity 
                        style={globalStyles.generalBtn}
                        onPress={this.handleSubmit}
                    >
                        <Text style={globalStyles.generalBtnText}>Change Password</Text>
                    </TouchableOpacity>
                </View>
                <View style={globalStyles.keyboardBlank}><Text></Text></View>
              </ScrollView>
              <Footer {...this.props} />
            </React.Fragment>
          )
        }
  }

  const mapStateToProps = state => ({
    authInfo: state.Auth.authInfo,
    cpMessage: state.Auth.cpMessage
  })
    
    const mapDispatchToProps = dispatch =>
      bindActionCreators({
        changePassword,
        removeCpMessage
      }, dispatch)
    
   export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)