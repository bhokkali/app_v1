import React from 'react'
import { AntDesign } from '@expo/vector-icons';
//import { TouchableOpacity } from 'react-native-gesture-handler'
import { Col, Row, Grid } from "react-native-easy-grid";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
  } from 'react-native';

export const styles = StyleSheet.create({   
    infoBlock: {
        backgroundColor: "#ff6a0052",
        padding: 5,
        marginBottom: 5
    },
    infoRow: {
        padding: 2
    },
    infoTitle: {
        fontSize: 14
    },
    infoValue: {
        fontSize: 12
    }
})

export default function InformationBlock({ informationContent }) {
    return (
      <View style={styles.infoBlock}>
          {Object.keys(informationContent).map((item, key) => {
              return (
                <Row style={styles.infoRow} key={key}>
                    <Col><Text style={styles.infoTitle}>{item}</Text></Col>
                    <Col><Text style={styles.infoValue}>{informationContent[item]}</Text></Col>
                </Row>
              )
          })}
      </View>)
}