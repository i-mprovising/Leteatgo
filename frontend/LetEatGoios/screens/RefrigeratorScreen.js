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
import IngreCategory from '../pages/IngredientsAdd';

function RefrigeratorScreen() {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const [text, setText] = useState('');
  // console.log(Category);
  const onChangeText = payload => setText(payload);

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
          <Text style={styles.text}>냉장고</Text>
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
        <Text
          style={{
            paddingLeft: 20,
            paddingVertical: 30,
            fontSize: 16,
            fontWeight: '800',
          }}>
          나의 냉장고
        </Text>
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
            <IngreCategory category={key.name} array={key.array} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default RefrigeratorScreen;
