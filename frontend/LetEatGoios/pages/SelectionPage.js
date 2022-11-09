import React, {useState} from 'react';
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
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
function SelectCount(Props) {
  count = Props.count;

  if (count == 0) {
    return <Image source={require('../assets/survey/none.png')}></Image>;
  } else if (count == 1) {
    return <Image source={require('../assets/survey/filled1.png')}></Image>;
  } else if (count == 2) {
    return <Image source={require('../assets/survey/filled2.png')}></Image>;
  } else if (count == 3) {
    return <Image source={require('../assets/survey/filled3.png')}></Image>;
  } else if (count == 4) {
    return <Image source={require('../assets/survey/filled4.png')}></Image>;
  } else {
    return (
      <Animated.Image
        style={animatedStyle}
        source={require('../assets/survey/filledAll.png')}></Animated.Image>
    );
  }
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
  return (
    <View
      style={{
        marginTop: Height * 0.01,
        position: 'relative',
        width: Height * 0.138,
        height: Height * 0.17,
        alignItems: 'center',
        marginLeft: Width * 0.025,
      }}>
      <Image
        style={styles.selectImage}
        source={require('../assets/Images/food1.jpeg')}></Image>
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
      <Text>음식 이름</Text>
    </View>
  );
}
function SelectionPage() {
  const {top} = useSafeAreaInsets();
  const [count, setCount] = useState(0);
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
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}>
              <ImageList count={count} setCount={setCount} />
              <ImageList count={count} setCount={setCount} />
              <ImageList count={count} setCount={setCount} />
              <ImageList count={count} setCount={setCount} />
              <ImageList count={count} setCount={setCount} />
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
