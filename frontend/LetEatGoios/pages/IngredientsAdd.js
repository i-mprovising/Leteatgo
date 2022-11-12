import React, {useState, useRef} from 'react';
import {Text, Image, TouchableOpacity, View} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import styles from '../style';
import ItemList from './IngreComponent';
function IngreCategory(Props) {
  category = Props.category;
  array = Props.array;
  const isItemSelect = Array(array.length).fill(false);

  return (
    <Collapse>
      <CollapseHeader>
        <View style={styles.CategoryBox}>
          <Text
            style={{fontFamily: 'Happiness-Sans-Regular', fontWeight: '400'}}>
            {category}
          </Text>
          <Image
            style={{height: 18, width: 18, marginLeft: 5}}
            source={require('../assets/icons/arrowIcon.png')}
          />
        </View>
      </CollapseHeader>
      <CollapseBody>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
          {array.map(key => (
            <ItemList Key={key} Array={array} />
          ))}
        </View>
        <TouchableOpacity activeOpacity={0.7} style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/icons/addButton.png')}
            style={{marginTop: '2%'}}></Image>
        </TouchableOpacity>
      </CollapseBody>
    </Collapse>
  );
}
export default IngreCategory;
