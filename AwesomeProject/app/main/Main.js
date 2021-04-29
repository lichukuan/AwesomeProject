import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  Image,
  Alert,
  DeviceEventEmitter
} from 'react-native';
import DeviceStorage from './storage/DeviceStorage';
import Key from "./storage/Keys";
var REQUEST_URL = 'https://ipservice.3g.163.com/ip';
import AsyncStorage from '@react-native-community/async-storage';
import Config from './Config';
import BagView from './BagView'
//获取位置数据
//获取登录信息

var that = null;


class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message:"请稍后",
            city:"正在查询...",
            communityInfo:"你未加入社区，请加入社区",
            communityId:null,
            communityMember:'无'
        }
        this.navigation = props.navigation;
        that = this;
    }

   componentWillUnmount(){
    this.listener.remove();
   }

    fetchData()
    {
        AsyncStorage.getItem(Key.LOCATION_KEY).then(value => {
            console.log(value +" time = "+that.getmyDate());
            const data = JSON.parse(value);
            if(data == null||data.time != that.getmyDate()){
                //获取位置信息
                fetch(REQUEST_URL, {
                    method: 'GET'
                })
                .then((response) => response.text())
                .then((responseData) => {
                    const data = JSON.parse(responseData);
                    console.log(data);
                    that.setState({
                        message:data.message,
                        cityCode:data.result.administrativeCode,
                        city:data.result.city
                    });
                    var location = {
                        city:data.result.city,
                        code:data.result.administrativeCode,
                        time:that.getmyDate()
                    }
                    AsyncStorage.setItem(Key.LOCATION_KEY, JSON.stringify(location), err => {
                        err && console.log(err.toString());
                    })
                })
                .catch((error) => {
                    console.log('error = '+error);
                });
            }else{
                that.setState({
                    cityCode:data.code,
                    city:data.city
                });
            }
        }).catch(err => {
            console.log(err.toString());
        })
       
        //登录信息
        AsyncStorage.getItem(Key.USER_INFO)
        .then(value => {
            console.log(value);
            const userData = JSON.parse(value);
            var url = 'https://api2.bmob.cn/1/checkSession/'+userData.user_id;
            fetch(url,{
                method:'GET',
                headers: {
                    'X-Bmob-Application-Id': Config.BMOB_APP_ID,
                    'X-Bmob-REST-API-Key': Config.REST_API_ID,
                    'X-Bmob-Session-Token':userData.session_token
                    }
            }).then((response) => response.text())
            .then((responseText) =>{
                const data = JSON.parse(responseText);
                console.log(data);
                if(data.msg == 'ok'){
                    console.log('Main登录成功');
                    Config.user = userData;
                    Config.IS_LOGIN = true;
                    Config.LOGIN_USER_NAME = userData.user_name;
                    Config.LOGIN_USER_ID = userData.user_id;
                    Config.authentication = userData.authentication;
                    Config.SESSION_TOKEN = userData.session_token;
                    that.findCommunity(userData.user_id,userData.session_token,userData.create_community_id);
                }
            }).catch((error) => {
                console.log(error);
            });
        })
        .catch(err => {
            err && console.log(err.toString());
        })

    }

    findCommunity(id,session,create_community_id){
            var url = 'https://api2.bmob.cn/1/classes/CmmunityMember?where='+JSON.stringify({
                user_id:id
            });
            fetch(url,{
                method:'GET',
                headers: {
                    'X-Bmob-Application-Id': Config.BMOB_APP_ID,
                    'X-Bmob-REST-API-Key': Config.REST_API_ID,
                    'X-Bmob-Session-Token':session
                    }
            }).then((response) => response.text())
            .then((responseText) =>{
                 //request 已申请
                 //agree 同意
                 //refuse 拒绝
                 const data = JSON.parse(responseText);
                 console.log(data.results);
                 if(data.results.length != 0){
                    const userData = data.results[0]; 
                    if(userData.state == 'request'){
                        that.setState({
                            communityInfo:'你已申请加入'+userData.apply_for_name+',请等候结果'
                        })
                    }else if(userData.state == 'refuse'){
                        that.setState({
                            communityInfo:'你加入'+userData.apply_for_name+'的申请已经被拒绝'
                        })
                    }else if(userData.state == 'agree'){
                        console.log(JSON.stringify(userData));
                        Config.apply_for_id = userData.community_id;
                        Config.apply_for_name = userData.community_name;
                        Config.apply_state = userData.state;
                        that.setState({
                            communityInfo:userData.community_name
                        })
                        console.log('create_community_id  = ' + create_community_id + " commuinty_id = "+userData.community_id);
                        if(create_community_id != null && create_community_id == userData.community_id){
                            this.setState({
                                communityMember:'管理员'
                            })
                            Config.IS_ROOT = true;
                        }else{
                            this.setState({
                                communityMember:'租户'
                            })
                            Config.IS_ROOT = false;
                        }
                    }
                    
                 }
            });   
    }


getmyDate() {
    var date = new Date();
    var year = date.getFullYear().toString();
    var month = (date.getMonth()+1).toString();
    var day = date.getDate().toString();
    return year+'/'+month+'/'+day;
}


    componentDidMount()
    {
        this.listener = DeviceEventEmitter.addListener(Config.UPDATE_USER_LOGIN_INFO,(e)=>{
            if(Config.apply_for_name != null){
                that.findCommunity(Config.LOGIN_USER_ID,Config.SESSION_TOKEN,Config.create_community_id)
              }
        });
        this.fetchData();
    }

    _renderPage(data, pageID) {
        return (
            <Image
                source={data}
                style={style.img}/>
        );
    }

    searchCommunity(){
         this.navigation.navigate('搜索社区')
    }

    startQt(){
       //出入管理
       this.navigation.navigate('出入管理')
    }

    render(){
      const message = this.state.message; 
      const city = this.state.city;
      const communityInfo = this.state.communityInfo; 
      const communityId = this.state.communityId;
      const communityMember = this.state.communityMember;
      return (
        <ScrollView style={{}}>

        <View style={{flexDirection:'row',backgroundColor:'#F6F6F6',height:70,alignItems:'center'}}>
              <Text style={{backgroundColor:'white',height:40,borderRadius:20,textAlignVertical:'center',paddingLeft:20,marginLeft:10,marginRight:10,flex:1}} onPress={()=>this.searchCommunity()}>搜索社区</Text> 
              <TouchableHighlight onPress={()=>this.startQt()}>
              <Image source={require('../images/sao.png')} style={{height:35,width:35,marginRight:10}} ></Image>
              </TouchableHighlight>
        </View>  
        <View style={{margin:10,marginTop:0}}>
            <BagView  nav={this.navigation}/>
            <View style={style.item_container}>
                    <Text style={style.item_left}>社区</Text>
                    <Text style={{fontSize:18,color:'black'}} onPress={()=>this.goCreateCommunityOrShowCommunityInformation()}>{communityInfo}</Text>
            </View>    
            <View style={style.item_container}>
                    <Text style={style.item_left}>职责</Text>
                    <Text style={{fontSize:18,color:'black'}}>{communityMember}</Text>
            </View>    
            <View style={style.item_container}>
                    <Text style={style.item_left}>位置</Text>
                    <Text style={{fontSize:18,color:'black'}}>{city}</Text>
            </View>
            <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="#DDDDDD" style={style.item} onPress={()=>{this.showInfo()}}>
                <Text style={{fontSize:20,color:'white',textAlignVertical:'center',textAlign:'center',height:40}}>疫情</Text>
            </TouchableHighlight>
            <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="#DDDDDD" style={style.item} onPress={()=>{this.card()}}>
                <Text style={{fontSize:20,color:'white',textAlignVertical:'center',textAlign:'center',height:40}}>打卡</Text>
            </TouchableHighlight>
            <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="#DDDDDD" style={style.item} onPress={()=>{this.showHealthCode()}}>
                <Text style={{fontSize:20,color:'white',textAlignVertical:'center',textAlign:'center',height:40}}>健康码</Text>
            </TouchableHighlight>
            <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="#DDDDDD" style={style.item} onPress={()=>{this.qrcode()}}>
                <Text style={{fontSize:20,color:'white',textAlignVertical:'center',textAlign:'center',height:40}}>出入管理</Text>
            </TouchableHighlight>
        </View>
          
      </ScrollView>     
      
)
    }

    //打卡
    card(){
         if(loginCheck())
           this.navigation.navigate('健康打卡');
    }

    showInfo(){
        if(loginCheck())
        this.navigation.navigate('当前疫情');
    }

    qrcode(){
       console.log('出入管理');
       if(loginCheck())
       this.navigation.navigate('出入管理');
    }

    showHealthCode(){
      console.log("展示健康码");
      if(loginCheck())
      this.navigation.navigate('home',{itemId:13,key:'ShowHealthCode'});
    }

    goCreateCommunityOrShowCommunityInformation(){
        // console.log("设置社区");
        // if(Config.apply_for_name == null){
        //     if(loginCheck)
        //     this.navigation.navigate('user',{itemId:11,key:'JoinCommunity'});
        // }
    }
}

function loginCheck(){
    if(!Config.IS_LOGIN){
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
        return false;  
    }
    return true;
}

function CommunityInfo(props){
    var message = props.info;
    if(props.id == null){
       message = props.info;
    }else{
        message = '你已经加入'+props.info+'社区';
    }
    return <Text style={style.community_info} onPress={props.press}>{message}</Text>;
}

function Location(props){
    return <Text onPress={props.press} style = {style.location}>{""+props.city}</Text>;
}

function HealthCode(props){
    return <Text onPress={props.press} style = {style.health_code} >健康码</Text>
}

function Card(props){
    return <Text style={style.card} onPress={props.press}>打卡</Text>
}

const style = StyleSheet.create({
    community_info:{
      height:100,
      width:100,
      textAlignVertical: 'center',
      backgroundColor:'skyblue',
      color:'white',
    },
    location:{
       height:100,
       width:100,
       backgroundColor:'skyblue',
       color:'white',
       textAlignVertical: 'center',
    },
    health_code:{
        height:100,
        width:100,
        backgroundColor:'skyblue',
       color:'white',
        textAlignVertical: 'center',
    },
    card:{
        height:100,
        width:100,
        backgroundColor:'skyblue',
       color:'white',
        textAlignVertical: 'center',
    },
    item_container:{
        flex:1,
        flexDirection:'row',
        marginVertical:5
     },
     item_left:{
         flex:1,fontSize:18,
         color:'gray'
     },
     item_right:{
         fontSize:18,
         color:'gray'
     },
     item:{
        height:50,
        borderColor:'white',
        borderWidth:2,
        marginTop:10,
        backgroundColor:'skyblue'
    },
    swiper: {

    },
    img: {
        width: '100%',
        height: 200,
    }

  });

export default Main;