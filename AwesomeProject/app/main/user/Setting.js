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
  Alert,
  Linking
} from 'react-native';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import Config from '../Config';
var that;
class Setting extends React.Component{

  constructor(props){
    super(props);
    this.navigation = props.navigation;
    that = this;
    this.state = {
      customBackgroundDialog: false,
      defaultAnimationDialog: false,
      scaleAnimationDialog: false,
      slideAnimationDialog: false,
      phone:''
  }
  }

   render(){
       return (
           <View style={{backgroundColor:'white',marginTop:10,paddingVertical:10}}>
             <Text style={{fontSize:20,color:'black',margin:5}} onPress={()=>{this.updatePassword()}}>修改密码</Text>
             <Text style={{fontSize:20,color:'black',margin:5}} onPress={()=>{this.getAccount()}}>找回账号</Text>
             <Text style={{fontSize:20,color:'black',margin:5}} onPress={()=>{this.getPassword()}}>找回密码</Text>
             <Text style={{fontSize:20,color:'black',margin:5}} onPress={()=>{this.updatePhone()}}>修改手机号</Text>
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
                    title="请输入电话号码"
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
                    {/* <DialogButton
                      text="CANCEL"
                      bordered
                      onPress={() => {
                        this.setState({ defaultAnimationDialog: false });
                      }}
                      key="button-1"
                    />   */}
                    <DialogButton
                      text="确定"
                      bordered
                      onPress={() => {
                        this.setState({ defaultAnimationDialog: false });
                        this.getUser();
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
                <TextInput  onChangeText={(text) => {this.setPhone(text)}} style={{ paddingHorizontal:20,height: 50,fontSize: 17,backgroundColor:'#ffffffbb',color: '#000000',marginTop:10,borderRadius:8}} password = {false} placeholder="请输入电话号码" 
                autoCapitalize='none'  //设置首字母不自动大写
                underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                placeholderTextColor={'gray'}  //设置占位符颜色
                ></TextInput>
                </DialogContent>
              </Dialog>
        </View>
       )
   }

   setPhone(text){
     this.setState({
       phone:text
     })
   }

   getPassword(){
    console.log("找回密码");
    that.navigation.navigate("找回密码");
  }

   getUser(){
    var url = 'https://api2.bmob.cn/1/classes/_User?where='+JSON.stringify({
      mobilePhoneNumber:this.state.phone
      });
      fetch(url,{
          method:'GET',
          headers: {
              'X-Bmob-Application-Id': Config.BMOB_APP_ID,
              'X-Bmob-REST-API-Key': Config.REST_API_ID,
              }
      }).then((response) => response.text())
      .then((responseText) =>{
          const data = JSON.parse(responseText);
          console.log("===xxxxxx====")
          console.log(responseText);
          Alert.alert(
            '找回用户名',
            '您的用户名为：'+data.results[0].username,
            [
              {
                text: '确定', onPress: () => {
                  //that.navigation.navigate('登录')
                }
              }
            ],
            {cancelable: false}
          )
      });   
   }

   updatePassword(){
     if(Config.IS_LOGIN){
      that.navigation.navigate("修改密码");
     }else{
      Alert.alert(
        '是否登录',
        '只有登录了才能使用此功能哦~',
        [
          {
              text:'我再看看',onPress:() => {

              }
          }  
          ,  
          {
            text: '去登录', onPress: () => {
               that.navigation.navigate('登录')
            }
          }
        ],
        {cancelable: false}
      )
     }
      
   }

   getAccount(){
    this.setState({ defaultAnimationDialog: true });
   }  

  

   updatePhone(){
     //that.navigation.navigate("修改手机号");
     Linking.canOpenURL('mqq://975096573').then(supported => {
                        if (!supported) {
                           this.props.setToastMsg('请先安装QQ')
                        } else {
                           return Linking.openURL('mqqwpa://im/chat?chat_type=group&uin=134011502')
                        }
                     })
   }
} 

export default Setting;