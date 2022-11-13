import React, {useEffect, useState} from 'react';
import {Text, Image, TouchableOpacity, View, SectionList} from 'react-native';

import styles from '../style';
function ItemList(Props) {
  const [array] = useState(Props.Array);
  const [key] = useState(Props.Key);
  const [select, setSelect] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (Props.Submit) {
      setOpacity(1);
      Props.setSubmit(false);
    }
  }, [Props.Submit]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        select ? setOpacity(1) : setOpacity(0.3);
        if (select) {
          Props.List.forEach((item, index) => {
            if (item.id === key.id) {
              Props.List.splice(index, key.id);
            }
          });
        } else {
          Props.List.push(key);
        }
        setSelect(!select);
      }}
      style={{alignItems: 'center'}}>
      <Image
        Key={key}
        source={array[key.id].src}
        style={{...styles.IconImage, opacity: Props.Submit ? 1 : opacity}}
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
