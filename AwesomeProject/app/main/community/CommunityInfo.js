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
        //this.fetchData();
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
           <View style={{flexDirection:'column',flex:1}}>
              {/* 社区基本信息  */}
              <View style={{flexDirection:'column',backgroundColor:'white',paddingTop:10,paddingLeft:10,height:120}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image
                    source={require('../../images/defacult_icon.png')}
                    style={{width:60,height:60}}/>
                <View style={{flexDirection:'column',marginLeft:10}}>
                    <Text style={{color:'black',fontSize:18}}>{'社区名'}</Text>
                    <Text style={{color:'black',fontSize:18}}>{'id'}</Text>
                </View>
              </View>  
              <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
              <Image
                    source={require('../../images/defacult_icon.png')}
                    style={{width:20,height:20}}/>
                  <Text style={{marginLeft:10,flex:1}}>{'2020/9/1'}</Text>
                  <Image
                    source={require('../../images/defacult_icon.png')}
                    style={{width:20,height:20,marginEnd:20}}/>    
              </View>  
              </View>

              {/* 负责人信息 */}
            <View style={{marginTop:10,backgroundColor:'white',flexDirection:'column',height:110}}>
            <Text style={{marginTop:10,fontSize:18,color:'gray',marginLeft:10}}>负责人信息</Text>    
            <View style={style.item_container}>
                    <Text style={style.item_left}>姓名</Text>
                    <Text style={{fontSize:18,color:'black'}}>{'刘彦斌'}</Text> 
            </View>    
            <View style={style.item_container}>
                    <Text style={style.item_left}>联系电话</Text>
                    <Text style={{fontSize:18,color:'black'}}>{'xxxxxxxxxxxx'}</Text> 
            </View>   
            </View>

            {/* 社区详情 */}
            <View style={{marginTop:10,backgroundColor:'white',flexDirection:'column',height:180}}>
            <Text style={{marginTop:10,fontSize:18,color:'gray',marginLeft:10}}>社区详情</Text>    
            <View style={style.item_container}>
                    <Text style={style.item_left}>位置</Text>
                    <Image
                    source={require('../../images/defacult_icon.png')}
                    style={{width:20,height:20,marginEnd:20}}/> 
            </View>    
            <View style={style.item_container}>
                    <Text style={style.item_left}>管理员</Text>
                    <Image
                    source={require('../../images/defacult_icon.png')}
                    style={{width:20,height:20,marginEnd:20}}/> 
            </View>    
            <View style={style.item_container}>
                    <Text style={style.item_left}>社区成员</Text>
                    <Image
                    source={require('../../images/defacult_icon.png')}
                    style={{width:20,height:20,marginEnd:20}}/>  
            </View>
            <View style={style.item_container}>
                    <Text style={style.item_left}>社区图片</Text>
                    <Image
                    source={require('../../images/defacult_icon.png')}
                    style={{width:20,height:20,marginEnd:20}}/>  
            </View>
            </View>


            {/* 管理员功能 */}
            <View style={{marginTop:10,backgroundColor:'white',flexDirection:'column',height:180}}>
                <Text style={{marginTop:10,fontSize:18,color:'gray',marginLeft:10}}>管理员功能</Text>
                <View style={{flexDirection:'row',marginLeft:10,marginEnd:10,marginTop:10,flex:1,alignItems:'center',justifyContent:'space-between',flexWrap:'wrap'}}>
                    <View style={{flexDirection:'column'}}>
                        <Image source={require('../../images/水电费.png')} style={{width:30,height:30,alignSelf:'center'}}></Image>
                        <Text>代缴水电费</Text>
                    </View>
                    <View style={{flexDirection:'column',marginBottom:5,marginLeft:20}}>
                        <Image source={require('../../images/房租.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>代缴房租</Text>
                    </View>
                    <View style={{flexDirection:'column',marginBottom:5,marginLeft:20}}>
                        <Image source={require('../../images/停车场.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>停车服务</Text>
                    </View>
                    <View style={{flexDirection:'column',marginBottom:5,marginLeft:10}}>
                        <Image source={require('../../images/失物招领.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>失物招领</Text>
                    </View>
                    <View style={{flexDirection:'column',marginBottom:5,marginLeft:10,marginTop:10}}>
                        <Image source={require('../../images/快递员.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>代取快递</Text>
                    </View>
                </View>
            </View>
            <View style={{flex:1}}>

            </View>
            {/* 申请加入 */}
            <View style={{marginTop:10,alignContent:'center',backgroundColor:'white'}}>
               <TouchableHighlight  activeOpacity={0.6} underlayColor="#DDDDDD" style={{height:50,borderRadius:25,margin:10}} onPress={()=>{
                   
               }}>
                <Text style={{ fontSize:20,color:'white',textAlignVertical:'center',textAlign:'center',height:50,backgroundColor:'skyblue',
                      borderRadius:10,alignContent:'center',alignItems:'center'}}>申请加入</Text>
               </TouchableHighlight>
           </View>
           </View>
       )
    }
    
}

const style = StyleSheet.create({
    item_container:{
        flex:1,
        flexDirection:'row',
        marginVertical:5,
        marginLeft:10,
        marginEnd:10
     },
     item_left:{
         flex:1,fontSize:18,
         color:'black'
     },
     item_right:{
         fontSize:18,
         color:'gray'
     }

  });

