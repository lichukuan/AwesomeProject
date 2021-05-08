import React from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View,TouchableHighlight,DeviceEventEmitter, TextInput} from "react-native";
import Config from '../Config'
var that;

export default class EpidemicDataShow extends React.Component {
    constructor(props){
      super(props);
      this.navigation = props.navigation;
      this.state = {
          data:[]
      }
      that = this;
    }

    componentDidMount(){
        this.setState({
            data:Config.epidmic.children
        })
    }

    static renderLoadingView() {  
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#8bc9ff"/>
                </View>
        );
    }

    static renderMovie({item,index}) {
        // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
        console.log("==data===");
        console.log(item);
        const color = index % 2 == 0?'white':'#e9e9e9';
        console.log('index == '+index);
        return (
            <View style={{flexDirection:'row',height:70,backgroundColor:color}}>
                <Text style={{flex:1,textAlign:'center',textAlignVertical:'center',fontSize:18,color:'black',fontWeight:'bold'}}>{item.name}</Text>
                <Text style={{flex:1,textAlign:'center',textAlignVertical:'center',color:'red',fontSize:18}}>{item.today.confirm}</Text>
                <View style={{flexDirection:'column',flex:1,paddingBottom:5}}>
                    <Text style={{flex:1,textAlign:'center',textAlignVertical:'bottom',fontSize:18}}>{item.total.confirm}</Text>
                    <Text style={{textAlign:'center',textAlignVertical:'bottom',fontSize:15,color:'gray'}}>{'较昨日+'+item.today.confirm}</Text>
                </View>
                <Text style={{flex:1,textAlign:'center',textAlignVertical:'center',fontSize:18,color:'black'}}>{item.total.dead}</Text>
                <Text style={{flex:1,textAlign:'center',textAlignVertical:'center',fontSize:18,color:'black'}}>{item.total.heal}</Text>
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


     getIndex(item){
         const data = this.state.data;
         for(var i = 0;i < data.length;i++){
             if(data[i].objectId == item.objectId){
                 return i;
             }
         }
     }


    render(){  
       return (
           <View>
              <View style={{flexDirection:'row',height:60,backgroundColor:'#eee'}}>
                <Text style={{flex:1,textAlign:'center',textAlignVertical:'center',fontSize:18,color:'black',fontWeight:'bold'}}>地区</Text>
                <Text style={{flex:1,textAlign:'center',textAlignVertical:'center',color:'red',fontSize:18}}>现有确诊</Text>
                <Text style={{flex:1,textAlign:'center',textAlignVertical:'center',fontSize:18}}>确诊</Text>
                <Text style={{flex:1,textAlign:'center',textAlignVertical:'center',fontSize:18,color:'black'}}>死亡</Text>
                <Text style={{flex:1,textAlign:'center',textAlignVertical:'center',fontSize:18,color:'black'}}>治愈</Text>
            </View>
              <FlatList
                data={this.state.data}
                ItemSeparatorComponent={ItemDivideComponent}
                renderItem={EpidemicDataShow.renderMovie}
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
