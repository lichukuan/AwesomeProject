import React from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View,TouchableHighlight,DeviceEventEmitter, TextInput} from "react-native";
import Config from '../Config'
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';
var that;
//社区信息页
export default class CommunityInfo extends React.Component {
    constructor(props){
      super(props);
      this.navigation = props.navigation;
      this.state = {
          data:{},
          id:props.route.params.id,
          customBackgroundDialog: false,
            defaultAnimationDialog: false,
            scaleAnimationDialog: false,
            slideAnimationDialog: false,
      }
      that = this;
    }

    static navigationOptions = 
        {
            title: ''
    };

    componentDidMount(){
        this.fetchData();
    }


    fetchData(){
            const url = 'https://api2.bmob.cn/1/classes/Community/'+this.state.id;
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
                    this.setState({
                        data: data,
                        loaded: true
                    });
            }).done();        
    }


    communityImages(){
        this.navigation.navigate('显示图片',{
            images:this.state.data.images
        })
    }
    
    location(){
        this.setState({
            defaultAnimationDialog: true,
          });
    }


    showQrInfo(){
      this.navigation.navigate('二维码信息',{
        type:0,
        data:this.state.data
      })
    }

    askForLeave(){
      this.navigation.navigate('请假列表')
  }

  errorList(){
      //OutAndInErrorList
      this.navigation.navigate('出入异常列表')
  }

  applyCommunityList(){//申请列表
    this.navigation.navigate('申请列表');
  }

  showCommunityMember(){
    console.log('社区人员');
    this.navigation.navigate('社区人员');
  }

  showQRCode(){
    console.log('展示二维码');
    this.navigation.navigate('出入二维码',{itemId:22,key:'QrCodeShow'});
  }

  //体温异常列表
  healthErrorList(){

  }


    render(){  
       const community = this.state.data; 
       const page = Config.apply_for_id != null?<View/>:<JoinCommunityCompont/>;
       console.log('Config.apply_for_id = '+Config.apply_for_id);
       return (
           <View style={{flexDirection:'column',flex:1}}>
              {/* 社区基本信息  */}
              <View style={{flexDirection:'column',backgroundColor:'white',paddingTop:10,paddingLeft:10,height:120}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image
                    source={{uri:community.community_pic}}
                    style={{width:56,height:56,borderRadius:28}}/>
                <View style={{flexDirection:'column',marginLeft:10}}>
                    <Text style={{color:'black',fontSize:18}}>{community.community_name}</Text>
                    <Text style={{color:'gray',fontSize:16}}>{community.community_id}</Text>
                </View>
              </View>  
              <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
              <Image
                    source={require('../../images/时钟.png')}
                    style={{width:14,height:14,marginLeft:2}}/>
                  <Text style={{marginLeft:10,flex:1}}>{community.createdAt}</Text>
                  <TouchableHighlight  activeOpacity={0.6}  style={{width:20,height:20,marginEnd:20}}
                                 underlayColor="white" onPress={()=>{this.showQrInfo()}}>
                  <Image
                    source={require('../../images/二维码.png')}
                    style={{width:20,height:20}}/>   
                                 </TouchableHighlight>
                  
              </View>  
              </View>

              {/* 负责人信息 */}
            <View style={{marginTop:10,backgroundColor:'white',flexDirection:'column',height:110}}>
            <Text style={{marginTop:10,fontSize:18,color:'gray',marginLeft:10}}>负责人信息</Text>    
            <View style={style.item_container}>
                    <Text style={style.item_left}>姓名</Text>
                    <Text style={{fontSize:18,color:'black'}}>{community.create_user_name}</Text> 
            </View>    
            <View style={style.item_container}>
                    <Text style={style.item_left}>联系电话</Text>
                    <Text style={{fontSize:18,color:'black'}}>{community.create_user_phone}</Text> 
            </View>   
            </View>

            {/* 社区详情 */}
            <View style={{marginTop:10,backgroundColor:'white',flexDirection:'column',height:160}}>
            <Text style={{marginTop:10,fontSize:18,color:'gray',marginLeft:10}}>社区详情</Text>    
            <TouchableHighlight  activeOpacity={0.6}  style={{flex:1,marginBottom:10}}
                                 underlayColor="white" onPress={()=>{this.location()}}>
            <View style={style.item_container}>
                    <Text style={style.item_left}>位置</Text>
                    <Image
                    source={require('../../images/向右.png')}
                    style={{width:20,height:20,marginEnd:10}}/> 
            </View>   
            </TouchableHighlight> 
            <View style={style.item_container}>
                    <Text style={style.item_left}>管理员</Text>
                    <Image
                    source={require('../../images/向右.png')}
                    style={{width:20,height:20,marginEnd:10}}/> 
            </View>    
            {/* <View style={style.item_container}>
                    <Text style={style.item_left}>社区成员</Text>
                    <Image
                    source={require('../../images/向右.png')}
                    style={{width:20,height:20,marginEnd:10}}/>  
            </View> */}
            <TouchableHighlight  activeOpacity={0.6}  style={{flex:1,marginBottom:10}}
                                 underlayColor="white" onPress={()=>{this.communityImages()}}>
            <View style={style.item_container}>
                    <Text style={style.item_left}>社区图片</Text>
                    <Image
                    source={require('../../images/向右.png')}
                    style={{width:20,height:20,marginEnd:10}}/>  
            </View>
            </TouchableHighlight>
            </View>
            

            {/* 管理员功能 */}
            {
              Config.IS_ROOT == false?null:
              (
                <View style={{marginTop:10,backgroundColor:'white',flexDirection:'column',height:200}}>
                <Text style={{marginTop:10,fontSize:18,color:'gray',marginLeft:10}}>管理员功能</Text>
                <View style={{flexDirection:'row',marginLeft:10,marginEnd:10,marginTop:10,flex:1,alignItems:'center',justifyContent:'space-between',flexWrap:'wrap'}}>
                <TouchableHighlight  activeOpacity={0.6}
                                 underlayColor="white" onPress={()=>{this.showQRCode()}}>
                    <View style={{flexDirection:'column'}}>
                        <Image source={require('../../images/二维码.png')} style={{width:30,height:30,alignSelf:'center'}}></Image>
                        <Text>出入二维码</Text>
                    </View>
                </TouchableHighlight>  

                <TouchableHighlight  activeOpacity={0.6} style={{marginLeft:20}}
                                 underlayColor="white" onPress={()=>{this.showCommunityMember()}}>  
                    <View style={{flexDirection:'column'}}>
                        <Image source={require('../../images/人.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>社区人员</Text>
                    </View>
                </TouchableHighlight>   

                 <TouchableHighlight  activeOpacity={0.6} style={{marginLeft:20}}
                                 underlayColor="white" onPress={()=>{this.applyCommunityList()}}>   
                    <View style={{flexDirection:'column'}}>
                        <Image source={require('../../images/申请开班.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>申请列表</Text>
                    </View>
                </TouchableHighlight> 
                <TouchableHighlight  activeOpacity={0.6} style={{marginLeft:10}}
                                 underlayColor="white" onPress={()=>{this.askForLeave()}}>  
                    <View style={{flexDirection:'column',paddingTop:3}}>
                        <Image source={require('../../images/请假.png')} style={{width:30,height:30,alignSelf:'center'}}></Image>
                        <Text>请假列表</Text>
                    </View>
                  </TouchableHighlight>  
                  <TouchableHighlight  activeOpacity={0.6} style={{marginBottom:10,marginLeft:20}}
                                 underlayColor="white" onPress={()=>{this.errorList()}}> 
                    <View style={{flexDirection:'column'}}>
                        <Image source={require('../../images/异常.png')} style={{width:30,height:30,alignSelf:'center'}}></Image>
                        <Text>出入异常</Text>
                    </View>
                    </TouchableHighlight>

                    <TouchableHighlight  activeOpacity={0.6} style={{marginTop:20}}
                                 underlayColor="white" onPress={()=>{this.healthErrorList()}}> 
                    <View style={{flexDirection:'column',marginBottom:5,}}>
                        <Image source={require('../../images/体温计.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
                        <Text>体温异常列表</Text>
                    </View>
                    </TouchableHighlight>
                </View>
            </View>

              )
            }
            <View style={{flex:1}}></View>
            {/* 申请加入 */}
            {page}

            <Dialog
          onDismiss={() => {
            this.setState({ defaultAnimationDialog: false });
          }}
          width={0.9}
          visible={this.state.defaultAnimationDialog}
          rounded
          actionsBordered
          // actionContainerStyle={{
          //   height: 100,
          //   flexDirection: 'column',
          // }}
          dialogTitle={
            <DialogTitle
              title="详细位置"
              style={{
                backgroundColor: '#F7F7F8',
                alignItems:'center',
                fontSize:30
              }}
              hasTitleBar={false}
              align="left"
            />
          }
          footer={
            <DialogFooter>
              {/* <DialogButton
                text="CANCEL"
                bordered
                onPress={() => {
                  this.setState({ defaultAnimationDialog: false });
                }}
                key="button-1"
              />   */}
              <DialogButton
                text="确定"
                bordered
                onPress={() => {
                  this.setState({ defaultAnimationDialog: false });
                }}
                key="button-1"
              />
            </DialogFooter>
          }
        >
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8',
            }}
          >
        <Text style={{color:'gray',fontSize:18,marginTop:10}}>{community.location}</Text>

          </DialogContent>
        </Dialog>
  
           </View>
       )
    }
    
}

function JoinCommunityCompont(){
    return (<View style={{marginTop:10,alignContent:'center',backgroundColor:'white'}}>
    <TouchableHighlight  activeOpacity={0.6} underlayColor="#DDDDDD" style={{height:50,borderRadius:25,margin:10}} onPress={()=>{
         requestJoin();
    }}>
     <Text style={{ fontSize:20,color:'white',textAlignVertical:'center',textAlign:'center',height:50,backgroundColor:'skyblue',
           borderRadius:10,alignContent:'center',alignItems:'center'}}>申请加入</Text>
    </TouchableHighlight>
</View>)
}

function requestJoin(){
  const user_name = Config.user.user_name;
  const user_id = Config.user.user_id; 
  var name = that.state.data.community_name;
  var id = that.state.data.community_id;
  const url = 'https://api2.bmob.cn/1/classes/CmmunityMember';
  var fetchOptions = {
      method: 'POST',
      headers: {
      'X-Bmob-Application-Id': Config.BMOB_APP_ID,
      'X-Bmob-REST-API-Key': Config.REST_API_ID,
      'Content-Type': 'application/json',
      'X-Bmob-Session-Token':Config.SESSION_TOKEN
      },
      body: JSON.stringify({
         user_name:user_name,
         user_id:user_id,
         community_user_id:user_id,
         community_id:id,
         community_name:name,
         state:'request',
         post:'custom'
      })
  };
  fetch(url, fetchOptions)
  .then((response) => response.text())
  .then((responseText) => {
      const data = JSON.parse(responseText);
      console.log(data);
      that.navigation.goBack();    
  }).done(); 
  console.log('创建社区');   
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

