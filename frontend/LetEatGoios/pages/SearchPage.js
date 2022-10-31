import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import styles from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@userId'; // userId 얻어와서 저장

function SearchHistory(Props) {
  const text = Props.text;
  return (
    <View style={styles.SearchHistory} key={Props.key}>
      <Text style={{paddingRight: '3%', color: '#FFAAB3'}}>{text}</Text>
      <TouchableOpacity style={{paddingLeft: '2%'}} activeOpacity={0.7}>
        <Text style={{color: '#FFAAB3'}}>X</Text>
      </TouchableOpacity>
    </View>
  );
}
function PopularTerms() {
  return (
    <View style={{flexDirection: 'row', marginVertical: '5%'}}>
      <Text
        style={{
          paddingHorizontal: '7%',
          fontFamily: 'Roboto-Bold',
          fontStyle: 'italic',
          fontWeight: '900',
          color: '#FFAAB3',
          fontSize: 28,
        }}>
        1
      </Text>
      <TouchableOpacity style={{paddingVertical: '1%'}} activeOpacity={0.7}>
        <Text
          style={{
            fontFamily: 'Happiness-Sans-Regular',
            fontSize: 20,
          }}>
          다이어트
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function SearchPage() {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const [text, setText] = useState('');
  const [history, setHistory] = useState({0: text});
  const [count, setCount] = useState(0);
  useEffect(() => {
    loadHistory();
  }, []);

  const onChangeText = payload => setText(payload);
  const saveHistory = async toSave => {
    // console.log(toSave);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadHistory = async () => {
    // AsyncStorage.removeItem(STORAGE_KEY);
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    console.log(s);
    setHistory(JSON.parse(s));
  };
  const addHistory = async () => {
    setCount(count + 1);
    console.log(text);
    if (text === '') {
      return;
    }
    console.log(history);
    const newHistory = {
      ...history,
      [Date.now()]: {text},
    };
    console.log('newhistory');
    console.log(newHistory);
    setHistory(newHistory);
    await saveHistory(newHistory);
    setText('');
  };
  const deleteHistory = key => {
    const newHistory = {...history};
    delete newHistory[key];
    setHistory(newHistory);
    saveHistory(newHistory);
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['bottom']}
        style={{backgroundColor: 'white', flex: 1}}>
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
            style={{marginLeft: '3%'}}
            onPress={() => {
              navigation.navigate('HomeStack');
            }}>
            <Image source={require('../assets/icons/back.png')}></Image>
          </TouchableOpacity>
          <TextInput
            placeholder="검색어를 입력해주세요."
            onSubmitEditing={addHistory}
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
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '6%',
            }}>
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
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: '2%',
              flexWrap: 'wrap',
              marginBottom: '8%',
            }}>
            {Object.keys(history).map(key => (
              <SearchHistory key={key} text={history[key].text} />
            ))}
          </View>
          <View
            style={{
              width: '90%',
              borderWidth: 1,
              marginLeft: '5%',
              borderColor: '#F1F1F1',
            }}></View>
          <View
            style={{
              paddingTop: '13%',
              paddingBottom: '5%',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 21,
                fontWeight: '700',
                paddingHorizontal: '5%',
              }}>
              인기 순위
            </Text>
            <Text
              style={{
                color: '#FFAAB3',
                fontSize: 14,
                paddingTop: '1%',
                fontFamily: 'Happiness-Sans-Regular',
              }}>
              "지금 이 순간 가장 많이 검색되고 있어요!""
            </Text>
          </View>
          <PopularTerms />
          <PopularTerms />
          <PopularTerms />
          <PopularTerms />
          <PopularTerms />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default SearchPage;
