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
import Config from '../Config'

class CommunityManager extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{margin:10}}>
                <Button onPress={()=>{this.createCommunity()}} style={style.item} title="创建社区"></Button>
                <Button onPress={()=>{this.toUserCommunity()}} style={style.item1} title="我的社区"></Button>
                <Button onPress={()=>{this.joinCommunity()}} style={style.item2}  title="加入社区"></Button>
              </View>           
        );
    }

    createCommunity(){
      console.log('创建社区');
      DeviceEventEmitter.emit(Config.USER_FRAGMENT_COMMUNITY_CHANGE,'CreateCommunity');
    }

    toUserCommunity(){
      console.log('我的社区');
      DeviceEventEmitter.emit(Config.USER_FRAGMENT_COMMUNITY_CHANGE,'UserCommunity');
    }

    joinCommunity(){
        console.log('加入社区');
        DeviceEventEmitter.emit(Config.USER_FRAGMENT_COMMUNITY_CHANGE,'JoinCommunity');

    }
}
//Button的样式无效
const style = StyleSheet.create({
    item:{
        height:100,
        backgroundColor:'skyblue'
    },
    item1:{
        flex:2,
        backgroundColor:'skyblue'
    },
    item2:{
        flex:3,
        backgroundColor:'skyblue'
    }
});

export default CommunityManager;