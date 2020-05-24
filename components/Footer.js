import React from 'react';  
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({  
    apiLoader: {
        backgroundColor: '#999',
        position: 'absolute',
        zIndex: 9999,
        height: '100%',
        width: '100%',
        opacity: 0.8,
        flex: 1,
        justifyContent: "center"
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
            elevation: 10,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#ebebeb',
        paddingVertical: 10,
        borderTopColor: "#999"
    },
    linkBlock: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
    },
    blockContent: {
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
        alignItems: "center",
        textAlign: 'center'
    },
    btnText: {
        fontSize: 11
    },
    touchBlock: {
        fontSize: 18,
        textAlign: "center",
        alignItems: "center"
    }

      
})

export class Footer extends React.Component {

    render () {
        const { navigation, loaderStatus } = this.props
        if(loaderStatus) {
            return (
                <View style={styles.apiLoader}>
                    <ActivityIndicator size="large" color="#265985" />
                </View>
            )
        }
        return(
            <View style={styles.tabBarInfoContainer}>
                <View style={styles.linkBlock}>
                    <View style={styles.blockContent}>
                        <TouchableOpacity 
                            style={styles.touchBlock}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <AntDesign name="home" size={24} color="black" />
                            <Text style={styles.btnText}>Home</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.blockContent}>
                        <TouchableOpacity 
                            style={styles.touchBlock}
                            onPress={() => navigation.navigate('Calendar')}
                        >
                            <AntDesign name="calendar" size={24} color="black" />
                            <Text style={styles.btnText}>Calendar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.blockContent}>
                        <TouchableOpacity 
                            style={styles.touchBlock}
                            onPress={() => navigation.navigate('Circular')}
                        >
                            <AntDesign name="exception1" size={24} color="black" />
                            <Text style={styles.btnText}>Circular</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.blockContent}>
                        <TouchableOpacity 
                            style={styles.touchBlock}
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <AntDesign name="profile" size={24} color="black" />
                            <Text style={styles.btnText}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}

const mapStateToProps = state => ({
    loaderStatus: state.School.loaderStatus
  })
    
    const mapDispatchToProps = dispatch =>
      bindActionCreators({
        
      }, dispatch)
    
   export default connect(mapStateToProps, mapDispatchToProps)(Footer)