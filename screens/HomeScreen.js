import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LoginScreen from './LoginScreen';
import { schoolLogin, removeFailureMessage, storeAuthData } from '../store/Auth/actionCreator'
import { isEmpty, retrieveData  } from '../helper/helper'
import Dashboard from './Dashboard'
import Footer from '../components/Footer'
import { globalStyles } from './ScreenStyles'

export class HomeScreen extends React.Component {

  componentDidMount(){
    this.loadAsyncValue()
  }

  loadAsyncValue = async () => {
    const retData = await retrieveData('authInfo')
    if(isEmpty(this.props.authInfo) && retData !== null) {
      this.props.storeAuthData(JSON.parse(retData))
    } 
  }

  render() {
    const { schoolLogin, authInfo, loginFailureMessage, removeFailureMessage } = this.props
    const dispContainer = isEmpty(authInfo) ? styles.container1 : styles.container2
    return (
      <View style={dispContainer}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
            {!isEmpty(authInfo) ? (
              <Dashboard {...this.props} />
            ) : (
              <LoginScreen
                schoolLogin={schoolLogin} 
                loginFailureMessage={loginFailureMessage}
                removeFailureMessage={removeFailureMessage}
              />
            )}
            {!isEmpty(authInfo) &&
              <View style={globalStyles.footerBlank}><Text></Text></View>
            }
        </ScrollView>
        {!isEmpty(authInfo) &&
          <Footer {...this.props} />
        }
        
      </View>
    )
  }
}

HomeScreen.navigationOptions = {
  //header: null,
  headerShown: false
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#ebebeb',
    color: "#000"
  },
  container2: {
    flex: 1,
    backgroundColor: '#ebebeb',
    color: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: '#fff',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

const mapStateToProps = state => ({
  authInfo: state.Auth.authInfo,
  loginFailureMessage: state.Auth.loginFailureMessage
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      schoolLogin,
      removeFailureMessage,
      storeAuthData
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
