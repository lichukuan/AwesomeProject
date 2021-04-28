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
  } 


   componentDidMount(){
      
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
        
    }).done();   
   }

   check_1(){

   }

  fetchData_2(){

  }

  check_2(){

  }

   render(){
       return (
         <ScrollView>
            <QRCode value={'xxxx'} size={300} />
         </ScrollView>
       )
   }
} 

export default ShowHealthCode;