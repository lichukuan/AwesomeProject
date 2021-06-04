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
import Key from '../../other/storage/Keys'
import AsyncStorage from '@react-native-community/async-storage';

import Config from '../../Config'
import { TouchableHighlight } from 'react-native-gesture-handler';
var that = null;
class ChangePassword extends React.Component{

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
            source={require('../../../images/login_bg.png')}>
                <TextInput onChangeText={(text) => {this.setName(text)}} style={{ paddingHorizontal:20,width: '80%',height: 50,fontSize: 17,backgroundColor:'#ffffffbb',color: '#000000',borderRadius:8}} placeholder="请输入旧密码" secureTextEntry={false}  //设置为密码输入框
                autoCapitalize='none'  //设置首字母不自动大写
                underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                placeholderTextColor={'gray'}  //设置占位符颜色
                ></TextInput>
                <TextInput  onChangeText={(text) => {this.setPas(text)}} style={{ paddingHorizontal:20,width: '80%',height: 50,fontSize: 17,backgroundColor:'#ffffffbb',color: '#000000',marginTop:10,borderRadius:8}} password = {true} placeholder="请输入新密码" 
                secureTextEntry={true}  //设置为密码输入框
                autoCapitalize='none'  //设置首字母不自动大写
                underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                placeholderTextColor={'gray'}  //设置占位符颜色
                ></TextInput>
                <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="#DDDDDD00" style={style.item} onPress={()=>{this.login()}}>
                <Text style={{fontSize:20,borderRadius:8,color:'white',backgroundColor:'#0000ffbb',textAlignVertical:'center',textAlign:'center',height:50,width:'80%'}}>修改密码</Text>
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
        const url = 'https://api2.bmob.cn/1/updatePassword'
        const name = this.state.name;
        const pas = this.state.pas;
        const session = Config.SESSION_TOKEN;
        var fetchOptions = {
            method: 'PUT',
            headers: {
            'X-Bmob-Application-Id': Config.BMOB_APP_ID,
            'X-Bmob-REST-API-Key': Config.REST_API_ID,
            'X-Bmob-Session-Token':session,
            'Content-Type': 'application/json'
            },body: JSON.stringify({
                oldPassword:name,
                newPassword:pas
             })
        };
        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            console.log(responseText);
            const data = JSON.parse(responseText);
            if(data.code  != undefined){
                Alert.alert(
                    '修改失败',
                    '旧密码验证错误',
                    [
                       
                      {
                        text: '确定', onPress: () => {
                        }
                      }
                    ],
                    {cancelable: false}
                  ) 
                return;
            }else{
                Alert.alert(
                    '修改成功',
                    '修改密码成功',
                    [
                       
                      {
                        text: '确定', onPress: () => {
                            that.navigation.goBack();    
                        }
                      }
                    ],
                    {cancelable: false}
                  ) 
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

export default ChangePassword;