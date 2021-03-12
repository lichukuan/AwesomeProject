import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  StatusBar,
  Text
} from 'react-native';
import Config from '../Config';
const url = 'https://api2.bmob.cn/1/batch';
class CreateCommunity extends React.Component{
    constructor(props){
        super(props);
        this.state={
            communityName:null,
            communitydId:null
        }
        Config.LOGIN_USER_NAME = '123'
        Config.LOGIN_USER_ID = '8e9c025932'
        Config.SESSION_TOKEN = '8c39a6eb40c0ec0480047a714acc8bfd';
    }

    render(){
        let id = this.state.communitydId;
        if(id == null){
            id = '点击获取id';
        }
        return (
            <View style={style.parent}>
                <TextInput style={style.community_name} onChangeText={(text) => {this.setCommunityName(text)}} placeholder="请输入社区名" maxLength={10}/>
                <Text  style={style.item} onPress={()=>{this.createCommunityId()}}>{id}</Text>
                <Button onPress={()=>{this.createCommunity()}} style={style.button} title="创建"></Button>
            </View>
        );
    }

    setCommunityName(data){
       this.setState({
         communityName:data
       })
    }

    createCommunityId(){
       const id = this.state.communitydId;
       if(id == null){
           this.setState({
               communitydId:getUUid()
           })
       }else{
           
       }
    }

    createCommunity(){
        const name = this.state.communityName;
        const id = this.state.communitydId;
        var fetchOptions = {
            method: 'POST',
            headers: {
            'X-Bmob-Application-Id': Config.BMOB_APP_ID,
            'X-Bmob-REST-API-Key': Config.REST_API_ID,
            'Content-Type': 'application/json',
            'X-Bmob-Session-Token':Config.SESSION_TOKEN
            },
            body: JSON.stringify({
                requests:[{
                    "method": "POST",
                    "path": "/1/classes/Community",
                    "body": {
                        community_id : id,
                        community_name:name,
                        create_user_name:Config.LOGIN_USER_NAME,
                        create_user_id:Config.LOGIN_USER_ID
                    }
                },{
                    "method": "PUT",
                    "path": "/1/classes/_User/"+Config.LOGIN_USER_ID,
                    "body": {
                      create_community_id:id,
                      join_community_name:name,
                      joined_community_id:id
                    }
                }]
            })
        };
        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            const data = JSON.parse(responseText);
            console.log(data);
            this.navigation.goBack();    
        }).done(); 
        console.log('创建社区');
    }
}


function getUUid() {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-'; 
    return s.join('');
  }

const style = StyleSheet.create({
    parent:{
        flex:1,
        margin:20
    },
    community_name:{
        height:50
    },
    item:{
        height:100,
        fontSize:20,
        marginTop:20
    },
    button:{
      backgroundColor:'skyblue',
      height:50,
      fontSize:20
    }
});

export default CreateCommunity;