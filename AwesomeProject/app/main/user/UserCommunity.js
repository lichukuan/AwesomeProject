import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  Text,
  DeviceEventEmitter,
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
            objectId:null,
            create_phone:null
        }
        this.navigation = props.navigation;
        that = this;
    }

    render(){
        const name = this.state.name;
        const id = this.state.id;
        const number = this.state.number;
        return (
            <View>
                <View style={{flexDirection:'row',height:40,margin:10}}>
                     <Text>社区名: </Text>
                     <Text >{name}</Text>
                </View>
                <View style={{flexDirection:'row',height:40,margin:10}}>
                     <Text>社区ID: </Text>
                     <Text >{id}</Text>
                </View>
                <View style={{flexDirection:'row',height:40,margin:10}}>
                     <Text>管理员姓名: </Text>
                     <Text>{this.state.create_name}</Text>
                </View>
                <View style={{flexDirection:'row',height:40,margin:10}}>
                     <Text>管理员电话: </Text>
                     <Text>{this.state.create_phone}</Text>
                </View>
                <View style={{flexDirection:'row',height:40,margin:10}}>
                     <Button title="出入二维码"  onPress={()=>{this.showQRCode()}}></Button>
                     <Text style={{width:20}}></Text>
                     <Button title=" 社区人员 " onPress={()=>{this.showCommunityMember()}}></Button>
                     <Text style={{width:20}}></Text>
                     <Button title=' 申请列表 ' onPress={()=>{this.applyCommunityList()}}></Button>
                </View>
                <View style={{flexDirection:'row',height:40,margin:10}}>
                     <Button title="请假列表"  onPress={()=>{this.askForLeave()}}></Button>
                     <Text style={{width:20}}></Text>
                     <Button title="出入异常列表" onPress={()=>{this.errorList()}}></Button>
                     <Text style={{width:20}}></Text>
                     <Button title='体温异常列表' onPress={()=>{this.applyCommunityList()}}></Button>
                </View>
            </View>
        );
    }

    askForLeave(){
        this.navigation.navigate('请假列表')
    }

    errorList(){
        //OutAndInErrorList
        this.navigation.navigate('出入异常列表')
    }

    componentDidMount(){
        this.feedCommunityInfo();
    }


    applyCommunityList(){
        DeviceEventEmitter.emit(Config.USER_FRAGMENT_COMMUNITY_CHANGE,'ApplyForJoinCommunityList');
    }

    feedCommunityInfo(){
       const communityId = Config.user.join_community_id; 
       const param = JSON.stringify({
        community_id:communityId
       }); 
       const url = 'https://api2.bmob.cn/1/classes/Community?where='+param;
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
            create_phone:data.results[0].create_user_phone,
            objectId:data.results[0].objectId
        })
        if(that.state.community_number == undefined ){
            that.setState({
                number:0
            })
        }
        console.log(that.state.community_number);
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
      DeviceEventEmitter.emit(Config.USER_FRAGMENT_COMMUNITY_CHANGE,'CommunityMember');
    }

    showQRCode(){
      console.log('展示二维码');
      this.navigation.navigate('user',{itemId:22,key:'QrCodeShow'});
    }
}

export default UserCommunity;