import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import styles from '../style';

function SearchPage() {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const [text, setText] = useState('');
  const onChangeText = payload => setText(payload);
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={{backgroundColor: 'white'}}>
        <LinearGradient
          style={{height: top}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FFCDD2', '#FFAAB3']}
        />
        <StatusBar barStyle="light-content" />
        <LinearGradient
          style={{...styles.block, justifyContent: 'flex-start'}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FFCDD2', '#FFAAB3']}>
          <TouchableOpacity
            style={{marginLeft: '4%'}}
            onPress={() => {
              navigation.navigate('HomeStack');
            }}>
            <Image source={require('../assets/icons/back.png')}></Image>
          </TouchableOpacity>
          <TextInput
            placeholder="검색어를 입력해주세요."
            onChangeText={onChangeText}
            style={styles.TextInput}
            value={text}></TextInput>
          <Image
            source={require('../assets/icons/PinkSearch.png')}
            style={{
              position: 'absolute',
              top: '55%',
              left: '13%',
            }}></Image>
        </LinearGradient>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{paddingLeft: '5%', marginTop: '6%', fontSize: 16}}>
            최근 검색어
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{marginTop: '8%', paddingRight: '5%'}}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: '#FFAAB3',
                fontWeight: '600',
              }}>
              전체 삭제
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default SearchPage;
