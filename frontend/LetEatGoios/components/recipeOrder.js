import React from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import styles from '../style';

function RecipeOrder() {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Text
        style={{
          paddingHorizontal: '7%',
          fontFamily: 'Roboto-Bold',
          fontStyle: 'italic',
          fontWeight: '900',
          color: '#FFAAB3',
          fontSize: 28,
        }}>
        1
      </Text>

      <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
        {orders.Order1}
      </Text>
    </View>
  );
}
export default RecipeOrder;
