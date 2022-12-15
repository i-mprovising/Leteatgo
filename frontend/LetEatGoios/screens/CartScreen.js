import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import styles from '../style';
import LinearGradient from 'react-native-linear-gradient';
import Category from '../data/categoryIndex';
import CartCategory from '../components/cartAdd';
import axios from 'axios';
import {useRecoilState} from 'recoil';

import userkey from '../recoil/userKey';
import postRefrig from '../recoil/postRefrig';
function Cart() {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const [text, setText] = useState('');
  const onChangeText = payload => setText(payload);
  const [selectedList, setSelectedList] = useState([]);
  const [Delete, setDelete] = useState(false);
  const [USERID, setUserId] = useRecoilState(userkey);
  const [POST, setPOST] = useRecoilState(postRefrig);
  const [cartpost, setCartpost] = useState(false);
  async function postcart(id, selectedList) {
    try {
      const response = await axios.post('http://127.0.0.1:80/user/cart', {
        userid: USERID,
        material: selectedList,
      });
      console.log(selectedList);
      setCartpost(true);
    } catch (e) {
      console.log(e);
    }
  }
  async function deleteList(userid, index) {
    try {
      const response = await axios.delete(
        `http://3.34.153.73:8081/user/cart?index=${index}userid=${userid}}`,
      );

      console.log(response.data.result);
      setSelectedList(response.data.result);
      setDelete(true);
    } catch (error) {
      console.error(error);
    }
  }
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

  async function getList() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:80/user/cart?userid=${USERID}`,
      );

      console.log(response.data.result);
      setSelectedList(response.data.result);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (Delete) {
      getList();
    }
  }, [Delete]);
  useEffect(() => {
    if (cartpost) {
      getList();
    }
  }, [cartpost]);
  useEffect(() => {
    getList();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['bottom']}
        style={{flex: 1, backgroundColor: 'white'}}>
        <LinearGradient
          style={{height: top}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FFCDD2', '#FFAAB3']}
        />
        <StatusBar barStyle="light-content" />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FFCDD2', '#FFAAB3']}
          style={{...styles.block, justifyContent: 'flex-end'}}>
          <Text style={{...styles.text, marginRight: '22%'}}>장바구니</Text>
          <TouchableOpacity
            activeOpacity={0.65}
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Image
              style={{marginRight: '4%', marginTop: '6%'}}
              source={require('../assets/icons/Search.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.65}>
            <Image
              style={{marginRight: '5.01%'}}
              source={require('../assets/icons/Notice.png')}
            />
          </TouchableOpacity>
        </LinearGradient>
        <ScrollView>
          <Text
            style={{
              paddingLeft: 20,
              paddingTop: 17,
              paddingBottom: 6,
              fontSize: 16,
              fontWeight: '800',
            }}>
            나의 장바구니
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                paddingLeft: 14,
                paddingBottom: 10,
                fontSize: 15,
                fontWeight: '400',
              }}>
              구매하셨다면,
            </Text>
            <Image
              source={require('../assets/icons/addButton.png')}
              style={{width: 17, height: 17, marginHorizontal: 5}}></Image>
            <Text
              style={{
                paddingBottom: 10,
                fontSize: 15,
                fontWeight: '400',
              }}>
              버튼을 눌러 냉장고로 식재료를 옮겨보세요!
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginHorizontal: 17,
              alignItems: 'center',
            }}>
            {selectedList ? (
              selectedList.map((key, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom: 10,
                  }}>
                  <View style={styles.cartList}>
                    <Text
                      style={{
                        fontSize: 17,
                        // marginLeft: 18,

                        fontFamily: 'Happiness-Sans-Regular',
                      }}>
                      {key.materials}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        postIngre(USERID, [
                          {name: key.materials, category: -1},
                        ]);
                        setPOST(false);
                        deleteList(USERID, key.index);
                        setDelete(false);
                      }}>
                      <Image
                        source={require('../assets/icons/addButton.png')}
                        style={{
                          width: 20,
                          height: 20,
                          marginLeft: 5,
                          marginRight: 3,
                        }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        deleteList(USERID, key.index);
                        setDelete(false);
                      }}>
                      <Image
                        source={require('../assets/icons/trashcan.png')}
                        style={{
                          width: 17,
                          height: 17,
                          marginRight: 5,
                        }}></Image>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <ActivityIndicator
                style={{marginLeft: '47%', marginBottom: '10%'}}
              />
            )}
          </View>

          <View style={{position: 'relative'}}>
            <Text
              style={{
                paddingLeft: 20,
                paddingVertical: 17,
                fontSize: 16,
                fontWeight: '800',
              }}>
              장바구니 추가하기
            </Text>
            <TextInput
              autoCorrect={false}
              onSubmitEditing={() => {
                const list = [];
                list.push(text);
                postcart(USERID, list);
                setCartpost(false);
                setText('');
              }}
              onChangeText={onChangeText}
              style={styles.refrigeSearch}
              value={text}></TextInput>
            <Image
              source={require('../assets/icons/PinkSearch.png')}
              style={{
                position: 'absolute',
                top: '68%',
                left: '86%',
              }}></Image>
          </View>
          <ScrollView>
            {Category.map((key, index) => (
              <CartCategory
                key={key.name}
                category={key.name}
                array={key.array}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
              />
            ))}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default Cart;
