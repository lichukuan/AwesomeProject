import React from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View,TouchableHighlight,DeviceEventEmitter, TextInput} from "react-native";

var that;
//辟谣一线
export default class EpidemicErrorMessage extends React.Component {
    constructor(props){
      super(props);
      this.navigation = props.navigation;
      this.state = {
          results:[]
      }
      that = this;
    }

    componentDidMount(){
        this.fetchData();
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
                imgsrc:data.data.items[i].imgsrc,
                docid:data.data.items[i].docid
              }
            }
            that.setState({
                results:items
            })
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
        return (
            <TouchableHighlight onPress={()=>that.click(item)} style={{backgroundColor:'white',marginHorizontal:10,height:120,justifyContent:'center',alignContent:'center',alignItems:'center'}} activeOpacity={0.6}
            underlayColor="#DDDDDD">
            <View style={styles.container}>
                <Image
                    source={{uri:item.imgsrc}}
                    style={{width:85,height:85,alignSelf:'center'}}/>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.title}>{item.ptime}</Text>
                </View>
            </View>
        </TouchableHighlight>
        );
    }

     click(item){
         // console.log("item==============");
         // console.log(item);
         // DeviceEventEmitter.emit(Config.USER_FRAGMENT_COMMUNITY_CHANGE,'ApplyForJoinCommunityNumberinfor');
         //this.navigation.navigate('info',{value:item});
         this.navigation.navigate('error_message',item)
     }

    render(){  
       return (
           <View>
              <FlatList
                data={this.state.results}
                ItemSeparatorComponent={ItemDivideComponent}
                renderItem={EpidemicErrorMessage.renderMovie}
                keyExtractor={(item, index) => item.objectId}
               />
           </View>
       )
    }
    
}

class ItemDivideComponent extends React.Component {
    render() {
        return (
            <View style={{height: 0, backgroundColor: 'gray',marginHorizontal:10}}/>
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
