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
import Config from "../../Config";
class ApplyForJoinCommunityNumberinfor extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      real_name:'123',
      mobilePhoneNumber:'15207067001',
      communityName:'重庆邮电',
      communityId:'7f2a5c2d-c970-4ff4-a9a1-d80bd4dda15a',
      user_objectId:'8e9c025932'
    }
    Config.LOGIN_USER_NAME = '123'
        Config.LOGIN_USER_ID = '8e9c025932'
        Config.SESSION_TOKEN = '8c39a6eb40c0ec0480047a714acc8bfd';
  }

   render(){
       return (
         <View style={styles.rightContainer}>
           <View style={styles.container}>
             <Text style={styles.title}>真实姓名：{this.state.real_name}</Text>
             <Text style={styles.title}>电话号码：{this.state.mobilePhoneNumber}</Text>
             <Text style={styles.title}>图片</Text>
             <Image
                    source={require('../../images/icon.jpg')}
                    style={styles.thumbnail}/>
              <Text style={styles.ti}>身份证正面照</Text>      
              <Image
                    source={require('../../images/icon.jpg')}
                    style={styles.thumbnail}/>
              <Button title='同意加入' onPress={()=>{this.agreeJoin()}}></Button>
              <Button title='拒绝加入' onPress={()=>{this.refuseJoin()}}></Button>             
           </View>
         </View>
           
       )
   }

   agreeJoin(){
     console.log('同意加入');
      const url = 'https://api2.bmob.cn/1/classes/_User/'+this.state.user_objectId
      var fetchOptions = {
          method: 'PUT',
          headers: {
          'X-Bmob-Application-Id': Config.BMOB_APP_ID,
          'X-Bmob-REST-API-Key': Config.REST_API_ID,
          'Content-Type': 'application/json',
          'X-Bmob-Session-Token':Config.SESSION_TOKEN
          },
          body:JSON.stringify({
            join_community_name:this.state.communityName,
            joined_community_id:this.state.communityId,
            apply_for_id:null,
            apply_for_name:null
          })
      };
      fetch(url, fetchOptions)
      .then((response) => response.text())
      .then((responseData) => {
          console.log(responseData);
          const data = JSON.parse(responseData);
          //this.navigation.goBack();    
      }).done();        
   }

   refuseJoin(){
     console.log('拒绝加入');
    const url = 'https://api2.bmob.cn/1/classes/_User/'+this.state.user_objectId
    var fetchOptions = {
        method: 'PUT',
        headers: {
        'X-Bmob-Application-Id': Config.BMOB_APP_ID,
        'X-Bmob-REST-API-Key': Config.REST_API_ID,
        'Content-Type': 'application/json',
        'X-Bmob-Session-Token':Config.SESSION_TOKEN
        },
        body:JSON.stringify({
          apply_for_id:null,
          apply_for_name:null
        })
    };
    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseData) => {
        console.log(responseData);
        const data = JSON.parse(responseData);
        //this.navigation.goBack();    
    }).done();      
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
      height:'80%',
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