import React from 'react';
import {ActivityIndicator, FlatList, Alert,Image, StyleSheet,Dimensions, Text, View,TouchableHighlight,DeviceEventEmitter} from "react-native";
import Config from '../../../Config'
var that;
export default class LostManager extends React.Component {
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

        this.listener = DeviceEventEmitter.addListener(Config.UPDATE_LOST_INFO,(e)=>{
            this.fetchData();
        });
        
    }

    componentWillUnmount(){
        this.listener.remove();
    }

    fetchData(){
            const url = 'https://api2.bmob.cn/1/classes/Service?where='+JSON.stringify({
                  community_id:Config.apply_for_id,
                  tag:'失物招领'
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

    static renderMovie({item}) {
        // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
        let state = '';
        let func = '';
        let worker = item.create_user_name
        let time = item.updatedAt;
        switch(item.state){
           case 'wait_deal':
            state = '待处理';
            func = '结束'
            worker = '待定',
            time = '待定'
            break;
           case 'end':
               state = '用户结束';
               break;
            case 'dealing':
                state = '处理中';
                break;
            case 'over':
                state = '完成';
                break;        
        }
        
        return (
            <View>
                <View style={{margin:5,backgroundColor:'white',padding:5,borderRadius:10,padding:10}}>
                   <Image source={{uri:item.lost_pic}} style={{height:300}}></Image> 
                   <Text style={styles.item_left}>备注信息</Text>
                   <Text style={{
                       flex:1,fontSize:18,
                       color:'black'
                   }}>{item.lost_message}</Text>
                   {/* <View style={styles.item_container}>
                       <Text style={styles.item_left}>状态</Text>
                       <Text style={styles.item_right}>{state}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>发现人员</Text>
                       <Text style={styles.item_right}>{worker}</Text>
                   </View> */}

                   {/* {
                       func == ''?null:(<View style={{height:2,backgroundColor:'gray'}}></View>)

                   } */}
                   {/* <Text onPress={()=>{that.click(item)}} style={{height:60,fontSize:20,textAlignVertical:'center',textAlign:'center'}}>{func}</Text> */}
                </View>
            </View>
        );
    }


    click(item){
       console.log("item==============");
       console.log(item);
    //    DeviceEventEmitter.emit(Config.USER_FRAGMENT_COMMUNITY_CHANGE,'ApplyForJoinCommunityNumberinfor');
    //    this.navigation.navigate('出入详情',{value:item});
       if(item.state == 'wait_deal'){//结束
            this.endClean(item);
       }
    }



    endClean(item){
        const url = 'https://api2.bmob.cn/1/classes/Service/'+item.objectId;
        var fetchOptions = {
            method: 'PUT',
            headers: {
            'X-Bmob-Application-Id': Config.BMOB_APP_ID,
            'X-Bmob-REST-API-Key': Config.REST_API_ID,
            'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                state:'end',
            })
        };
        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseData) => {
            console.log('responseData'+responseData);
            const data = that.state.data;
            for(let i = 0;i < data.length;i++){
                if(data[i].objectId == item.objectId){
                    data[i].state = 'end';
                    break;
                }
            }
            that.setState({
                data:data
            })
        }).done(); 
    }

    appalyClean(){
        const p = {
            create_user_id:Config.LOGIN_USER_ID,
            create_user_name:Config.user.realName,
            community_id:Config.apply_for_id,
            clean_location:Config.user.address,
            tag:'失物招领',
            state:'wait_deal',
         }
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
                <View style={{flexDirection:'row',backgroundColor:'white',height:60,alignItems:'center'}}>
                         <TouchableHighlight activeOpacity={0.6}
                                 underlayColor="white" onPress={()=>this.back()}>
                         <Image source={require('../../../../images/返回.png')} style={{height:20,width:20,marginLeft:10}} ></Image>
                         </TouchableHighlight>
                         <Text style={{flex:1,fontSize:20,fontWeight:'bold',alignSelf:'center',textAlign:'center'}}>失物招领</Text>
                         <TouchableHighlight activeOpacity={0.6}
                                 underlayColor="white" onPress={()=>{
                                 this.navigation.navigate('添加失物');
                         }}>
                             <Text style={{fontSize:20,color:'skyblue',paddingRight:10}}>添加</Text>
                         </TouchableHighlight> 
                </View>
               <FlatList
                data={this.state.data}
                ItemSeparatorComponent={ItemDivideComponent}
                renderItem={LostManager.renderMovie}
                keyExtractor={(item, index) => item.objectId}
               />
                {/* <ActionButton 
                        onPress={()=>requestApply()} 
                        buttonColor="rgba(231,76,60,1)" offsetY={Dimensions.get('window').height*0.8}>
               </ActionButton> */}
           </View>
       )
    }

    back(){
        this.navigation.goBack();
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
