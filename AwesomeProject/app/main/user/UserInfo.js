import React from 'react';
import {ActivityIndicator, FlatList, Dimensions,Image, StyleSheet, Text, View,TouchableHighlight,DeviceEventEmitter, TextInput} from "react-native";
import Config from '../Config'
var that;
//社区信息页
export default class UserInfo extends React.Component {
    constructor(props){
      super(props);
      this.navigation = props.navigation;
      this.state = {
          data:{
            real_name:'',
            address:'',
            mobilePhoneNumber:''
          },
          id:props.route.params.id,
      }
      that = this;
    }

    componentDidMount(){
       this.fetchData();
    }


    fetchData(){
            const url = 'https://api2.bmob.cn/1/classes/_User/'+this.state.id;
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
                    console.log(responseData);
                    const data = JSON.parse(responseData);
                    this.setState({
                        data: data,
                        loaded: true
                    });
            }).done();        
    }


    userImages(){
        this.navigation.navigate('显示图片',{
            images:[this.state.data.real_picture_url,this.state.data.id_card_picture_url]
        })
    }
     outAndInRecord(){

     }

     cardRecord(){

     }

     serviceCard(){

     }



    render(){
       const size = Dimensions.get('window').width * 0.3;
       const name = this.state.data.real_name;
       const address = this.state.data.address;
       const phone = this.state.data.mobilePhoneNumber;
       let post = '';
       if(Config.USER_POST == 'root'){
         post = '管理员'
       } else if(Config.USER_POST == 'worker'){
         post = '工作人员'
       } else if(Config.USER_POST == 'custom'){
           post = '住户'
       }else{
           post = '无'
       }
       return (
           <View style={{flexDirection:'column',flex:1,alignItems:'center'}}>
              {/* 头像界面 */}
              <Image source={require('../../images/code_bg.png')} style={{height:200,}}></Image>

              {/* 基本信息 */}
              <View style={{backgroundColor:'white',flexDirection:'column',height:220,alignItems:'center',width:Dimensions.get('window').width}}>
                    <Image source={require('../../images/defacult_icon.png')} style={{width:size,height:size,borderRadius:size/2,marginTop:-size/2}}></Image>
                    <Text style={{marginTop:10,fontSize:18,color:'gray',alignSelf:'flex-start',marginLeft:10}}>基本信息</Text>    
                    <View style={{flexDirection:'row',justifyContent:'flex-start',width:Dimensions.get('window').width,marginLeft:20,marginTop:10}}>
                         <View style={{flexDirection:'column'}}>
                            <Text style={{color:'gray',fontSize:18}}>姓名：</Text>
                            <Text style={{color:'gray',fontSize:18}}>职责</Text>
                            <Text style={{color:'gray',fontSize:18}}>社区地址</Text>
                            <Text style={{color:'gray',fontSize:18}}>电话号码</Text>
                         </View>
                            <View style={{flexDirection:'column',marginLeft:20}}>
                            <Text style={{fontSize:18,color:'black',marginLeft:20}}>{name}</Text> 
                            <Text style={{fontSize:18,color:'black',marginLeft:20}}>{post}</Text> 
                            <Text style={{fontSize:18,color:'black',marginLeft:20}}>{address}</Text> 
                            <Text style={{fontSize:18,color:'black',marginLeft:20}}>{phone}</Text> 
                         </View>
                    </View>
                    {/* <View style={{flexDirection:'row',alignSelf:'flex-start',marginLeft:20}}>
                    </View>    
                    <View style={{flexDirection:'row',alignSelf:'flex-start',marginLeft:20}}>
                    </View>  
                    <View style={{flexDirection:'row',alignSelf:'flex-start',marginLeft:20}}>
                    </View> 
                    <View style={{flexDirection:'row',alignSelf:'flex-start',marginLeft:20}}> */}
                    {/* </View>  */}
            </View>

            {/* 其他信息 */}
            <View style={{marginTop:10,backgroundColor:'white',flexDirection:'column',height:220,width:Dimensions.get('window').width}}>
            <Text style={{marginTop:10,fontSize:18,color:'gray',marginLeft:10,marginBottom:10}}>社区记录</Text>    
            
            <TouchableHighlight  activeOpacity={0.6}  style={{flex:1}}
                                 underlayColor="white" onPress={()=>{this.userImages()}}>
            <View style={style.item_container}>
                    <Text style={style.item_left}>认证信息</Text>
                    <Image
                    source={require('../../images/向右.png')}
                    style={{width:15,height:15,marginEnd:10}}/>  
            </View>
            </TouchableHighlight>
            <TouchableHighlight  activeOpacity={0.6}  style={{flex:1}}
                                 underlayColor="white" onPress={()=>{this.outAndInRecord()}}>
            <View style={style.item_container}>
                    <Text style={style.item_left}>出入记录</Text>
                    <Image
                    source={require('../../images/向右.png')}
                    style={{width:15,height:15,marginEnd:10}}/> 
            </View>   
            </TouchableHighlight> 
            <TouchableHighlight  activeOpacity={0.6}  style={{flex:1}}
                                 underlayColor="white" onPress={()=>{this.cardRecord()}}>
            <View style={style.item_container}>
                    <Text style={style.item_left}>打卡记录</Text>
                    <Image
                    source={require('../../images/向右.png')}
                    style={{width:15,height:15,marginEnd:10}}/> 
            </View>    
            </TouchableHighlight>


            <TouchableHighlight  activeOpacity={0.6}  style={{flex:1,marginBottom:10}}
                                 underlayColor="white" onPress={()=>{this.serviceCard()}}>
            <View style={style.item_container}>
                    <Text style={style.item_left}>服务记录</Text>
                    <Image
                    source={require('../../images/向右.png')}
                    style={{width:15,height:15,marginEnd:10}}/>  
            </View>
            </TouchableHighlight>
            </View>
            <View style={{flex:1}}></View>
            <View style={{marginTop:10,alignContent:'center',backgroundColor:'white',width:Dimensions.get('window').width,flexDirection:'row'}}>
                <TouchableHighlight  activeOpacity={0.6} underlayColor="#DDDDDD" style={{height:50,borderRadius:25,margin:10,flex:1}} onPress={()=>{
                    
                }}>
                <Text style={{ fontSize:20,color:'white',textAlignVertical:'center',textAlign:'center',height:50,backgroundColor:'skyblue',
                    borderRadius:10,alignContent:'center',alignItems:'center'}}>工作人员</Text>
                </TouchableHighlight>
                <TouchableHighlight  activeOpacity={0.6} underlayColor="#DDDDDD" style={{height:50,borderRadius:25,margin:10,flex:1}} onPress={()=>{
                    
                }}>
                <Text style={{ fontSize:20,color:'white',textAlignVertical:'center',textAlign:'center',height:50,backgroundColor:'skyblue',
                    borderRadius:10,alignContent:'center',alignItems:'center'}}>住户</Text>
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



