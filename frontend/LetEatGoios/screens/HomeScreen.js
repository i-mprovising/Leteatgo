import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RecomRecipe from '../components/recomRecipe';
import {useNavigation} from '@react-navigation/native';
import styles from '../style';
import LinearGradient from 'react-native-linear-gradient';
import BeforeRecommend from '../components/beforeRecomend';
import {ScrollView} from 'react-native-gesture-handler';
import {useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usernickname from '../recoil/userNickname';
import IngreRecipe from '../components/ingreRecipe';
import userkey from '../recoil/userKey';
import axios from 'axios';
import Survey2 from '../recoil/survey';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import {
  mbtiFinish,
  eCount,
  iCount,
  sCount,
  wCount,
  uCount,
  fCount,
  rCount,
  vCount,
  aCount,
  pCount,
} from '../recoil/mbtiCount';
import {useIsFocused} from '@react-navigation/native';
import {BottomTabBarHeightCallbackContext} from '@react-navigation/bottom-tabs';
function HomeScreen() {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const [survey, setSurvey] = useState(false);
  const [survey2, setSurvey2] = useRecoilState(Survey2);
  const [userResult, setuserResult] = useState();
  const [ingreResult, setIngreResult] = useState();
  const [KEY, setKey] = useRecoilState(userkey);
  const [userNickname, setUserNickName] = useRecoilState(usernickname);

  const [finishMbti, setFinishMbti] = useState(false);
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');
  const [fifth, setFifth] = useState('');

  const [eTemp, setETemp] = useRecoilState(eCount);
  const [iTemp, setITemp] = useRecoilState(iCount);
  const [sTemp, setSTemp] = useRecoilState(sCount);
  const [wTemp, setWTemp] = useRecoilState(wCount);
  const [uTemp, setUTemp] = useRecoilState(uCount);
  const [fTemp, setFTemp] = useRecoilState(fCount);
  const [rTemp, setRTemp] = useRecoilState(rCount);
  const [vTemp, setVTemp] = useRecoilState(vCount);
  const [aTemp, setATemp] = useRecoilState(aCount);
  const [pTemp, setPTemp] = useRecoilState(pCount);
  const isFocused = useIsFocused();
  const getUserR = async key => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:80/',
        {
          params: {userid: 97},
        },
        {withCredentials: true},
      );

      console.log('보유식자재');
      console.log(response.data.data[1]);
      if (response.data) {
        setuserResult(response.data.data[0]);
        setIngreResult(response.data.data[1]);
      }
    } catch (e) {
      console.error(e);
      console.log(JSON.stringify(e));
      return e;
    }
  };
  useEffect(() => {
    setSurvey2(false);
    getUserR();
  }, []);
  useEffect(() => {
    getUserR();
  }, [survey2]);
  useEffect(() => {
    AsyncStorage.getItem('one').then(value => {
      value !== null ? setFinishMbti(true) : null;
    });
    AsyncStorage.getItem('one').then(value => {
      setFirst(value);
    });
    AsyncStorage.getItem('two').then(value => {
      setSecond(value);
    });
    AsyncStorage.getItem('three').then(value => {
      setThird(value);
    });
    AsyncStorage.getItem('four').then(value => {
      setFourth(value);
    });
    AsyncStorage.getItem('five').then(value => {
      setFifth(value);
    });
  }, [isFocused]);
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
          <Text style={{...styles.text, marginRight: '24%'}}>입맛춤</Text>
          <TouchableOpacity
            activeOpacity={0.65}
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Image
              style={{marginRight: '5.01%', marginTop: '6%'}}
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
          <View style={{alignItems: 'center'}}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '400',
                  fontFamily: 'Happiness-Sans-Regular',
                  marginTop: 20,
                }}>
                안녕하세요? {userNickname}님🥘,
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '400',
                  fontFamily: 'Happiness-Sans-Regular',
                  marginBottom: 8,
                  marginTop: 10,
                }}>
                {userNickname}님에게 꼭 맞는 레시피를 추천해드릴게요!
              </Text>
            </View>

            {survey ? (
              <RecomRecipe
                text={'나의 입맛에 쏙 맞게 추천된 레시피에요!'}
                data={userResult}
              />
            ) : (
              <BeforeRecommend
                location={'Selection'}
                title={'내 취향에 맞는 레시피'}
                button={'찾아보기'}
                survey={survey}
                setSurvey={setSurvey}
              />
            )}
            {survey2 ? (
              <IngreRecipe
                text={'내가 지금 만들 수 있는 레시피에요!'}
                data={ingreResult}
              />
            ) : (
              <BeforeRecommend
                location={'Refrigerator'}
                title={'나의 냉장고로 만들 수 있는 음식은?'}
                button={'찾아보기'}
                survey={survey2}
                setSurvey={setSurvey2}
              />
            )}

            {!finishMbti ? (
              <BeforeRecommend
                location={'MbtiSurvey'}
                title={'나의 식습관 지표 MBTI'}
                button={'알아보기'}
                survey={survey2}
                setSurvey={setSurvey2}
              />
            ) : (
              <View
                style={{
                  ...styles.HomeBox,
                  height: Height * 0.2,
                }}>
                <Text style={styles.BeforeText}>나의 먹비티아이는 ?</Text>
                <View
                // style={{
                //   borderRadius: 7,
                //   borderColor: 'pink',
                //   backgroundColor: 'pink',
                // }}
                >
                  <Text
                    style={{
                      ...styles.BeforeText,
                      fontSize: 30,
                      fontWeight: '900',
                      marginVertical: 2,
                      color: 'pink',
                      paddingHorizontal: 10,
                    }}>
                    "{first}
                    {second}
                    {third}
                    {fourth}-{fifth}"
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 7}}>
                  <TouchableOpacity
                    activeOpacity={0.65}
                    onPress={() => {
                      setETemp(0);
                      setITemp(0);
                      setSTemp(0);
                      setWTemp(0);
                      setUTemp(0);
                      setFTemp(0);
                      setRTemp(0);
                      setVTemp(0);
                      setATemp(0);
                      setPTemp(0);
                      navigation.navigate('MbtiSurvey');
                    }}>
                    <View style={{...styles.TextBox, alignItems: 'center'}}>
                      <Text style={{...styles.ButtonText, paddingVertical: 5}}>
                        재검사하기
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.65}
                    onPress={() => navigation.navigate('MbtiResult')}
                    style={{marginHorizontal: Width * 0.01}}>
                    <View style={{...styles.TextBox, alignItems: 'center'}}>
                      <Text style={{...styles.ButtonText, paddingVertical: 5}}>
                        검사결과 보기
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default HomeScreen;
