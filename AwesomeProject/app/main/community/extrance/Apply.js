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
  Alert,
  DeviceEventEmitter
} from 'react-native';
import Picker from 'react-native-picker';
import Config from '../../Config';
var that = null;
const default_type = '请选择'

class Apply extends React.Component{

  constructor(props){
     super(props);
     this.state = {
        name:'',
        address:'',
        out_address:'',
        type:default_type,
        day:'1',
        reason:'',
        other:''
     }
     this.navigation = props.navigation;
     that = this;
  }

   render(){
       const type = this.state.type;
       const name = this.state.name;
       const address = this.state.address;
       const out_address = this.state.out_address;
       const day = this.state.day;
       const reason = this.state.reason;
       const other = this.state.other;
       return (
           <ScrollView style={{}}> 
             <View style={{backgroundColor:'white'}}>
                  <View style={{flexDirection:'row',alignItems:'center',height:60,padding:10}}>
                     <Text style={{fontSize:20,height:40,width:100,textAlignVertical:'center'}}>外出地址</Text>
                     <TextInput onChangeText={(text) => {this.setOutAdress(text)}} style={{flex:1,height:50,fontSize:18}} placeholder="请输入外出地址"></TextInput>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center',height:60,padding:10}}>
                     <Text style={{fontSize:20,height:40,width:100,textAlignVertical:'center'}}>外出原因</Text>
                     <TextInput onChangeText={(text) => {this.setOutReason(text)}} style={{flex:1,height:50,fontSize:18}} placeholder="请输入外出原因"></TextInput>
                  </View>
                  <TouchableHighlight  
                  activeOpacity={0.6}
                  underlayColor="white"
                  onPress={()=>{this.pickType()}} style={{marginHorizontal:10}}>
                      <View style={{flexDirection:'row',height:50,alignContent:'center',alignItems:'center'}}>
                            <Text style={{flex:1,fontSize:20,color:'gray'}}>请假类型</Text>
                            <Text style={{fontSize:20}}>{type}</Text>
                      </View>
                  </TouchableHighlight>
                  {
                    type == '长时间离开'?(
                      <TextInput onChangeText={(text)=>{this.setDay(text)}} style={{height:60,fontSize:18,marginHorizontal:10}} placeholder="请输入请假时间"></TextInput>
                    ):null
                  }
                  <TextInput maxLength={2}
                            multiline = {true} onChangeText={(text) => {this.setOther(text)}} style={{height:120,fontSize:18,marginHorizontal:10,textAlignVertical: 'top'}} placeholder="请输入备注" value={other}></TextInput>
             </View>
             <Text style={{color:'white',backgroundColor:'blue',height:50,borderRadius:25,marginHorizontal:20,textAlignVertical:'center',textAlign:'center',fontSize:25,marginTop:20}} onPress={()=>{this.check()}}>申请</Text>

           </ScrollView>
        )
   }

   getmyDate() {
    var date = new Date();
    var year = date.getFullYear().toString();
    var month = (date.getMonth()+1).toString();
    var day = date.getDate().toString();
    return year+'-'+month+'-'+day;
 } 

  check(){
    const type = this.state.type;
    // const name = this.state.name;
    const out_address = this.state.out_address;
    const day = this.state.day;
    const reason = this.state.reason;
    const other = this.state.other;
    if(type == default_type || out_address == '' || reason == ''){
        Alert.alert(
          '请完善信息',
          '除了备注之外，其他信息都为必要信息',
          [
            {
              text: '确定', onPress: () => {
                
              }
            }
          ],
          {cancelable: false}
        )
    }else{
        console.log(type);
        const _type = type == '当日离返'?'short':'long'
        console.log(_type);
        const request_state = _type == 'short'?'agree':'wait'
        const url = 'https://api2.bmob.cn/1/classes/Record'
            var fetchOptions = {
                method: 'POST',
                headers: {
                'X-Bmob-Application-Id': Config.BMOB_APP_ID,
                'X-Bmob-REST-API-Key': Config.REST_API_ID,
                'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    request_state:request_state,//申请的状态，如果是short，直接agree，如果是long，则wait状态，等待管理员agree 或者 refuse
                    other:other,
                    address:out_address,
                    state:'wait_out',//出入状态,wait_out wait_in
                    day:day,
                    reason:reason,
                    user_id:Config.LOGIN_USER_ID,
                    user_name:Config.user.realName,
                    type:_type,
                    out_time:that.getmyDate(),
                    community_id:Config.apply_for_id
                 })
            };
            fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseData) => {
                console.log(responseData);
                DeviceEventEmitter.emit(Config.UPDATE_OUT_AND_IN_INFO,true);
                that.navigation.goBack();
            }).done();   
    }
  }

   setDay(data){
     this.setState({
         day:data
     })
   }

   setOutReason(data){
       this.setState({
        reason:data
       })
   }

   setOther(data){
       this.setState({
        other:data
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
        pickerData: ["当日离返","长时间离开"],
        selectedValue:["当日离返"],
        pickerConfirmBtnText:'确定',
        pickerCancelBtnText:'取消',
        pickerTitleText:'请假类型',
        onPickerConfirm: data => {
            console.log(data);
            this.setState({
                type:data
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
      this.setState({out_address:data})
   }

   setAddress(data){
     this.setState({
         address:data
     })
   }
   setCode(data){
      this.setState({code:data})
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
   height:50
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


export default Apply;