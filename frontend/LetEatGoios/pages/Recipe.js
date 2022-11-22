import axios from 'axios';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Share,
} from 'react-native';
import {useRecoilState} from 'recoil';
import RecipeOrder from '../components/recipeOrder';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import styles from '../style';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';

import {useRecoilValue} from 'recoil';
import foodid from '../recoil/foodid';
import recipename from '../recoil/recipename';
import userid from '../recoil/userId';

const Height = Dimensions.get('window').height;

function Recipe() {
  const Width = Dimensions.get('window').width;
  const navigation = useNavigation();
  const FoodId = useRecoilValue(foodid);
  const [error, setError] = useState('');
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [made, setMade] = useState(false);
  const [madeCount, setMadeCount] = useState(0);
  const [view, setView] = useState(174334);
  const [orders, setOrders] = useState([]);
  const [detail, setDetail] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [playing, setPlaying] = useState(true);
  // const [foodName, setFoodName] = useState('');

  const RecipeName = useRecoilValue(recipename);
  const [userId, setUserId] = useRecoilState(userid);
  const [params, setParams] = useState({
    key: 'AIzaSyC5Ss_A2H0Z9kWdY21AcQawsWCJRvFPA3k',
    q: '제육볶음',
    type: 'video',
    maxResults: 3,
    part: 'snippet',
  });
  const {top} = useSafeAreaInsets();
  axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';
  useEffect(() => {
    getData(FoodId);
  }, []);
  const findLink = useCallback(() => {
    axios
      .get('/search', {params})
      .then(response => {
        console.log(response.data.items);
        if (!response) {
          setError('검색된 영상이 없습니다');
          return;
        }
        // console.log(response.data.item)
      })
      .catch(err => {
        console.log(err);
      });
  }, [params]);

  async function getData(FoodId) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:80/recipe?foodid=${FoodId}&userid=${userId}`,
      );
      console.log(response.data);

      setDetail(response.data.recipe.detail);
      console.log(detail);

      setOrders(response.data.recipe.general.order);
      console.log(orders);
    } catch (e) {
      console.log(e);
    }
  }

  // useEffect(()=>{
  //   const getData = async ()=>{

  //   }
  // },[])

  const link =
    'https://www.youtube.com/watch?v=oEWZ4DOgVK4&ab_channel=GONGSAMTABLE%EC%9D%B4%EA%B3%B5%EC%82%BC';

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: link,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('activityType!');
        } else {
          console.log('Share!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed!');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  console.log(FoodId);
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

        <View style={{flex: 0.55, padding: 5}}>
          <View style={{flex: 0.65}}>
            <YoutubePlayer
              height={300}
              play={playing}
              videoId={'oEWZ4DOgVK4'}
            />
          </View>

          <View style={{flex: 0.35, marginTop: Height * 0.005}}>
            <Text style={styles.recipeText}>제육볶음 레시피</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 5,
                flex: 0.5,
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.bottomButton}
                  onPress={
                    like === false
                      ? () => {
                          setLike(true);
                          setLikeCount(likeCount + 1);
                        }
                      : () => {
                          setLike(false);
                          setLikeCount(likeCount - 1);
                        }
                  }>
                  <Image
                    source={
                      like === true
                        ? require('../assets/icons/Heart.png')
                        : require('../assets/icons/EmptyHeart.png')
                    }
                  />
                  <Text style={styles.bottomButtonText}>{likeCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.bottomButton}
                  onPress={
                    made === false
                      ? () => {
                          setMade(true);
                          setMadeCount(madeCount + 1);
                        }
                      : () => {
                          setMade(false);
                          setMadeCount(madeCount - 1);
                        }
                  }>
                  <Image
                    source={
                      made === true
                        ? require('../assets/icons/Checked.png')
                        : require('../assets/icons/Check.png')
                    }
                  />
                  <Text style={styles.bottomButtonText}>{madeCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.bottomButton}
                  onPress={() => onShare()}>
                  <Image source={require('../assets/icons/Share.png')} />
                  <Text style={styles.bottomButtonText2}>공유하기</Text>
                </TouchableOpacity>
              </View>
              <Text>조회수 {view.toString()}회</Text>
            </View>
          </View>
        </View>
        <View style={{flex: 0.45, marginBottom: 20}}>
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
                    fontSize: 15,
                    marginLeft: 10,
                    fontWeight: '700',
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
                  <Text style={{fontSize: 12, color: 'white'}}>
                    자세히 보기
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  marginBottom: Height * 0.01,
                }}>
                <Image
                  source={require('../assets/ingredients/Seafoods/Maskgroup-0.png')}
                  style={styles.icon}
                />
                <Image
                  source={require('../assets/ingredients/Seafoods/Maskgroup-0.png')}
                  style={styles.icon}
                />

                <Image
                  source={require('../assets/ingredients/Seafoods/Maskgroup-0.png')}
                  style={styles.icon}
                />
                <Image
                  // source={require('../assets/ingredients/Seafoods/Maskgroup-0.png')}
                  source={require('../assets/ingredients/none.png')}
                  style={styles.icon}
                />
              </View>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: '#FFCDD2',
                  marginLeft: 10,
                  fontSize: 15,
                  fontWeight: '700',
                }}>
                조미료
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginBottom: Height * 0.01,
                }}>
                <Image
                  source={require('../assets/ingredients/Seafoods/Maskgroup-0.png')}
                  style={styles.icon}
                />
                <Image
                  source={require('../assets/ingredients/Seafoods/Maskgroup-0.png')}
                  style={styles.icon}
                />
              </View>
            </View>

            <Text>{showDetail ? detail : null}</Text>

            <View
              style={{
                flex: 0.1,
                marginBottom: Height * 0.05,
                marginTop: Height * 0.02,
              }}>
              <Text style={{color: '#FFCDD2'}}>레시피</Text>
              {orders.Order1 ? (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',

                      // justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        paddingHorizontal: '7%',
                        fontFamily: 'Roboto-Bold',
                        fontStyle: 'italic',
                        fontWeight: '900',
                        color: '#FFAAB3',
                        fontSize: 28,
                        marginTop: '4%',
                      }}>
                      1
                    </Text>

                    <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                      {orders.Order1.substring(2)}
                    </Text>
                  </View>
                  <Image
                    style={styles.RecipeImage}
                    source={{
                      uri: orders.Order1_img,
                    }}
                  />
                </View>
              ) : null}
              {orders.Order2 ? (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        paddingHorizontal: '7%',
                        fontFamily: 'Roboto-Bold',
                        fontStyle: 'italic',
                        fontWeight: '900',
                        color: '#FFAAB3',
                        fontSize: 28,
                        marginTop: '2%',
                      }}>
                      2
                    </Text>

                    <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                      {orders.Order2.substring(2)}
                    </Text>
                  </View>
                  <Image
                    style={styles.RecipeImage}
                    source={{
                      uri: orders.Order2_img,
                    }}
                  />
                </View>
              ) : null}
            </View>
            {orders.Order3 ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: '7%',
                      fontFamily: 'Roboto-Bold',
                      fontStyle: 'italic',
                      fontWeight: '900',
                      color: '#FFAAB3',
                      fontSize: 28,
                      marginTop: '2%',
                    }}>
                    3
                  </Text>

                  <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                    {orders.Order3.substring(2)}
                  </Text>
                </View>
                <Image
                  style={styles.RecipeImage}
                  source={{
                    uri: orders.Order3_img,
                  }}
                />
              </View>
            ) : null}
            {orders.Order4 ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: '7%',
                      fontFamily: 'Roboto-Bold',
                      fontStyle: 'italic',
                      fontWeight: '900',
                      color: '#FFAAB3',
                      fontSize: 28,
                      marginTop: '3%',
                    }}>
                    4
                  </Text>

                  <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                    {orders.Order4.substring(2)}
                  </Text>
                </View>
                <Image
                  style={styles.RecipeImage}
                  source={{
                    uri: orders.Order4_img,
                  }}
                />
              </View>
            ) : null}
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Recipe;
