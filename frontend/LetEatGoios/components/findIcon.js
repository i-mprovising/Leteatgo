import Category from '../data/categoryIndex';
import styles from '../style';
import {Image, View, Text} from 'react-native';
import React from 'react';

function FindIcon(Props) {
  if (Props.category == -1) {
    Category.map(item => {
      item.array.map(key => {
        if (key.foodname == Props.foodname) {
          src = key.src;
        }
      });
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
