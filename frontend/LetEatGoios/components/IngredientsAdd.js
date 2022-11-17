import React, {useState, useRef, useEffect} from 'react';
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
  const setSelectedList = Props.setSelectedList;
  const selectedList = Props.selectedList;
  const [submit, setSubmit] = useState(false);
  const [List, setList] = useState([]);

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
            <ItemList
              Key={key}
              Array={array}
              Submit={submit}
              setSubmit={setSubmit}
              List={List}
            />
          ))}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{alignItems: 'center'}}
          onPress={() => {
            setSubmit(true);
            newList = [].concat(List, selectedList);
            setSelectedList(newList);
            setList([]);
          }}>
          <Image
            source={require('../assets/icons/addButton.png')}
            style={{marginTop: '2%'}}></Image>
        </TouchableOpacity>
      </CollapseBody>
    </Collapse>
  );
}
export default IngreCategory;
