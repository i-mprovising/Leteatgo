import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import usernickname from '../recoil/userNickname';
import userkey from '../recoil/userKey';
const SplashScreen = () => {
  // AsyncStorage.removeItem('user_id');

  const navigation = useNavigation();
  const [animating, setAnimating] = useState(true);
  const [KEY, setKEY] = useRecoilState(userkey);
  const [userNickname, setUserNickName] = useRecoilState(usernickname);
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('KEY').then(value => setKEY(value));
      AsyncStorage.getItem('USERNICKNAME').then(value =>
        setUserNickName(value),
      );
      AsyncStorage.getItem('user_id').then(value =>
        navigation.replace(value === null ? 'SignIn' : 'Main'),
      );
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/Text_logo.png')}
        style={{width: wp(75), resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="white"
        size="large"
        style={styles.ActivityIndicator}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFAAB3',
  },
  ActivityIndicator: {
    alignItems: 'center',

    height: 80,
  },
});
export default SplashScreen;
