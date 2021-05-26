// 'use strict';
// import React, { PureComponent } from 'react';
// import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { RNCamera } from 'react-native-camera';

// class ScanQrcode extends PureComponent {
//   render() {
//     return (
//       <View style={styles.container}>
//         <RNCamera
//           ref={ref => {
//             this.camera = ref;
//           }}
//           style={styles.preview}
//           type={RNCamera.Constants.Type.back}
//           flashMode={RNCamera.Constants.FlashMode.on}
//           androidCameraPermissionOptions={{
//             title: 'Permission to use camera',
//             message: 'We need your permission to use your camera',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           androidRecordAudioPermissionOptions={{
//             title: 'Permission to use audio recording',
//             message: 'We need your permission to use your audio',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           onGoogleVisionBarcodesDetected={({ barcodes }) => {
//             console.log(barcodes);
//           }}
//         />
//         <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//           <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
//             <Text style={{ fontSize: 14 }}> SNAP </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }

//   takePicture = async () => {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       const data = await this.camera.takePictureAsync(options);
//       console.log(data.uri);
//     }
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//     marginTop:50
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20,
//   },
// });

// export default ScanQrcode;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  InteractionManager,
  Animated,
  Easing,
  Image,
  Alert,
  Vibration,
  Dimensions,
  Platform
} from 'react-native';
import {RNCamera} from 'react-native-camera';
export default class ScanQrcode extends React.Component {
  
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      show:true,
      animation: new Animated.Value(0),
      value:props.route.params.value,
      type:props.route.params.type
    };
  }
  
  componentDidMount(){
    InteractionManager.runAfterInteractions(()=>{
      this.startAnimation()
    });
  }
  
  componentWillUnmount(){
    this.setState({
      show: false
    })
  }
  
  startAnimation(){
    if(this.state.show){
      this.state.animation.setValue(0);
      Animated.timing(this.state.animation,{
        toValue:1,
        duration:1500,
        easing:Easing.linear,
        useNativeDriver: false
      }).start(()=>this.startAnimation());
    }
  }
  //type&content
  //type:1表示用户信息，2表示社区信息，3表示出入二维码
  //content:具体内容
  render() {
    let scanView = null;
    if (Platform.OS === 'ios') {
      scanView = (
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          flashMode={RNCamera.Constants.FlashMode.auto}
          onBarCodeRead={(e) => this.barcodeReceived(e)}
        >
          <View style = {{height: '100%', width:width, backgroundColor:'rgba(0,0,0,0.5)',}}>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={styles.itemStyle}/>
            <View style={styles.rectangle}>
              <Image
                style={[styles.rectangle, {position:'absolute', left: 0, top: 0}]}
                source={require('../../images/icon_scan_rect.png')}
              />
              <Animated.View style={[styles.animatedStyle, {
                transform: [{
                  translateY: this.state.animation.interpolate({
                    inputRange: [0,1],
                    outputRange: [0,200]
                  })
                }]
              }]}>
              </Animated.View>
            </View>
            <View style={styles.itemStyle}/>
          </View>
          <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)',width:width,alignItems:'center'}}>
            <Text style={styles.textStyle}>将二维码放入框内，即可自动扫描</Text>
          </View>
        </RNCamera>
      )
    } else {
      scanView = (
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE}
          flashMode={RNCamera.Constants.FlashMode.auto}
          onBarCodeRead={(e) => this.barcodeReceived(e)}
        >
          <View style = {{height: (height-244)/3, width:width, backgroundColor:'rgba(0,0,0,0.5)',}}>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={styles.itemStyle}/>
            <View style={styles.rectangle}>
              <Image
                style={[styles.rectangle, {position:'absolute', left: 0, top: 0}]}
                source={require('../../images/icon_scan_rect.png')}
              />
              <Animated.View style={[styles.animatedStyle, {
                transform: [{
                  translateY: this.state.animation.interpolate({
                    inputRange: [0,1],
                    outputRange: [0,200]
                  })
                }]
              }]}>
              </Animated.View>
            </View>
            <View style={styles.itemStyle}/>
          </View>
          <View style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.5)',width:width,alignItems:'center'}}>
            <Text style={styles.textStyle}>将二维码放入框内，即可自动扫描</Text>
          </View>
        </RNCamera>
      )
    }
    return (
      <View style={{height:'100%'}}>
          <View style={styles.container}>
          {scanView}
          </View>
      </View>
    );
  }
  
  barcodeReceived(e) {
    if (this.state.show) {
      this.state.show = false;
      if (e) {
        Vibration.vibrate([0, 500], false);
        let result = e.data;
        this.navigation.goBack();
        console.log('===========result========');
        console.log(result);
        console.log('===========result========');
        this.navigation.navigate('出入结果',{
          item:this.state.value,
          type:this.state.type,
          res:result
        }) 
        // Alert.alert(
        //   '扫描成功',
        //   '扫描结果：' + result,
        //   [
        //     {
        //       text: '确定', onPress: () => {
        //         this.setState({
        //           show: true
        //         })
        //       }
        //     }
        //   ],
        //   {cancelable: false}
        // )
      } else {
        Alert.alert(
          '提示',
          '扫描失败，请将手机对准二维码重新尝试',
          [
            {
              text: '确定', onPress: () => {
                this.setState({
                  show: true
                })
              }
            }
          ],
          {cancelable: false}
        )
      }
    }
  }
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
  },
  itemStyle:{
    backgroundColor:'rgba(0,0,0,0.5)',
    width:(width-200)/2,
    height:200
  },
  textStyle:{
    color:'#fff',
    marginTop:20,
    fontWeight:'bold',
    fontSize:18
  },
  animatedStyle:{
    height:2,
    backgroundColor:'#00c050'
  },
  rectangle: {
    height: 200,
    width: 200,
  }
});