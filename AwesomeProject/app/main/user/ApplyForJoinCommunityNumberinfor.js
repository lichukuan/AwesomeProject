import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import { SceneView } from 'react-navigation';
import Config from "../Config";
var that;
class ApplyForJoinCommunityNumberinfor extends React.Component{

  constructor(props){
    super(props);
    console.log('ApplyForJoinCommunityNumberinfor');
    console.log(props.route.params);
    const value = props.route.params.value;
    this.state = {
      real_name:"",
      mobilePhoneNumber:"",
      communityName:"",
      communityId:"",
      user_objectId:"",
      real_pic_url:"",
      id_pic_url:"",
      address:""
    }
    this.navigation = props.navigation;
    that = this;
    this.fetchData(value);
  }

  fetchData(value){
      const url = 'https://api2.bmob.cn/1/users/'+value.user_id;
      var fetchOptions = {
          method: 'GET',
          headers: {
          'X-Bmob-Application-Id': Config.BMOB_APP_ID,
          'X-Bmob-REST-API-Key': Config.REST_API_ID,
          'Content-Type': 'application/json',
          'X-Bmob-Session-Token':Config.SESSION_TOKEN
          }
      };
      fetch(url, fetchOptions)
      .then((response) => response.text())
      .then((responseData) => {
        console.log('responseData');
        console.log(responseData);
        const p = JSON.parse(responseData)
        this.setState({
          real_name:p.real_name,
          mobilePhoneNumber:p.mobilePhoneNumber,
          communityName:value.community_name,
          communityId:value.community_id,
          user_objectId:p.objectId,
          real_pic_url:p.real_picture_url,
          id_pic_url:p.id_card_picture_url,
          address:p.address
        })
      }); 
  }

   render(){
       return (
         <View style={styles.rightContainer}>
           <View style={styles.container}>
             <Text style={styles.title}>真实姓名：{this.state.real_name}</Text>
             <Text style={styles.title}>电话号码：{this.state.mobilePhoneNumber}</Text>
             <Text style={styles.title}>社区地址：{this.state.address}</Text>
             <Text style={styles.title}>真人照片</Text>
             <Image
                    // source={require('../../images/icon.jpg')}
                    source={{uri:this.state.real_pic_url}}
                    style={styles.thumbnail}/>
              <Text style={styles.ti}>身份证正面照</Text>      
              <Image
                    // source={require('../../images/icon.jpg')}
                    source={{uri:this.state.id_pic_url}}
                    style={styles.thumbnail}/>
              <View style={{height:10}}></View>
              <Button title='同意加入' onPress={()=>{this.agreeJoin()} }></Button>
              <View style={{height:10}}></View>
              <Button title='拒绝加入' onPress={()=>{this.refuseJoin()}}></Button> 
                          
           </View>
         </View>
       )
   }

   agreeJoin(){
     console.log('同意加入');
     this.upload('agree')
   }
   
   upload(res){
    console.log(Config.SESSION_TOKEN);
    const url = 'https://api2.bmob.cn/1/classes/CmmunityMember?where='+JSON.stringify({
                 state:'request',
                 user_id:this.state.user_objectId
           });
     var fetchOptions = {
         method: 'PUT',
         headers: {
         'X-Bmob-Application-Id': Config.BMOB_APP_ID,
         'X-Bmob-REST-API-Key': Config.REST_API_ID,
         'Content-Type': 'application/json',
         'X-Bmob-Session-Token':Config.SESSION_TOKEN
         },
         body:JSON.stringify({
           state:res
         })
     };
     fetch(url, fetchOptions)
     .then((response) => response.text())
     .then((responseData) => {
         console.log(responseData);
         const data = JSON.parse(responseData);
         that.navigation.goBack();    
     }).done();        
   }


   refuseJoin(){
     console.log('拒绝加入');
     this.upload('refuse')
   }
} 


const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#F5FCFF",
  },
  rightContainer: {
      margin:10,
      height:'100%',
  },
  title: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 9,
      justifyContent: 'flex-start',
  },
  ti:{
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 9,
    marginTop:9,
    justifyContent: 'flex-start',
  },year: {
      fontSize: 15,
      marginBottom: 5,
  },
  introduce: {
      flex: 1,
      fontSize: 14,
      color: '#000',
      marginBottom: 5,
  },
  ratingNum: {
      flex: 1,
      fontSize: 20,
      fontWeight: 'bold',
      color: '#ffad24'
  },
  info: {
      fontSize: 16,
      color: '#000',
      marginRight: 3,
      marginBottom: 5,
  },
  thumbnail: {
      height: 200,
      width : '100%',
  },
  list: {
      backgroundColor: "#FFF"
  }
});
export default ApplyForJoinCommunityNumberinfor;