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
var that = null;
//社区服务
//温度
//投影
//二维码区别
//使用官方二维码
//4/29 
//指导内容：社区管理应用基于苹果手机的测试；以及基于苹果手机的测试
//进展情况：修改了社区管理的UI界面，完成了论文的第5章和第6章

//4/29
//指导内容：社区管理应该加上一个社区服务模块，用户自己填温度不能确保是否正确等问题
//进展情况：修改论文格式,开始翻译英文文献
class ErrorMessageShow extends React.Component {

  constructor(props){
    super(props);
    this.navigation = props.navigation;
    this.state = {
        title:props.route.params.title,
        id:props.route.params.docid
    }
 }

   static navigationOptions = 
        {
            title: '',
            header: ()=>(
                     <View style={{height:0}}></View>
        )
   };

  render() {
    const ll = 'https://c.m.163.com/news/a/'+this.state.id+'.html';
    return (
      <WebView source={{uri:ll}} 
      allowFileAccess = {true} 
      javaScriptEnabled={true}
      startInLoadingState={true}
      />
    )
  }  
}

export default ErrorMessageShow;