import React from 'react';
import {ActivityIndicator, FlatList, Alert,Image, StyleSheet, Text, View,TouchableHighlight,DeviceEventEmitter} from "react-native";
import Config from '../../Config'
var that;
export default class CleanDealList extends React.Component {
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
    }

    fetchData(){
            const url = 'https://api2.bmob.cn/1/classes/Service?where='+JSON.stringify({
                  community_id:Config.apply_for_id,
                  tag:'保洁服务',
                  state:'wait_deal'
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
                console.log("获取的数据为："+responseData);
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


    userInfo(item){
      this.navigation.navigate('用户信息',{
          id:item.create_user_id
      });
    }

    static renderMovie({item}) {
        // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档    
        return (
            <View >
                <View style={{margin:5,backgroundColor:'white',padding:5}}>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>订单号</Text>
                       <Text style={styles.item_right}>{item.objectId}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>{item.create_user_name}</Text>
                       <TouchableHighlight activeOpacity={0.6}
                                 underlayColor="white" onPress={()=>that.userInfo()}>
                       <Text style={{fontSize:18,color:'skyblue'}}>详情</Text>
                       </TouchableHighlight>   
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>发布时间</Text>
                       <Text style={styles.item_right}>{item.createdAt}</Text>
                   </View>
                   <View style={{height:2,backgroundColor:'gray'}}></View>
                   <Text onPress={()=>{that.click(item)}} style={{height:60,fontSize:20,textAlignVertical:'center',textAlign:'center'}}>接受</Text>
                </View>
            </View>
        );
    }


    click(item){
       console.log("item==============");
       console.log(item);
              
    }

    requestApply(){
        Alert.alert(
            '确定申请',
            '请问您是否要在'+Config.user.address+'申请保洁服务',
            [

                {
                    text: '取消', onPress: () => {
                    }
                  },
              {
                text: '确定', onPress: () => {
                  that.appalyClean();
                }
              }
            ],
            {cancelable: false}
          )
    }


    appalyClean(){
           
           const url = 'https://api2.bmob.cn/1/classes/Service'
            var fetchOptions = {
                method: 'POST',
                headers: {
                'X-Bmob-Application-Id': Config.BMOB_APP_ID,
                'X-Bmob-REST-API-Key': Config.REST_API_ID,
                'Content-Type': 'application/json'
                },
                body:JSON.stringify(p)
            };
            fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseData) => {
                console.log('responseData'+responseData);
                const pp = JSON.parse(responseData)
                const p = {
                    create_user_id:Config.LOGIN_USER_ID,
                    create_user_name:Config.user.realName,
                    community_id:Config.apply_for_id,
                    clean_location:Config.user.address,
                    tag:'保洁服务',
                    state:'wait_deal',
                    objectId:pp.objectId
                 }
                that.state.data[that.state.data.length] = p;
                this.setState({
                    data:that.state.data
                })
            }).done(); 
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
                renderItem={CleanDealList.renderMovie}
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
