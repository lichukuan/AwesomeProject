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
  Alert,
  Dimensions,
  FlatList,
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
            <ImageBackground style={{flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',}} resizeMode="cover"
            source={require('../../images/login_bg.jpg')}>
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
                <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="#DDDDDD00" style={style.item} onPress={()=>{this.login()}}>
                <Text style={{fontSize:20,borderRadius:8,color:'white',backgroundColor:'#0000ffbb',textAlignVertical:'center',textAlign:'center',height:50,width:'80%'}}>登录</Text>
               </TouchableHighlight>
               <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="#DDDDDD00" style={style.item} onPress={()=>{this.navigation.navigate('注册')}}>
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
        marginTop:10,
        width:Dimensions.get('window').width,
        flexDirection:'row',
        alignContent:'center',
        alignContent:'center',
        justifyContent:'center'
    }
});

export default Login;