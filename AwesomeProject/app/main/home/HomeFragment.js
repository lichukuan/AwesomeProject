import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CardHealth from './CardHealth'
import ShowHealthCode from '../health/ShowHealthCode'
import ScanQrcode from "./ScanQrcode";
  const Stack = createStackNavigator();
  export default function HomeFragment({route}) {
    const {itemId,key} = route.params;
    let page = null;
    if(key == 'CardHealth'){
      page = <CardHealth />;
    }else if(key == 'ShowHealthCode'){
      page = <ShowHealthCode />;
    }else if(key == 'ScanQrcode'){
      page = <ScanQrcode />
    }
    else{
      console.log('key = '+key);
    }
    return (
      <View>
         {page}  
      </View> 
    );
  }

