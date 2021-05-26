import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  DeviceEventEmitter,
  StatusBar,
  TouchableHighlight,
  Text,
  Alert
} from 'react-native';
import Config from '../../Config'

class CommunityManager extends React.Component{
    constructor(props){
        super(props);
        this.navigation = props.navigation;

    }

    render(){
        return (
            <View style={{margin:10}}>
                <View style={{marginTop:10,backgroundColor:'orange',borderRadius:10,flexDirection:'column',height:150}}>
                    <TouchableHighlight  activeOpacity={0.6} style={{height:150,justifyContent:'center',alignContent:'center',alignItems:'center'}}
                                 underlayColor="gray" onPress={()=>{this.createCommunity()}}>                    
                        <Text style={{fontSize:40,color:'white'}}>创建社区</Text>
                    </TouchableHighlight>    
                </View>

                <View style={{marginTop:10,backgroundColor:'green',borderRadius:10,flexDirection:'column',height:150}}>
                    <TouchableHighlight  activeOpacity={0.6} style={{height:150,justifyContent:'center',alignContent:'center',alignItems:'center'}}
                                 underlayColor="gray" onPress={()=>{this.toUserCommunity()}}>                    
                        <Text style={{fontSize:40,color:'white'}}>我的社区</Text>
                    </TouchableHighlight>    
                </View>

                <View style={{marginTop:10,backgroundColor:'skyblue',borderRadius:10,flexDirection:'column',height:150}}>
                    <TouchableHighlight  activeOpacity={0.6} style={{height:150,justifyContent:'center',alignContent:'center',alignItems:'center'}}
                                 underlayColor="gray" onPress={()=>{this.joinCommunity()}}>                    
                        <Text style={{fontSize:40,color:'white'}}>退出社区</Text>
                    </TouchableHighlight>    
                </View>
              </View>           
        );
    }

    createCommunity(){
     if(Config.authentication){
        console.log('创建社区');
        this.navigation.navigate('创建社区')
     }else{
        Alert.alert(
            '身份认证',
            '您必须先进行身份认证，才能使用该功能',
            [ 
              {
                text: '确定', onPress: () => {
                }
              }
            ],
            {cancelable: false}
          )
     }
      //DeviceEventEmitter.emit(Config.USER_FRAGMENT_COMMUNITY_CHANGE,'CreateCommunity');
    }

    toUserCommunity(){
      if(Config.apply_for_id != null){
        console.log('我的社区');
        this.navigation.navigate('我的社区')
      }else{
        Alert.alert(
            '加入社区',
            '您必须先加入社区，才能使用该功能',
            [ 
              {
                text: '确定', onPress: () => {
                }
              }
            ],
            {cancelable: false}
          )
    
      }  
      
      //DeviceEventEmitter.emit(Config.USER_FRAGMENT_COMMUNITY_CHANGE,'UserCommunity');
    }

    joinCommunity(){
        if(Config.apply_for_id != null){
            
          }else{
            Alert.alert(
                '加入社区',
                '您必须先加入社区，才能使用该功能',
                [ 
                  {
                    text: '确定', onPress: () => {
                    }
                  }
                ],
                {cancelable: false}
              )
        
          }  
    }
}


//Button的样式无效
const style = StyleSheet.create({
    item:{
        height:100,
        backgroundColor:'skyblue'
    },
    item1:{
        flex:2,
        backgroundColor:'skyblue'
    },
    item2:{
        flex:3,
        backgroundColor:'skyblue'
    }
});

export default CommunityManager;