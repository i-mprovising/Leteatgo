import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import styles from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Main from '../Main';
const STORAGE_KEY = '@userId'; // 나중에 userId 얻어와서 저장
import foodid from '../recoil/foodid';
import PopularTerms from '../components/PopularTerms';
import recipename from '../recoil/recipename';
import searchresult from '../recoil/searchWord';
import searchtext from '../recoil/keyword';
function SearchHistory(Props) {
  const text = Props.text;
  return (
    <View key={Props.Key} style={{flexDirection: 'row'}}>
      <Text style={{paddingRight: '3%', color: '#FFAAB3'}}>{text}</Text>
      <TouchableOpacity
        style={{paddingLeft: '2%'}}
        activeOpacity={0.7}
        onPress={() => Props.deleteHistory(Props.Key)}>
        <Text style={{color: '#FFAAB3'}}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

function SearchPage() {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const [text, setText] = useRecoilState(searchtext);
  const [history, setHistory] = useState({});
  const [FoodId, setFoodId] = useRecoilState(foodid);
  const [RecipeName, setRecipename] = useRecoilState(recipename);
  const [top5, setTop5] = useState();
  const [searchResult, setResult] = useRecoilState(searchresult);
  useEffect(() => {
    loadHistory();
  }, []);

  const onChangeText = payload => {
    sendWord(payload);
    setText(payload);
  };
  const saveHistory = async toSave => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadHistory = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    s === null ? setHistory({}) : setHistory(JSON.parse(s));
  };
  const addHistory = async () => {
    if (text === '') {
      return;
    }
    sendWord(text);
    doubleCheck(text) === undefined ? null : delete history[doubleCheck(text)];
    const newHistory = {
      ...history,
      [Date.now()]: {text},
    };
    navigation.navigate('SearchResult');
    setHistory(newHistory);
    await saveHistory(newHistory);
  };
  const deleteHistory = key => {
    const newHistory = {...history};
    delete newHistory[key];
    setHistory(newHistory);
    saveHistory(newHistory);
  };
  const doubleCheck = text => {
    for (const key in history) {
      if (history[key].text === text) {
        return key;
      }
    }
  };
  const getTop5 = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:80/recommend/best');
      console.log('top5');

      setTop5(response.data.result);

      console.log(response.data.result);
    } catch (e) {
      console.error(e);
      console.log(JSON.stringify(e));
      return e;
    }
  };
  const sendWord = async key => {
    // console.log(key);
    try {
      const response = await axios.get(
        'http://127.0.0.1:80/search/keyword',
        {
          params: {key: key},
        },
        {withCredentials: true},
      );
      console.log('search Keyword');
      console.log(key);
      setResult(response.data.result);
      console.log('search result');
      console.log(response.data.result);

      // setFoodId(response.data.result[0].foodid);
      // navigation.navigate('Recipe');

      // console.log(response.data.result[0].foodid);
    } catch (e) {
      console.error(e);
      console.log(JSON.stringify(e));
      return e;
    }
  };
  useEffect(() => {
    getTop5();
  }, []);

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
          <View>
            <TextInput
              autoCorrect={false}
              placeholder="검색어를 입력해주세요."
              onSubmitEditing={addHistory}
              onChangeText={onChangeText}
              style={styles.TextInput}
              value={text}></TextInput>
          </View>
          <Image
            source={require('../assets/icons/PinkSearch.png')}
            style={{
              position: 'absolute',
              top: '55%',
              left: '13%',
            }}></Image>
        </LinearGradient>
        <ScrollView style={{marginLeft: 20}}>
          {searchResult.length
            ? searchResult.map((key, index) => (
                <View style={{flexDirection: 'row', padding: 10}}>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      marginTop: 5,
                      marginRight: 10,
                    }}
                    source={require('../assets/icons/recipeSearch.png')}></Image>
                  <TouchableOpacity
                    activeOpacity={0.3}
                    onPress={() => {
                      setFoodId(key.foodid);
                      setRecipename(key.Name);
                      navigation.navigate('Recipe');
                      setResult([]);
                      setText('');
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '400',
                        padding: 3,
                        fontFamily: 'Happiness-Sans-regular',
                      }}
                      key={index}>
                      {key.Name}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            : null}
        </ScrollView>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '6%',
            }}>
            <Text style={{paddingLeft: '5%', marginTop: 15, fontSize: 17}}>
              최근 검색어
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{marginTop: '8%', paddingRight: '5%'}}
              onPress={() => {
                AsyncStorage.removeItem(STORAGE_KEY);
                setHistory({});
              }}>
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
              marginLeft: 12,
              flexWrap: 'wrap',
              marginBottom: '8%',
            }}>
            {Object.keys(history)
              .reverse()
              .map(key => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.SearchHistory}
                  onPress={() => {
                    sendWord(history[key].text);
                    setText(history[key].text);
                    navigation.navigate('SearchResult');
                  }}>
                  <SearchHistory
                    Key={key}
                    text={history[key].text}
                    deleteHistory={deleteHistory}
                  />
                </TouchableOpacity>
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
              paddingTop: '7%',
            }}>
            <Text
              style={{
                fontSize: 21,
                fontWeight: '700',
                paddingHorizontal: '7%',
                fontFamily: 'Happiness-Sans-Regular',
              }}>
              Top5 Recipe 🥇
            </Text>
            <Text
              style={{
                color: '#FFAAB3',
                fontSize: 15,
                paddingTop: '5%',
                paddingLeft: '30%',
                fontFamily: 'Happiness-Sans-Regular',
              }}>
              앱 내에서 가장 인기가 좋은 레시피에요!
            </Text>
          </View>
          {top5 === undefined ? null : (
            <PopularTerms
              rank={1}
              keyWord={top5[0].name}
              FoodId={top5[0].foodid}
            />
          )}
          {top5 === undefined ? null : (
            <PopularTerms
              rank={2}
              keyWord={top5[1].name}
              FoodId={top5[1].foodid}
            />
          )}
          {top5 === undefined ? null : (
            <PopularTerms
              rank={3}
              keyWord={top5[2].name}
              FoodId={top5[2].foodid}
            />
          )}
          {top5 === undefined ? null : (
            <PopularTerms
              rank={4}
              keyWord={top5[3].name}
              FoodId={top5[3].foodid}
            />
          )}
          {top5 === undefined ? (
            <ActivityIndicator style={{marginTop: 30}} />
          ) : (
            <PopularTerms
              rank={5}
              keyWord={top5[4].name}
              FoodId={top5[4].foodid}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default SearchPage;
