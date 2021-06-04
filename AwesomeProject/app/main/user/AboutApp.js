import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';
const ScreenWidth  = Dimensions.get('window').width

class AboutApp extends React.Component {

  
  constructor(props){
        super(props);
        // Config.json_ip_data = '{"result":{"country":"中国","administrativeCode":"500000","utc":"UTC+8","city":"重庆","timezone":"Asia/Shanghai","ip":"183.70.5.142","operator":"电信","network":"AP","countrySymbol":"CN","areaCode":"86","areaLat":"29.431586","province":"重庆","areaLng":"106.912251","company":"","continentCode":"AP"},"status":200,"message":"查询成功"}'
    }



  render() {
    return (
      <ScrollView style={{padding:10}}>
          <Text style={{width:ScreenWidth,fontSize:20}}>
          本课题的研究内容是基于React Native的社区管理软件的开发。该课题的目的是通过该框架来开发社区管理软件，
          通过应用的用户管理、出入管理等功能模块，来解决社区疫情防控的问题。
          该应用主要包含出入管理模块、用户管理模块、社区管理模块、新冠疫情信息模块、二维码模块等。各个模块的详细介绍如下：
          </Text>
          <Text  style={{width:ScreenWidth,fontSize:20}}>
          （1）	出入管理模块主要负责用户进出社区的管理，该模块的功能包括用户的出入申请、出入凭证与工作人员对申请的处理等。
          </Text>
          <Text  style={{width:ScreenWidth,fontSize:20}}>
          （2）	用户管理模块主要负责用户信息的管理，具体的功能有用户注册、用户登录、身份认证、退出登录与账号与安全等。其中账号与安全包括忘记密码、修改密码、找回账号与修改手机号等。
          </Text>
          <Text  style={{width:ScreenWidth,fontSize:20}}>
          （3）	社区管理模块主要负责社区的管理，具体功能包含包括用户申请模块、社区搜索模块、社区信息模块、社区服务模块与退出社区等。其中社区服务中包括社区通知、房屋清洁、家电维修、停车服务、失物招领与代取快递等。
          </Text>
          <Text  style={{width:ScreenWidth,fontSize:20}}>
          （4）	新冠疫情信息模块主要用于向用户展示疫情方面的信息，具体功能包括定位模块、科学防疫方法、辟谣一线、本地隔离政策、本地疫情信息、国内外疫情信息。
         </Text>
         <Text  style={{width:ScreenWidth,fontSize:20}}>
          （5）	二维码模块主要负责应用内信息的传递和显示，具体功能包括个人二维码、社区二维码、出入二维码、社区健康码和扫描二维码模块。
          </Text>
      </ScrollView>
    )
  }  
}


export default AboutApp;