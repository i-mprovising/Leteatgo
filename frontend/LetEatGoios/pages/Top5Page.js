import React, {useState} from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import Slick from 'react-native-slick';
import styles from '../style';

function Top5Page() {
  return (
    <View>
      <Text style={styles.InBoxtext}>
        현재 냉장고로 만들 수 있는 음식이에요!
      </Text>
      <Slick
        loadMinimalLoader={<ActivityIndicator />}
        autoplay
        dotStyle={{
          backgroundColor: '#FFCDD2',
        }}
        activeDotStyle={{
          backgroundColor: '#FFAAB3',
        }}
        paginationStyle={{bottom: 6}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            style={styles.image}
            source={require('../assets/Images/food1.jpeg')}></Image>
          <Image
            style={styles.image}
            source={require('../assets/Images/food2.jpeg')}></Image>
          <Image
            style={styles.image}
            source={require('../assets/Images/food3.jpeg')}></Image>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            style={{...styles.image, marginRight: '7%'}}
            source={require('../assets/Images/food4.jpeg')}></Image>
          <Image
            style={styles.image}
            source={require('../assets/Images/food5.jpeg')}></Image>
        </View>
      </Slick>
    </View>
  );
}
export default Top5Page;
