import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  DeviceEventEmitter
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Config from './Config'
import DeviceStorage from './storage/DeviceStorage';
import Key from './storage/Keys'
import AsyncStorage from '@react-native-community/async-storage';
var that;
export default class User extends React.Component {


    constructor(props){
      super(props);
      this.navigation = props.navigation;
      this.state={
          userName:null
      }
      that = this;
    }

    componentDidMount(){
        this.listener = DeviceEventEmitter.addListener(Config.UPDATE_USER_LOGIN_INFO,(e)=>{
            if(Config.LOGIN_USER_NAME != null){
                that.setState({
                   userName:Config.LOGIN_USER_NAME
                })
              }
        });

        this.change_community_listener = DeviceEventEmitter.addListener(Config.USER_FRAGMENT_COMMUNITY_CHANGE,(e)=>{
            that.navigation.navigate('user',{itemId:3,key:e})
        });
    }

    componentWillUnmount(){
        this.listener.remove();
        this.change_community_listener.remove();
    }

    render(){  
       return <View style={style.parent}>
           <View style = {style.header}>
               <Icon press = {() => this.navigation.navigate('user',{
                   itemId:1,
                   key:'Icon'})}/>
               <Name name = {this.state.userName} press = {() => this.navigation.navigate('user',{
                   itemId:2,
                   key:'Name'})}/>
           </View>
           <View style={style.list}>
               <CommunityManager press = {() => this.navigation.navigate('user',{itemId:3,key:'CommunityManager'})}/>
               <Setting press = {() => this.navigation.navigate('user',{itemId:4,key:'Setting'})}/>
               <NFC press = {() => this.navigation.navigate('user',{itemId:5,key:'NFC'})}/>
               <CheckUserID press = {() => this.navigation.navigate('user',{itemId:6,key:'CheckUserID'})}/>
               <ApplyForJoinCommunityList press={() => this.navigation.navigate('user',{itemId:17,key:'ApplyForJoinCommunityList'})} />
           </View>
       </View>
    }

    
}

const style = StyleSheet.create({
    parent:{
        flex:1,
        flexDirection:'column',
        margin:20
        },
    header:{
        flex:2,
        flexDirection:'row'
    },
    icon:{
        width:100,
        height:100,
        borderRadius:50
        },
    name:{
        height:100,
        fontSize:20,
        textAlignVertical: 'center',
        marginLeft:20
    },
    list:{
        flex:10,
        flexDirection:'column'
        },
    list_item:{
        fontSize:20,
        color:'red',
        height:50
    }
});

//不能使用svg
function Icon(props) {
    let url = null;
    if(props == null || props.url == null){
        url = 'https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1988502314.jpg';
    }else{
        url = props.url;   
    }
    return <Image source={{uri: url}}
    style={style.icon}/>
}

function Name(params) {
    let name = null;
    if(params == null || params.name == null){
        name = "点击登录"
    }else{
        name = params.name;
    }
    return <Text style={style.name}  onPress={params.press} >{name}</Text>
}

function Setting(params) {
    return <Text style={style.list_item} onPress={params.press}>设置</Text>
}

function NFC(params) {
    return <Text style={style.list_item} onPress={params.press}>NFC</Text>
}

function CheckUserID(params) {
    return <Text style={style.list_item} onPress={params.press}>认证</Text>
}

function CommunityManager(params) {
    return <Text style={style.list_item} onPress={params.press}>社区管理</Text>
}

function ApplyForJoinCommunityList(params) {
    return <Text style={style.list_item} onPress={params.press}>申请名单</Text>
}
