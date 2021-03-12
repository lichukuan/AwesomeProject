import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  StatusBar,
  Text
} from 'react-native';
import Config from '../Config';
var that = null;
class CheckUserID extends React.Component{

  constructor(props){
     super(props);
     this.state = {
        name:null,
        phone:0,
        code:0
     }
     that = this;
  }

   render(){
       return (
           <View style={style.parent}>
             <TextInput onChangeText={(text) => {this.setPhone(text)}} style={style.name} placeholder="请输入电话号码"></TextInput>
             <View height={50}>
             <View style={style.code}>
                 <TextInput  onChangeText={(text) => {this.setCode(text)}} style={style.password} placeholder="验证码" ></TextInput>
                 <Button title='发送' style={style.button} onPress={()=>{this.sendMessage()}}></Button>
             </View>
             </View>
            <Button title='上传真人相片' onPress={()=>{this.takeRealPicture()}}></Button>
            <Button title='上传身份证正面照' onPress={()=>{this.takeIDCardPicture()}}></Button>
            <TextInput onChangeText={(text) => {this.setName(text)}} style={style.name} placeholder="请输入真实姓名"></TextInput>
            <Button  onPress={()=>{this.check()}} style={style.button}  title="认证"></Button>
            <View style={style.other}></View>
           </View>
        )
   }

   setPhone(data){
      this.setState({phone:data})
   }

   setCode(data){
      this.setState({code:data})
   } 

   setName(data){
     this.setState({name:data})
   }

   sendMessage(){
      const url = 'https://api2.bmob.cn/1/requestSmsCode';
      const phone = this.state.phone;
      var fetchOptions = {
        method: 'POST',
        headers: {
        'X-Bmob-Application-Id': Config.BMOB_APP_ID,
        'X-Bmob-REST-API-Key': Config.REST_API_ID,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mobilePhoneNumber : phone,
        })
    };
    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
        console.log(responseText);
        const data = JSON.parse(responseText);
        
    }).done();      
   }

   takeRealPicture(){
      
   }

   takeIDCardPicture(){

   }

   check(){
      //先验证电话
      const code = this.state.code;
      const name = this.state.name;
      const phone = this.state.phone;
      const url = 'https://api2.bmob.cn/1/verifySmsCode/'+code;
      var fetchOptions = {
        method: 'POST',
        headers: {
        'X-Bmob-Application-Id': Config.BMOB_APP_ID,
        'X-Bmob-REST-API-Key': Config.REST_API_ID,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mobilePhoneNumber : phone,
        })
    };
    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
        const data = JSON.parse(responseText);
        console.log(data.msg);
        if(data.msg == 'ok'){//电话验证通过
          that.update(name,'http://cdn.lichukuan.club/044867399a124eb6a08c9cf7b8b2454d.jpg','http://cdn.lichukuan.club/0dc5ba9a-cd64-4765-b0ac-c4539622e6fc.jpg');
        }else{
          console.log('电话验证失败');
        }
    }).done();    
   }

   update(name,pic1,pic2){
      const url = 'https://api2.bmob.cn/1/users/'+Config.LOGIN_USER_ID;
      var fetchOptions = {
        method: 'PUT',
        headers: {
        'X-Bmob-Application-Id': Config.BMOB_APP_ID,
        'X-Bmob-REST-API-Key': Config.REST_API_ID,
        'Content-Type': 'application/json',
        'X-Bmob-Session-Token':Config.SESSION_TOKEN
        },
        body: JSON.stringify({
           id_card_picture_url:pic1,
           real_picture_url:pic2,
           real_name:name
        })
    };
    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      console.log(responseText);
        const data = JSON.parse(responseText);
        console.log(data.msg);
      
    }).done();    
   }
}



const style = StyleSheet.create({
  parent:{
    
  },
  name:{
      height:50,
  },
  password:{
      height:50,
      flex:8
    },
  button:{
      backgroundColor:'skyblue',
      height:50,
      fontSize:20,
      
  },
  code:{
    flex:1,
    flexDirection:'row',
    height:50
  },
  other:{
    flex:10
  }
});


export default CheckUserID;