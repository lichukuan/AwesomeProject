import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  DeviceEventEmitter,
  Text,
  StatusBar,
  ImageBackground,
  Dimensions
} from 'react-native';
import Key from '../../other/storage/Keys'
import AsyncStorage from '@react-native-community/async-storage';

import Config from '../../Config'
import { TouchableHighlight } from 'react-native-gesture-handler';
var that = null;
let isSendCode = false;
class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name:"",
            pas:"",
            phone:'',
            second:60
        }
        that = this;
        this.navigation=props.navigation;
    }

    render(){
        return (
            <ImageBackground style={{flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',}} resizeMode="cover"
            source={require('../../../images/login_bg.png')}>
                <TextInput onChangeText={(text) => {this.setName(text)}} style={{ paddingHorizontal:20,width: '80%',height: 50,fontSize: 17,backgroundColor:'#ffffffbb',color: '#000000',borderRadius:8}} placeholder="请输入用户名" secureTextEntry={false}  //设置为密码输入框
                autoCapitalize='none'  //设置首字母不自动大写
                underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                placeholderTextColor={'gray'}  //设置占位符颜色
                ></TextInput>
                <TextInput  onChangeText={(text) => {this.setPas(text)}} style={{ paddingHorizontal:20,width: '80%',height: 50,fontSize: 17,backgroundColor:'#ffffffbb',color: '#000000',marginTop:10,borderRadius:8}} password = {true} placeholder="请输入密码" 
                secureTextEntry={true}  //设置为密码输入框
                autoCapitalize='none'  //设置首字母不自动大写
                underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                placeholderTextColor={'gray'}  //设置占位符颜色
                ></TextInput>
                <TextInput  onChangeText={(text) => {this.setPhone(text)}} style={{ paddingHorizontal:20,width: '80%',height: 50,fontSize: 17,backgroundColor:'#ffffffbb',color: '#000000',marginTop:10,borderRadius:8}}  placeholder="请输入手机号" 
                //设置为密码输入框
                autoCapitalize='none'  //设置首字母不自动大写
                underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                placeholderTextColor={'gray'}  //设置占位符颜色
                ></TextInput>

                <View style={{flexDirection:'row',width:'88%',justifyContent:'space-around'}}>
                <TextInput  
                 onChangeText={(text) => {this.setSMS(text)}} style={{ paddingHorizontal:20,width: '50%',height: 50,fontSize: 17,backgroundColor:'#ffffffbb',color: '#000000',marginTop:10,borderRadius:8}} password = {true} 
                 secureTextEntry={true}  //设置为密码输入框
                 autoCapitalize='none'  //设置首字母不自动大写
                 underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                 placeholderTextColor={'gray'}  //设置占位符颜色
                 placeholder="验证码" ></TextInput>
                    <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="white" style={{}} onPress={()=>{this.sendMessage()}}>
                            <Text style={{backgroundColor:'blue',color:'white',fontSize:18,textAlign:'center',textAlignVertical:'center',height:50,marginTop:10,borderRadius:8,width:100,marginLeft:10}}>{isSendCode?this.state.second+'':'发送'}</Text>
                    </TouchableHighlight>
                </View>
                
               <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="#DDDDDD00" style={style.item} onPress={()=>{this.register()}}>
                <Text style={{fontSize:20,borderRadius:8,backgroundColor:'#0000ffbb',color:'white',textAlignVertical:'center',textAlign:'center',height:50,width:'80%'}}>注册</Text>
               </TouchableHighlight>
            </ImageBackground>
        );
    }

    setName(data){
       this.setState({name:data});
    }

    setPas(data){
        this.setState({pas:data});
    }

    setPhone(data){
        this.setState({phone:data});
    }

    setSMS(data){
        this.setState({smsCode:data});
    }

    tick(){
        this.setState({
          second:this.state.second - 1
        })
        if(this.state.second == 0){
          isSendCode = false;
          this.setState({
            second:60
          })
          clearInterval(this.interval);
        }
      }
    
       sendMessage(){
         if(isSendCode){
           return;
         }
         isSendCode = true;
         this.interval = setInterval(() => this.tick(), 1000);
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

    register(){
        const  url = 'https://api2.bmob.cn/1/users';
        const name = this.state.name;
        const pas = this.state.pas+"";
        const phone = this.state.phone;
        const smsCode = this.state.smsCode;
        console.log("姓名 "+name+"  phone = "+phone);
        var fetchOptions = {
            method: 'POST',
            headers: {
            'X-Bmob-Application-Id': Config.BMOB_APP_ID,
            'X-Bmob-REST-API-Key': Config.REST_API_ID,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                smsCode:smsCode,
                username : name,
                password : pas,
                mobilePhoneNumber:phone
            })
        };
        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
             console.log(responseText);
            const data = JSON.parse(responseText);
            if(data.code == 202){//登录
                Alert.alert(
                    '你已经注册',
                    '你已经注册过账号，快去登录吧~',
                    [
                      {
                        text: '确定', onPress: () => {
                           that.navigation.goBack();
                        }
                      }
                    ],
                    {cancelable: false}
                  )
            }else{//注册
                var user = {
                    user_name:name,
                    user_id:data.objectId,
                    session_token:data.sessionToken,
                    phone:data.mobilephone
                }
                AsyncStorage.setItem(Key.USER_INFO, JSON.stringify(user), err => {
                    err && console.log(err.toString());
                });  
                Config.IS_LOGIN = true;
                Config.LOGIN_USER_NAME = name;
                Config.LOGIN_USER_ID = data.objectId;
                Config.create_community_id = data.create_community_id;
                console.log("用户id = "+data.objectId);
                DeviceEventEmitter.emit(Config.UPDATE_USER_LOGIN_INFO,true);
                console.log("name = "+name +"  pas = "+pas);
                this.navigation.goBack();   
            }    
        }).done();        
        
    }

}

const style = StyleSheet.create({
    name:{
        height:50,
        borderColor:'skyblue',
        borderWidth:1,
        marginTop:10
    },
    password:{
        height:50,
        marginTop:50
    },
    button:{
        backgroundColor:'skyblue',
        height:50,
        marginTop:50,
        fontSize:20
    },
    item:{
        marginTop:10,
        width:Dimensions.get('window').width,
        flexDirection:'row',
        alignContent:'center',
        alignContent:'center',
        justifyContent:'center'
    }
});

export default Register;