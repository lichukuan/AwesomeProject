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
import Config from '../Config';
var that = null;
class EpidemicCheck extends React.Component {

  
  constructor(props){
        super(props);
        // this.navigation = props.navigation;
        that = this;
        // Config.json_ip_data = '{"result":{"country":"中国","administrativeCode":"500000","utc":"UTC+8","city":"重庆","timezone":"Asia/Shanghai","ip":"183.70.5.142","operator":"电信","network":"AP","countrySymbol":"CN","areaCode":"86","areaLat":"29.431586","province":"重庆","areaLng":"106.912251","company":"","continentCode":"AP"},"status":200,"message":"查询成功"}'
    }


  handleMessage(e){
      console.log(e);
      const data = JSON.parse(e.nativeEvent.data);
      console.log('data = '+data);
      if(data.type == 'back_html'){
       
      }
      
  }

  onLoadEnd =(e)=>{
     const data = JSON.stringify({
      city:'江西',
      items:[
        {
          title : "编造发现新冠肺炎病例谣言，湖北麻城两男子被行拘",
          imgsrc : "http://cms-bucket.ws.126.net/2021/0225/aa30d776p00qp234k00a8c0009c0070c.png",
          ptime : "2021-02-24 10:35:24"
        },
        {
          title : "女子造谣“武汉方舱千人共用1个厕所” 被判刑6个月  ",
          imgsrc : "http://dingyue.ws.126.net/2021/0223/537b504ej00qoynqx0009c0009c005uc.jpg",
          ptime : "2021-02-23 10:47:22"
        }
      ]
    });
    console.log(data);
     this.web.postMessage(data);
  };


  render() {
    const source = (Platform.OS == 'ios') ? require('../../asset/check.html') : { uri: 'file:///android_asset/check.html' }
    
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

const style = StyleSheet.create({
   parent:{
     flex:1
   }
});

export default EpidemicCheck;