//健康打卡
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
class HealthCard extends React.Component{

  constructor(props){
     super(props);
     this.state = {
        name:'',
        location:'',
        error:'否',
        temperature:'37',
     }
     this.navigation = props.navigation;
     that = this;
  }

   render(){
       const error = this.state.error;
       const name = this.state.name;
       const location  = this.state.location;
       const temperature = this.state.temperature;
       return (
           <ScrollView style={style.parent}> 
             <TextInput onChangeText={(text) => {this.setName(text)}} style={style.name} placeholder="请输入真实姓名" value={name}></TextInput>
             <TextInput onChangeText={(text) => {this.setOutAdress(text)}} style={style.name} placeholder="请输入当前位置" value={location}></TextInput>
             <View style={{flexDirection:'row'}}>
             <Text  style={{marginRight:10,fontSize:20,textAlignVertical:'center',marginTop:10}}>当前体温</Text>  
             <TextInput onChangeText={(text) => {this.setTemperature(text)}} style={style.name} placeholder="请输入体温" value={temperature}></TextInput>
             <Text style={{ height:50,fontSize:20,textAlignVertical:'center',marginStart:10,marginTop:10}}>度</Text>
             </View>            
              <TouchableHighlight  onPress={()=>{this.pickType()}}>
                <View style={{flexDirection:'row',height:50,alignContent:'center',alignItems:'center'}}>
                <Text style={{flex:1,fontSize:20,color:'gray'}}>是否有新冠疫情相关的症状</Text>
                <Text style={{fontSize:20}}>{error}</Text>
                </View>
             </TouchableHighlight>
            <View style={{height:10}}></View>
            <Button onPress={()=>{this.check()}} style={style.button}  title="打卡"></Button>
           </ScrollView>
        )
   }


  check(){
       const error = this.state.error;
       const name = this.state.name;
       const location  = this.state.location;
       const temperature = this.state.temperature;
    if(location == '' || name == ''){
        Alert.alert(
          '请完善信息',
          '',
          [
            {
              text: '确定', onPress: () => {
                
              }
            }
          ],
          {cancelable: false}
        )
    }else{
        const url = 'https://api2.bmob.cn/1/classes/HealthCard'
            var fetchOptions = {
                method: 'POST',
                headers: {
                'X-Bmob-Application-Id': Config.BMOB_APP_ID,
                'X-Bmob-REST-API-Key': Config.REST_API_ID,
                'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    user_id:Config.LOGIN_USER_ID,
                    user_name:name,
                    error:error,
                    community_id:Config.apply_for_id,
                    temperature:temperature,
                    location:location
                 })
            };
            fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseData) => {
                console.log(responseData);
                that.navigation.goBack();
            }).done();   
    }
  }

   setTemperature(data){
     this.setState({
      temperature:data
     })
   }

   componentWillUnmount(){
       Picker.hide();
   }

   //short 今日离返
   //long 长时间离开
   pickType(){
    console.log('开始选择');
    Picker.init({
        pickerData: ["是","否"],
        selectedValue:["否"],
        pickerConfirmBtnText:'确定',
        pickerCancelBtnText:'取消',
        pickerTitleText:'',
        onPickerConfirm: data => {
            console.log(data);
            this.setState({
                error:data[0]
            })
        },
        onPickerCancel: data => {
            console.log('取消');
        },
        onPickerSelect: data => {
        }
    });
    Picker.show();
   }

   setOutAdress(data){
      this.setState({location:data})
   }

   setName(data){
     this.setState({name:data})
   }

}



const style = StyleSheet.create({
  parent:{
    margin:10
  },
  button:{
   height:50,
   width:100
  },
  name:{
      height:50,
      borderColor:'skyblue',
      borderWidth:1,
      marginTop:10
  },
  sms:{
      flex:1,
      flexDirection:'row',
      height:50,
      marginTop:10
  },
  sms_code:{
    flex:5,
    borderColor:'skyblue',
    borderWidth:1,
    marginRight:10
  },
  send:{
    flex:2,
    height:30,
    fontSize:20,
  }
});


export default HealthCard;