import React, {useState} from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';

import styles from '../style';

import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import foodid from '../recoil/foodid';
import recipename from '../recoil/recipename';
import {Dimensions} from 'react-native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
function RecomRecipe(Props) {
  const navigation = useNavigation();
  const [FoodId, setFoodId] = useRecoilState(foodid);
  const [RecipeName, setRecipename] = useRecoilState(recipename);
  console.log(Props.data);
  return (
    <View style={{...styles.HomeBox}}>
      <View style={{alignItems: 'center', marginLeft: Width * 0.025}}>
        <Text style={styles.InBoxtext}>{Props.text}</Text>
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            // alignItems: 'center',

            justifyContent: 'center',
          }}
          style={{marginBottom: 5}}>
          {Props.data === undefined ? (
            <ActivityIndicator />
          ) : (
            Props.data.map((key, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => {
                  setFoodId(Props.data[index].foodid);
                  setRecipename(Props.data[index].name);
                  navigation.navigate('Recipe');
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    marginRight: Width * 0.025,
                  }}>
                  <Image
                    Key={index}
                    style={styles.image2}
                    source={{uri: Props.data[index].image}}
                  />

                  <Text
                    style={{
                      fontSize: 14,
                      maxWidth: Height * 0.127,
                      fontFamily: 'Happiness-Sans-Regular',
                    }}>
                    {Props.data[index].name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
        <View style={{...styles.TextBox, marginBottom: 8}}>
          <TouchableOpacity onPress={() => navigation.navigate('Selection')}>
            <Text style={{...styles.ButtonText}}>추가검사 해보기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default RecomRecipe;
