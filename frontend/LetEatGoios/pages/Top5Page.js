import React from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import Slick from 'react-native-slick';
import styles from '../style';
import Top5Image from '../data/Top5';
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
        <View style={{flexDirection: 'row'}}>
          {Top5Image.map(key =>
            key.id <= 2 ? (
              <Image
                Key={key}
                style={styles.image}
                source={Top5Image[key.id].src}
              />
            ) : null,
          )}
        </View>
        <View style={{flexDirection: 'row'}}>
          {Top5Image.map(key =>
            key.id > 2 ? (
              <Image
                Key={key}
                style={styles.image}
                source={Top5Image[key.id].src}
              />
            ) : null,
          )}
        </View>
      </Slick>
    </View>
  );
}
export default Top5Page;
