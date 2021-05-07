import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  DeviceEventEmitter,
  TouchableHighlight,
  Alert,
  Button
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
      if(Config.IS_LOGIN){
        this.state = {
            userName:Config.LOGIN_USER_NAME,
            change:false
        }
      }else{
        this.state = {
            userName:'请输入用户名',
            change:false
        } 
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

        this.out_login_listener = DeviceEventEmitter.addListener(Config.USER_OUT_LOGIN_IN,(e)=>{
                that.setState({
                   userName:'请输入用户名'
                })
        })

        this.authentication = DeviceEventEmitter.addListener(Config.AUTHENTICATION,(e)=>{
            that.setState({
              change:true
            })
        })
    }

    componentWillUnmount(){
        this.listener.remove();
        this.change_community_listener.remove();
        this.out_login_listener.remove();
        this.authentication.remove();
    }

    showEpidemicData(){
        //疫情数据
        that.navigation.navigate('疫情数据')
    }

    render(){  
       const title = Config.authentication?"已认证":"未认证" 
       const loginInfo = Config.IS_LOGIN?'退出登录':'马上登录'
       return <ScrollView style={style.parent}>
           <View style = {style.header}>
              <Icon press = {() => {loginCheck()}}/>
              <View style={style.container}>
                  <Name name = {this.state.userName} press = {() => {
                      loginCheck()
                  }}/>
                  <Text style={style.authortion}>{title}</Text>
              </View>
           </View>
           <View style={{flexDirection:'column',backgroundColor:'white',borderRadius:15,height:120,justifyContent:'center',marginTop:10}}>
              <View style={{marginLeft:10,flexDirection:'row'}}>
                  <Text style={{color:'black',fontSize:20,flex:1}}>疫情数据</Text>
                  <TouchableHighlight onPress={()=>{this.showEpidemicData()}}>
                     <Text style={{width:40,height:20,color:'skyblue',borderRadius:10,borderColor:'skyblue',borderWidth:2,textAlign:'center',marginEnd:20}} >详情</Text>
                  </TouchableHighlight>
              </View> 
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{flexDirection:'column',marginLeft:10,marginTop:10,alignItems:'center'}}>
                   <Text style={{color:'skyblue'}}>{Config.epidmic.name}</Text>
                   <Text style={{color:'gray',marginTop:5}}>地区</Text>
                </View>
                <View style={{flexDirection:'column',marginLeft:10,marginTop:10,alignContent:'center',alignItems:'center'}}>
                   <Text style={{color:'skyblue'}}>{Config.epidmic.total.confirm}</Text>
                   <Text style={{color:'gray',marginTop:5}}>累计确诊</Text>
                </View>
                <View style={{flexDirection:'column',marginLeft:10,marginTop:10,alignItems:'center'}}>
                   <Text style={{color:'skyblue'}}>{Config.epidmic.total.dead}</Text>
                   <Text style={{color:'gray',marginTop:5}}>累计死亡</Text>
                </View>
                <View style={{flexDirection:'column',marginLeft:10,marginTop:10,marginEnd:20,alignItems:'center'}}>
                   <Text style={{color:'skyblue'}}>{Config.epidmic.total.heal}</Text>
                   <Text style={{color:'gray',marginTop:5}}>累计治愈</Text>
                </View>
              </View>
           </View>
           <View style={style.list}>
               <CommunityManager press = {() => 
                    {
                    if(loginCheck()){
                        this.navigation.navigate('社区管理',{itemId:3,key:'CommunityManager'})}

                    }
                }/>
               <CheckUserID press = {() => {
                   if(loginCheck()){
                    this.navigation.navigate('身份认证',{itemId:6,key:'CheckUserID'})
                   }
               }}/>
               <Text style={style.list_item} onPress={()=>{
                   if(loginCheck()){

                   }
               }}>关于应用</Text>
              <Setting press = {() => {
                   if(loginCheck()){
                    this.navigation.navigate('账号与安全',{itemId:4,key:'Setting'})
                   }
               }}/>
               <Text style={style.list_item} onPress={()=>{
                   if(loginCheck()){

                   }
               }}>意见与反馈</Text>
           </View>

           <View style={{marginTop:20,flex:1,justifyContent:'center',flex:1,alignContent:'center'}}>
               <TouchableHighlight  activeOpacity={0.6} underlayColor="#DDDDDD" style={{height:50,width:200,borderRadius:25,marginLeft:'20%'}} onPress={()=>{
                   if(Config.IS_LOGIN){//退出登录
                       Config.IS_LOGIN = false;
                       Config.LOGIN_USER_ID = '';
                       Config.LOGIN_USER_NAME = '';
                       DeviceEventEmitter.emit(Config.USER_OUT_LOGIN_IN,true);
                   }else{
                      that.navigation.navigate('登录')
                   }
               }}>
                       <Text style={style.login}>{loginInfo}</Text>
               </TouchableHighlight>
           </View>
           
       </ScrollView>
    }
    
}
//this.navigation.navigate('user',{
//    itemId:2,key:'Name'})
const style = StyleSheet.create({
    parent:{
        flexDirection:'column',
        padding:20,
        paddingTop:40,
        height:600,
        paddingBottom:20
        },
    header:{
        flexDirection:'row'
    },
    icon:{
        width:70,
        height:70,
        borderRadius:35
        },
    name:{
        fontSize:25,
        textAlignVertical: 'center',
        marginLeft:20,
        marginTop:5
    },
    list:{
        marginTop:20,
        flexDirection:'column'
        },
    list_item:{
        fontSize:20,
        height:50
    },
    container:{
        flex:1,
    },
    authortion:{
        borderColor:'skyblue',
        color:'red',
        borderWidth:1,
        marginLeft:20,
        width:50,
        paddingLeft:3
    },
    login:{
        fontSize:20,color:'white',textAlignVertical:'center',textAlign:'center',height:50,backgroundColor:'skyblue',
        width:200,borderRadius:25,alignContent:'center',alignItems:'center'
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
    return (<TouchableHighlight onPress={props.press} underlayColor="#DDDDDD" style={{borderRadius:35}}>
        <Image source={require('../images/defacult_icon.png')}  style={style.icon}/>
    </TouchableHighlight>);
}

function loginCheck(){
    if(!Config.IS_LOGIN){
        Alert.alert(
            '是否登录',
            '只有登录了才能使用此功能哦~',
            [
              {
                  text:'我再看看',onPress:() => {

                  }
              }  
              ,  
              {
                text: '去登录', onPress: () => {
                   that.navigation.navigate('登录')
                }
              }
            ],
            {cancelable: false}
          )
        return false;  
    }
    return true;
}

function Name(params) {
    let name = null;
    if(params == null || params.name == null){
        name = "请填写用户名"
    }else{
        name = params.name;
    }
    return <Text style={style.name}  onPress={params.press} >{name}</Text>
}

function Setting(params) {
    return <Text style={style.list_item} onPress={params.press}>账号与安全</Text>
}

function NFC(params) {
    return <Text style={style.list_item} onPress={params.press}>NFC</Text>
}

function CheckUserID(params) {
    return <Text style={style.list_item} onPress={params.press}>身份认证</Text>
}

function CommunityManager(params) {
    return <Text style={style.list_item} onPress={params.press}>社区管理</Text>
}

function ApplyForJoinCommunityList(params) {
    return <Text style={style.list_item} onPress={params.press}>申请名单</Text>
}
