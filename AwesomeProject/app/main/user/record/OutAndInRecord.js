import React from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View,TouchableHighlight,DeviceEventEmitter} from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Config from '../../Config'
import AsyncStorage from '@react-native-community/async-storage';
var that;
export default class OutAndInRecord extends React.Component {
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
                  community_id:Config.apply_for_id,
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
                if(data.results.length > 0){
                    this.setState({
                        data: data.results,
                        loaded: true
                    });
                }
            }).done();        
    }


    //20210420
   conver(a){
    // 如果想要替换所有指定的字符串，可以用while循环
    var strArray = a.split('-')
    let year = parseInt(strArray[0])*10000;
    let month = parseInt(strArray[1])*100;
    let day = parseInt(strArray[2]);
    return year+month+day;
  }

  getDate(plus) {
       var date = new Date();
       var year = date.getFullYear()*10000;
       var month = (date.getMonth()+1)*100;
       var day = (date.getDate()+parseInt(plus)) - 1;
       console.log(day);
       return year+month+day;
    }

    getmyDate() {
        return this.getDate(1);  
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
        console.log("==data===");
        console.log(item);
        const p = item;
        const type = item.type;
        return (
            <View >
                <View style={{margin:5,backgroundColor:'white',padding:5}}>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>{p.user_name}</Text>
                       {/* <Text style={{fontSize:18,color:'skyblue'}}>详情</Text> */}
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>外出类型</Text>
                       <Text style={styles.item_right}>{type=='long'?'长时间离返':'今日离返'}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>外出地址</Text>
                       <Text style={styles.item_right}>{p.address}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>外出原因</Text>
                       <Text style={styles.item_right}>{p.reason}</Text>
                   </View>
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

    clickAgree(item){
       console.log("item==============");
       console.log(item);
       this.updateData(item,'agree')
       const i = this.getIndex(item);
       console.log('i = '+i);
       let data = this.state.data;
       const res = data.splice(i,1);
       console.log('res = ' + data.length);
       this.setState({
           data:data
       })
    //    DeviceEventEmitter.emit(Config.USER_FRAGMENT_COMMUNITY_CHANGE,'ApplyForJoinCommunityNumberinfor');
       //this.navigation.goBack();
    }

    clickRefuse(item){
        console.log("item==============");
        console.log(item);
        this.updateData(item,'refuse')
        const i = this.getIndex(item);
       console.log('i = '+i);
       let data = this.state.data;
       const res = data.splice(i,1);
       console.log('res = ' + data.length);
       this.setState({
           data:data
       })
     //    DeviceEventEmitter.emit(Config.USER_FRAGMENT_COMMUNITY_CHANGE,'ApplyForJoinCommunityNumberinfor');
        //this.navigation.goBack();
     }

     getIndex(item){
         const data = this.state.data;
         for(var i = 0;i < data.length;i++){
             if(data[i].objectId == item.objectId){
                 return i;
             }
         }
     }

     updateData(item,data){  
        const url = 'https://api2.bmob.cn/1/classes/Record/'+item.objectId
        var fetchOptions = {
            method: 'PUT',
            headers: {
            'X-Bmob-Application-Id': Config.BMOB_APP_ID,
            'X-Bmob-REST-API-Key': Config.REST_API_ID,
            'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                request_state:data,//出入状态,wait_out wait_in
             })
        };
        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseData) => {
            console.log(responseData);
            //that.navigation.goBack();
        }).done();   
       }

    render(){  
       return (
           <View>
              <FlatList
                data={this.state.data}
                ItemSeparatorComponent={ItemDivideComponent}
                renderItem={OutAndInRecord.renderMovie}
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
