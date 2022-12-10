import axios from 'axios';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
import {useRecoilState} from 'recoil';
import RecipeTopArea from '../components/recipeVideo';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import styles from '../style';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useRecoilValue} from 'recoil';
import foodid from '../recoil/foodid';
import recipename from '../recoil/recipename';

import userkey from '../recoil/userKey';
import FindIcon from '../components/findIcon';

const Height = Dimensions.get('window').height;

function Recipe() {
  const Width = Dimensions.get('window').width;
  const navigation = useNavigation();
  const FoodId = useRecoilValue(foodid);

  const [orders, setOrders] = useState([]);
  const [detail, setDetail] = useState('');
  const [showDetail, setShowDetail] = useState(false);

  const RecipeName = useRecoilValue(recipename);
  const [userId, setUserId] = useRecoilState(userkey);
  const [material, setMaterial] = useState([]);
  const {top} = useSafeAreaInsets();
  axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';
  useEffect(() => {
    getData(userId, FoodId);
  }, []);

  async function getData(userid, FoodId) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:80/recipe?foodid=${FoodId}&userid=${userid}`,
      );

      setMaterial(Object.values(response.data.recipe.general.material));
      console.log(response.data.recipe.general);
      console.log(material);
      setDetail(response.data.recipe.detail);

      setOrders(response.data.recipe.general.order);
    } catch (e) {
      console.log(e);
    }
  }
  function addCart(item) {
    const ingredient = [];

    ingredient.push(item);
    console.log('ingredient add');
    console.log(ingredient);
    postcart(userId, ingredient);
  }
  async function postcart(id, selectedList) {
    try {
      const response = await axios.post('http://127.0.0.1:80/user/cart', {
        userid: id,
        material: selectedList,
      });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['bottom']}
        style={{backgroundColor: 'white', flex: 1}}>
        <View style={[styles.statusBarPlaceholder, {height: top}]} />
        <StatusBar barStyle="light-content" />
        <View style={{...styles.block, justifyContent: 'center'}}>
          <Text style={styles.title}>{RecipeName}</Text>
        </View>
        <RecipeTopArea food_name={RecipeName} />
        <ScrollView
          style={{
            paddingLeft: Width * 0.03,
            paddingRight: Width * 0.03,
            flex: 1,
          }}>
          <View style={{flex: 0.45}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: '#FFCDD2',
                  fontFamily: 'Happiness-Sans-Regular',
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: '600',
                }}>
                식재료
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#A4A4A4',
                  borderRadius: 10,
                  padding: 3,
                }}
                onPress={() => {
                  showDetail ? setShowDetail(false) : setShowDetail(true);
                }}>
                <Text style={{fontSize: 12, color: 'white'}}>자세히 보기</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'space-between',
                flexWrap: 'wrap',
                marginTop: Height * 0.01,
              }}>
              {material.map((key, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.5}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 7,
                  }}
                  onPress={() => {
                    Alert.alert(`장바구니에 ${key}를 추가하시겠습니까?`, '', [
                      {
                        text: '네',
                        onPress: () => {
                          addCart(key);
                        },
                      },
                      {
                        text: '아니오',
                      },
                    ]);
                  }}>
                  <Image
                    source={require('../assets/icons/smallAddButton.png')}
                    style={{marginLeft: 50}}></Image>
                  <FindIcon key={index} category={-1} foodname={key} />
                  <Text
                    style={{
                      fontSize: 12,
                      // marginLeft: 18,
                      fontFamily: 'Happiness-Sans-Regular',
                    }}>
                    {key}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text>{showDetail ? detail : null}</Text>

          <View
            style={{
              flex: 0.1,
              marginBottom: Height * 0.05,
              marginTop: Height * 0.02,
            }}>
            <Text
              style={{
                color: '#FFCDD2',
                fontFamily: 'Happiness-Sans-Regular',
                fontSize: 16,
                marginLeft: 10,
                fontWeight: '600',
              }}>
              레시피
            </Text>
            {orders.order1 ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: '3.5%',
                      fontFamily: 'Roboto-Bold',
                      fontStyle: 'italic',
                      fontWeight: '900',
                      color: '#FFAAB3',
                      fontSize: 28,
                      marginTop: '4%',
                    }}>
                    1
                  </Text>

                  <Text
                    style={{
                      marginTop: Width * 0.04,
                      flexShrink: 1,
                      fontSize: 15,
                      fontWeight: '400',
                      fontFamily: 'Happiness-Sans-Regular',
                    }}>
                    {orders.order1.substring(2)}
                  </Text>
                </View>
                <Image
                  style={styles.RecipeImage}
                  source={{
                    uri: orders.order1_img,
                  }}
                />
              </View>
            ) : null}
            {orders.order2 ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: '3.5%',
                      fontFamily: 'Roboto-Bold',
                      fontStyle: 'italic',
                      fontWeight: '900',
                      color: '#FFAAB3',
                      fontSize: 28,
                      marginTop: '2%',
                    }}>
                    2
                  </Text>

                  <Text
                    style={{
                      marginTop: Width * 0.04,
                      fontSize: 15,
                      fontWeight: '400',
                      fontFamily: 'Happiness-Sans-Regular',
                      flexShrink: 1,
                    }}>
                    {orders.order2.substring(2)}
                  </Text>
                </View>
                <Image
                  style={styles.RecipeImage}
                  source={{
                    uri: orders.order2_img,
                  }}
                />
              </View>
            ) : null}
          </View>
          {orders.order3 ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'center',
                }}>
                <Text
                  style={{
                    paddingHorizontal: '3.5%',
                    fontFamily: 'Roboto-Bold',
                    fontStyle: 'italic',
                    fontWeight: '900',
                    color: '#FFAAB3',
                    fontSize: 28,
                    marginTop: '2%',
                  }}>
                  3
                </Text>

                <Text
                  style={{
                    // marginTop: Width * 0.04,
                    fontSize: 15,
                    fontWeight: '400',
                    fontFamily: 'Happiness-Sans-Regular',
                    flexShrink: 1,
                  }}>
                  {orders.order3.substring(2)}
                </Text>
              </View>
              <Image
                style={styles.RecipeImage}
                source={{
                  uri: orders.order3_img,
                }}
              />
            </View>
          ) : null}
          {orders.order4 ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'center',
                }}>
                <Text
                  style={{
                    paddingHorizontal: '3.5%',
                    fontFamily: 'Roboto-Bold',
                    fontStyle: 'italic',
                    fontWeight: '900',
                    color: '#FFAAB3',
                    fontSize: 28,
                    marginTop: '3%',
                  }}>
                  4
                </Text>

                <Text
                  style={{
                    marginTop: Width * 0.04,
                    fontSize: 15,
                    fontWeight: '400',
                    fontFamily: 'Happiness-Sans-Regular',
                    flexShrink: 1,
                  }}>
                  {orders.order4.substring(2)}
                </Text>
              </View>
              <Image
                style={styles.RecipeImage}
                source={{
                  uri: orders.order4_img,
                }}
              />
            </View>
          ) : null}
          {orders.order5 ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'center',
                }}>
                <Text
                  style={{
                    paddingHorizontal: '3.5%',
                    fontFamily: 'Roboto-Bold',
                    fontStyle: 'italic',
                    fontWeight: '900',
                    color: '#FFAAB3',
                    fontSize: 28,
                    marginTop: '3%',
                  }}>
                  5
                </Text>

                <Text
                  style={{
                    marginTop: Width * 0.04,
                    fontSize: 15,
                    fontWeight: '400',
                    fontFamily: 'Happiness-Sans-Regular',
                    flexShrink: 1,
                  }}>
                  {orders.order5.substring(2)}
                </Text>
              </View>
              <Image
                style={styles.RecipeImage}
                source={{
                  uri: orders.order5_img,
                }}
              />
            </View>
          ) : null}
          {orders.order6 ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'center',
                }}>
                <Text
                  style={{
                    paddingHorizontal: '3.5%',
                    fontFamily: 'Roboto-Bold',
                    fontStyle: 'italic',
                    fontWeight: '900',
                    color: '#FFAAB3',
                    fontSize: 28,
                    marginTop: '3%',
                  }}>
                  6
                </Text>

                <Text
                  style={{
                    marginTop: Width * 0.04,
                    fontSize: 15,
                    fontWeight: '400',
                    fontFamily: 'Happiness-Sans-Regular',
                    flexShrink: 1,
                  }}>
                  {orders.order6.substring(2)}
                </Text>
              </View>
              <Image
                style={styles.RecipeImage}
                source={{
                  uri: orders.order6_img,
                }}
              />
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Recipe;
