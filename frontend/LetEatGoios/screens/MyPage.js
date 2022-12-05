import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import usernickname from '../recoil/userNickname';
import userkey from '../recoil/userKey';
import userid from '../recoil/userId';
import axios from 'axios';
import foodid from '../recoil/foodid';
import recipename from '../recoil/recipename';
import click from '../recoil/mypagePut';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import styles from '../style';
import {useIsFocused} from '@react-navigation/native';
function RecipeComponent(Props) {
  const navigation = useNavigation();
  const [FoodId, setFoodId] = useRecoilState(foodid);
  const [RecipeName, setRecipename] = useRecoilState(recipename);
  const [like, setLike] = useState(Props.like);
  const [check, setCheck] = useState(Props.check);

  const [KEY, setKEY] = useRecoilState(userkey);
  // const [put, setPut] = useRecoilState(click);
  async function putLike(Like, foodid) {
    console.log(Like);

    try {
      const response = await axios.put('http://127.0.0.1:80/user/like/update', {
        favorite: Like,
        foodid: foodid,
        userid: KEY,
      });
    } catch (e) {
      console.log(e);
    }
  }
  async function putMade(Made, foodid) {
    console.log(Made);
    try {
      const response = await axios.put('http://127.0.0.1:80/user/made/update', {
        made: Made,
        foodid: foodid,
        userid: KEY,
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={{position: 'relative'}}>
      <View
        style={{
          ...styles.mybox,
          height: Height * 0.2,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.65}
          onPress={() => {
            setFoodId(Props.foodid);
            setRecipename(Props.Name);
            navigation.navigate('Recipe');
          }}>
          <Image
            style={{...styles.myImage, marginLeft: 10}}
            source={{
              uri: Props.src,
            }}></Image>
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '50%',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontFamily: 'Happiness-Sans-Regular',
              fontWeight: '600',
              marginHorizontal: Width * 0.05,
              fontSize: 17,
            }}>
            {Props.Name}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row-reverse'}}>
        <TouchableOpacity
          onPress={() => {
            setCheck(!check);
            // setPut(!put);
            putMade(!check, Props.foodid);
          }}
          style={{position: 'absolute', bottom: 26, left: 10}}>
          <Image
            source={
              check
                ? require('../assets/icons/Checked2.png')
                : require('../assets/icons/Check2.png')
            }
            style={styles.myicon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLike(!like);
            // setPut(!put);
            putLike(!like, Props.foodid);
          }}
          style={{position: 'absolute', bottom: 26, left: 50}}>
          <Image
            source={
              like
                ? require('../assets/icons/Heart2.png')
                : require('../assets/icons/EmptyHeart2.png')
            }
            style={styles.myicon2}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MyRecipe() {
  const [userId, setUserId] = useRecoilState(userid);
  const [nickname, setNickname] = useRecoilState(usernickname);
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const [active, setActive] = useState(true);
  const [eat, setEaten] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const isFocused = useIsFocused();
  const [KEY, setKEY] = useRecoilState(userkey);
  // const [put, setPut] = useRecoilState(click);

  function doublcCheck(foodid, made) {
    check = false;
    made.map(key => {
      if (key.foodid == foodid) {
        check = true;
      }
    });
    return check;
  }

  async function getLike(userid) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:80/user/like?userid=${userid}`,
      );
      console.log('like');
      console.log(response.data.result);
      setFavorite(response.data.result);
    } catch (e) {
      console.log(e);
    }
  }
  async function getMade(userid) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:80/user/made?userid=${userid}`,
      );
      console.log(response.data.result);
      setEaten(response.data.result);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getMade(KEY);
    getLike(KEY);
  }, [isFocused]);
  // useEffect(() => {
  //   getMade(KEY);
  //   getLike(KEY);
  // }, [put]);
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['bottom']}
        style={{backgroundColor: 'white', flex: 1}}>
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
          <Text style={{...styles.text, marginRight: '20%'}}>마이레시피</Text>
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
        <View style={{flex: 1, backgroundColor: 'white'}}>
          {/* <Topbar navigation={navigation} /> */}
          <View style={{flex: 1, paddingHorizontal: Width * 0.03}}>
            <View style={{flex: 0.25}}>
              <View style={{...styles.mybox, flexDirection: 'row'}}>
                <Image
                  source={require('../assets/icons/User_default.png')}
                  style={{
                    marginLeft: Width * 0.05,
                    width: Width * 0.27,
                    height: Width * 0.27,
                  }}
                />
                <View style={{marginLeft: Width * 0.02}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: Height * 0.015,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Happiness-Sans-Regular',
                        fontSize: 17,
                        marginLeft: 15,
                        fontWeight: '500',
                      }}>
                      {nickname}
                    </Text>
                    <TouchableOpacity
                      style={styles.mylogoutButton}
                      onPress={() => {
                        Alert.alert('로그아웃 하시겠습니까?', '', [
                          {
                            text: '네',
                            onPress: () => {
                              AsyncStorage.removeItem('KEY');
                              AsyncStorage.removeItem('USERNICKNAME');
                              AsyncStorage.removeItem('user_id');
                              navigation.replace('Splash');
                            },
                          },
                          {
                            text: '아니오',
                          },
                        ]);
                      }}>
                      <Text
                        style={{
                          ...styles.mylogoutText,
                          textDecorationLine: 'underline',
                        }}>
                        로그아웃
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Happiness-Sans-Regular',
                      fontSize: 14,
                      marginLeft: 10,
                      fontWeight: '400',
                    }}>
                    {userId}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flex: 0.7}}>
              <View
                style={{
                  flex: 0.1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    ...styles.myblock,
                    backgroundColor: active ? '#FFCDD2' : '#F0F0F0',
                  }}
                  onPress={() => {
                    if (active) {
                      null;
                    } else {
                      getMade(KEY);
                      setActive(!active);
                    }
                  }}>
                  <Text
                    style={{
                      marginBottom: 8,
                      fontFamily: 'Happiness-Sans-Regular',
                      fontSize: 15,
                      color: active ? 'white' : 'black',
                      fontWeight: active ? '700' : '400',
                    }}>
                    만들어 본 레시피
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.myblock,

                    backgroundColor: active ? '#F0F0F0' : '#FFCDD2',
                  }}
                  onPress={() => {
                    if (active) {
                      getLike(KEY);
                      setActive(!active);
                    }
                  }}>
                  <Text
                    style={{
                      marginBottom: 8,
                      fontFamily: 'Happiness-Sans-Regular',
                      fontSize: 15,
                      color: !active ? 'white' : 'black',
                      fontWeight: !active ? '700' : '400',
                    }}>
                    관심 있는 레시피
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={{flex: 0.9}}>
                {active
                  ? eat.map((key, index) =>
                      doublcCheck(key.foodid, favorite) === true ? (
                        <RecipeComponent
                          key={index}
                          src={key.Image}
                          Name={key.Name}
                          foodid={key.foodid}
                          like={true}
                          check={true}
                        />
                      ) : (
                        <RecipeComponent
                          key={index}
                          src={key.Image}
                          Name={key.Name}
                          foodid={key.foodid}
                          like={false}
                          check={true}
                        />
                      ),
                    )
                  : favorite.map((key, index) =>
                      doublcCheck(key.foodid, eat) === true ? (
                        <RecipeComponent
                          key={index + 2000}
                          src={key.Image}
                          Name={key.Name}
                          foodid={key.foodid}
                          like={true}
                          check={true}
                        />
                      ) : (
                        <RecipeComponent
                          key={index + 2000}
                          src={key.Image}
                          Name={key.Name}
                          foodid={key.foodid}
                          like={true}
                          check={false}
                        />
                      ),
                    )}
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default MyRecipe;
