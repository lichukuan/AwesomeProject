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
class EpidemicSelect extends React.Component {

  
  constructor(props){
        super(props);
        //this.navigation = props.navigation;
        that = this;
        this.state = {
          loaded:false
        }
        console.log('初始化');

        // Config.json_ip_data = '{"result":{"country":"中国","administrativeCode":"500000","utc":"UTC+8","city":"重庆","timezone":"Asia/Shanghai","ip":"183.70.5.142","operator":"电信","network":"AP","countrySymbol":"CN","areaCode":"86","areaLat":"29.431586","province":"重庆","areaLng":"106.912251","company":"","continentCode":"AP"},"status":200,"message":"查询成功"}'
    }


  handleMessage(e){
      console.log(e);
      const data = JSON.parse(e.nativeEvent.data);
      console.log('data = '+data);
      if(data.type == 'back_html'){
       
      }
      
  }

  componentDidMount(){
      this.setState({
        loaded:true
      })
  }

  onLoadEnd =(e)=>{
     const data = JSON.stringify({
      city:'江西',
      come:['1.非必要，不返乡。','2.确需返乡的，可以自驾或者参加企业或其他组织集中开通的专列、专车（包车）出行。','【就地过年福利政策】','对安排外地员工留渝过年并发放不低于300元“留岗红包”的本市各类企业，根据其在岗稳定就业和参保缴费情况，采取“先发后补”方式，按照每人300元的标准，由政府给予企业一次性留工补贴，每户企业最高30万元。'],
      back:['【1月28日以前返乡】','1.境外来渝人员：14天集中隔离+7天居家隔离+7天自我健康管理；外省市入境解除隔离来渝人员“7天居家隔离+7天自我健康管理”措施。',
    '2.高风险地区人员：一律集中隔离14天，期间检测2次。','3.中风险地区人员：3日内核酸检测证明，无法提供证明的将集中隔离14天，期间进行两次检测；能够提供证明的，实施为期14天严格的社区健康管理，期满进行一次检测。',
  '4.低风险地区的人员只需健康码绿码，体温检测正常即可正常通行。','【1月28日以后返乡】','所有人员都需持核酸检测阴性证明返乡（农村地区）。如果从外省回到重庆主城，再回到区县，也是属于返乡人员，需要提供核酸检测证明。']
    });
    that.web.postMessage(JSON.stringify(data));
  };


  render() {
    const source = (Platform.OS == 'ios') ? require('../../asset/select.html') : { uri: 'file:///android_asset/select.html' }
    let page = null;
    if(!this.state.loaded){
      page = <View></View>
    }else{
      page = <WebView source={source} 
               allowFileAccess = {true} 
               javaScriptEnabled={true}
               startInLoadingState={true}
              onMessage={(e) => {
                this.handleMessage(e)
              }}
              ref={(webview) => {this.web = webview}}/>
    }
    return (
      <View>
        {page}
      </View>
    )
  }  
}


export default EpidemicSelect;