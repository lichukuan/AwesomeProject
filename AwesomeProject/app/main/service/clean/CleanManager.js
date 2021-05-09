import React from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View,TouchableHighlight,DeviceEventEmitter} from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Config from '../Config'
import Apply from './Apply'
import AsyncStorage from '@react-native-community/async-storage';
var that;
export default class CleanManager extends React.Component {
    constructor(props){
      super(props);
      this.navigation = props.navigation;
      this.state = {
          data:[],

      }
      that = this;
    }

    componentDidMount(){
        this.fetchData();
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

    fetchData(){
            const url = 'https://api2.bmob.cn/1/classes/Record?where='+JSON.stringify({
                  user_id:Config.LOGIN_USER_ID
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
            .then((responseData) => {
                console.log("获取的申请为："+responseData);
                const data = JSON.parse(responseData);
                this.setState({
                    data: data.results,
                    loaded: true
                });
            }).done();        
    }

    static renderLoadingView() {  
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#8bc9ff"/>
                </View>
        );
    }

    static renderMovie({item}) {
        // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
        let state = '';
        switch(item.state){
           case 'wait_out':
            state = '待出门';
            break;
           case 'wait_in':
               state = '待回家';
               break;
            default:
                state = '结束';    
        }
        if(item.request_state == 'refuse'){
            state = '已拒绝'
        }else if(item.request_state == 'wait'){
            state = '待同意'
        }
        const backTime = that.getmyDate(item.day);
        return (
            <View >
                <View style={{margin:5,backgroundColor:'white',padding:5}}>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>{item.user_name}</Text>
                       <Text style={styles.item_right}>{state}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>外出时间</Text>
                       <Text style={styles.item_right}>{item.out_time}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>外出地点</Text>
                       <Text style={styles.item_right}>{item.address}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>预计返回时间</Text>
                       <Text style={styles.item_right}>{backTime}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>更新时间</Text>
                       <Text style={styles.item_right}>{item.updatedAt}</Text>
                   </View>
                   <View style={{height:2,backgroundColor:'gray'}}></View>
                   <Text onPress={()=>{that.click(item)}} style={{height:60,fontSize:20,textAlignVertical:'center',textAlign:'center'}}>详情</Text>
                </View>
            </View>
        );
    }

    getmyDate(plus) {
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth()+1).toString();
        var day = (date.getDate()+parseInt(plus)) - 1;
        console.log(day);
        return year+'-'+month+'-'+day;
     }

    click(item){
       console.log("item==============");
       console.log(item);
    //    DeviceEventEmitter.emit(Config.USER_FRAGMENT_COMMUNITY_CHANGE,'ApplyForJoinCommunityNumberinfor');
       this.navigation.navigate('出入详情',{value:item});
    }

    requestApply(){
        //出入申请
        this.navigation.navigate('出入申请');
    }

    render(){  
       return (
           <View>
               <Text
               onPress={()=>{this.requestApply()}}
               style={{height:100,backgroundColor:'skyblue',fontSize:20,textAlignVertical:'center',color:'white',textAlign:'center'}}>申请入口</Text>
               <FlatList
                data={this.state.data}
                ItemSeparatorComponent={ItemDivideComponent}
                renderItem={OutAndInManager.renderMovie}
                keyExtractor={(item, index) => item.objectId}
               />
           </View>
       )
    }
    
}

class ItemDivideComponent extends React.Component {
    render() {
        return (
            <View style={{height: 0, backgroundColor: 'gray'}}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#F5FCFF",
        padding: 5
    },
    item_container:{
       flex:1,
       flexDirection:'row',
       marginVertical:5
    },
    item_left:{
        flex:1,fontSize:18,
        color:'gray'
    },
    item_right:{
        fontSize:18,
        color:'gray'
    }
});
