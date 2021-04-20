import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login'
import Register from './Register'
import CommunityManager from "./CommunityManager";
import CreateCommunity  from "./CreateCommunity";
import JoinCommunity from "./JoinCommunity";
import UserCommunity from "./UserCommunity";
import Setting from "./Setting";
import NFC from "./NFC";
import QrCodeShow from "./QrCodeShow";
import CheckUserID from "./CheckUserID";
import ApplyForJoinCommunityNumberinfor from './ApplyForJoinCommunityNumberinfor'
import ApplyForJoinCommunityList from "./ApplyForJoinCommunityList";
import EpidemicCheck from "../Epidemic/EpidemicCheck";
import EpidemicSelect from "../Epidemic/EpidemicSelect";
import CommunityMember from './CommunityMember'
  // const UserStack = createStackNavigator();
  export default function UserFragment({navigation,route}) {
    const {itemId,key} = route.params;
    let page = null;
    if(key == 'Name'){
      page = <Login navigation={navigation}/>;
    }else if(key == 'Icon'){
      page = <Login navigation={navigation}/>;
    }else if(key == 'CommunityManager'){
      page = <CommunityManager />;
    }else if(key == 'Setting'){
      page = <Setting />;
    }else if(key == 'NFC'){
      page = <NFC />;
    }else if(key == 'CheckUserID'){
      page = <CheckUserID navigation={navigation}/>;
    }else if(key == 'CreateCommunity'){
      page = <CreateCommunity />;
    }else if(key == 'JoinCommunity'){
      page =  <JoinCommunity navigation={navigation}/>;
    }else if(key == 'UserCommunity'){
      page = <UserCommunity navigation={navigation}/>;
    }else if(key == 'ApplyForJoinCommunityList'){
      page = <ApplyForJoinCommunityList navigation={navigation}/>
    }else if(key == 'ApplyForJoinCommunityNumberinfor'){
      page = <ApplyForJoinCommunityNumberinfor />
    }else if(key == 'QrCodeShow'){
      page = <QrCodeShow/>
    }else if(key == 'CommunityMember'){
      page = <CommunityMember navigation={navigation}/>
    }else{ 
      console.log('key = '+key);
    }
    if(key == 'select'){
      page = <EpidemicSelect navigation={navigation}/>;
    }else if(key == 'check'){
      page = <EpidemicCheck navigation={navigation}/>;
    }
    return (
      <View>
         {page}  
      </View> 
    );
  }
  // {/* <QrCodeShow /> */}

