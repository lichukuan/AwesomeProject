import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native';
import DeviceStorage from './storage/DeviceStorage';
import Key from "./storage/Keys";
var REQUEST_URL = 'https://ipservice.3g.163.com/ip';
import AsyncStorage from '@react-native-community/async-storage';

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message:"请稍后",
            city:"正在查询...",
            communityInfo:"你未加入社区，点击加入社区",
            communityId:null
        }
        this.navigation = props.navigation;
    }

    fetchData()
    {
        fetch(REQUEST_URL, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseData) => {
            Config.json_ip_data =  responseData;
            this.setState({
                message:responseData.message,
                cityCode:responseData.result.administrativeCode,
                city:responseData.result.city
            });
            DeviceStorage.save(Key.location_city,responseData.result.city);
            DeviceStorage.save(Key.location_city_code,responseData.result.administrativeCode);
            console.log(responseData);
        })
        .catch((error) => {
                console.log(error);
        });
    }

    componentDidMount()
    {
        this.fetchData();
    }

    render(){
      const message = this.state.message; 
      const city = this.state.city;
      const communityInfo = this.state.communityInfo; 
      const communityId = this.state.communityId;
      return <View>
          <CommunityInfo info = {communityInfo} id = {communityId} press={()=>this.goCreateCommunityOrShowCommunityInformation()}/>
        <View>
          <Location message = {message} city = {city}/>
          <HealthCode press={()=>this.showHealthCode()}/>
        </View>
          <Card press = {()=>this.card()}/>
          <Text style={style.community_info} onPress={()=>{this.qrcode()}}>扫描二维码</Text>
      </View>
    }

    //打卡
    card(){
         this.navigation.navigate('home',{itemId:10,key:'CardHealth'});
    }

    qrcode(){
       console.log('扫描二维码');
       this.navigation.navigate('home',{itemId:12,key:'ScanQrcode'});
    }

    showHealthCode(){
      console.log("展示健康码");
      this.navigation.navigate('home',{itemId:13,key:'ShowHealthCode'});
    }

    goCreateCommunityOrShowCommunityInformation(){
        console.log("设置社区");
        this.navigation.navigate('user',{itemId:11,key:'JoinCommunity'});
    }
}

function CommunityInfo(props){
    var message = props.info;
    if(props.id == null){
       message = props.info;
    }else{
        message = '你已经加入'+props.info+'社区';
    }
    return <Text style={style.community_info} onPress={props.press}>{message}</Text>;
}

function Location(props){
    return <Text onPress={props.press} style = {style.location}>{"当前位置为："+props.city}</Text>;
}

function HealthCode(props){
    return <Text onPress={props.press} style = {style.health_code} >健康码</Text>
}

function Card(props){
    return <Text style={style.card} onPress={props.press}>打卡</Text>
}

const style = StyleSheet.create({
    community_info:{
      height:100,
      marginLeft:20,
      marginRight:20,
      marginTop:20,
      fontSize:20,
      textAlignVertical: 'center',
      backgroundColor:'yellow'
    },
    location:{
       height:100,
       fontSize:20,
       textAlignVertical: 'center',
       backgroundColor:'green',
       margin:20
    },
    health_code:{
        height:100,
        fontSize:20,
        marginLeft:20,
        textAlignVertical: 'center',
        marginRight:20,
        backgroundColor:'red',
    },
    card:{
        height:100,
        fontSize:20,
        textAlignVertical: 'center',
        backgroundColor:'blue',
        margin:20
    }
  });

export default Main;