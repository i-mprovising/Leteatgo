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
import userkey from '../recoil/userKey';
import postRefrig from '../recoil/postRefrig';
function IngreCategory(Props) {
  const [USERID, setUserId] = useRecoilState(userkey);
  const [POST, setPOST] = useRecoilState(postRefrig);

  category = Props.category;
  array = Props.array;
  const setSelectedList = Props.setSelectedList;
  const selectedList = Props.selectedList;
  const [submit, setSubmit] = useState(false);
  const [List, setList] = useState([]);

  async function postIngre(id, selectedList) {
    try {
      const response = await axios.post('http://127.0.0.1:80/user/ingredient', {
        userid: id,
        material: selectedList,
      });
      setPOST(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function getIngred() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:80/user/ingredient?userid=${USERID}`,
      );

      setSelectedList(response.data.result);
      console.log('response');
      console.log(response.data.result);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getIngred();
  }, []);
  useEffect(() => {
    if (POST) {
      getIngred();
    }
  }, [POST]);
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
          {array.map((key, index) => (
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

            // setSelectedList(newList);
            newMatrialList = [];
            matrialList = List.map(key =>
              newMatrialList.push({
                name: key.foodname,
                category: Props.categoryId,
              }),
            );
            // newMatrialList = {name: matrialList, category: 0};
            console.log('new');
            console.log(newMatrialList);
            postIngre(USERID, newMatrialList);
            setPOST(false);
            // // console.log(matrialList);
            // postcart(USERID, matrialList);

            // getIngerd();
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
