import React, {useState} from 'react';
import {
  Text,
  TextInput,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import styles from '../style';
import LinearGradient from 'react-native-linear-gradient';
import Category from '../data/categoryIndex';
import IngreCategory from '../components/IngredientsAdd';

function Cart() {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const [text, setText] = useState('');
  const onChangeText = payload => setText(payload);
  const [selectedList, setSelectedList] = useState([]);
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
          <Text style={{...styles.text, marginLeft: 230}}>장바구니</Text>
          <TouchableOpacity
            activeOpacity={0.65}
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Image
              style={{marginRight: '3%', marginTop: '6%'}}
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
        <Text
          style={{
            paddingLeft: 20,
            paddingVertical: 17,
            fontSize: 16,
            fontWeight: '800',
          }}>
          나의 장바구니
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 17}}>
          {selectedList.map(key => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Image
                key={key.id}
                source={key.src}
                style={{...styles.ListImage}}
              />
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 12,
                    // marginLeft: 18,
                    fontFamily: 'Happiness-Sans-Regular',
                  }}>
                  {key.foodname}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    // console.log(selectedList);
                    // const newList = selectedList;
                    // newList.forEach((item, index) => {
                    //   if (item.foodname === key.foodname) {
                    //     newList.splice(index, key.id);
                    //   }
                    // });
                    // setSelectedList(newList);
                  }}>
                  <Image
                    source={require('../assets/icons/deleteIcon.png')}
                    style={{width: 17, height: 17, marginLeft: 5}}></Image>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={{position: 'relative'}}>
          <Text
            style={{
              paddingLeft: 20,
              paddingVertical: 17,
              fontSize: 16,
              fontWeight: '800',
            }}>
            재료 추가하기
          </Text>
          <TextInput
            autoCorrect={false}
            // onSubmitEditing={addHistory}
            onChangeText={onChangeText}
            style={styles.refrigeSearch}
            value={text}></TextInput>
          <Image
            source={require('../assets/icons/PinkSearch.png')}
            style={{
              position: 'absolute',
              top: '68%',
              left: '86%',
            }}></Image>
        </View>
        <ScrollView>
          {Category.map(key => (
            <IngreCategory
              category={key.name}
              array={key.array}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default Cart;
