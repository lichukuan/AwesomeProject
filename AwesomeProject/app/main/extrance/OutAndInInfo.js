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
const default_type = '请选择'
let isOut = false;
let isIn = false;
class OutAndInInfo extends React.Component{

  constructor(props){
     super(props);
     this.state = {
        item:props.route.params.value
     }
     this.navigation = props.navigation;
     that = this;
  }

   render(){
       const item = this.state.item;
       console.log(item);
       const backTime = that.getmyDate(item.day);
       let request_state = '';
       switch(item.request_state){
           case 'agree':
            request_state = '同意';
            break;
           case 'wait':
            request_state = '等待管理员同意';
            break;  
           case 'refuse':
            request_state = '拒绝';
            break;   
       }
       let inColor = 'gray';
       let inRes = '待离开'
       let outColor = 'gray';
       let outRes = '待离开'
       if(item.request_state == 'agree'){
           if(item.state == 'wait_out'){
              isOut = false;
              isIn = false;
              outColor = 'skyblue'
              
           }
           if(item.state == 'wait_in'){
              isOut = true;
              isIn = false;
              inColor = 'skyblue'
              outRes = '已离开'
              inRes = '待回来'
           }
           if(item.state == 'end'){
               isIn = true;
               isOut = true;
               outRes = '已离开'
               inRes = '已回来'
           }
       }
       return (
           <ScrollView style={styles.parent}> 
             <Text style={{height:50,textAlignVertical:'center',fontSize:20}}>申请流程</Text>
             <View style={{margin:5,backgroundColor:'white',padding:5}}>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>申请状态</Text>
                       <Text style={{ fontSize:18,color:'red'}}>{request_state}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>等待离开</Text>
                       <Text style={{ fontSize:18,color:outColor}} onPress={()=>{this.scan()}}>{outRes}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>等待返回</Text>
                       <Text style={{ fontSize:18,color:inColor}} onPress={()=>{this.scan()}}>{inRes}</Text>
                   </View>
             </View>      
             <Text style={{height:50,textAlignVertical:'center',fontSize:20}}>申请详情</Text>
             <View style={{margin:5,backgroundColor:'white',padding:5}}>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>姓名</Text>
                       <Text style={styles.item_right}>{item.user_name}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>外出地点</Text>
                       <Text style={styles.item_right}>{item.address}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>外出原因</Text>
                       <Text style={styles.item_right}>{item.reason}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>外出时间</Text>
                       <Text style={styles.item_right}>{item.out_time}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>预计返回时间</Text>
                       <Text style={styles.item_right}>{backTime}</Text>
                   </View>
                   <View style={styles.item_container}>
                       <Text style={styles.item_left}>更新时间</Text>
                       <Text style={styles.item_right}>{item.updatedAt}</Text>
                   </View>
             </View>      
           </ScrollView>
        )
   }

   scan(){
      console.log('开始扫码');
      const item = this.state.item;
      if(item.request_state == 'agree' && isOut == false){//离开扫码
          this.navigation.navigate('扫描二维码',{
              type:'out'
              ,value:item})
      }else if(item.request_state == 'agree' && isIn == false){//返回扫码
        this.navigation.navigate('扫描二维码',{
            type:'in'
            ,value:item})
      }
   }

   getmyDate(plus) {
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth()+1).toString();
        var day = (date.getDate()+parseInt(plus)) - 1;
        console.log(day);
        return year+'-'+month+'-'+day;
     }

  check(){
    const type = this.state.type;
    const name = this.state.name;
    const address = this.state.address;
    const out_address = this.state.out_address;
    const day = this.state.day;
    const reason = this.state.reason;
    const other = this.state.other;
    if(type == default_type || name == ''  || out_address == '' || reason == ''){
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
                    user_name:name,
                    type:_type,
                    out_time:that.getmyDate()
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



export default OutAndInInfo;