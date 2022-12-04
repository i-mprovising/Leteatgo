import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import userid from '../recoil/userId';
import usernickname from '../recoil/userNickname';
import userkey from '../recoil/userKey';
function Login() {
  const navigation = useNavigation();
  const [userId, setUserId] = useRecoilState(userid);
  const [userPassword, setUserPassword] = useState('');
  const [userNickname, setUserNickName] = useRecoilState(usernickname);
  const [errortext, setErrortext] = useState('');
  const [key, setKey] = useRecoilState(userkey);

  const STORAGE_KEY = `nickname`;
  async function postData(id, password) {
    setErrortext('');
    if (!id) {
      alert('아이디를 입력해주세요 .');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해주세요 .');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:80/user/signin', {
        id,
        password,
      });
      setUserNickName(response.data.result.nickname);
      if (response.data.msg === 'login success') {
        AsyncStorage.setItem('user_id', userId);
        console.log(String(response.data.result.userid));
        AsyncStorage.setItem('KEY', String(response.data.result.userid));
        console.log('key');
        setKey(response.data.result.userid);

        AsyncStorage.setItem(STORAGE_KEY, response.data.result.nickname);
        navigation.replace('Main');
      } else {
        alert('아이디와 비밀번호를 다시 확인해주세요 .');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <LinearGradient colors={['#FFCDD2', '#FFAAB3']} style={styles.container}>
      <View style={styles.topArea}>
        <Image
          source={require('../assets/icons/Login_logo.png')}
          style={{width: wp(50), resizeMode: 'contain'}}
        />
      </View>

      <View style={styles.formArea}>
        <TextInput
          style={styles.textFormTop}
          placeholder="ID"
          onChangeText={userId => setUserId(userId)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.textFormBottom}
          placeholder="PASSWORD"
          onChangeText={userPassword => setUserPassword(userPassword)}
          autoCapitalize="none"
          secureTextEntry={true}
          autoCorrect={false}
        />
      </View>
      <View>
        <View style={{...styles.btnArea, marginVertical: '2%'}}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => postData(userId, userPassword)}
            // onPress={() => navigation.navigate('Main')}
          >
            <Text style={{color: 'white'}}>로그인</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnArea}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Register')}>
            <Text style={{color: 'white'}}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 3}} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  topArea: {
    flex: 1,
    marginTop: wp(30),
    justifyContent: 'center',
    // backgroundColor: 'red',
    marginBottom: wp(7),
  },
  titleArea: {
    flex: 1,
    // backgroundColor: 'white',
    justifyContent: 'center',
    paddingTop: wp(0.3),
  },
  textArea: {
    flex: 1,
    // backgroundColor: 'green',
    justifyContent: 'center',
    paddingTop: wp(3),
  },
  text: {
    fontSize: wp('4%'),
  },
  formArea: {
    flex: 2,
    justifyContent: 'center',
    // backgroundColor: '',
    marginBottom: 2,
  },
  textFormTop: {
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: 'black',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: '100%',
    height: hp(9),
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
  },
  textFormBottom: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: 'black',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    width: '100%',
    height: hp(9),
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
  },
  btnArea: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(8),
    paddingBottom: hp(0.5),
  },
  btn: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default Login;
