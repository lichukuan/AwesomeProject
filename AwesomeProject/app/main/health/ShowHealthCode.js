import React from 'react';
import QRCode from 'react-native-qrcode-svg';
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
import Config from '../Config';
let that;
let index = 0;
class ShowHealthCode extends React.Component{
   //判断是否长时间未归
   //过去一周时间内出现未归现象 出入异常

   //判断是否出现体温、新冠等症状
   //出现 体温 > 37.3 体温异常
   //出现新冠症状 健康异常

  
  constructor(props){
    super(props);
    this.state = {
      message:'正常',
      error_item:[]//异常的数据
    }
    that = this;
  } 


   componentDidMount(){
     this.fetchData_1();
   }

   fetchData_1(){
    const url = 'https://api2.bmob.cn/1/classes/HealthCard?where='+JSON.stringify({
       user_id:Config.LOGIN_USER_ID,
       community_id:Config.apply_for_id
    })
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
        console.log(responseData);
        const data = JSON.parse(responseData);
        //results
        if(that.check_1(data.results)){
          that.fetchData_2();
        }

    }).done();   
   }

   //type : out_in_type health_type
   //index : 0
   //message : 


   check_1(items){
      const result = [];
      for(let i = 0;i < items.length;i++){
         const item = items[i];
         if(item.error == '是'){
           result[index] = {
              type:'health_type',
              index:i,
              message:'有疫情症状'  
           };
           index++;
         }
         if(parseInt(item.temperature) > 37.3){
           result[index] = {
            type:'health_type',
            index:i,
            message:'有疫情症状'  
           };
           index++;
         }
      }
      if(index > 0){
        this.setState({
          message:'异常',
          error_item:result
        })
        return false;
      }else{
        return true
      }
   }

  fetchData_2(){
    const url = 'https://api2.bmob.cn/1/classes/Record?where='+JSON.stringify({
      user_id:Config.LOGIN_USER_ID,
      community_id:Config.apply_for_id,
      request_state:'agree'
   })
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
       console.log(responseData);
       const data = JSON.parse(responseData);
       //results
       if(that.check_2(data.results)){
         
       }

   }).done();   
  }

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

  check_2(items){
    const result = [];
    for(let i = 0;i < items.length;i++){
       const item = items[i];
       if(item.state == 'in_error'){//回来超时
              result[index] = {
                type:'out_in_type',
                index:i,
                message:'回来时间超时'  
            };
            index++;
       }else if(item.state == 'wait_in'){
        const requestOutTime = this.conver(item.out_time) + parseInt(item.day) - 1;
        const nowTime = this.getmyDate();
        if(nowTime <= requestOutTime){
           
        }else{
                result[index] = {
                  type:'out_in_type',
                  index:i,
                  message:'回来时间超时'  
              };
              index++;
        }
       }
    }
    if(index > 0){
      this.setState({
        message:'异常',
        error_item:result
      })
      return false;
    }else{
      return true
    }
  }

   render(){
       const message = this.state.message;
       const color = message == '异常'?'red':'green'
       return (
         <ScrollView>
           <View  style={{marginLeft:20,marginRight:20,marginTop:20,
    textAlignVertical: 'center',
    alignItems: 'center',
        justifyContent: 'center'}}>

            <QRCode color={color} value={message} size={380} />
           </View>
           <View style={{margin:10,marginTop:10}}>
            <View style={style.item_container}>
                    <Text style={style.item_left}>健康情况</Text>
                    <Text style={{fontSize:18,color:'black'}} >{message}</Text>
            </View> 
           </View> 
         </ScrollView>   
       )
   }
} 

const style = StyleSheet.create({
   item_left:{
       flex:1,fontSize:18,
       color:'gray'
   },
   item_container:{
    flex:1,
    flexDirection:'row',
    marginVertical:5
 },
   item_right:{
       fontSize:18,
       color:'gray'
   },
   item:{
      height:50,
      borderColor:'white',
      borderWidth:2,
      marginTop:10,
      backgroundColor:'skyblue'
  }

});

export default ShowHealthCode;