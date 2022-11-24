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
import searchresult from '../recoil/searchWord';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import styles from '../style';

import foodid from '../recoil/foodid';

import recipename from '../recoil/recipename';
import searchtext from '../recoil/keyword';
function SearchHistory(Props) {
  const text = Props.text;
  return (
    <View style={styles.SearchHistory} key={Props.Key}>
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

function SearchResult() {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const [text, setText] = useRecoilState(searchtext);
  const [FoodId, setFoodId] = useRecoilState(foodid);
  const [RecipeName, setRecipename] = useRecoilState(recipename);

  const [searchResult, setResult] = useRecoilState(searchresult);

  const onChangeText = payload => {
    sendWord(payload);
    setText(payload);
  };

  const addHistory = async () => {
    sendWord(text);

    navigation.navigate('SearchResult');

    setText('');
  };

  const sendWord = async key => {
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
    } catch (e) {
      console.error(e);
      console.log(JSON.stringify(e));
      return e;
    }
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
              navigation.navigate('Search');
              setResult([]);
              setText('');
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
        <Text
          style={{
            paddingLeft: '5%',
            fontSize: 17,
            fontFamily: 'Happiness-Sans-regular',
            marginVertical: 20,
          }}>
          검색결과
        </Text>
        <ScrollView style={{marginLeft: 10}}>
          {searchResult.length ? (
            searchResult.map((key, index) => (
              <View style={{padding: 7}}>
                <TouchableOpacity
                  activeOpacity={0.3}
                  style={{flexDirection: 'row', maxWidth: '65%'}}
                  onPress={() => {
                    setFoodId(key.foodid);
                    setRecipename(key.Name);
                    navigation.navigate('Recipe');
                    setResult([]);
                    setText('');
                  }}>
                  <Image
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 5,

                      marginRight: 10,
                    }}
                    source={{uri: key.Image}}></Image>

                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 27,
                      padding: 3,
                      marginLeft: 5,
                      fontWeight: '500',
                      fontFamily: 'Happiness-Sans-regular',
                    }}
                    key={index}>
                    {key.Name}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: '97%',
                    borderWidth: 1,

                    marginTop: 13,
                    borderColor: '#F1F1F1',
                  }}></View>
              </View>
            ))
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                padding: 3,
                marginLeft: 100,
                marginTop: 70,
                fontFamily: 'Happiness-Sans-regular',
              }}>
              검색결과가 없습니다.
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default SearchResult;
