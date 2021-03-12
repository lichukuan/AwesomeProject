import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  DeviceEventEmitter,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeviceStorage from '../storage/DeviceStorage';
import Key from '../storage/Keys'
import Config from '../Config'
var that = null;
class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name:"lck",
            pas:"xxx"
        }
        that = this;
        this.navigation=props.navigation;
    }

    render(){
        return (
            <View>
                <TextInput onChangeText={(text) => {this.setName(text)}} style={style.name} placeholder="请输入用户名"></TextInput>
                <TextInput  onChangeText={(text) => {this.setPas(text)}} style={style.password} password = {true} placeholder="请输入密码" ></TextInput>
                <Button  onPress={()=>{this.register()}} style={style.button}  title="登录/注册"></Button>
            </View>
        );
    }

    setName(data){
       this.setState({name:data});
    }

    setPas(data){
        this.setState({pas:data});
    }

    register(){
        const  url = 'https://api2.bmob.cn/1/users';
        const name = this.state.name;
        const pas = this.state.pas;
        var fetchOptions = {
            method: 'POST',
            headers: {
            'X-Bmob-Application-Id': Config.BMOB_APP_ID,
            'X-Bmob-REST-API-Key': Config.REST_API_ID,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username : name,
                password : pas
            })
        };
        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
             console.log(responseText);
            // const data = JSON.parse(responseText);
            // if(data.code == 202){//登录
            //     that.login();
            // }else{//注册
            //     DeviceStorage.save(Key.user_class,JSON.stringify({
            //         user_name:name,
            //         user_id:user_id
            //     }));
            //     Config.IS_LOGIN = true;
            //     Config.LOGIN_USER_NAME = name;
            //     Config.LOGIN_USER_ID = data.objectId;
            //     console.log("用户id = "+data.objectId);
            //     DeviceEventEmitter.emit(Config.UPDATE_USER_LOGIN_INFO,true);
            //     console.log("name = "+name +"  pas = "+pas);
            //     this.navigation.goBack();   
            // }    
            that.login();
        }).done();        
        
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
            DeviceStorage.save(Key.user_class,{
                user_name:name,
                user_id:data.objectId
            });
                
            Config.IS_LOGIN = true;
            Config.LOGIN_USER_NAME = name;
            Config.LOGIN_USER_ID = data.objectId;
            Config.SESSION_TOKEN = data.sessionToken;
            console.log("用户id = "+data.objectId);  
            DeviceEventEmitter.emit(Config.UPDATE_USER_LOGIN_INFO,true);
            console.log("name = "+name +"  pas = "+pas);
            console.log("session_id = "+data.sessionToken);
            this.navigation.goBack();    
        }).done();    
    }
}

const style = StyleSheet.create({
    name:{
        height:50
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
    }
});

export default Login;