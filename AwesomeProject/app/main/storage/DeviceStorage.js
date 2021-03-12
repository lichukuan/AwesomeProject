import AsyncStorage from '@react-native-community/async-storage';
//  import { AsyncStorage } from 'react-native';
 export default class DeviceStorage{
    // static get(key,callback) {
    //     AsyncStorage.getItem(key).then((value) => {
    //       const jsonValue = JSON.parse(value);
    //       func(jsonValue);
    // });
    //   }
      static save(key, value) {
        AsyncStorage.setItem(key, value, err => {
            err && console.log(err.toString());
         });    
      }
      static delete(key) {
        AsyncStorage.removeItem(key, err => {
            err && console.log(err.toString());
        })
      }
 }