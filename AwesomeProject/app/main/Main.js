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
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

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
            communityMember:'无',
            customBackgroundDialog: false,
            defaultAnimationDialog: false,
            scaleAnimationDialog: false,
            slideAnimationDialog: false,
        }
        this.navigation = props.navigation;
        that = this;


    }

  

    fetchData()
    {
        AsyncStorage.getItem(Key.LOCATION_KEY).then(value => {
            const data = JSON.parse(value);
            console.log('location =======');
            console.log(value);
            console.log(data);
            console.log('================');
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
                    that.fetchPolicy();
                    that.getEpidmicInfo();
                })
                .catch((error) => {
                    console.log('error = '+error);
                });
            }else{
                that.setState({
                    cityCode:data.code,
                    city:data.city
                });
                that.fetchPolicy();
                that.getEpidmicInfo();
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

    //获取隔离信息
    fetchPolicy(){
        if(Config.policy != null){
            return;
        }
        console.log('隔离信息code = '+this.state.cityCode);
       const url = 'https://c.m.163.com/ug/api/wuhan/app/manage/track-map?cityId='+this.state.cityCode;
       var fetchOptions = {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'User-Agent':'PostmanRuntime/7.26.8',
        }
    };
    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseData) => {
        const data = JSON.parse(responseData);
        console.log('result === ');
        console.log(responseData);
        Config.policy = data;
    }).done();   
    }

    getEpidmicInfo(){
//获取疫情信息
AsyncStorage.getItem(Key.EPIDEMIC_INFO).then(value => {
    const data = JSON.parse(value);
    if(data == null||data.time != that.getmyDate()){
        fetch('https://c.m.163.com/ug/api/wuhan/app/data/list-total', {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'User-Agent':'PostmanRuntime/7.26.8',
        
                }
        })
        .then((response) => response.text())
        .then((responseData) => {
            const data = JSON.parse(responseData);
            const country = data.data.areaTree;
            for(let i = 0;i < country.length;i++){
                if(country[i].name == '中国'){
                    const city = country[i].children;
                    for(let j = 0;j < city.length;j++){
                        if(city[j].name == this.state.city){
                            Config.epidmic = city[j];
                            var result = {
                                city:city[j],
                                time:that.getmyDate()
                            }
                            AsyncStorage.setItem(Key.EPIDEMIC_INFO, JSON.stringify(result), err => {
                                err && console.log(err.toString());
                            })
                            break;
                        }
                    }
                    break;
                }
            }
        })
        .catch((error) => {
            console.log('error = '+error);
        });
    }else{
        Config.epidmic = data.city;
    }
}).catch(err => {
    console.log(err.toString());
})
    }


    findCommunity(id,session,create_community_id){
            console.log('id = '+id);
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
                 console.log('======社区信息=======');
                 const data = JSON.parse(responseText);
                 console.log(responseText);
                 console.log('======社区信息=======');
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
                        Config.USER_POST = userData.post;
                        if(userData.post == 'root'){
                            this.setState({
                                communityMember:'管理员'
                            })
                            Config.IS_ROOT = true;
                        }else if(userData.post == 'custom'){
                            this.setState({
                                communityMember:'租户'
                            })
                            Config.IS_ROOT = false;
                        }else if(userData.post == 'worker'){
                            this.setState({
                                communityMember:'社区服务人员'
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
            if(Config.IS_LOGIN){
                that.findCommunity(Config.LOGIN_USER_ID,Config.SESSION_TOKEN,Config.create_community_id)
              }
        });

        this.out_login_listener = DeviceEventEmitter.addListener(Config.USER_OUT_LOGIN_IN,(e)=>{
            this.state = {
                message:"请稍后",
                city:"正在查询...",
                communityInfo:"你未加入社区，请加入社区",
                communityId:null,
                communityMember:'无'
            }
        })
        this.fetchData();
    }

    componentWillUnmount(){
        this.listener.remove();
        this.out_login_listener.remove();
    }

    _renderPage(data, pageID) {
        return (
            <Image
                source={data}
                style={style.img}/>
        );
    }

    searchCommunity(){
         if(loginCheck())
         this.navigation.navigate('搜索社区')
    }

    startQt(){
       //出入管理
       if(loginCheck())
       this.navigation.navigate('InfoScanQrcode')
    }
    render(){
      const message = this.state.message; 
      const city = this.state.city;
      const communityInfo = this.state.communityInfo; 
      const communityId = this.state.communityId;
      const communityMember = this.state.communityMember;
      let leavePolicyList = '';
      if(Config.policy != null)
          leavePolicyList = Config.policy.data.items[0].leavePolicyList.join('')
      let backPolicyList = '';
      if(Config.policy != null)
         backPolicyList = Config.policy.data.items[0].backPolicyList.join('')    
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
            <View style={{marginTop:10,backgroundColor:'white',borderRadius:10,flexDirection:'column',height:150}}>
            <Text style={{marginTop:10,fontSize:18,color:'gray',marginLeft:10}}>基本信息</Text>
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
            </View>
            
            <View style={{marginTop:10,backgroundColor:'white',borderRadius:10,flexDirection:'column',height:150}}>
                <Text style={{marginTop:10,fontSize:18,color:'gray',marginLeft:10}}>社区管理</Text>
                <View style={{flexDirection:'row',marginLeft:10,flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                    <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="white" onPress={()=>{this.myCommunity()}}>
                    <View style={{flexDirection:'column'}}>
                        <Image source={require('../images/社区.png')} style={{width:30,height:30,alignSelf:'center'}}></Image>
                        <Text>我的社区</Text>
                    </View>
                    </TouchableHighlight>
                    <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="white" onPress={()=>{this.qrcode()}}>
                    <View style={{flexDirection:'column',marginLeft:40}}>
                        <Image source={require('../images/出入口.png')} style={{width:30,height:30,alignSelf:'center'}}></Image>
                        <Text>出入管理</Text>
                    </View>
                    </TouchableHighlight>
                    <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="white" onPress={()=>{this.showHealthCode()}}>
                    <View style={{flexDirection:'column',marginLeft:40,marginBottom:5}}>
                        <Image source={require('../images/健康码.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>健康码</Text>
                    </View>
                    </TouchableHighlight>
                </View>

            </View>

            <View style={{marginTop:10,backgroundColor:'white',borderRadius:10,flexDirection:'column',height:180}}>
                <Text style={{marginTop:10,fontSize:18,color:'gray',marginLeft:10}}>社区服务</Text>
                <View style={{flexDirection:'row',marginLeft:10,marginEnd:10,marginTop:10,flex:1,alignItems:'center',justifyContent:'space-between',flexWrap:'wrap'}}>
                    <View style={{flexDirection:'column'}}>
                        <Image source={require('../images/水电费.png')} style={{width:30,height:30,alignSelf:'center'}}></Image>
                        <Text>代缴水电费</Text>
                    </View>
                    <View style={{flexDirection:'column',marginBottom:5,marginLeft:20}}>
                        <Image source={require('../images/房租.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>代缴房租</Text>
                    </View>
                    <View style={{flexDirection:'column',marginBottom:5,marginLeft:20}}>
                        <Image source={require('../images/停车场.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>停车服务</Text>
                    </View>
                    <View style={{flexDirection:'column',marginBottom:5,marginLeft:10}}>
                        <Image source={require('../images/失物招领.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>失物招领</Text>
                    </View>
                    <View style={{flexDirection:'column',marginBottom:5,marginLeft:10,marginTop:10}}>
                        <Image source={require('../images/快递员.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>代取快递</Text>
                    </View>
                </View>
            </View>

            <View style={{marginTop:10,backgroundColor:'white',borderRadius:10,flexDirection:'column',height:150}}>
                <Text style={{marginTop:10,fontSize:18,color:'gray',marginLeft:10}}>疫情消息</Text>
                <View style={{flexDirection:'row',marginLeft:10,flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="white" onPress={()=>{this.showInfo()}}>
                    <View style={{flexDirection:'column'}}>
                        <Image source={require('../images/疫情.png')} style={{width:30,height:30,alignSelf:'center'}}></Image>
                        <Text>辟谣一线</Text>
                    </View>
                </TouchableHighlight>    
                <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="white" onPress={()=>{this.policy()}}>
                    <View style={{flexDirection:'column',marginLeft:40,marginBottom:5}}>
                        <Image source={require('../images/本地政策.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>隔离政策</Text>
                    </View>
                    </TouchableHighlight>    
                </View>
            </View>
        </View>
          
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
              title="隔离政策"
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
            <Text style={{color:'black',fontSize:20}}>
                {'出城政策（'+this.state.city+'）'}
            </Text>
            <Text style={{color:'gray',fontSize:18,marginTop:10}}>{leavePolicyList}</Text>
            <Text style={{color:'black',fontSize:20,marginTop:10}}>
            {'入城政策（'+this.state.city+'）'}
            </Text>
            <Text style={{color:'gray',fontSize:18,marginTop:10}}>{backPolicyList}</Text>
          </DialogContent>
        </Dialog>
  
      </ScrollView>     
      
)
    }

    myCommunity(){
        if(loginCheck()){
            if(Config.apply_for_id == null){
                Alert.alert(
                    '未加入社区',
                    '只有加入了社区才能使用此功能哦~',
                    [
                      {
                        text: '确定', onPress: () => {
                        }
                      }
                    ],
                    {cancelable: false}
                  )
            }else{
                this.navigation.navigate('社区信息',{id:Config.apply_for_id})
            }
        }
    }

    policy(){
        this.setState({
            defaultAnimationDialog: true,
          });
    }


    //打卡
    card(){
         if(loginCheck())
           this.navigation.navigate('健康打卡');
    }

    showInfo(){
        if(loginCheck())
        this.navigation.navigate('辟谣一线');
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
        marginVertical:5,
        marginLeft:10,
        marginEnd:10
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