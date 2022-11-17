import React, {useState} from 'react';
import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RecomRecipe from '../components/recomRecipe';
import {useNavigation} from '@react-navigation/native';
import styles from '../style';
import LinearGradient from 'react-native-linear-gradient';
import BeforeRecommend from '../components/beforeRecomend';
import {ScrollView} from 'react-native-gesture-handler';
function HomeScreen() {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const [Refriger, setRriger] = useState(false);

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
          <Text style={styles.text}>입맛춤</Text>
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

        <RecomRecipe text={'현재 냉장고로 만들 수 있는 레시피에요!'} />
        <BeforeRecommend
          location={'Selection'}
          title={'내 취향에 맞는 레시피'}
          button={'찾아보기'}
        />

        <BeforeRecommend
          location={'MbtiSurvey'}
          title={'나의 식습관 지표 MBTI'}
          button={'알아보기'}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default HomeScreen;
