import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableHighlight,
    Alert
} from 'react-native';
import Config from '../Config'
var JsonData=require('./banner.json');
const ScreenWidth  = Dimensions.get('window').width
const BANNER_IMGS = [
    require('../../images/community_bag.jpg'),
    require('../../images/protect.png'),
    require('../../images/epidemic.png')
]
class BagView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage:0
        };
        
        this.navigation = props.nav;
        console.log(props);
    }

    //渲染图片列表
    renderChilds = ()=> {
        return JsonData.data.map((item, i)=> {
            const res = item.img;
            
            return (
                <TouchableHighlight key={`item${i}`} onPress = {()=>this.deal(item,i)}>
                    <View>
                    <Image  source={BANNER_IMGS[i]} style={styles.imageStyle}></Image>
                   <Text style={{marginTop:-30,color:'white',textAlign:'right',fontSize:20,marginRight:30}}>{item.title}</Text>
                    </View>
                </TouchableHighlight>
            );
        });
    }

   deal(item,i){
    if(loginCheck()){
        console.log('i = '+i);
        if(i == 0){
            this.navigation.navigate('我的社区');
        }else if(i == 1){
            this.navigation.navigate('防疫方法');
        }else{
            this.navigation.navigate('当前疫情');
        }
    }
        
   }


    //渲染圆
    renderCircles = ()=>{
        return JsonData.data.map((item, i)=> {
            var style = {};
            //当前页面的的指示器，橘黄色
            // if(i === this.state.currentPage){
            //     style = {color:'orange'};
            // }
            return <Text key={`text${i}`} style={[styles.circleStyle,style]}></Text>
        });
    }
    //滚动的回调
    handleScroll = (e)=>{
        var x = e.nativeEvent.contentOffset.x;
        var currentPage = 0;
        if(x / ScreenWidth < 0.5){
            currentPage = 0;
        }else{
            currentPage = parseInt((x / ScreenWidth))+1;
        }
        
        this.setState({currentPage:currentPage});
        var offsetX = currentPage * ScreenWidth;
        this.refs.scrollView.scrollTo({x:offsetX,y:0,animated:true});
        console.log("currentPage:"+currentPage);
    }

    //定时器
    startTimer = ()=>{
        this.timer = setInterval(()=>{
            //计算出要滚动到的页面索引，改变state
            var currentPage = ++this.state.currentPage == JsonData.data.length ? 0 : this.state.currentPage;
            this.setState({currentPage:currentPage});
            //计算滚动的距离
            var offsetX = currentPage * ScreenWidth;
            this.refs.scrollView.scrollTo({x:offsetX,y:0,animated:true});
            
        },10000);
    }
    //开始滑动
    handleScrollBegin = ()=>{
        console.log("handleScrollBegin");
        clearInterval(this.timer);
    }

    handleScrollEnd = ()=>{
        console.log("handleScrollEnd");
        this.startTimer();
    }

    render() {
        return <View style={styles.container}>
            {/*注释不能卸载<>括号里面，
             其他的事件：http://blog.csdn.net/liu__520/article/details/53676834
             ViewPager onPageScoll onPageSelected onScroll={this.handleScroll}*/}
            <ScrollView
                ref="scrollView"
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                onMomentumScrollEnd={this.handleScroll}
                onScrollBeginDrag={this.handleScrollBegin}
                onScrollEndDrag={this.handleScrollEnd}>
                {/*子元素*/}
                {this.renderChilds()}
            </ScrollView>
            <View style={styles.circleWrapperStyle}>
                {this.renderCircles()}
            </View>
        </View>;
    }

    //定时器
    componentDidMount = ()=>{
        this.startTimer();
    }
    //取消定时器
    componentWillUnmount =() => {
        clearInterval(this.timer);
    }
}

function loginCheck(){
    if(!Config.IS_LOGIN){
        Alert.alert(
            '是否登录',
            '只有登录了才能使用此功能哦~',
            [
              {
                  text:'我再看看',onPress:() => {

                  }
              }  
              ,  
              {
                text: '去登录', onPress: () => {
                   that.navigation.navigate('登录')
                }
              }
            ],
            {cancelable: false}
          )
        return false;  
    }
    return true;
}

var styles = StyleSheet.create({
    container: {
        flexDirection:'column'
    },
    imageStyle: {
        width: ScreenWidth,
        height: 200
    },
    circleWrapperStyle:{
        flexDirection:'row',
        //absolute“绝对”定位，参照标准父容器
        //relative “相对”对位，相对于原来的位置
        position:'absolute',
        bottom:0,
        left:10
    },
    circleStyle:{
        fontSize:25,
        color:'#FFF'
    }
});

export default BagView;
