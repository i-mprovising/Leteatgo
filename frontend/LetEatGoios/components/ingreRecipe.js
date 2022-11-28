import React, {useState} from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import Slick from 'react-native-slick';
import styles from '../style';
import Top5Image from '../data/Top5';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import foodid from '../recoil/foodid';
import recipename from '../recoil/recipename';
import {Dimensions} from 'react-native';

const Height = Dimensions.get('window').height;
function IngreRecipe(Props) {
  const navigation = useNavigation();
  const [FoodId, setFoodId] = useRecoilState(foodid);
  const [RecipeName, setRecipename] = useRecoilState(recipename);
  console.log(Props.data);
  return (
    <View style={{...styles.HomeBox, height: Height * 0.32}}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.InBoxtext}>{Props.text}</Text>
        <Slick
          loadMinimalLoader={<ActivityIndicator />}
          autoplay
          dotStyle={{
            backgroundColor: '#F0F0F0',
          }}
          activeDotStyle={{
            backgroundColor: '#FFAAB3',
          }}
          paginationStyle={{bottom: 3}}>
          {Props.data === undefined ? (
            <ActivityIndicator />
          ) : (
            Props.data.map((key, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setFoodId(Props.data[index].foodid);
                  setRecipename(Props.data[index].Name);
                  navigation.navigate('Recipe');
                }}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    Key={index}
                    style={styles.image}
                    source={{uri: Props.data[index].Image}}
                  />

                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Happiness-Sans-Regular',
                    }}>
                    {Props.data[index].Name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </Slick>
      </View>
    </View>
  );
}
export default IngreRecipe;
