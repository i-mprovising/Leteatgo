import React, {useEffect, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import styles from '../style';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MbtiSurveyComponent from '../components/MbtiSurveyComponent';
import {atom, useRecoilState} from 'recoil';
import {
  mbtiFinish,
  eCount,
  iCount,
  sCount,
  wCount,
  uCount,
  fCount,
  rCount,
  vCount,
  aCount,
  pCount,
} from '../recoil/mbtiCount';
import userid from '../recoil/userId';

const Question = [
  {
    type: 'E',
    text: '식사를 하면서 대화하는 것을 좋아한다.',
  },
  {
    type: 'E',
    text: '혼자 식사하는 것보다 친구나 가족과 식사하는 것을 선호한다.',
  },
  {
    type: 'I',
    text: '대체적으로 혼자 식사하는 것이 편하다.',
  },
  {
    type: 'I',
    text: '혼자서 밥을 해먹는 경우가 많다.',
  },
  {
    type: 'S',
    text: '운동을 규칙적으로 하는 편이다.',
  },
  {
    type: 'S',
    text: '대체적으로 수면 시간이 규칙적인 편이다.',
  },
  {
    type: 'W',
    text: '하루에 물을 자주 마시진 않는다.',
  },
  {
    type: 'W',
    text: '일주일에 술을 3회 이상 마신다.',
  },
  {
    type: 'U',
    text: '자극적인 음식을 즐겨먹는 편이다.',
  },
  {
    type: 'U',
    text: '편식하는 음식이 5개 이상 존재한다.',
  },
  {
    type: 'F',
    text: '식사를 할 때 영양소나 성분을 확인하는 편이다.',
  },
  {
    type: 'F',
    text: '탄수화물, 단백질, 지방 비율을 고려한다.',
  },
  {
    type: 'R',
    text: '과식하지 않도록 적정량에 맞춰 식사한다.',
  },
  {
    type: 'R',
    text: '매일 식사하는 시간이 정해져 있다.',
  },
  {
    type: 'V',
    text: '하루에 식사를 하는 횟수가 자주 바뀐다.',
  },
  {
    type: 'V',
    text: '식사를 거르는 경우가 많다.',
  },
  {
    type: 'A',
    text: '매끼 골고루 식사를 하며 편식을 하지 않는다.',
  },
  {
    type: 'A',
    text: '맛집을 탐방하는 취미가 있다.',
  },
  {
    type: 'P',
    text: '음식을 남기는 경우가 많다.',
  },
  {
    type: 'P',
    text: '항상 해먹던 음식만 요리한다.',
  },
];

function MbtiSurvey() {
  const navigation = useNavigation();

  const [userId, setUserId] = useRecoilState(userid);
  const [eTemp, setETemp] = useRecoilState(eCount);
  const [iTemp, setITemp] = useRecoilState(iCount);
  const [sTemp, setSTemp] = useRecoilState(sCount);
  const [wTemp, setWTemp] = useRecoilState(wCount);
  const [uTemp, setUTemp] = useRecoilState(uCount);
  const [fTemp, setFTemp] = useRecoilState(fCount);
  const [rTemp, setRTemp] = useRecoilState(rCount);
  const [vTemp, setVTemp] = useRecoilState(vCount);
  const [aTemp, setATemp] = useRecoilState(aCount);
  const [pTemp, setPTemp] = useRecoilState(pCount);
  const {top} = useSafeAreaInsets();
  const questionList = Question.map(question => (
    <MbtiSurveyComponent
      key={question.text}
      text={question.text}
      type={question.type}
    />
  ));

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['bottom']}
        style={{backgroundColor: 'white', flex: 1}}>
        <View style={{backgroundColor: 'white', flex: 1}}>
          <View style={[styles.statusBarPlaceholder, {height: top}]} />
          <StatusBar barStyle="light-content" />
          <View style={{...styles.block, justifyContent: 'center'}}>
            <Text style={styles.title}>나의 먹비티아이는?</Text>
          </View>
          <ScrollView
            contentContainerStyle={{alignItems: 'center'}}
            style={{flex: 1, backgroundColor: 'white'}}>
            <Image
              style={{
                width: Width * 1,
                height: Height * 0.35,
                borderRadius: 10,
              }}
              source={require('../assets/icons/MbtiTop.png')}
              resizeMode="stretch"
            />
            {questionList}
            <TouchableOpacity
              style={styles.MbtisubmitButton}
              onPress={() => {
                AsyncStorage.setItem(
                  `${userId}one`,
                  eTemp >= iTemp ? 'E' : 'I',
                );
                AsyncStorage.setItem(
                  `${userId}two`,
                  sTemp >= wTemp ? 'S' : 'W',
                );
                AsyncStorage.setItem(
                  `${userId}three`,
                  uTemp >= fTemp ? 'U' : 'F',
                );
                AsyncStorage.setItem(
                  `${userId}four`,
                  rTemp >= vTemp ? 'R' : 'V',
                );
                AsyncStorage.setItem(
                  `${userId}five`,
                  aTemp >= pTemp ? 'A' : 'P',
                );
                navigation.navigate('MbtiResult');
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontFamily: 'Happiness-Sans-Bold',
                }}>
                제출
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default MbtiSurvey;
