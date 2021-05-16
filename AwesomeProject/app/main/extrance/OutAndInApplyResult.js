import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  StatusBar,
  TouchableHighlight,
  Image,
  Text,
  Alert
} from 'react-native';
import Picker from 'react-native-picker';
import Config from '../Config';
var that = null;
class OutAndInApplyResult extends React.Component{

  constructor(props){
     super(props);
     console.log(props);
     this.state = {
        item:props.route.params.item,
        type:props.route.params.type,
        res:props.route.params.res
     }
     this.navigation = props.navigation;
     that = this;
  }

   render(){
       const item = this.state.item;
       const type = this.state.type;
       console.log('item = '+item);
       const res = this.state.res;
       let applyRes = '';
       const nowTime = this.getmyDate();
       //出去超时
       if(type == 'out'){
           const requestOutTime = this.conver(item.out_time) + parseInt(item.day) - 1;
           if(nowTime <= requestOutTime){
              applyRes = '允许离开'
              this.updateData();
           }else{
              applyRes = '时间超时'
              updateErrorData();
           }
       }
       //返回时间超时
       if(type == 'in'){
        const requestOutTime = this.conver(item.out_time) + parseInt(item.day) - 1;
        if(nowTime <= requestOutTime){
           applyRes = '允许进入'
           this.updateData();
        }else{
           applyRes = '时间超时'
           updateErrorData();
        }
       }
       return (
           <ScrollView style={styles.parent}> 
             <Text style={{height:300,margin:10,textAlignVertical:'center',fontSize:80,backgroundColor:'yellow',textAlign:'center',color:'gray'}}>{applyRes}</Text>
             <View style={{margin:5,backgroundColor:'white',padding:5}}>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>姓名</Text>
                       <Text style={{ fontSize:18}}>{item.user_name}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>地址</Text>
                       <Text style={{ fontSize:18}}>{item.address}</Text>
                   </View>

             </View>           
           </ScrollView>
        )
   }


   updateData(){
    //objectId
    const item = this.state.item;
    const type = this.state.type;
    let state = '';
    if(type === 'out'){
       state = 'wait_in'
    }else{
        state = 'end'
    }   
    const url = 'https://api2.bmob.cn/1/classes/Record'+item.objectId
    var fetchOptions = {
        method: 'PUT',
        headers: {
        'X-Bmob-Application-Id': Config.BMOB_APP_ID,
        'X-Bmob-REST-API-Key': Config.REST_API_ID,
        'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            state:state,//出入状态,wait_out wait_in  out_error 出去超时 in_error 回来超时
         })
    };
    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseData) => {
        console.log(responseData);
        //that.navigation.goBack();
    }).done();   
   }

   updateErrorData(){
    //objectId
    const item = this.state.item;
    const type = this.state.type;
    let state = '';
    if(type === 'out'){
       state = 'out_error'
    }else{
        state = 'in_error'
    }   
    const url = 'https://api2.bmob.cn/1/classes/Record'+item.objectId
    var fetchOptions = {
        method: 'PUT',
        headers: {
        'X-Bmob-Application-Id': Config.BMOB_APP_ID,
        'X-Bmob-REST-API-Key': Config.REST_API_ID,
        'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            state:state,//出入状态,wait_out wait_in  out_error 出去超时 in_error 回来超时
         })
    };
    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseData) => {
        console.log(responseData);
        that.navigation.goBack();
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

   componentWillUnmount(){
       Picker.hide();
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



export default OutAndInApplyResult;