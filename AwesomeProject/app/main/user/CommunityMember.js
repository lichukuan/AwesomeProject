import React, {Component} from "react";

import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View,TouchableHighlight, Button} from "react-native";
import Config from "../Config";
var that;
export default class CommunityMember extends React.Component {

    static navigationOptions = {
        title: '申请列表项',
        headerStyle: {
            backgroundColor: '#8bc9ff',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        };
        console.log(props);
        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
        //this.fetchData = this.fetchData.bind(this);
        that = this;
        this.navigation=props.navigation;   
     }

    componentDidMount() {
        this.fetchData();
        
    }

    fetchData() {
            const commitId = Config.user.create_community_id;
            const url = 'https://api2.bmob.cn/1/classes/CmmunityMember?where='+JSON.stringify({
                  state:'agree',
                  community_id:commitId
            });
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
                console.log("获取的申请为："+responseData);
                const data = JSON.parse(responseData);
                this.setState({
                    data: data.results,
                    loaded: true
                });
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
        return (
            <TouchableHighlight  onPress={()=>{that.click(item)}}>
                <View style={styles.container}>
                <Image
                    source={require('../../images/icon.jpg')}
                    style={styles.thumbnail}/>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{item.user_name}</Text>
                    <Text style={styles.title}>{item.updatedAt}</Text>
                </View>
                <Button title='删除'></Button>
                </View>
            </TouchableHighlight>
        );
    }

    click(item){
       console.log("item==============");
       console.log(item);
    //    DeviceEventEmitter.emit(Config.USER_FRAGMENT_COMMUNITY_CHANGE,'ApplyForJoinCommunityNumberinfor');
     //  this.navigation.navigate('info',{value:item});
    }

    render() {
        if (!this.state.loaded) {
            return CommunityMember.renderLoadingView();
        }

        return (
            <FlatList
                data={this.state.data}
                ItemSeparatorComponent={ItemDivideComponent}
                renderItem={CommunityMember.renderMovie}
                style={styles.list}
                keyExtractor={(item, index) => item.objectId}
            />
        );
    }
}

class ItemDivideComponent extends React.Component {
    render() {
        return (
            <View style={{height: 0.5, backgroundColor: 'gray'}}/>
        );
    }
}

const styles = StyleSheet.create({
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
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 9,
        justifyContent: 'flex-start',
    },
    year: {
        fontSize: 15,
        marginBottom: 5,
    },
    introduce: {
        flex: 1,
        fontSize: 14,
        color: '#000',
        marginBottom: 5,
    },
    ratingNum: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffad24'
    },
    info: {
        fontSize: 16,
        color: '#000',
        marginRight: 3,
        marginBottom: 5,
    },
    thumbnail: {
        width: 60,
        height: 60
    },
    list: {
        backgroundColor: "#FFF"
    }
});
