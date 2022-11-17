import React from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import Slick from 'react-native-slick';
import styles from '../style';
import Top5Image from '../data/Top5';
function RecomRecipe(Props) {
  return (
    <View style={{...styles.HomeBox}}>
      <View>
        <Text style={styles.InBoxtext}>{Props.text}</Text>
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
                  Key={key.id}
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
    </View>
  );
}
export default RecomRecipe;
