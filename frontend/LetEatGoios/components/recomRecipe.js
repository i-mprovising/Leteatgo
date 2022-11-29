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

const Height = Dimensions.get('window').height;
function RecomRecipe(Props) {
  const navigation = useNavigation();
  const [FoodId, setFoodId] = useRecoilState(foodid);
  const [RecipeName, setRecipename] = useRecoilState(recipename);
  console.log(Props.data);
  return (
    <View style={{...styles.HomeBox, height: Height * 0.3}}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.InBoxtext}>{Props.text}</Text>
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}>
          {Props.data === undefined ? (
            <ActivityIndicator />
          ) : (
            Props.data.map((key, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setFoodId(Props.data[index].foodid);
                  setRecipename(Props.data[index].name);
                  navigation.navigate('Recipe');
                }}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    Key={index}
                    style={styles.image2}
                    source={{uri: Props.data[index].image}}
                  />

                  <Text
                    style={{
                      fontSize: 15,
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
          <Text style={{...styles.ButtonText}}>추가검사 해보기</Text>
        </View>
      </View>
    </View>
  );
}
export default RecomRecipe;
