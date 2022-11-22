import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styles from '../style';
import LinearGradient from 'react-native-linear-gradient';
import selectIcon from '../data/selectionIcon';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
function SelectCount(Props) {
  count = Props.count;
  const navigation = useNavigation();
  if (count <= 4) {
    id = count;
    return <Image source={selectIcon[id].src}></Image>;
  } else {
    id = 5;
    return (
      <TouchableOpacity
        onPress={() => {
          // Props.postFood();

          Props.setLike([]);
          Props.setDislike([]);
          Props.setCount(0);

          navigation.navigate('afterSurvey');
          Props.getFood();
        }}>
        <Image source={selectIcon[id].src}></Image>
      </TouchableOpacity>
    );
  }
}

function ButtonImage(Props) {
  useEffect(() => {
    if (Props.count == 0) {
      Props.setSelect(false);
    }
  }, [Props.count]);

  if (Props.Select === true) {
    return <Image source={require('../assets/icons/CheckButton.png')}></Image>;
  } else {
    return (
      <Image source={require('../assets/icons/NonCheckButton.png')}></Image>
    );
  }
}

function ImageList(Props) {
  const [Select, setSelect] = useState(false);

  count = Props.count;
  setCount = Props.setCount;

  foodName = Props.foodName;
  src = Props.source;

  return (
    <View
      style={{
        marginTop: Height * 0.01,
        marginBottom: 12,
        position: 'relative',
        width: Height * 0.138,
        height: Height * 0.17,
        alignItems: 'center',
        marginLeft: Width * 0.025,
      }}>
      <Image
        style={styles.selectImage}
        source={
          src
            ? {
                uri: src,
              }
            : null
        }></Image>
      <TouchableOpacity
        activeOpacity={1}
        style={{position: 'absolute', top: '65%', left: '78%'}}
        onPress={() => {
          if (Select) {
            setCount(count - 1);
            newdisLike = Props.dislike;
            newdisLike.push(Props.foodId);
            Props.setDislike(newdisLike);
          } else {
            setCount(count + 1);
            newLike = Props.like;
            newLike.push(Props.foodId);
            Props.setLike(newLike);
            Props.dislike.forEach((item, index) => {
              if (item === Props.foodId) {
                newDislike = Props.dislike;
                newDislike = newDislike.filter(
                  element => element != Props.foodId,
                );
                Props.setDislike(newDislike);
              }
            });
          }
          setSelect(!Select);
        }}>
        <ButtonImage Select={Select} setSelect={setSelect} count={count} />
      </TouchableOpacity>
      <Text style={{fontWeight: '400'}}>{foodName}</Text>
    </View>
  );
}
function SelectionPage() {
  const {top} = useSafeAreaInsets();
  const [count, setCount] = useState(0);
  const [food, setFood] = useState([]);
  const [like, setLike] = useState([]);
  const [dislike, setDislike] = useState([]);
  async function getFood() {
    try {
      const response = await axios.get('http://127.0.0.1:80/survey');

      setFood(response.data.food);
      if (response.data.food) {
        const newDislike = Object.keys(response.data.food).map(
          key => response.data.food[key].foodid,
        );
        setDislike(newDislike);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const postFood = async () => {
    let body = {
      userid: 3003,
      prefer: {
        like,
        dislike,
      },
    };

    console.log(body);

    try {
      const response = await axios.post(
        'http://127.0.0.1:80/survey/save',
        body,
      );

      // console.log(response.data);
    } catch (e) {
      console.log('error');
      console.log(JSON.stringify(e));
      return e;
    }
  };

  useEffect(() => {
    getFood();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={{backgroundColor: 'white'}}>
        <View style={[styles.statusBarPlaceholder, {height: top}]} />
        <StatusBar barStyle="light-content" />
        <View style={{...styles.block, justifyContent: 'center'}}>
          <Text style={styles.title}>내 취향 레시피 찾아보기</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.InfoText}>좋아하는 음식을 5개 이상 고르면</Text>
          <Text style={styles.InfoText}>
            취향에 맞는 레시피를 추천해드려요!
          </Text>
        </View>
        <View style={{height: Height * 0.78, position: 'relative'}}>
          {/* <SelectCount /> */}
          <ScrollView>
            <View
              style={{
                marginBottom: 30,
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}>
              {food ? (
                food.map((key, index) => (
                  <ImageList
                    count={count}
                    key={index}
                    foodName={key.Name}
                    setCount={setCount}
                    source={key.Image}
                    foodId={key.foodid}
                    like={like}
                    setLike={setLike}
                    dislike={dislike}
                    setDislike={setDislike}
                  />
                ))
              ) : (
                <ActivityIndicator
                  animating={true}
                  color="white"
                  size="large"
                />
              )}
            </View>
          </ScrollView>
          <LinearGradient
            style={{
              position: 'absolute',
              opacity: 1,
              zIndex: 100, // 우현아 안드로이드는 elevation이래..바꿔서 쓰렴
              top: '90%',
              width: Width,
              alignItems: 'center',
            }}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#ffffff00', 'white']}>
            <SelectCount
              count={count}
              setCount={setCount}
              postFood={postFood}
              like={like}
              getFood={getFood}
              setLike={setLike}
              dislike={dislike}
              setDislike={setDislike}
            />
          </LinearGradient>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default SelectionPage;
