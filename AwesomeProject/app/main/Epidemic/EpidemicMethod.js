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

class EpidemicMethod extends React.Component {

  
  constructor(props){
        super(props);
        // Config.json_ip_data = '{"result":{"country":"中国","administrativeCode":"500000","utc":"UTC+8","city":"重庆","timezone":"Asia/Shanghai","ip":"183.70.5.142","operator":"电信","network":"AP","countrySymbol":"CN","areaCode":"86","areaLat":"29.431586","province":"重庆","areaLng":"106.912251","company":"","continentCode":"AP"},"status":200,"message":"查询成功"}'
    }



  render() {
    return (
      <ScrollView style={{width:ScreenWidth}}>
          <Image style={{width:ScreenWidth,height:1000}} source={require('../../images/epidemic_method.jpg')}></Image>
      </ScrollView>
    )
  }  
}


export default EpidemicMethod;