import React from 'react';  
import {Platform, StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';  
  
export default class ModalComponent extends React.Component {
  
  render() {  
    const { dispText, isVisible, closeCB, confirmCB } = this.props
    return (  
      <View style = {styles.container}>  
        <Modal            
          animationType = {"fade"}  
          transparent = {false}  
          visible = {isVisible}  
          onRequestClose = {() => closeCB() }>  
          {/*All views of Modal*/}  
            <View style = {styles.modal}>  
              <Text style = {styles.text}>{dispText}</Text>  
              <View style={styles.btnBlock}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => confirmCB()}
                >
                  <Text style={styles.btnText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => closeCB()}
                >
                  <Text style={styles.btnText}>No</Text>
                </TouchableOpacity>
              </View>
          </View>  
        </Modal>  
      </View>  
    );  
  }  
}  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    alignItems: 'center',  
    justifyContent: 'center',  
    backgroundColor: '#ecf0f1',  
  },  
  modal: {  
    justifyContent: 'center',  
    alignItems: 'center',   
    backgroundColor : "#00BCD4",   
    height: 300 ,  
    width: '80%',  
    borderRadius:10,  
    borderWidth: 1,  
    borderColor: '#fff',    
    marginTop: 80,  
    marginLeft: 40,  
   
   },  
   text: {  
      color: '#000',  
      marginTop: 10,
      padding: 10
   },
   btnBlock: {
     display: 'flex',
     flexDirection: 'row'
   },
   button: {
    backgroundColor: "#265985",
    padding: 15,
    textAlign: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 10,
    minHeight: 30
  },
  btnText: {
    color: "#fff"
  }
});  