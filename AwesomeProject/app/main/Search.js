import React from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View,TouchableHighlight,DeviceEventEmitter, TextInput} from "react-native";
import Config from './Config'
var that;
let searchText = '';

export default class Search extends React.Component {
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
            title: '',
            header: ()=>(
                     <View style={{height:0}}></View>
                   )
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


    static renderLoadingView() {  
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#8bc9ff"/>
                </View>
        );
    }

    static renderMovie({item}) {
        // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
        console.log("==data===");
        console.log(item);
        const p = item.item;
        const type = item.type;
        return (
            <View  >
            <View style={styles.container}>
            <Image
                source={{uri:item.community_pic}}
                style={{width:80,height:80}}/>
            <View style={styles.rightContainer}>
                <Text style={styles.title}>{item.community_name}</Text>
                <Text style={styles.title}>{'管理员: '+item.create_user_name}</Text>
            </View>
            </View>
        </View>
        );
    }

    getmyDate(plus) {
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth()+1).toString();
        var day = (date.getDate()+parseInt(plus)) - 1;
        console.log(day);
        return year+'-'+month+'-'+day;
     }

     back(){

     }


     getIndex(item){
         const data = this.state.data;
         for(var i = 0;i < data.length;i++){
             if(data[i].objectId == item.objectId){
                 return i;
             }
         }
     }

     click(item){
         // console.log("item==============");
         // console.log(item);
         // DeviceEventEmitter.emit(Config.USER_FRAGMENT_COMMUNITY_CHANGE,'ApplyForJoinCommunityNumberinfor');
         //this.navigation.navigate('info',{value:item});
     }

    render(){  
       return (
           <View>
             <View style={{flexDirection:'row',backgroundColor:'white',height:60,alignItems:'center'}}>
                         <TouchableHighlight onPress={()=>this.back()}>
                         <Image source={require('../images/back_gray.png')} style={{height:35,width:35,marginLeft:10}} ></Image>
                         </TouchableHighlight>
                         <TextInput onChangeText={(text) => {
                             console.log('内容为 = '+text);
                             this.searchText = text}}  style={{backgroundColor:'#F6F6F6',height:40,borderRadius:20,textAlignVertical:'center',paddingLeft:20,marginLeft:10,marginRight:10,flex:1}} placeholder='搜索社区...'></TextInput> 
                         
                         <TouchableHighlight onPress={()=>{
                                 console.log('--搜索'); 
                                 this.setState({
                                     data:searchText
                                 })
                         }}>
                         <Image source={require('../images/news_search.png')} style={{height:40,width:40,marginRight:10}} ></Image>
                         </TouchableHighlight>
                         
                      </View>
              <FlatList
                data={this.state.data}
                ItemSeparatorComponent={ItemDivideComponent}
                renderItem={Search.renderMovie}
                keyExtractor={(item, index) => item.objectId}
               />
           </View>
       )
    }
    
}

class ItemDivideComponent extends React.Component {
    render() {
        return (
            <View style={{height: 0, backgroundColor: 'gray'}}/>
        );
    }
}

const styles = StyleSheet.create({
    item_container:{
       flex:1,
       flexDirection:'row',
       marginVertical:5
    },
    item_left:{
        flex:1,fontSize:18,
        color:'gray'
    },
    item_right:{
        fontSize:18,
        color:'gray'
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#F5FCFF",
        padding: 5
    },
    rightContainer: {
        flex: 1,
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent:'center'
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 9,
        justifyContent: 'flex-start',
    }
});
