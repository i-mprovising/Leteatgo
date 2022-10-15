import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
function ButtonImage(Props) {
  if (Props.Select === true) {
    return <Image source={require('../assets/icons/CheckButton.png')}></Image>;
  } else {
    return (
      <Image source={require('../assets/icons/NonCheckButton.png')}></Image>
    );
  }
}

function ImageList() {
  const [Select, setSelect] = useState(false);

  return (
    <View>
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
          style={styles.image}
          source={require('../assets/Images/food1.jpeg')}></Image>
        <TouchableOpacity
          activeOpacity={1}
          style={{position: 'absolute', top: '65%', left: '78%'}}
          onPress={() => {
            Select === true ? setSelect(false) : setSelect(true);
            console.log(Select);
          }}>
          <ButtonImage Select={Select} />
        </TouchableOpacity>
        <Text>음식 이름</Text>
      </View>
    </View>
  );
}
function SelectionPage() {
  const {top} = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={{backgroundColor: 'white'}}>
        <View style={[styles.statusBarPlaceholder, {height: top}]} />
        <StatusBar barStyle="light-content" />
        <View style={styles.block}>
          <Text style={styles.title}>내 취향 레시피 찾아보기</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>좋아하는 음식을 5개 이상 고르면</Text>
          <Text style={styles.text}>취향에 맞는 레시피를 추천해드려요!</Text>
        </View>
        <View style={{height: Height * 0.77}}>
          <ScrollView>
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}>
              <ImageList />
              <ImageList />
              <ImageList />
              <ImageList />
              <ImageList />
              <ImageList />
              <ImageList />
              <ImageList />
              <ImageList />
              <ImageList />
              <ImageList />
              <ImageList />
              <ImageList />
              <ImageList />
              <ImageList />
              <ImageList />
              <ImageList />
              <ImageList />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  statusBarPlaceholder: {
    backgroundColor: '#FFCDD2',
  },
  block: {
    backgroundColor: '#FFCDD2',
    paddingVertical: Height * 0.0146,
    borderBottomRightRadius: 23,
    marginBottom: Height * 0.006,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: '900',
    color: 'white',
    fontFamily: 'Happiness-Sans-Bold',
  },
  text: {
    fontFamily: 'Happiness-Sans-Bold',
    fontWeight: '400',
    fontSize: 17,
    paddingTop: Height * 0.005,
    marginBottom: Height * 0.005,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: Height * 0.138,
    width: Height * 0.135,
    marginHorizontal: Width * 0.01,
    marginBottom: Height * 0.01,
    borderBottomRightRadius: 13,
  },
});

export default SelectionPage;
