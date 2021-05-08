import * as React from 'react';
import { Button, Text, View,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './app/main/Main';
import User from './app/main/User'
import EpidemicSituation from './app/main/EpidemicSituation'
import Login from './app/main/user/Login'
import Register from './app/main/user/Register'
import CommunityManager from "./app/main/user/CommunityManager";
import CreateCommunity from "./app/main/user/CreateCommunity";
import JoinCommunity from "./app/main/user/JoinCommunity";
import UserCommunity from "./app/main/user/UserCommunity";
import Setting from "./app/main/user/Setting";
import NFC from "./app/main/user/NFC";
import CheckUserID from "./app/main/user/CheckUserID";
import UserFragment from './app/main/user/UserFragment';
import HomeFragment from './app/main/home/HomeFragment';
import AsyncStorage from '@react-native-community/async-storage';
import Key from "./app/main/storage/Keys";
import Config from './app/main/Config';
import ApplyForJoinCommunityList from "./app/main/user/ApplyForJoinCommunityList";
import ApplyForJoinCommunityNumberinfor from "./app/main/user/ApplyForJoinCommunityNumberinfor";
import OutAndInManager from './app/main/extrance/OutAndInManager'
import Apply from './app/main/extrance/Apply'
import OutAndInInfo from './app/main/extrance/OutAndInInfo'
import ScanQrcode from './app/main/home/ScanQrcode'
import OutAndInApplyResult from "./app/main/extrance/OutAndInApplyResult";
import LeaveList from "./app/main/extrance/LeaveList";
import OutAndInErrorList from "./app/main/extrance/OutAndInErrorList";
import HealthCard from './app/main/health/HealthCard'
import EpidemicMethod from './app/main/Epidemic/EpidemicMethod'
import Search from './app/main/Search'
import EpidemicErrorMessage from './app/main/Epidemic/EpidemicErrorMessage'
import ErrorMessageShow from './app/main/Epidemic/ErrorMessageShow';
import ImageShow from './app/main/other/ImageShow'
// import EpidemicDataShow from './app/main/Epidemic/EpidemicDataShow'
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
                  <MainStack.Screen name="user" component={UserFragment} /> 
                  <MainStack.Screen name="home" component={HomeFragment} />
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
                  <MainStack.Screen name='登录' component={Login}/>
                  <MainStack.Screen name='注册' component={Register}/>
                  <MainStack.Screen name='搜索社区' component={Search} options={Search.navigationOptions}/>
                  <MainStack.Screen name='我的社区' component={UserCommunity}/>
                  <MainStack.Screen name='辟谣一线' component={EpidemicErrorMessage}/>
                  <MainStack.Screen name='error_message' component={ErrorMessageShow} options={ErrorMessageShow.navigationOptions}/>
                  <MainStack.Screen name='身份认证' component={CheckUserID}/>
                  <MainStack.Screen name='社区管理' component={CommunityManager}/>
                  <MainStack.Screen name='账号与安全' component={Setting}/>
                  <MainStack.Screen name='创建社区' component={CreateCommunity}/>
                  <MainStack.Screen name='显示图片' component={ImageShow} options={{
                      title:'',
                      headerStyle:{
                          backgroundColor:'black'
                      }
                  }}/>
                  {/* <MainStack.Screen name='疫情数据' component={EpidemicDataShow}/> */}
              </MainStack.Navigator>      
            </NavigationContainer>
        );
    }
}