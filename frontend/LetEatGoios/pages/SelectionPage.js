import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styles from '../style';
import LinearGradient from 'react-native-linear-gradient';
import selectIcon from '../data/selectionIcon';
import axios from 'axios';
import {Food} from '../../../backend/models';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
function SelectCount(Props) {
  count = Props.count;
  count <= 4 ? (id = count) : (id = 5);
  return <Image source={selectIcon[id].src}></Image>;
}

function ButtonImage(Props) {
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
  src = Props.source;
  foodName = Props.foodName;
  console.log(src);
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
      <Image style={styles.selectImage} source={{uri: src}}></Image>
      <TouchableOpacity
        activeOpacity={1}
        style={{position: 'absolute', top: '65%', left: '78%'}}
        onPress={() => {
          console.log(Select);
          Select === true ? setCount(count - 1) : setCount(count + 1);
          setSelect(!Select);
        }}>
        <ButtonImage Select={Select} count={count} />
      </TouchableOpacity>
      <Text style={{fontWeight: '400'}}>{foodName}</Text>
    </View>
  );
}
function SelectionPage() {
  const {top} = useSafeAreaInsets();
  const [count, setCount] = useState(0);
  const [food, setFood] = useState([]);
  async function getFood() {
    try {
      const response = await axios.get('http://127.0.0.1:80/survey');
      // console.log(response.data.food);
      setFood(response.data.food);
      // console.log(food);
    } catch (error) {
      console.error(error);
    }
  }

  const foodPost = async () => {
    let body = {
      userid: 3000,
      prefer: {
        like: [0, 1, 2],
        dislike: [50, 10, 20],
      },
    };

    console.log(body);
    try {
      const response = await axios.post(
        'http://127.0.0.1:80/survey/save',
        body,
      );

      console.log(response.data);
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
          <ScrollView style={{marginBottom: 40}}>
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}>
              {food.map((key, index) => (
                <ImageList
                  count={count}
                  key={index}
                  foodName={key.Name}
                  setCount={setCount}
                  source={key.Image}
                />
              ))}
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
            <SelectCount count={count} />
          </LinearGradient>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default SelectionPage;
