import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
  } from 'react-native';

export const styles = StyleSheet.create({   
    dashboardBlock: {
        display: 'flex',
        flexDirection: "column",
        position: 'relative',
        padding: 10,
        margin:5,
        backgroundColor: '#265985',
        color: '#ffffff',
        width: 85,
        height: 85,
        textAlign: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    deashboardDesign: {
        position: 'absolute',
        height: 10,
        width: 85,
        backgroundColor: '#ff6a00',
        top:0,
        zIndex: 999
    },
    touchBlock: {
        position: 'absolute',
        transform: [{ translateY: 20 }],
        fontSize: 18,
        color: "#ffffff",
        textAlign: "center",
        alignItems: "center"
    },
    btnText: {
        fontSize: 12,
        color: "#ffffff"
    }
})

export default function DashboardBlock(props) {
    return (<View style={styles.dashboardBlock}>
        <View style={styles.deashboardDesign}><Text></Text></View>
        <TouchableOpacity 
            style={styles.touchBlock}
            onPress={() => props.onPressCB(props.screenName, props.navigationParam)}
        >
            <AntDesign name={props.iconName} size={30} color="white" />
            <Text style={styles.btnText}>{props.title}</Text>
        </TouchableOpacity>
    </View>)
}