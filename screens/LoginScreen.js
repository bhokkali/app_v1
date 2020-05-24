import React from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
  } from 'react-native';
//import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as Constants from '../constants/Constants'
import { globalStyles } from './ScreenStyles'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        color: "#000",
        height: '100%'
      },
    loginText: {
        margin: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    loginFailureText: {
        color: "#ff0000",
        fontSize: 12,
        marginLeft: 10
    },
    
    btnContainer: {
        margin: 5,
        textAlign: "center"
    },
    userBtn: {
        padding: 20,
        backgroundColor: "#ffd700",
        color: "#fff",
        width: "35%",
        fontSize: 18,
        textAlign: "center"
    },
    
    
    loginSubText: {
        paddingLeft: 5,
        paddingTop: 10,
        fontSize: 14
    }
  })
  

  export default class LoginScreen extends React.Component {
      constructor (props) {
          super(props)
          this.state = {
              mobile_no: "",
              login_pwd: "",
              loginAs: "Parent"
          }
      }
      
    handleLogin = () => {
        const sendData = {
            mobile_no: this.state.mobile_no,
            login_pwd: this.state.login_pwd
        }
        this.props.schoolLogin(sendData, this.state.loginAs)
    }

    handleChange = (stName) => event => {
        const { text } = event.nativeEvent;
        this.setState({[stName]: text})
        if(this.props.loginFailureMessage) {
            this.props.removeFailureMessage()
        }
    }

      render() {
          const { loginFailureMessage } = this.props
          const { mobile_no, login_pwd } = this.state
          return (
            <View style={styles.container}>
                <Text style={styles.loginText}>Login screen</Text>
                {//loginFailureMessage && 
                    <Text style={styles.loginFailureText}>{loginFailureMessage}</Text>
                }
                <Text style={styles.loginSubText}>Login as</Text>
                <View style={globalStyles.optionsBlock}>
                    {Constants.loginOptions.map((data, key) => {
                            return (
                                <View key={key} style={globalStyles.optionView}>
                                    {this.state.loginAs == data ?
                                        <TouchableOpacity style={globalStyles.optionViewDirection}>
                                            <AntDesign name="checkcircle" size={24} color="green" />
                                            <Text style={globalStyles.optionText}>{data}</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={()=>{this.setState({loginAs: data})}} style={globalStyles.optionViewDirection}>
                                            <Entypo name="circle" size={24} color="red" />
                                            <Text style={globalStyles.optionText}>{data}</Text>
                                        </TouchableOpacity>
                                    }
                                </View> 
                            )
                        })
                    }
                </View>
                <Text style={styles.loginSubText}>Mobile Numer</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Enter Mobile Number"
                    value={mobile_no}
                    onChange={this.handleChange('mobile_no')}
                />
                <Text style={styles.loginSubText}>Password</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Enter Password"
                    secureTextEntry
                    value={login_pwd}
                    onChange={this.handleChange('login_pwd')}
                />
                <View style={styles.btnContainer}>
                    <TouchableOpacity 
                        style={globalStyles.generalBtn}
                        onPress={this.handleLogin}
                    >
                        <Text style={globalStyles.generalBtnText}>Login</Text>
                    </TouchableOpacity>
                </View>

            </View>
          )
      }
  }

  
  