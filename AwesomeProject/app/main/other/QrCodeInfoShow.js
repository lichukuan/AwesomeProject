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
  ImageBackground,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import Config from '../Config';
//用户信息和社区信息的二维码
const ScreenWidth  = Dimensions.get('window').width

class QrCodeInfoShow extends React.Component{

   constructor(props){
     super(props);
     //type = 0,社区
     //type = 1,用户信息
     console.log(props.route.params.data);
     this.state = {
         data:props.route.params.data,
         type:props.route.params.type
     }
     this.navigation = props.navigation;
   }

   back(){
       this.navigation.goBack();
   }

   render(){
       let title = '';
       let value = '';
       let image = '';
       let text_1 = '';
       let text_2 = '';
       if(this.state.type == 0){//社区
          title = '社区二维码'
          image = this.state.data.community_pic;
          text_1 = this.state.data.community_name;
          text_2 = this.state.data.community_id;
          value = '0&'+JSON.stringify(this.state.data);
       }else{
          title = '我的二维码'
          image = 'http://cdn.lichukuan.club/defacult_icon.png'
          text_1 = this.state.data.realName
          text_2 = this.state.data.user_name
          value = '1&'+JSON.stringify(this.state.data)
       }
       const bg_width = ScreenWidth*0.8;
       const code_width = ScreenWidth*0.7;
       return (
        // <View style={style.parent}>
        //  <QRCode value={value} size={300} />
        //  <View style={{height:20}}></View>
        // </View>   
        <ImageBackground source={require('../../images/code_bg.png')} style={{flexDirection:'column',alignContent:'center',flex:1}}>
            <View style={{flexDirection:'row',height:50,alignItems:'center'}}>
            <TouchableHighlight  activeOpacity={0.6}  style={{marginLeft:10}}
                                 underlayColor="white" onPress={()=>{this.back()}}>
                <Image style={{width:25,height:25}} source={require('../../images/back_gray.png')}></Image>
                </TouchableHighlight>
                <Text style={{textAlign:'center',textAlignVertical:'center',fontSize:20,flex:1,marginEnd:35}}>{title}</Text>
            </View>
            <View style={{flexDirection:'column',flex:1,alignItems:'center',justifyContent:'center',marginBottom:50}}>
                <View style={{width:bg_width,height:420,backgroundColor:'white',borderRadius:10,flexDirection:'column',alignItems:'center'}}> 
                    <Image style={{width:60,height:60,borderRadius:30,marginTop:-30}} source={{uri:image}}></Image> 
                    <Text style={{fontSize:25,marginTop:10}}>{text_1}</Text>
                    <Text style={{fontSize:16,color:'gray',marginBottom:10}}>{text_2}</Text> 
                    <QRCode value={value} size={code_width} />
                </View>
            </View>
        </ImageBackground>
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

export default QrCodeInfoShow;