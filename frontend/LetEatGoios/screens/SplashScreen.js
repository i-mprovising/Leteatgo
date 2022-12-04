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
import userid from '../recoil/userId';
import userkey from '../recoil/userKey';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [animating, setAnimating] = useState(true);
  const [KEY, setKEY] = useRecoilState(userkey);
  const [userId, setUserId] = useRecoilState(userid);
  const [userNickname, setUserNickName] = useRecoilState(usernickname);
  const STORAGE_KEY = `nickname`;
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('KEY').then(value => {
        setKEY(parseInt(value));
        console.log(value);
      });

      AsyncStorage.getItem(STORAGE_KEY).then(value => setUserNickName(value));
      AsyncStorage.getItem('user_id').then(value => {
        navigation.replace(value === null ? 'SignIn' : 'Main');
        setUserId(value);
      });
    }, 3000);
  }, []);

  return (
    <LinearGradient colors={['#FFCDD2', '#FFAAB3']} style={styles.container}>
      <Image
        source={require('../assets/icons/Login_logo.png')}
        style={{width: wp(75), height: wp(75)}}
      />
      <ActivityIndicator
        animating={animating}
        color="white"
        size="large"
        style={{marginBottom: '20%'}}
      />
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFAAB3',
  },
});
export default SplashScreen;
