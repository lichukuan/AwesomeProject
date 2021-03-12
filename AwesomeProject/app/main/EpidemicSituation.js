import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import  WebView from 'react-native-webview';
import Config from './Config';
var that = null;
class EpidemicSituation extends React.Component {

  
  constructor(props){
        super(props);
        this.navigation = props.navigation;
        this.state = {
          source:null
        }
        that = this;
        // Config.json_ip_data = '{"result":{"country":"中国","administrativeCode":"500000","utc":"UTC+8","city":"重庆","timezone":"Asia/Shanghai","ip":"183.70.5.142","operator":"电信","network":"AP","countrySymbol":"CN","areaCode":"86","areaLat":"29.431586","province":"重庆","areaLng":"106.912251","company":"","continentCode":"AP"},"status":200,"message":"查询成功"}'
    }


  handleMessage(e){
      console.log(e);
      const data = JSON.parse(e.nativeEvent.data);
      if(data.type == 'change_html'){
        if(data.path == 'select.html'){
          this.navigation.navigate('user',{itemId:20,key:'select'})
        }else if(data.path == 'check.html'){
          this.navigation.navigate('user',{itemId:21,key:'check'})
        }
      }
      
  }

  onLoadEnd =(e)=>{
     console.log('WebView onLoadEnd e：',e.nativeEvent);
     const data = JSON.stringify({
      city:'重庆',
      lastUpdateTime:'2021-03-09 19:19:20',
      total:{
        confirm:666,
        dead:0,
        heal:55
      },
      today:{
       confirm:10,
       dead:10,
       heal:10
      }
    });
     this.web.postMessage(JSON.stringify(data));
  };


  render() {
    var source = (Platform.OS == 'ios') ? require('../asset/index.html') : { uri: 'file:///android_asset/index.html' }
    return (
      <WebView source={source} 
      allowFileAccess = {true} 
      javaScriptEnabled={true}
      startInLoadingState={true}
      onLoadEnd={this.onLoadEnd}
      onMessage={(e) => {
        this.handleMessage(e)
      }}
      ref={(webview) => {
        this.web = webview
    }}/>
    )
  }  
}


export default EpidemicSituation;