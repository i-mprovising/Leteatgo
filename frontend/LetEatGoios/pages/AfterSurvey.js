import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import styles from '../style';
function AfterSurvery() {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={{backgroundColor: 'white'}}>
        <View style={[styles.statusBarPlaceholder, {height: top}]} />
        <StatusBar barStyle="light-content" />
        <View style={{...styles.block, justifyContent: 'center'}}>
          <Text style={styles.title}>내 취향 레시피 찾아보기</Text>
        </View>
        <View style={{height: '100%', alignItems: 'center'}}>
          <Image
            source={require('../assets/icons/congrats.png')}
            style={styles.CongratIcon}
          />
          <Text
            style={{
              fontFamily: 'Happiness-Sans-Regular',
              fontSize: 17,
              fontWeight: '500',
            }}>
            취향조사가 완료 되었습니다!
          </Text>
          <Text
            style={{
              fontFamily: 'Happiness-Sans-Regular',
              marginTop: '2%',
              fontSize: 15,
              fontWeight: '500',
            }}>
            취향이 반영된 추천 레시피가 나오고 있어요
          </Text>
          <Text
            style={{
              fontFamily: 'Happiness-Sans-Regular',
              marginTop: '2%',
              fontSize: 14,
              fontWeight: '400',
            }}>
            한번 더 조사하면 새로운 음식이 나와요!
          </Text>
          <Text
            style={{
              fontFamily: 'Happiness-Sans-Regular',
              fontSize: 14,
              fontWeight: '400',
              marginBottom: '6%',
            }}>
            더 정확한 나만의 레시피를 얻을 수 있어요!
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('HomeStack')}
            style={{
              ...styles.TextBox,
              marginVertical: '4%',
              borderRadius: 9,
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Happiness-Sans-Regular',
                  color: 'white',
                  fontSize: 17,
                  fontWeight: '500',
                  padding: 4,
                }}>
                홈에서 레시피 확인하기
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              // getData()
              navigation.navigate('Selection');
            }}
            style={{...styles.TextBox, borderRadius: 9}}>
            <View>
              <Text
                style={{
                  fontFamily: 'Happiness-Sans-Regular',
                  fontSize: 17,
                  color: 'white',
                  fontWeight: '500',
                  padding: 4,
                }}>
                추가 조사해보기!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default AfterSurvery;
