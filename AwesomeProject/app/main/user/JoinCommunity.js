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
import Config from '../Config';
var that;
class JoinCommunity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:null,
            id:null
        }
        this.navigation = props.navigation;
        that = this;
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

        const commitId = Config.user.create_community_id;
        const url = 'https://api2.bmob.cn/1/classes/CmmunityMember?where='+JSON.stringify({
              community_id:commitId
        });
        var fetchOptions = {
            method: 'GET',
            headers: {
            'X-Bmob-Application-Id': Config.BMOB_APP_ID,
            'X-Bmob-REST-API-Key': Config.REST_API_ID,
            'Content-Type': 'application/json'
            }
        };
        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseData) => {
            console.log("获取的申请为："+responseData);
            const data = JSON.parse(responseData);
            if(data.results.length > 0)
                that.saveData(data.results[0].objectId);
            else
                that.saveData(null); 
        }).done();     
    }

    deleteOld(objectId){
     if(objectId != null){

        const url = 'https://api2.bmob.cn/1/classes/CmmunityMember/'+objectId
        var fetchOptions = {
            method: 'DELETE',
            headers: {
            'X-Bmob-Application-Id': Config.BMOB_APP_ID,
            'X-Bmob-REST-API-Key': Config.REST_API_ID,
            'Content-Type': 'application/json'
            }
        };
        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseData) => {
            console.log("获取的申请为："+responseData);
        }).done();    
     }
    }

    saveData(objectId){
        that.deleteOld(objectId);
        const user_name = Config.user.user_name;
        const user_id = Config.user.user_id; 
        var name = this.state.name;
        var id = this.state.id;
        const url = 'https://api2.bmob.cn/1/classes/CmmunityMember';
        var fetchOptions = {
            method: 'POST',
            headers: {
            'X-Bmob-Application-Id': Config.BMOB_APP_ID,
            'X-Bmob-REST-API-Key': Config.REST_API_ID,
            'Content-Type': 'application/json',
            'X-Bmob-Session-Token':Config.SESSION_TOKEN
            },
            body: JSON.stringify({
               user_name:user_name,
               user_id:user_id,
               community_user_id:user_id,
               community_id:id,
               community_name:name,
               state:'request'
            })
        };
        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            const data = JSON.parse(responseText);
            console.log(data);
            that.navigation.goBack();    
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