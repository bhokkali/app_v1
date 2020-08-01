import React from 'react';  
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ModalComponent from './ModalComponent'
import { authLogout } from '../store/Auth/actionCreator'
import { removeData  } from '../helper/helper'

const styles = StyleSheet.create({  
    container: {  
      paddingRight: 5
    }  
})

export class HeaderRight extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpenState: false
        }
    }
    

    closeModel = () => {
        this.setState({modalOpenState: false})
    }

    logoutApplication = async () => {
        this.setState({modalOpenState: false})
        await removeData('authInfo')
        this.props.authLogout()
        this.props.navigation.navigate('Home')
      }

    render() { 
        const { modalOpenState } = this.state
        return(
            <React.Fragment>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.setState({modalOpenState: true}) }
                >
                    <AntDesign name="poweroff" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <ModalComponent
                dispText="Are you sure to logout?"
                isVisible={modalOpenState}
                closeCB={this.closeModel}
                confirmCB={this.logoutApplication}
            />
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => ({
    authInfo: state.Auth.authInfo,
  })
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators({
        authLogout
    }, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(HeaderRight)