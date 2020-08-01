import React from 'react';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({   
    rootContainer: {
        position: 'relative',
        textAlign: "center",
        padding: 10,
        paddingBottom: 50,
        backgroundColor: '#ebebeb'
    },
    loginText: {
        //color: "#fff",
        margin: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    btnContainer: {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
    },
    textAlignCenter: {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center'
    },
    
    
    navLink: {
        //textDecoration: 'underline'
    },
    columnHead: {
        backgroundColor: "#265985",
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 10,
        margin: 1,
        padding: 1,
        alignItems: "center"
    },
    columnData: {
      backgroundColor: "#efca76",
      //color: "#000",
      //fontWeight: "bold",
      fontSize: 10,
      margin: 1,
      padding: 1,
      alignItems: "center"
    },
    columnDataExam: {
      backgroundColor: "#efca76",
      //color: "#000",
      //fontWeight: "bold",
      fontSize: 10,
      margin: 1,
      padding: 20,
      alignItems: "center"
    },
    columnBreak: {
      backgroundColor: "#fefaf2",
      color: "#000",
      fontWeight: "bold",
      fontSize: 10,
      margin: 1,
      padding: 2,
      textAlign: "center"
    },
    headText: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5
    },
    gridBlock: {
        marginTop: 20
    },
    generalContent: {
        fontSize: 13,
        paddingLeft: 10,
        marginBottom: 20
    },
    
    rowContainer: {
        marginBottom: 1,
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        backgroundColor: '#ebebeb',
        borderBottomColor: "#999"     
      },
      rowTitle: {
        fontSize: 18,
        paddingBottom: 2,
        color: "#265985"
      },
      rowSubTitle: {
        fontSize: 10,
        paddingBottom: 5,
        color: '#ff6a00'
      },
      rowContent: {
        fontSize: 12,
        paddingBottom: 5,
        textAlign: 'justify'
      },
      footerBlank: {
        height: 100
      },
      keyboardBlank: {
        height: 250
      },
      generalBtn: {
        backgroundColor: "#ff6a00",
        //borderColor: "#ff6a00",
        //borderWidth: 1,
        padding: 5,
        textAlign: "center",
        alignItems: "center",
        borderRadius: 5,
        margin: 5,
        minHeight: 30,
        color: "#000"
      },
      generalLoginBtn: {
        backgroundColor: "#ff6a00",
        padding: 15,
        textAlign: "center",
        alignItems: "center",
        borderRadius: 5,
        margin: 5,
        minHeight: 50
      },
      generalBtnText: {
          color: "#ffffff"
      },
      optionsBlock: {
        display: 'flex',
        flexDirection: 'row'
      },
      optionView: {
          padding: 10
      },
      optionViewDirection:{
        flexDirection: 'row'
      },
      optionText: {
          color: "#000",
          paddingLeft: 10,
          paddingTop: 5
      },
      input: {
        width: "95%",
        backgroundColor: '#fff',
        color: "#000",
        padding: 15,
        margin: 5,
        borderColor: "#265985",
        borderWidth: 1
      },
      successMsg: {
        color: 'green',
        margin: 5,
      },
      generalErrorBlock: {
        backgroundColor: '#f902024f',
        margin: 10,
        padding: 10,
        borderWidth: 2,
        borderStyle: "dotted",
        borderColor: "#FF5722",
        textAlign: "center",
        alignItems: "center"
      },
      /* Grid Style start */ 
      gridHeadRow: {
        backgroundColor: "#265985",
      },
      gridHeadText: {
        color: "#fff"
      },
      gridTextPaddingLeft10: {
        paddingLeft: 10
      },
      girdColumn: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: "wrap",
        marginRight: 1,
        borderRightColor: "#fff",
        borderRightWidth: 1,
        padding: 5
      },
      girdHeadColumn: {
        marginRight: 1,
        backgroundColor: "#265985",
        borderRightColor: "#fff",
        borderRightWidth: 1,
        borderTopColor: "#fff",
        borderTopWidth: 1,
        padding: 5
      },
      gridDataRow1: {
        backgroundColor: "#ebebeb",
      },
      gridDataRow2: {
        backgroundColor: "#f1f1f1",
      },
      generalNotFoundText: {
        marginTop: 30,
      }
      /* Grid Style ends */ 
  })