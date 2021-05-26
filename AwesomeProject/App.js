import * as React from 'react';
import { Button, Text, View,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './app/main/Main';
import User from './app/main/user/User'
import EpidemicSituation from './app/main/epidemic/EpidemicSituation'
import Login from './app/main/user/account/Login'
import Register from './app/main/user/account/Register'
import CommunityManager from "./app/main/community/manager/CommunityManager";
import CreateCommunity from "./app/main/community/manager/CreateCommunity";
import Setting from "./app/main/user/Setting";
import CheckUserID from "./app/main/user/CheckUserID";
import AsyncStorage from '@react-native-community/async-storage';
import Key from "./app/main/other/storage/Keys";
import Config from './app/main/Config';
import ApplyForJoinCommunityList from "./app/main/community/manager/ApplyForJoinCommunityList";
import ApplyForJoinCommunityNumberinfor from "./app/main/community/manager/ApplyForJoinCommunityNumberinfor";
import OutAndInManager from './app/main/community/extrance/OutAndInManager'
import Apply from './app/main/community/extrance/Apply'
import OutAndInInfo from './app/main/community/extrance/OutAndInInfo'
import ScanQrcode from './app/main/home/ScanQrcode'
import OutAndInApplyResult from "./app/main/community/extrance/OutAndInApplyResult";
import LeaveList from "./app/main/community/extrance/LeaveList";
import OutAndInErrorList from "./app/main/community/extrance/OutAndInErrorList";
import HealthCard from './app/main/community/health/HealthCard'
import EpidemicMethod from './app/main/epidemic/EpidemicMethod'
import Search from './app/main/home/Search'
import EpidemicErrorMessage from './app/main/epidemic/EpidemicErrorMessage'
import ErrorMessageShow from './app/main/epidemic/ErrorMessageShow';
import ImageShow from './app/main/other/ImageShow'
import CommunityInfo from './app/main/community/CommunityInfo'
import EpidemicDataShow from './app/main/epidemic/EpidemicDataShow'
import InfoScanQrcode from './app/main/home/InfoScanQrcode'
import QrCodeInfoShow from './app/main/other/QrCodeInfoShow'
import QrCodeShow from './app/main/user/QrCodeShow'
import CommunityMember from './app/main/community/manager/CommunityMember'
import UserInfo from './app/main/user/UserInfo'
import CleanManager from './app/main/community/service/clean/CleanManager'
import FixManager from './app/main/community/service/fix/FixManager'
const Tab = createBottomTabNavigator();
let that = null;
function MainFragment() {
    return ( <Tab.Navigator 

        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            //   let iconName;
              return <Text style={{paddingTop:10,fontSize:20,color:color}}>{route.name}</Text>;
            },

          })}

          
    >
        <Tab.Screen name = "首页"
        component = { Main }
        options = {
            { title: "" }
        }
        /> 
        
        <Tab.Screen name = "用户"
        component = { User }
        options = {
            { title: "" }
        }/> 
        </Tab.Navigator >
    );
}

const MainStack = createStackNavigator();

export default class App extends React.Component {

   constructor(props){
       super(props);
       that = this;
       this.state = {
           title:"首页"
       }
   }

    componentDidMount() {
        AsyncStorage.getItem(Key.user_class).then((value) => {

            if (value != null) {
                const user = JSON.parse(value);
                Config.LOGIN_USER_ID = user.user_id;
                Config.LOGIN_USER_NAME = user.user_name;
            }
            console.log('class = ' + value);
        });

    }

    render() {
        const v = this.state.title;
        return (
            <NavigationContainer
            >
              <MainStack.Navigator>
                  <MainStack.Screen
                  options={
                      {
                          title:"",
                          headerStyle:{
                              height:0
                          }
                      }
                      
                  }
                  name="首页"  component={MainFragment}/>
                  <MainStack.Screen name='当前疫情' component = {EpidemicSituation} options={{title:"最新疫情消息"}}/>
                  <MainStack.Screen name="info" component = {ApplyForJoinCommunityNumberinfor}/>
                  <MainStack.Screen name='出入管理' component = {OutAndInManager}/>   
                  <MainStack.Screen name='出入申请' component={Apply}/>
                  <MainStack.Screen name='出入详情'component={OutAndInInfo}/>
                  <MainStack.Screen name='扫描二维码' component={ScanQrcode}/>  
                  <MainStack.Screen name='出入结果' component={OutAndInApplyResult}/>    
                  <MainStack.Screen name='请假列表' component={LeaveList}/>
                  <MainStack.Screen name='出入异常列表' component={OutAndInErrorList}/>
                  <MainStack.Screen name='健康打卡' component={HealthCard}/>
                  <MainStack.Screen name='防疫方法' component={EpidemicMethod} 
                      options={
                        {
                            title:"科学防疫",
                        }
                        
                    }  
                  />
                  <MainStack.Screen name='登录' component={Login} options={{headerTransparent: true}}/>
                  <MainStack.Screen name='注册' component={Register} options={{headerTransparent: true}}/>
                  <MainStack.Screen name='搜索社区' component={Search} options={Search.navigationOptions}/>
                  <MainStack.Screen name='辟谣一线' component={EpidemicErrorMessage}/>
                  <MainStack.Screen name='error_message' component={ErrorMessageShow} options={ErrorMessageShow.navigationOptions}/>
                  <MainStack.Screen name='身份认证' component={CheckUserID}/>
                  <MainStack.Screen name='社区管理' component={CommunityManager}/>
                  <MainStack.Screen name='账号与安全' component={Setting}/>
                  <MainStack.Screen name='创建社区' component={CreateCommunity}/>
                  <MainStack.Screen name='显示图片' component={ImageShow} options={{
                      title:'',
                      headerTransparent: true,
                      headerTintColor:'white' 
                  }}/>
                  <MainStack.Screen name='社区信息' component={CommunityInfo} options={{
                      title:''
                  }}/>
                  <MainStack.Screen name='疫情数据' component={EpidemicDataShow}/>
                  <MainStack.Screen name='InfoScanQrcode' component={InfoScanQrcode} options={{
                      title:''
                      ,
                      headerTransparent: true,
                      headerTintColor:'white'                
                  }}/>
                  <MainStack.Screen name='二维码信息' component={QrCodeInfoShow} options={{
                      header: ()=>(
                        <View style={{height:0}}></View>
                      )
                  }}/>
                  <MainStack.Screen name='出入二维码' component={QrCodeShow}/>
                  <MainStack.Screen name='社区人员' component={CommunityMember} options={{
                      title:'社区成员'
                  }}/>
                  <MainStack.Screen name='申请列表' component={ApplyForJoinCommunityList}/>
                  <MainStack.Screen name='用户信息' component={UserInfo} options={{
                      title:'',
                      headerTransparent: true,
                  }}/>
                  <MainStack.Screen name='保洁服务' component={CleanManager}/>
                  <MainStack.Screen name='家电维修' component={FixManager}/>
              </MainStack.Navigator>      
            </NavigationContainer>
        );
    }
}