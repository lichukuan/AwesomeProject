import React from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View,TouchableHighlight,DeviceEventEmitter, TextInput,Dimensions} from "react-native";
import Config from '../Config'
import ImageViewer from 'react-native-image-zoom-viewer';
const images = [
    {
      url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    },
    {
      url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    },
    {
      url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    },
  ];
  
  export default class ImageShow extends React.Component {
    constructor(props) {
      super(props);
      this.navigation = props.navigation;
      const images = props.route.params.images;
      let res = [];
      for(let i = 0;i < images.length;i++){
        const p = {
          url:images[i]
        }
        res[i] = p;
      }
      this.state = {
        images:res
      }
    }
  
    render() {
      return (
        <View style={{ flex: 1 }}>
          <ImageViewer
            imageUrls={this.state.images}
            failImageSource={{
              url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').width,
            }}
          />
        </View>
      );
    }
  }