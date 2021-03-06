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
import CleanDealList from './app/main/community/service/clean/CleanDealList'
import FixManager from './app/main/community/service/fix/FixManager'
import FixDealList from './app/main/community/service/fix/FixDealList'
import ShowHealthCode from './app/main/community/health/ShowHealthCode'
import ChangePassword from './app/main/user/account/ChangePassword'
import GetPassword from './app/main/user/account/GetPassword'
import UpdatePhone from './app/main/user/account/UpdatePhone'
import AboutApp from './app/main/user/AboutApp'
import Parking from './app/main/community/service/parking/Parking'
import ExpressManager from './app/main/community/service/express/ExpressManager'
import ExpressDealList from './app/main/community/service/express/ExpressDealList'
import LostManager from './app/main/community/service/lostAndFound/LostManager'
import AddLostData from './app/main/community/service/lostAndFound/AddLostData'
import TemperatureError from './app/main/community/extrance/TemperatureError'
import OutAndInRecord from './app/main/user/record/OutAndInRecord'
import ServiceRecord from './app/main/user/record/ServiceRecord'
import CardRecord from './app/main/user/record/CardRecord'
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
        <Tab.Screen name = "??????"
        component = { Main }
        options = {
            { title: "" }
        }
        /> 
        
        <Tab.Screen name = "??????"
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
           title:"??????"
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
                  name="??????"  component={MainFragment}/>
                  <MainStack.Screen name='????????????' component = {EpidemicSituation} options={{title:"??????????????????"}}/>
                  <MainStack.Screen name="info" component = {ApplyForJoinCommunityNumberinfor} options={{title:"????????????"}}/>
                  <MainStack.Screen name='????????????' component = {OutAndInManager}/>   
                  <MainStack.Screen name='????????????' component={Apply}/>
                  <MainStack.Screen name='????????????'component={OutAndInInfo}/>
                  <MainStack.Screen name='???????????????' component={ScanQrcode}/>  
                  <MainStack.Screen name='????????????' component={OutAndInApplyResult}/>    
                  <MainStack.Screen name='????????????' component={LeaveList}/>
                  <MainStack.Screen name='??????????????????' component={OutAndInErrorList}/>
                  <MainStack.Screen name='????????????' component={HealthCard}/>
                  <MainStack.Screen name='????????????' component={EpidemicMethod} 
                      options={
                        {
                            title:"????????????",
                        }
                        
                    }  
                  />
                  <MainStack.Screen name='??????' component={Login} options={{headerTransparent: true}}/>
                  <MainStack.Screen name='??????' component={Register} options={{headerTransparent: true}}/>
                  <MainStack.Screen name='????????????' component={Search} options={Search.navigationOptions}/>
                  <MainStack.Screen name='????????????' component={EpidemicErrorMessage}/>
                  <MainStack.Screen name='error_message' component={ErrorMessageShow} options={ErrorMessageShow.navigationOptions}/>
                  <MainStack.Screen name='????????????' component={CheckUserID}/>
                  <MainStack.Screen name='????????????' component={CommunityManager}/>
                  <MainStack.Screen name='???????????????' component={Setting}/>
                  <MainStack.Screen name='????????????' component={CreateCommunity}/>
                  <MainStack.Screen name='????????????' component={ImageShow} options={{
                      title:'',
                      headerTransparent: true,
                      headerTintColor:'white' 
                  }}/>
                  <MainStack.Screen name='????????????' component={CommunityInfo} options={{
                      title:''
                  }}/>
                  <MainStack.Screen name='????????????' component={EpidemicDataShow}/>
                  <MainStack.Screen name='InfoScanQrcode' component={InfoScanQrcode} options={{
                      title:''
                      ,
                      headerTransparent: true,
                      headerTintColor:'white'                
                  }}/>
                  <MainStack.Screen name='???????????????' component={QrCodeInfoShow} options={{
                      header: ()=>(
                        <View style={{height:0}}></View>
                      )
                  }}/>
                  <MainStack.Screen name='???????????????' component={QrCodeShow}/>
                  <MainStack.Screen name='????????????' component={CommunityMember} options={{
                      title:'????????????'
                  }}/>
                  <MainStack.Screen name='????????????' component={ApplyForJoinCommunityList}/>
                  <MainStack.Screen name='????????????' component={UserInfo} options={{
                      title:'',
                      headerTransparent: true,
                  }}/>
                  <MainStack.Screen name='????????????' component={CleanManager}/>
                  <MainStack.Screen name="??????????????????" component={CleanDealList}/>
                  <MainStack.Screen name='????????????' component={FixManager}/>
                  <MainStack.Screen name="????????????" component={FixDealList}/>
                  <MainStack.Screen name="?????????" component={ShowHealthCode}/>
                  <MainStack.Screen name="????????????" component={ChangePassword}/>
                  <MainStack.Screen name="????????????" component={GetPassword}/>
                  <MainStack.Screen name="???????????????" component={UpdatePhone}/>
                  <MainStack.Screen name="????????????" component={AboutApp}/>
                  <MainStack.Screen name="????????????" component={Parking}/>
                  <MainStack.Screen name="????????????" component={ExpressManager}/>
                  <MainStack.Screen name='????????????' component={TemperatureError}/>
                  <MainStack.Screen name="??????????????????" component={ExpressDealList}/>
                  <MainStack.Screen name='????????????' component={OutAndInRecord}/>
                  <MainStack.Screen name='????????????' component={LostManager} options={{
                      header: ()=>(
                        <View style={{height:0}}></View>
                      )
                  }}/>
                  <MainStack.Screen name="????????????" component={AddLostData}/>
                  <MainStack.Screen name='????????????' component={CardRecord}/>
                  <MainStack.Screen name='????????????' component={ServiceRecord}/>
              </MainStack.Navigator>      
            </NavigationContainer>
        );
    }
}