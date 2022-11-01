import React, {useState} from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import Slick from 'react-native-slick';
import styles from '../style';

function Top5Page() {
  return (
    <View>
      <Text style={styles.InBoxtext}>Top5 레시피</Text>
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
        <Image
          style={styles.image}
          source={require('../assets/Images/food1.jpeg')}></Image>
        <Image
          style={styles.image}
          source={require('../assets/Images/food2.jpeg')}></Image>
        <Image
          style={styles.image}
          source={require('../assets/Images/food3.jpeg')}></Image>

        <Image
          style={{...styles.image, marginRight: '7%'}}
          source={require('../assets/Images/food4.jpeg')}></Image>
        <Image
          style={styles.image}
          source={require('../assets/Images/food5.jpeg')}></Image>
      </Slick>
    </View>
  );
}
export default Top5Page;
