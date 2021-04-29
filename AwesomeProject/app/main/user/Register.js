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
class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name:"",
            pas:"",
            phone:''
        }
        that = this;
        this.navigation=props.navigation;
    }

    render(){
        return (
            <View style={{margin:10}}>
                <TextInput onChangeText={(text) => {this.setName(text)}} style={style.name} placeholder="请输入用户名"></TextInput>
                <TextInput  onChangeText={(text) => {this.setPas(text)}} style={style.name} password = {true} placeholder="请输入密码" ></TextInput>
                <TextInput  onChangeText={(text) => {this.setPhone(text)}} style={style.name} password = {true} placeholder="请输入手机号" ></TextInput>                
               <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="#DDDDDD" style={style.item} onPress={()=>{this.register()}}>
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

    setPhone(data){
        this.setState({phone:data});
    }

    register(){
        const  url = 'https://api2.bmob.cn/1/users';
        const name = this.state.name;
        const pas = this.state.pas+"";
        const phone = this.state.phone+'';
        var fetchOptions = {
            method: 'POST',
            headers: {
            'X-Bmob-Application-Id': Config.BMOB_APP_ID,
            'X-Bmob-REST-API-Key': Config.REST_API_ID,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
        height:50,
        borderColor:'white',
        borderWidth:2,
        marginTop:10,
        backgroundColor:'skyblue'
    }
});

export default Register;