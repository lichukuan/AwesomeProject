import React from 'react';
import {ActivityIndicator, FlatList, Alert,Image, StyleSheet,Dimensions, Text, View,TouchableHighlight,DeviceEventEmitter, TextInput} from "react-native";
import Config from '../../../Config'
import ActionButton from 'react-native-action-button';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';
var that;
export default class FixManager extends React.Component {
    constructor(props){
      super(props);
      this.navigation = props.navigation;
      this.state = {
          data:[],
          customBackgroundDialog: false,
          defaultAnimationDialog: false,
          scaleAnimationDialog: false,
          slideAnimationDialog: false,
      }
      that = this;
    }

    componentDidMount(){
        this.fetchData();

        // this.change_community_listener = DeviceEventEmitter.addListener(Config.USER_FRAGMENT_COMMUNITY_CHANGE,(e)=>{
        //     that.navigation.navigate('user',{itemId:3,key:e})
        // });
    }

    componentWillUnmount(){
        //this.change_community_listener.remove();
    }

    fetchData(){
            const url = 'https://api2.bmob.cn/1/classes/Service?where='+JSON.stringify({
                  create_user_id:Config.LOGIN_USER_ID,
                  community_id:Config.apply_for_id,
                  tag:'家电维修'
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
        let func = '详情';
        let worker = item.deal_name
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
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>订单号</Text>
                       <Text style={styles.item_right}>{item.objectId}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>状态</Text>
                       <Text style={styles.item_right}>{state}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>问题描述</Text>
                       <Text style={styles.item_right}>{item.fix_content}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>工作人员</Text>
                       <Text style={styles.item_right}>{worker}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>完成时间</Text>
                       <Text style={styles.item_right}>{time}</Text>
                   </View>
                   <View style={{height:2,backgroundColor:'gray'}}></View>
                   <Text onPress={()=>{that.click(item)}} style={{height:60,fontSize:20,textAlignVertical:'center',textAlign:'center'}}>{func}</Text>
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

       }else{//详情

       }
    }

    


    appalyClean(){
        const p = {
            create_user_id:Config.LOGIN_USER_ID,
            create_user_name:Config.user.realName,
            community_id:Config.apply_for_id,
            clean_location:Config.user.address,
            tag:'家电维修',
            state:'wait_deal',
            fix_content:this.state.intro
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
                    tag:'家电维修',
                    state:'wait_deal',
                    objectId:pp.objectId,
                    fix_content:this.state.intro
                 }
                that.state.data[that.state.data.length] = p;
                this.setState({
                    data:that.state.data
                })
            }).done(); 
    }

    requestApply(){
        this.setState({
            defaultAnimationDialog: true,
          });
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
                renderItem={FixManager.renderMovie}
                keyExtractor={(item, index) => item.objectId}
               />
                <Dialog
          onDismiss={() => {
            this.setState({ defaultAnimationDialog: false });
          }}
          width={0.9}
          visible={this.state.defaultAnimationDialog}
          rounded
          actionsBordered
          // actionContainerStyle={{
          //   height: 100,
          //   flexDirection: 'column',
          // }}
          dialogTitle={
            <DialogTitle
              title="家电维修"
              style={{
                backgroundColor: '#F7F7F8',
                alignItems:'center',
                fontSize:30
              }}
              hasTitleBar={false}
              align="left"
            />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="取消"
                bordered
                onPress={() => {
                  this.setState({ defaultAnimationDialog: false });
                }}
                key="button-1"
              />  
              <DialogButton
                text="确定"
                bordered
                onPress={() => {
                  this.appalyClean();
                  this.setState({ defaultAnimationDialog: false });
                }}
                key="button-1"
              />
            </DialogFooter>
          }
        >
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8',
            }}
          >
             <TextInput
                style={[ {width: "100%", height: 100, textAlignVertical: 'top'}]}
                placeholder={"请输入具体的故障原因..."}
                placeholderTextColor={"#5d5d7e"}
                value={this.state.intro}
                maxLength={200}
                multiline = {true}
                onChangeText={(intro) => this.setState({intro})}
            />
          </DialogContent>
        </Dialog>
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
