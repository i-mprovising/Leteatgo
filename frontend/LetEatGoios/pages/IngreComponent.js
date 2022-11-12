import React, {useState} from 'react';
import {Text, Image, TouchableOpacity, View} from 'react-native';

import styles from '../style';
function ItemList(Props) {
  category = Props.category;
  array = Props.array;
  key = Props.Key;
  array = Props.Array;
  const [select, setSelect] = useState(false);
  const [opacity, setOpacity] = useState(1);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        select ? setOpacity(1) : setOpacity(0.3);
        setSelect(!select);
        console.log(key);
      }}
      style={{alignItems: 'center'}}>
      <Image
        Key={key}
        source={array[key.id].src}
        style={{...styles.IconImage, opacity: opacity}}
      />
      <Text
        style={{
          fontSize: 11,
          fontFamily: 'Happiness-Sans-Regular',
        }}>
        {array[key.id].foodname}
      </Text>
    </TouchableOpacity>
  );
}
export default ItemList;
