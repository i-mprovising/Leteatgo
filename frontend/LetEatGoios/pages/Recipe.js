import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  Share,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import styles from '../style';

function Recipe({route}) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [made, setMade] = useState(false);
  const [madeCount, setMadeCount] = useState(0);
  const [view, setView] = useState(174334);
  const [detail, setDetail] = useState('');
  const navigation = useNavigation();
  {
    // useEffect(()=>{
    //   const getData = async ()=>{

    //   }
    // },[])
    async function getData(food_id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:80/recipe?foodid=2&userid=3004`,
        );
        console.log(response.data);
        // setDetail(response.data.recipe.detail);
      } catch (e) {
        console.log(e);
      }
    }

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

    return (
      <SafeAreaProvider>
        <SafeAreaView edges={['bottom']} style={{backgroundColor: 'white'}}>
          <View style={[styles.statusBarPlaceholder, {height: top}]} />
          <StatusBar barStyle="light-content" />
          <View style={{...styles.block, justifyContent: 'center'}}>
            <Text style={styles.title}>내 취향 레시피 찾아보기</Text>
          </View>

          <View style={{flex: 0.55, padding: 5}}>
            <View style={{flex: 0.65}}>
              <Image
                source={require('../assets/Images/food1.jpeg')}
                style={{width: '100%', height: '100%'}}
                resizeMode="stretch"
              />
            </View>

            <View style={{flex: 0.35, marginTop: Height * 0.005}}>
              <Text style={styles.recipeText}>
                [ASMR MUKBANG] 직접 만든 떡볶이 불닭볶음면 양념 치킨먹방! &
                레시피
              </Text>
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
                          ? require('../../android/app/assets/icons/Heart.png')
                          : require('../../android/app/assets/icons/EmptyHeart.png')
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
                          ? require('../../android/app/assets/icons/Checked.png')
                          : require('../../android/app/assets/icons/Check.png')
                      }
                    />
                    <Text style={styles.bottomButtonText}>{madeCount}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bottomButton}>
                    <Image
                      source={require('../../android/app/assets/icons/Share.png')}
                    />
                    <Text
                      style={styles.bottomButtonText2}
                      onPress={() => onShare()}>
                      공유하기
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text>
                  조회수{' '}
                  {view
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  회
                </Text>
              </View>
            </View>
          </View>
          <View style={{flex: 0.45}}>
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
                  <Text style={{color: '#FFCDD2'}}>식재료</Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#A4A4A4',
                      borderRadius: 10,
                      padding: 3,
                    }}>
                    <Text
                      style={{fontSize: 12, color: 'white'}}
                      onPress={() => {
                        console.log(typeof route.params.food_id);
                        getData(route.params.food_id);
                      }}>
                      자세히 보기
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{flexDirection: 'row', marginBottom: Height * 0.01}}>
                  <Image
                    source={require('../../android/app/assets/Ingredient/chicken.png')}
                    style={styles.icon}
                  />
                  <Image
                    source={require('../../android/app/assets/Ingredient/sausage.png')}
                    style={styles.icon}
                  />

                  <Image
                    source={require('../../android/app/assets/Ingredient/meatball.png')}
                    style={styles.icon}
                  />
                  <Image
                    source={require('../../android/app/assets/Ingredient/ramen.png')}
                    style={styles.icon}
                  />
                </View>
              </View>
              <View style={{flex: 1}}>
                <Text style={{color: '#FFCDD2'}}>조미료</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: Height * 0.01,
                  }}>
                  <Image
                    source={require('../../android/app/assets/Ingredient/sesame_oil.png')}
                    style={styles.icon}
                  />
                  <Image
                    source={require('../../android/app/assets/Ingredient/soy_sauce.png')}
                    style={styles.icon}
                  />
                </View>
              </View>

              <Text>{detail}</Text>

              <View
                style={{
                  flex: 0.1,
                  marginBottom: Height * 0.05,
                  marginTop: Height * 0.02,
                }}>
                <Text style={{color: '#FFCDD2'}}>레시피</Text>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={require('../../android/app/assets/icons/1.png')}
                    style={styles.texticon}
                  />
                  <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                    양파는 채썰고 슬라이스햄은 먹기 좋은 크기로 썰어줍니다.
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../../android/app/assets/icons/2.png')}
                    style={styles.texticon}
                  />
                  <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                    끓는 물에 면을 먼저 데쳐줍니다. 이때 면은 완전히 삶는 것이
                    아닌 면이 살짝 풀어질 정도로만 데리고, 데친 면은 찬물에 담가
                    면이 불지 않도록 식혀주세요.
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../../android/app/assets/icons/3.png')}
                    style={styles.texticon}
                  />
                  <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                    달궈진 팬에 오일을 두르고 슬라이스햄과 다진마늘, 채썬 양파를
                    약불에서 5분간 볶아주세요.
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default Recipe;
