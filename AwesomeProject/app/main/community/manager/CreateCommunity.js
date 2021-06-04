import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  StatusBar,
  Text,
  Alert,
  Image,
  TouchableHighlight,
  Linking
} from 'react-native';
import Config from '../../Config';
const url = 'https://api2.bmob.cn/1/batch';
class CreateCommunity extends React.Component{
    constructor(props){
        super(props);
        this.state={
            communityName:null,
            communitydId:null
        }
    }

    componentDidMount(){
        Alert.alert(
            '创建社区须知',
            '本应用采取人工认证的模式，您必须通过人工认证，才能创建您的社区',
            [ 
              {
                text: '确定', onPress: () => {
                }
              }
            ],
            {cancelable: false}
          )
    }

    render(){
        let id = this.state.communitydId;
        if(id == null){
            id = '点击获取id';
        }
        return (
            <View style={style.parent}>
                <View style={{marginTop:10,backgroundColor:'white',borderRadius:10,flexDirection:'column',height:150}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{marginTop:10,fontSize:18,color:'gray',marginLeft:10}}>管理员</Text>
                        <Text style={{marginTop:10,fontSize:18,color:'black',marginLeft:10}}>李楚宽</Text>
                    </View>    
                <View style={{flexDirection:'row',marginLeft:10,flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="white" onPress={()=>{
                                    Linking.canOpenURL('mqq:2896754286').then(supported => {
                                        if (!supported) {
                                           this.props.setToastMsg('请先安装QQ')
                                        } else {
                                           return Linking.openURL('mqq:2896754286')
                                        }
                                     })
                                 }}>
                    <View style={{flexDirection:'column'}}>
                        <Image source={require('../../../images/QQ.png')} style={{width:30,height:30,alignSelf:'center'}}></Image>
                        <Text>QQ</Text>
                    </View>
                </TouchableHighlight>    

                    <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="white" onPress={()=>{
                                    Linking.canOpenURL('tel:${"15207067001"}').then(supported => {
                                        if (!supported) {
                                           this.props.setToastMsg('出错了')
                                        } else {
                                           return Linking.openURL('tel:${"15207067001"}')
                                        }
                                     })
                                 }}>
                    <View style={{flexDirection:'column',marginLeft:40,marginBottom:5}}>
                        <Image source={require('../../../images/电话.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>电话</Text>
                    </View>
                    </TouchableHighlight>
                </View>
            </View>


            <View style={{marginTop:10,backgroundColor:'white',borderRadius:10,flexDirection:'column',height:150}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{marginTop:10,fontSize:18,color:'gray',marginLeft:10}}>管理员</Text>
                        <Text style={{marginTop:10,fontSize:18,color:'black',marginLeft:10}}>唐三桂</Text>
                    </View>    
                <View style={{flexDirection:'row',marginLeft:10,flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="white" onPress={()=>{
                                    Linking.canOpenURL('mqq://975096573').then(supported => {
                                        if (!supported) {
                                           this.props.setToastMsg('请先安装QQ')
                                        } else {
                                           return Linking.openURL('mqqwpa://im/chat?chat_type=wpa&uin=975096573')
                                        }
                                     })
                                 }}>
                    <View style={{flexDirection:'column'}}>
                        <Image source={require('../../../images/QQ.png')} style={{width:30,height:30,alignSelf:'center'}}></Image>
                        <Text>QQ</Text>
                    </View>
                </TouchableHighlight>    


                    <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="white" onPress={()=>{
                                    Linking.canOpenURL('tel:${"13340262094"}').then(supported => {
                                        if (!supported) {
                                           this.props.setToastMsg('出错了')
                                        } else {
                                           return Linking.openURL('tel:${"13340262094"}')
                                        }
                                     })
                                 }}>
                    <View style={{flexDirection:'column',marginLeft:40,marginBottom:5}}>
                        <Image source={require('../../../images/电话.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>电话</Text>
                    </View>
                    </TouchableHighlight>
                </View>

            </View>


            <View style={{marginTop:10,backgroundColor:'white',borderRadius:10,flexDirection:'column',height:150}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{marginTop:10,fontSize:18,color:'gray',marginLeft:10}}>管理员</Text>
                        <Text style={{marginTop:10,fontSize:18,color:'black',marginLeft:10}}>刘彦斌</Text>
                    </View>    
                <View style={{flexDirection:'row',marginLeft:10,flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="white" onPress={()=>{
                                    Linking.canOpenURL('mqq://247804779').then(supported => {
                                        if (!supported) {
                                           this.props.setToastMsg('请先安装QQ')
                                        } else {
                                           return Linking.openURL('mqqwpa://im/chat?chat_type=wpa&uin=247804779')
                                        }
                                     })
                                 }}>
                    <View style={{flexDirection:'column'}}>
                        <Image source={require('../../../images/QQ.png')} style={{width:30,height:30,alignSelf:'center'}}></Image>
                        <Text>QQ</Text>
                    </View>
                </TouchableHighlight>    


                    <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="white" onPress={()=>{
                                    Linking.canOpenURL('tel:${"13509443150"}').then(supported => {
                                        if (!supported) {
                                           this.props.setToastMsg('出错了')
                                        } else {
                                           return Linking.openURL('tel:${"13509443150"}')
                                        }
                                     })
                                 }}>
                    <View style={{flexDirection:'column',marginLeft:40,marginBottom:5}}>
                        <Image source={require('../../../images/电话.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>电话</Text>
                    </View>
                    </TouchableHighlight>
                </View>

            </View>

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
        marginHorizontal:10
    },
    community_name:{
        height:50,
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