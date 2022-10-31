import React, {useState} from 'react';
import {Text, Image, View, StatusBar, TouchableOpacity} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styles from '../style';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
function ButtonImage(Props) {
  if (Props.Select === true) {
    console.log(Props.Select);
    return <Image source={require('../assets/icons/CheckButton.png')}></Image>;
  } else {
    return (
      <Image source={require('../assets/icons/NonCheckButton.png')}></Image>
    );
  }
}

function ImageList(Props) {
  const [Select, setSelect] = useState(false);
  Count = Props.Count;
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
          style={styles.selectImage}
          source={require('../assets/Images/food1.jpeg')}></Image>
        <TouchableOpacity
          activeOpacity={1}
          style={{position: 'absolute', top: '65%', left: '78%'}}
          onPress={() => {
            setSelect(!Select);
            console.log(Count);
          }}>
          <ButtonImage Select={Select} />
        </TouchableOpacity>
        <Text>음식 이름</Text>
      </View>
    </View>
  );
}
function SelectionPage() {
  const [Count, setCount] = useState(0);
  const {top} = useSafeAreaInsets();
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

export default SelectionPage;
