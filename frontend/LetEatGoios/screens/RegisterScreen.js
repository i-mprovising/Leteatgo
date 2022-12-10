import React, {useState} from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
function RegisterScreen() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordCheck, setUserPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [sex, setSex] = useState(0);
  const [errortext, setErrortext] = useState('');
  const placeholder = '성별을 선택해주세요';

  async function postData(id, password, nickname, sex) {
    setErrortext('');
    if (!id) {
      alert('아이디를 입력해주세요 .');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해주세요 .');
      return;
    }
    if (!nickname) {
      alert('닉네임를 입력해주세요 .');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:80/user/signup', {
        id,
        password,
        nickname,
        sex,
      });

      if (response.data.statusCode === 200) {
        navigation.replace('SignIn');
      } else if (response.data.msg === 'id that already exists') {
        alert('동일한 아이디가 이미 존재합니다.');
      } else if (response.data.msg === 'nickname that already exists') {
        alert('동일한 닉네임이 이미 존재합니다.');
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <LinearGradient colors={['#FFCDD2', '#FFAAB3']} style={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.titleArea}></View>
        <View style={styles.textArea}>
          <Text style={styles.Text}>회원가입하여 나만의 레시피 공간</Text>
          <Text style={styles.Text}>입맛춤을 사용해보세요 🍖</Text>
        </View>
      </View>
      <View style={styles.formArea}>
        <TextInput
          placeholder="아이디(5자 이상, 영문, 숫자 포함)"
          style={styles.formAreaTop}
          onChangeText={userId => setUserId(userId)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          placeholder="비밀번호(8자 이상)"
          secureTextEntry={true}
          style={styles.formAreaMiddle}
          onChangeText={userPassword => setUserPassword(userPassword)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          placeholder="비밀번호 확인"
          secureTextEntry={true}
          style={styles.formAreaBottom}
          onChangeText={userPasswordCheck =>
            setUserPasswordCheck(userPasswordCheck)
          }
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View
        style={{
          flex: 0.03,
          justifyContent: 'flex-start',
          // backgroundColor: "blue",
          marginBottom: wp('2%'),
        }}>
        {userPassword !== userPasswordCheck ? (
          <Text style={styles.textValidation}>
            비밀번호가 일치하지 않습니다 .
          </Text>
        ) : null}
      </View>
      <View style={styles.formArea2}>
        <TextInput
          placeholder="닉네임"
          style={styles.formAreaTop}
          onChangeText={nickname => setNickname(nickname)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {
          <RNPickerSelect
            placeholder={{
              label: placeholder,
              value: null,
              color: 'black',
            }}
            style={pickerSelectStyles}
            onValueChange={value => setSex(value)}
            items={[
              {label: '남', value: 0},
              {label: '여', value: 1},
            ]}
          />
        }
      </View>
      <View style={{flex: 0.2}}>
        <View style={styles.btnArea}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => postData(userId, userPassword, nickname, sex)}>
            <Text style={{fontSize: wp(4)}}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: wp(7),
    paddingRight: wp(7),
    paddingTop: wp(10),
  },
  topArea: {
    flex: 0.3,
    paddingTop: wp(5),
  },
  titleArea: {
    flex: 0.4,

    justifyContent: 'center',
  },
  textArea: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontWeight: '500',
    color: 'white',
    fontFamily: 'Happiness-Sans-Regular',
    fontSize: 20,
  },
  formArea: {
    // flex: 0.21,
    padding: 0,
  },
  formArea2: {
    flex: 0.3,
  },
  formAreaTop: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#ffe0e3',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomWidth: 1,
    paddingLeft: 10,
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  formAreaMiddle: {
    borderWidth: 2,
    borderColor: '#ffe0e3',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 10,
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  formAreaBottom: {
    borderWidth: 2,
    borderColor: '#ffe0e3',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopWidth: 1,
    paddingLeft: 10,
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  btnArea: {
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    flex: 0.9,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDB4B9',
    borderRadius: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  placeholder: {color: '#CACACD'},
  inputIOS: {
    borderWidth: 2,
    borderColor: '#ffe0e3',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 10,
    backgroundColor: 'white',
    paddingVertical: 20,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  inputAndroid: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: 'black',
    width: '100%',
    paddingLeft: 10,
  },
});
export default RegisterScreen;
