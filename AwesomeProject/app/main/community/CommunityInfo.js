import React from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View,TouchableHighlight,DeviceEventEmitter, TextInput} from "react-native";
import Config from '../Config'
var that;
let searchText = '';
//社区信息页
export default class CommunityInfo extends React.Component {
    constructor(props){
      super(props);
      this.navigation = props.navigation;
      this.state = {
          data:searchText
      }
      that = this;
      searchText = '';
    }

    static navigationOptions = 
        {
            title: ''
    };

    componentDidMount(){
        this.fetchData();
    }


    fetchData(){
            const url = 'https://api2.bmob.cn/1/classes/Community';
            var fetchOptions = {
                method: 'GET',
                headers: {
                'X-Bmob-Application-Id': Config.BMOB_APP_ID,
                'X-Bmob-REST-API-Key': Config.REST_API_ID,
                'Content-Type': 'application/json'
                }
            };
            fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseData) => {
                const data = JSON.parse(responseData);
                if(data.results.length > 0){
                    this.setState({
                        data: data.results,
                        loaded: true
                    });
                }
            }).done();        
    }


    

    render(){  
       return (
           <View>
              <View style={{flexDirection:'row'}}>
                <Image
                    source={require('../images/defacult_icon.png')}
                    style={{width:100,height:100}}/>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{item.community_name}</Text>
                    <Text style={styles.title}>{'管理员: '+item.create_user_name}</Text>
                </View>
              </View>               
              
           </View>
       )
    }
    
}
