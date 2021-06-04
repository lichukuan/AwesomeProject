import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  StatusBar,
  Image,
  Text,
  TouchableHighlight,
  DeviceEventEmitter,
  ImageBackground,
  Alert
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Config from '../Config';
var that = null;
 
//图片选择器参数设置
var  options = {
   title:  '请选择图片来源' ,
   cancelButtonTitle: '取消' ,
   takePhotoButtonTitle: '拍照' ,
   chooseFromLibraryButtonTitle: '相册图片',
   storageOptions: {
     skipBackup:  true ,
     path:  'images'
   }
};
let user_real_url = '';
let user_id_url = '';
let isSendCode = false;
class CheckUserID extends React.Component{

  constructor(props){
     super(props);
     this.state = {
        name:null,
        phone:0,
        code:0,
        real_image_height:0,
        real_palcehoder_height:200,
        id_image_height:0,
        id_placehoder_height:200,
        real_picture_url:null,
        id_card_picture_url:null,
        second:600,
     }
     this.navigation=props.navigation;   
     that = this;
  }

   render(){
      const real_picture_url = this.state.real_picture_url;
      const id_card_picture_url = this.state.id_card_picture_url;
       return (
           <ScrollView style={{}}>
             <View style={{backgroundColor:'white',height:120}}>
                  <View style={{flexDirection:'row',alignItems:'center',height:60,padding:10}}>
                     <Text style={{fontSize:20,height:40,width:100,textAlignVertical:'center'}}>姓名</Text>
                     <TextInput onChangeText={(text) => {this.setName(text)}} style={{flex:1,height:50,fontSize:18}} placeholder="请输入真实姓名"></TextInput>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center',height:60,padding:10}}>
                     <Text style={{fontSize:20,height:40,width:100,textAlignVertical:'center'}}>社区地址</Text>
                     <TextInput onChangeText={(text) => {this.setAddress(text)}} style={{flex:1,height:50,fontSize:18}} placeholder="请输入社区地址"></TextInput>
                  </View>
             </View>
             <View style={{marginTop:20,backgroundColor:'white'}}>
               <Text style={{fontSize:20,padding:10}}>个人照片</Text>
               <Image source={real_picture_url} style={{marginTop:10,height:this.state.real_image_height,width:'80%',alignSelf:'center'}}></Image>
               <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="white" onPress = {()=>{this.takeRealPicture()}}>
               <Image source={require('../../images/real_pic.png') } style={{alignSelf:'center',height:this.state.real_palcehoder_height}} ></Image>
                                 </TouchableHighlight>
               <Text style={{fontSize:20,padding:10}}>身份证正面照</Text>
               <Image source={id_card_picture_url} style={{marginTop:10,height:this.state.id_image_height,width:'80%',alignSelf:'center'}}></Image>
               <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="white" onPress = {()=>{this.takeIDCardPicture()}}>
               <Image source={require('../../images/id_card_pic.png') } style={{alignSelf:'center',height:this.state.id_placehoder_height}} onPress = {()=>{this.takeIDCardPicture()}}></Image>
               </TouchableHighlight>
               <View style={{height:20}}></View>
             </View>
            <View style={{height:10}}></View>
            {/* <Button onPress={()=>{this.check()}} style={style.button}  title="认证"></Button> */}
            <Text style={{color:'white',backgroundColor:'blue',height:50,borderRadius:25,marginHorizontal:20,textAlignVertical:'center',textAlign:'center',fontSize:25}}>申请</Text>
           </ScrollView>
        )
   }



   setPhone(data){
      this.setState({phone:data})
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

  tick(){
    this.setState({
      second:this.state.second - 1
    })
    if(this.state.second == 0){
      isSendCode = false;
      this.setState({
        second:600
      })
      clearInterval(this.interval);
    }
  }

   sendMessage(){
     if(isSendCode){
       return;
     }
     isSendCode = true;
     this.interval = setInterval(() => this.tick(), 1000);
      const url = 'https://api2.bmob.cn/1/requestSmsCode';
      const phone = this.state.phone;
      var fetchOptions = {
        method: 'POST',
        headers: {
        'X-Bmob-Application-Id': Config.BMOB_APP_ID,
        'X-Bmob-REST-API-Key': Config.REST_API_ID,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mobilePhoneNumber : phone,
        })
    };
    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
        console.log(responseText);
        const data = JSON.parse(responseText);
        
    }).done();      
   }

   takeRealPicture(){
    launchImageLibrary(options, (response) => {
      console.log( 'Response = ' , response);
      if(response.fileSize > 1000000){
        Alert.alert(
          '图片太大',
          '只能上传大小小于1M的图片',
          [
            
            {
              text: '确定', onPress: () => {
                 
              }
            }
          ],
          {cancelable: false}
        )
        return;
      }
      if  (response.didCancel) {
        console.log( '用户取消了选择！' );
      }
      else  if  (response.error) {
        alert( "ImagePicker发生错误："  + response.error);
      }
      else  if  (response.customButton) {
        alert( "自定义按钮点击："  + response.customButton);
      }
      else  {
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        uploadImage(response)
          .then( res=>{
              //请求成功
              const data = JSON.parse(res)
              if(data.code === '200'){
                  //这里设定服务器返回的header中statusCode为success时数据返回成功
                  this.setState({
                    real_picture_url: source,
                    real_image_height:200,
                    real_palcehoder_height:0
                  });
                  user_real_url = data.info;
                  console.log('user_real_url = '+user_real_url);
              }else{
                   //服务器返回异常，设定服务器返回的异常信息保存在 header.msgArray[0].desc
                  console.log(res);
              }
          }).catch( err => { 
            console.log('uploadImage', err.message);
               //请求失败
          })
      }
    });
   }

   takeIDCardPicture(){
    launchImageLibrary(options, (response) => {
      console.log( 'Response = ' , response);
      if(response.fileSize > 1000000){
        Alert.alert(
          '图片太大',
          '只能上传大小小于1M的图片',
          [
            
            {
              text: '确定', onPress: () => {
                 
              }
            }
          ],
          {cancelable: false}
        )
        return;
      }

      if  (response.didCancel) {
        console.log( '用户取消了选择！' );
      }
      else  if  (response.error) {
        alert( "ImagePicker发生错误："  + response.error);
      }
      else  if  (response.customButton) {
        alert( "自定义按钮点击："  + response.customButton);
      }
      else  {
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      
        uploadImage(response)
          .then( res=>{
              //请求成功
              const data = JSON.parse(res)
              if(data.code === '200'){
                  //这里设定服务器返回的header中statusCode为success时数据返回成功
                  this.setState({
                    id_card_picture_url: source,
                    id_image_height:200,
                    id_placehoder_height:0
                  });
                  user_id_url = data.info;
              }else{
                   //服务器返回异常，设定服务器返回的异常信息保存在 header.msgArray[0].desc
                  console.log(res);
              }
          }).catch( err => { 
            console.log('uploadImage', err.message);
               //请求失败
          })
      }
    });
   }

   check(){
      //先验证电话
      const code = this.state.code;
      const name = this.state.name;
      const phone = this.state.phone;
      const url = 'https://api2.bmob.cn/1/verifySmsCode/'+code;
      var fetchOptions = {
        method: 'POST',
        headers: {
        'X-Bmob-Application-Id': Config.BMOB_APP_ID,
        'X-Bmob-REST-API-Key': Config.REST_API_ID,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mobilePhoneNumber : phone,
        })
    };
    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
        const data = JSON.parse(responseText);
        console.log(data);
        if(data.msg == 'ok'){//电话验证通过
          that.update(name);
        }else{
          console.log('电话验证失败');
        }
    }).done();    
   }

   update(name){
     const address = this.state.address;
      const url = 'https://api2.bmob.cn/1/users/'+Config.LOGIN_USER_ID;
      var fetchOptions = {
        method: 'PUT',
        headers: {
        'X-Bmob-Application-Id': Config.BMOB_APP_ID,
        'X-Bmob-REST-API-Key': Config.REST_API_ID,
        'Content-Type': 'application/json',
        'X-Bmob-Session-Token':Config.SESSION_TOKEN
        },
        body: JSON.stringify({
           id_card_picture_url:user_id_url,
           real_picture_url:user_real_url,
           real_name:name,
           address:address,
           authentication:true
        })
    };
    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      console.log(responseText);
        //const data = JSON.parse(responseText);
        console.log(responseText);
        const data = JSON.parse(responseText);
        if(data.code == null){
          Config.user.realName = name;
          Config.user.id_card_picture_url = user_id_url;
          Config.real_picture_url = user_real_url;
          Config.authentication = true;
          DeviceEventEmitter.emit(Config.AUTHENTICATION,true);
          that.navigation.goBack();
        }
    }).done();    
   }

}


function uploadImage(params){
  return new Promise(function (resolve, reject) {
    const formData = new FormData();
    const file = {
          uri: params.uri,
          type: params.type,
          name:params.fileName,
          size: params.fileSize,
     };
    formData.append('image', file);
      //let file = {uri: params.path};
      fetch('http://106.52.124.32:8088/uploadImg', {
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data;',
          },
          body: formData,
      }).then((response) => response.text())
          .then((responseData)=> {
              console.log('uploadImage', responseData);
              resolve(responseData);
          })
          .catch((err)=> {
              console.log('err', err);
              reject(err);
          });
  });
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


export default CheckUserID;