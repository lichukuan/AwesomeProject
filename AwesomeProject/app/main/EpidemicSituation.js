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
let result = {
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
  },
  come:['1.非必要，不返乡。','2.确需返乡的，可以自驾或者参加企业或其他组织集中开通的专列、专车（包车）出行。','【就地过年福利政策】','对安排外地员工留渝过年并发放不低于300元“留岗红包”的本市各类企业，根据其在岗稳定就业和参保缴费情况，采取“先发后补”方式，按照每人300元的标准，由政府给予企业一次性留工补贴，每户企业最高30万元。'],
  back:['【1月28日以前返乡】','1.境外来渝人员：14天集中隔离+7天居家隔离+7天自我健康管理；外省市入境解除隔离来渝人员“7天居家隔离+7天自我健康管理”措施。',
'2.高风险地区人员：一律集中隔离14天，期间检测2次。','3.中风险地区人员：3日内核酸检测证明，无法提供证明的将集中隔离14天，期间进行两次检测；能够提供证明的，实施为期14天严格的社区健康管理，期满进行一次检测。',
'4.低风险地区的人员只需健康码绿码，体温检测正常即可正常通行。','【1月28日以后返乡】','所有人员都需持核酸检测阴性证明返乡（农村地区）。如果从外省回到重庆主城，再回到区县，也是属于返乡人员，需要提供核酸检测证明。'],
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
    }],
}
class EpidemicSituation extends React.Component {

  
  constructor(props){
        super(props);
        this.navigation = props.navigation;
        this.state = {
          source:null
        }
        Config.city_code = 500000;
        Config.city = '重庆';
        that = this;
        // Config.json_ip_data = '{"result":{"country":"中国","administrativeCode":"500000","utc":"UTC+8","city":"重庆","timezone":"Asia/Shanghai","ip":"183.70.5.142","operator":"电信","network":"AP","countrySymbol":"CN","areaCode":"86","areaLat":"29.431586","province":"重庆","areaLng":"106.912251","company":"","continentCode":"AP"},"status":200,"message":"查询成功"}'
    }

  componentDidMount(){
    
  }  

  fetchData(){
    //请求谣言信息
    //https://c.m.163.com/ug/api/wuhan/app/article/search-list
    const url = 'https://c.m.163.com/ug/api/wuhan/app/article/search-list'
    var fetchOptions = {
        method: 'GET',
        headers: {
        'Accept': '*/*',
        'User-Agent':'PostmanRuntime/7.26.8',

        }
    };
    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseData) => {
        console.log(responseData);
        const data = JSON.parse(responseData);
        const items = [];
        for(let i = 0;i < data.data.items.length;i++){
          items[i] = {
            title:data.data.items[i].title,
            ptime:data.data.items[i].ptime,
            imgsrc:data.data.items[i].imgsrc
          }
        }
        result = {
          city:Config.city,
          items:items
        }
        that.fetchData1();
    }).done();   
  }  

  fetchData1(){
    //获取隔离信息
    //https://c.m.163.com/ug/api/wuhan/app/manage/track-map?cityId=500000
   
    const url = 'https://c.m.163.com/ug/api/wuhan/app/manage/track-map?cityId='+Config.city_code;
    var fetchOptions = {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'User-Agent':'PostmanRuntime/7.26.8',
        }
    };
    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseData) => {
        console.log(responseData);
        const data = JSON.parse(responseData);
        // result = {
        //   come:data.data.items[0].leavePolicyList,
        //   back:data.data.items[0].backPolicyList
        // }
        console.log('result === ');
        console.log(result);
        const data1 = JSON.stringify(result);
        that.web.postMessage(data1);
    }).done();   
  }

  handleMessage(e){
      console.log(e);
      const data = JSON.parse(e.nativeEvent.data);
      if(data.type == 'change_html'){
        if(data.path == 'select.html'){
          //this.navigation.navigate('user',{itemId:20,key:'select'})
          console.log(this.web);
          this.web.setState({
            source : 'file:///android_asset/select.html'
          })
        }else if(data.path == 'check.html'){
          this.navigation.navigate('user',{itemId:21,key:'check'})
        }
      }
      
  }

  onLoadEnd =(e)=>{
      console.log('WebView onLoadEnd e：',e.nativeEvent);
     //const data = JSON.stringify(result);
     //this.web.postMessage(JSON.stringify(data));
     that.fetchData();
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