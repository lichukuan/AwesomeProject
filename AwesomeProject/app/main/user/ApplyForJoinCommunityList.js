import React, {Component} from "react";

import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View} from "react-native";
import Config from "../Config";
export default class ApplyForJoinCommunityList extends React.Component {

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
        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
        this.fetchData = this.fetchData.bind(this);
        Config.JOINED_USER_COMMUNITY_ID = '7f2a5c2d-c970-4ff4-a9a1-d80bd4dda15a';
    }

    componentDidMount() {
        this.fetchData();
        
    }

    fetchData() {
            const url = 'https://api2.bmob.cn/1/classes/_User?where='+JSON.stringify({
                  apply_for_id:Config.JOINED_USER_COMMUNITY_ID
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
                //this.navigation.goBack();    
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
            <View style={styles.container} onPress = {()=>{this.click(item)}}>
                <Image
                    source={require('../../images/icon.jpg')}
                    style={styles.thumbnail}/>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{item.username}</Text>
                    <Text style={styles.title}>{item.updatedAt}</Text>
                </View>
            </View>
        );
    }

    click(item){
       
    }

    render() {
        if (!this.state.loaded) {
            return ApplyForJoinCommunityList.renderLoadingView();
        }

        return (
            <FlatList
                data={this.state.data}
                ItemSeparatorComponent={ItemDivideComponent}
                renderItem={ApplyForJoinCommunityList.renderMovie}
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
