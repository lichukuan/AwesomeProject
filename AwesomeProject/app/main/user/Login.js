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
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeviceStorage from '../storage/DeviceStorage';
import Key from '../storage/Keys'
import AsyncStorage from '@react-native-community/async-storage';

import Config from '../Config'
import { TouchableHighlight } from 'react-native-gesture-handler';
var that = null;
class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name:"",
            pas:""
        }
        that = this;
        this.navigation=props.navigation;
    }

    render(){
        return (
            <View style={{margin:10}}>
                <TextInput onChangeText={(text) => {this.setName(text)}} style={style.name} placeholder="请输入用户名"></TextInput>
                <TextInput  onChangeText={(text) => {this.setPas(text)}} style={style.name} password = {true} placeholder="请输入密码" ></TextInput>
                <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="#DDDDDD" style={style.item} onPress={()=>{this.login()}}>
                <Text style={{fontSize:20,color:'white',textAlignVertical:'center',textAlign:'center',height:40}}>登录</Text>
               </TouchableHighlight>
               <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="#DDDDDD" style={style.item} onPress={()=>{this.navigation.navigate('注册')}}>
                <Text style={{fontSize:20,color:'white',textAlignVertical:'center',textAlign:'center',height:40}}>注册</Text>
               </TouchableHighlight>
            </View>
        );
    }

    setName(data){
       this.setState({name:data});
    }

    setPas(data){
        this.setState({pas:data});
    }

    login(){
        const url = 'https://api2.bmob.cn/1/login'
        const name = this.state.name;
        const pas = this.state.pas;
        var fetchOptions = {
            method: 'GET',
            headers: {
            'X-Bmob-Application-Id': Config.BMOB_APP_ID,
            'X-Bmob-REST-API-Key': Config.REST_API_ID,
            'Content-Type': 'application/json'
            }
        };
        fetch(url+'?username='+name+'&password='+pas, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            console.log(responseText);
            const data = JSON.parse(responseText);
            if(data.code  != undefined){
                Alert.alert(
                    '登录失败',
                    '请检查用户名或者密码是否错误',
                    [
                       
                      {
                        text: '确定', onPress: () => {
                        }
                      }
                    ],
                    {cancelable: false}
                  ) 
                return;
            }
            Config.IS_LOGIN = true;
            Config.LOGIN_USER_NAME = name;
            Config.LOGIN_USER_ID = data.objectId;
            Config.SESSION_TOKEN = data.sessionToken;
            Config.authentication = data.authentication;
            Config.create_community_id = data.create_community_id;
            console.log("用户id = "+data.objectId);
            var user = {
                user_name:name,
                user_id:data.objectId,
                session_token:data.sessionToken,
                phone:data.mobilePhoneNumber,
                address:data.address,
                authentication:data.authentication,
                realName:data.real_name,
                mobilePhoneNumberVerified:data.mobilePhoneNumberVerified,
                id_card_picture_url:data.id_card_picture_url,
                real_picture_url:data.real_picture_url,
                create_community_id:data.create_community_id,
            }
            Config.user = user;
            AsyncStorage.setItem(Key.USER_INFO, JSON.stringify(user), err => {
                err && console.log(err.toString());
            });  
            DeviceEventEmitter.emit(Config.UPDATE_USER_LOGIN_INFO,true);
            console.log("name = "+name +"  pas = "+pas);
            console.log("session_id = "+data.sessionToken);
            this.navigation.goBack();    
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
        height:50,
        borderColor:'white',
        borderWidth:2,
        marginTop:10,
        backgroundColor:'skyblue'
    }
});

export default Login;