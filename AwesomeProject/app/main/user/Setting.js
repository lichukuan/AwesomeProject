import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  Button,
  StatusBar,
} from 'react-native';
class Setting extends React.Component{
   render(){
       return (
           <View>
             <Button title='检查更新' onPress={()=>{this.update()}}></Button>
             <Button title='反馈' onPress={()=>{this.feedback()}}></Button>
             <Button title='退出登录' onPress={()=>{this.logout()}}></Button>
           </View>
       )
   }

   update(){
     console.log('检查更新');
   }

   feedback(){
     console.log('反馈');
   }

   logout(){
     console.log('退出登录');
   }
} 

export default Setting;