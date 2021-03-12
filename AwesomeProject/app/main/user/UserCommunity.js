import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Config from '../Config';
var that = null;
class UserCommunity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:null,
            id:null,
            number:0,
            create_name:null,
            create_id:null,
            objectId:null
        }
        that = this;
        Config.JOINED_USER_COMMUNITY_ID = '628d0dcf-6f21-47e5-b005-1d24b4cee247';
    }

    render(){
        const name = this.state.name;
        const id = this.state.id;
        const number = this.state.number;
        return (
            <View style={style.parent}>
                <Text style={style.item}>{name}</Text>
                <Text  style={style.item}>{id}</Text>
                <Text  style={style.item} onPress={()=>{this.showCommunityMember()}}>社区人数：{number}</Text>
                <Text  style={style.item} onPress={()=>{this.showQRCode()}}>出入二维码</Text>
                <Button style={style.item} onPress={()=>{this.deleteCommunity()}} title="删除社区"></Button>
            </View>
        );
    }

    componentDidMount(){
        this.feedCommunityInfo();
    }

    feedCommunityInfo(){
       const url = 'https://api2.bmob.cn/1/classes/Community?where='+JSON.stringify({
           community_id:Config.JOINED_USER_COMMUNITY_ID
       });
       var fetchOptions = {
        method: 'GET',
        headers: {
        'X-Bmob-Application-Id': Config.BMOB_APP_ID,
        'X-Bmob-REST-API-Key': Config.REST_API_ID,
        'Content-Type': 'application/json'
        }
    };
    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
        console.log(responseText);
        const data = JSON.parse(responseText);
        that.setState({
            name:data.results[0].community_name,
            id:data.results[0].community_id,
            number:data.results[0].community_number,
            create_name:data.results[0].create_user_name,
            create_id:data.results[0].create_user_id,
            objectId:data.results[0].objectId
        })
        //this.navigation.goBack();    
    }).done();    
    }

    deleteCommunity(){
        console.log('删除社区');
        const objectId = this.state.objectId;
        const url = 'https://api2.bmob.cn/1/classes/Community/'+objectId;
       var fetchOptions = {
        method: 'DELETE',
        headers: {
        'X-Bmob-Application-Id': Config.BMOB_APP_ID,
        'X-Bmob-REST-API-Key': Config.REST_API_ID,
        'Content-Type': 'application/json'
        }
    };
    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
        console.log(responseText);
        const data = JSON.parse(responseText);
        this.navigation.goBack();    
    }).done();    
    }

    showCommunityMember(){
      console.log('社区人员');
    }

    showQRCode(){
      console.log('展示二维码');
    }
}

const style = StyleSheet.create({
    parent:{
        flex:1
    },
    item:{
        height:100,
        fontSize:20,
        marginTop:20
    }
});

export default UserCommunity;