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
class QrCodeShow extends React.Component{


  downloadQrcode(){
     console.log('下载二维码');
  }

   render(){
       return (
        <View style={style.parent}>
         <QRCode value={"This is a QR code string, string cannot be null"} size={300} />
         <Button title = '下载二维码' onPress={()=>{this.downloadQrcode()}}></Button>
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