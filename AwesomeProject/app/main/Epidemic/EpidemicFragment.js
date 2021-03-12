import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EpidemicCheck from "./EpidemicCheck";
import EpidemicSelect from "./EpidemicSelect";
  export default function EpidemicFragment({navigation,route}) {
    const {itemId,key} = route.params;
    let page = null;
    if(key == 'select'){
      page = <EpidemicSelect navigation={navigation}/>;
    }else if(key == 'check'){
      page = <EpidemicCheck navigation={navigation}/>;
    }else if(key == 'china'){

    }else{
      console.log('key = '+key);
    }
    console.log("key = "+key);
    return (
      <View>
         {page}  
      </View> 
    );
  }
  // {/* <QrCodeShow /> */}

