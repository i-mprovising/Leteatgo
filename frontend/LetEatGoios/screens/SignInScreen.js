import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';

function Login() {
  const navigation = useNavigation();

  const signin = async () => {
    let body = {id: userId, password: userPassword};

    console.log(body);
    try {
      const response = await axios.post('http://127.0.0.1:80/signin', body);

      console.log(response.data);
    } catch (e) {
      console.log('error');
      console.log(JSON.stringify(e));
      return e;
    }
  };

  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  return (
    <LinearGradient colors={['#FFCDD2', '#FFAAB3']} style={styles.container}>
      <View style={styles.topArea}>
        <Image
          source={require('../assets/icons/Login_logo.png')}
          style={{width: wp(25), resizeMode: 'contain'}}
        />
      </View>

      <View style={styles.formArea}>
        <TextInput
          style={styles.textFormTop}
          placeholder="ID"
          onChangeText={userId => setUserId(userId)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textFormBottom}
          placeholder="PASSWORD"
          onChangeText={userPassword => setUserPassword(userPassword)}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      <View style={{flex: 2}}>
        <View style={styles.btnArea}>
          <TouchableOpacity
            style={styles.btn}
            // onPress={() => postData(userId, userPassword)}
            onPress={() => {
              //signin();
              navigation.replace('Main');
            }}>
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
    height: hp(8),
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
    height: hp(8),
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
  },
  btnArea: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(8),
    paddingBottom: hp(1),
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
