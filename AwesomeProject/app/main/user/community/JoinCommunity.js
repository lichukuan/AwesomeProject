import React from 'react';
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
import Config from '../../Config';
class JoinCommunity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:null,
            id:null
        }
        Config.LOGIN_USER_NAME = '123'
        Config.LOGIN_USER_ID = '8e9c025932'
        Config.SESSION_TOKEN = '8c39a6eb40c0ec0480047a714acc8bfd'
    }

    render(){
        return (
            <View>
                <TextInput style={style.name} onChangeText={(text)=>{this.setName(text)}} placeholder="请输入社区名" maxLength={5}/>
                <TextInput style={style.show_id} placeholder='请输入社区id' onChangeText={(text)=>{this.setId(text)}}></TextInput>
                <Button onPress={()=>{this.requestJoin()}} style={style.button} title="申请加入"></Button>
            </View>
        );
    }

    setName(data){
       this.setState({name:data});
    }


    setId(data){
        this.setState({id:data});
    }

    requestJoin(){
        var name = this.state.name;
        var id = this.state.id;
        name = '重庆邮电';
        id = '7f2a5c2d-c970-4ff4-a9a1-d80bd4dda15a'
        const url = 'https://api2.bmob.cn/1/classes/_User/'+Config.LOGIN_USER_ID;
        var fetchOptions = {
            method: 'PUT',
            headers: {
            'X-Bmob-Application-Id': Config.BMOB_APP_ID,
            'X-Bmob-REST-API-Key': Config.REST_API_ID,
            'Content-Type': 'application/json',
            'X-Bmob-Session-Token':Config.SESSION_TOKEN
            },
            body: JSON.stringify({
               apply_for_id:id,
               apply_for_name:name
            })
        };
        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            const data = JSON.parse(responseText);
            console.log(data);
            //this.navigation.goBack();    
        }).done(); 
        console.log('创建社区');
    }
}

const style = StyleSheet.create({
    name:{
        height:50
       
    },
    phone:{
        height:50,
        marginTop:20
    },
    button:{
        backgroundColor:'skyblue',
        height:50,
        marginTop:20,
        fontSize:20
    },
    show_id:{
        height:50,
        marginTop:20,
        fontSize:20
    }
});

export default JoinCommunity;