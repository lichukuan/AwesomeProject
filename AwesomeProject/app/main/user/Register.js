import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  StatusBar,
} from 'react-native';
import DeviceStorage from '../storage/DeviceStorage';
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"",
            pas:""
        }
    }

    render(){
        return (
            <View>
                <TextInput onChangeText={(text) => {this.setName(text)}}style={style.name} placeholder="请输入用户名"></TextInput>
                <TextInput  onChangeText={(text) => {this.setPas(text)}} style={style.password} password = {true} placeholder="请输入密码" ></TextInput>
                <Button  onPress={()=>{this.register()}} style={style.button}  title="注册"></Button>
            </View>
        );
    }

    setName(data){
       this.setState({name:data});
    }

    setPas(data){
        this.setState({pas:data});
    }

    register(){
        const name = this.state.name;
        const pas = this.state.pas;
        // DeviceStorage.save(StoreKey.name_key,name);
        // DeviceStorage.save(StoreKey.pas_key,pas);
        // console.log("name = "+name +"  pas = "+pas);
    }
}

const style = StyleSheet.create({
    name:{
        height:50
       
    },
    password:{
        height:50,
        marginTop:50
    },
    button:{
        backgroundColor:'skyblue',
        height:50,
        marginTop:50,
        fontSize:20
    }
});

export default Register;