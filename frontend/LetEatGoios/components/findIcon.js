import Category from '../data/categoryIndex';
import styles from '../style';
import {Image, View, Text} from 'react-native';
import React from 'react';

function FindIcon(Props) {
  src = 0;
  if (Props.category == -1) {
    Category.map(item => {
      item.array.map(key => {
        if (Props.foodname.includes(key.foodname)) {
          src = key.src;
        }
      });
      if (src == 0) {
        src = require('../assets/ingredients/none.png');
      }
    });
  } else {
    Category[Props.category].array.map(item => {
      if (item.foodname == Props.foodname) {
        src = item.src;
      }
    });
  }
  return <Image source={src} style={{...styles.ListImage}}></Image>;
}
export default FindIcon;
