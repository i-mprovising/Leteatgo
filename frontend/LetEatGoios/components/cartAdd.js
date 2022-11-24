import React, {useState, useRef, useEffect} from 'react';
import {Text, Image, TouchableOpacity, View} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import styles from '../style';
import ItemList from './IngreComponent';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import userid from '../recoil/userId';

function CartCategory(Props) {
  const [USERID, setUserId] = useRecoilState(userid);
  category = Props.category;
  array = Props.array;
  const setSelectedList = Props.setSelectedList;
  const selectedList = Props.selectedList;
  const [submit, setSubmit] = useState(false);
  const [List, setList] = useState([]);
  const [post, setpost] = useState(false);
  async function postcart(id, selectedList) {
    try {
      const response = await axios.post('http://127.0.0.1:80/user/cart', {
        userid: id,
        material: selectedList,
      });
      console.log(selectedList);
      setpost(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function getList() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:80/user/cart?userid=${USERID}`,
      );

      setSelectedList(response.data.result);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (post) {
      getList();
    }
  }, [post]);

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
            matrialList = List.map(key => key.foodname);
            postcart(USERID, matrialList);
            setpost(false);
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
export default CartCategory;
