import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  Text,
  StatusBar,
} from 'react-native';
import Config from '../Config';
class QrCodeShow extends React.Component{

   constructor(props){
     super(props);
     
   }

   render(){
       const value = Config.apply_for_id+'&'+Config.LOGIN_USER_ID;
       return (
        <View style={style.parent}>
         <QRCode value={value} size={300} />
         <View style={{height:20}}></View>
        </View>   
       )
   }
} 

const style = StyleSheet.create({
  parent:{
    marginLeft:20,
    marginRight:20,
    marginTop:20,
    fontSize:20,
    textAlignVertical: 'center',
    alignItems: 'center',
        justifyContent: 'center',
  }
});

export default QrCodeShow;