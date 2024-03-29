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
import FindIcon from '../components/findIcon';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import styles from '../style';
import LinearGradient from 'react-native-linear-gradient';
import Category from '../data/categoryIndex';
import IngreCategory from '../components/IngredientsAdd';
import axios from 'axios';
import {useRecoilState} from 'recoil';

import userkey from '../recoil/userKey';
function RefrigeratorScreen() {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const [text, setText] = useState('');
  const onChangeText = payload => setText(payload);
  const [selectedList, setSelectedList] = useState([]);
  const [USERID, setUserId] = useRecoilState(userkey);
  const [Delete, setDelete] = useState(false);
  const [Post, setPost] = useState(false);
  async function deleteIngred(userid, index) {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:80/user/ingredient?index=${index}userid=${userid}`,
      );

      // console.log(response.data.result);
      setSelectedList(response.data.result);
      setDelete(true);
    } catch (error) {
      console.error(error);
    }
  }
  async function getIngred(userid) {
    try {
      const response = await axios.get(
        `http://3.34.153.73:8081/user/ingredient?userid=${userid}`,
      );

      // console.log(response.data.result);
      setSelectedList(response.data.result);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (Delete) {
      getIngred(USERID);
    }
  }, [Delete]);
  useEffect(() => {
    if (Post) {
      getIngred(USERID);
    }
  }, [Post]);
  useEffect(() => {
    getIngred(USERID);
  }, []);

  async function postIngre(id, selectedList) {
    try {
      const response = await axios.post(
        'http://3.34.153.73:8081/user/ingredient',
        {
          userid: id,
          material: selectedList,
        },
      );
      setPost(true);
    } catch (e) {
      console.log(e);
    }
  }
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
          <Text style={{...styles.text, marginRight: '25%'}}>냉장고</Text>
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
              paddingVertical: 17,
              fontSize: 16,
              fontWeight: '800',
            }}>
            나의 냉장고
          </Text>
          <View
            style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 17}}>
            {selectedList ? (
              selectedList.map((key, index) => (
                <View
                  key={index}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <FindIcon
                    key={key.index}
                    category={key.category}
                    foodname={key.materials}
                  />

                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 12,
                        // marginLeft: 18,
                        fontFamily: 'Happiness-Sans-Regular',
                      }}>
                      {key.materials}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        deleteIngred(USERID, key.index);
                        setDelete(false);
                      }}>
                      <Image
                        source={require('../assets/icons/deleteIcon.png')}
                        style={{
                          width: 17,
                          height: 17,
                          marginLeft: 5,
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
              재료 추가하기
            </Text>
            <TextInput
              autoCorrect={false}
              onSubmitEditing={() => {
                const postList = [];
                postList.push({name: text, category: -1});
                postIngre(USERID, postList);
                setPost(false);
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
              <IngreCategory
                key={key.name}
                category={key.name}
                array={key.array}
                categoryId={key.id}
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
export default RefrigeratorScreen;
