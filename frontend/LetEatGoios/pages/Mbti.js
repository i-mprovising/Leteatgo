import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {atom, useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import styles from '../style';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import userid from '../recoil/userId';
import {useNavigation} from '@react-navigation/native';
function Mbti() {
  const {top} = useSafeAreaInsets();
  const [userId, setUserId] = useRecoilState(userid);

  const navigation = useNavigation();
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');
  const [fifth, setFifth] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(`${userId}one`).then(value => {
      setFirst(value);
    });
    AsyncStorage.getItem(`${userId}two`).then(value => {
      setSecond(value);
    });
    AsyncStorage.getItem(`${userId}three`).then(value => {
      setThird(value);
    });
    AsyncStorage.getItem(`${userId}four`).then(value => {
      setFourth(value);
    });
    AsyncStorage.getItem(`${userId}five`).then(value => {
      setFifth(value);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['bottom']}
        style={{backgroundColor: 'white', flex: 1}}>
        <View style={{backgroundColor: 'white', flex: 1}}>
          <View style={[styles.statusBarPlaceholder, {height: top}]} />
          <StatusBar barStyle="light-content" />
          <View style={{...styles.block, justifyContent: 'center'}}>
            <Text style={styles.title}>나의 먹비티아이는?</Text>
          </View>
          <LinearGradient colors={['#FFCDD2', '#FFAAB3']} style={{flex: 1}}>
            <ScrollView style={{paddingHorizontal: Width * 0.02}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 0.2,
                  height: Height * 0.2,
                }}>
                <Text style={{color: 'white', fontSize: 30, fontWeight: '600'}}>
                  나의 먹비티아이는
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 40,
                    fontWeight: '700',
                  }}>
                  {first}
                  {second}
                  {third}
                  {fourth} - {fifth}
                </Text>
              </View>
              <View style={{flex: 0.8}}>
                <View
                  style={{
                    ...styles.RtextArea,
                    backgroundColor: '#EFB6BC',
                    marginBottom: Height * 0.05,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      marginRight: Width * 0.6,
                      fontSize: 16,
                      fontFamily: 'Happiness-Sans-Regular',
                    }}>
                    나는 음식에 있어
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      marginHorizontal: Width * 0.05,
                    }}>
                    {first === 'E' ? 'Extraversion' : 'Introversion'},
                    {second === 'S' ? ' Strong' : ' Weak '},
                    {third === 'U' ? ' Unbalanced' : ' Full Balanced'},
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      marginHorizontal: Width * 0.07,
                    }}>
                    {fourth === 'R' ? 'Regular' : 'Variable'},
                    {fifth === 'A' ? ' Active' : ' Passive'}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      marginLeft: Width * 0.6,
                      fontSize: 16,
                      fontFamily: 'Happiness-Sans-Regular',
                    }}>
                    한 사람입니다!
                  </Text>
                </View>
                <View style={styles.RtextArea}>
                  <Text style={{...styles.RmbtiTitle, fontWeight: '500'}}>
                    외부에 대응하는 성향 👥
                  </Text>
                  <View style={styles.RmbtiToggle}>
                    <Text
                      style={
                        first === 'E' ? styles.RmbtiActive : styles.RmbtiPassive
                      }>
                      Extraversion
                    </Text>
                    <Text
                      style={
                        first === 'E' ? styles.RmbtiPassive : styles.RmbtiActive
                      }>
                      Introversion
                    </Text>
                  </View>
                  <Text style={styles.resultText}>
                    {first === 'E'
                      ? '회원님은 남들과 이야기하면서 식사하는 것을 즐기는 유형으로, 혼밥을 즐겨하시지 않는 유형으로 보입니다. 잦은 외식으로 인한 과한 식비 지출이 발생할 수 있습니다. 가끔씩은 집밥을 먹어보는 건 어떨까요?'
                      : ' 회원님은 혼밥족으로, 유튜브를 보면서 밥을 먹거나 밥 먹는데 집중하는 유형입니다. 남들과 이야기하면서 밥을 먹는 것을 선호하지 않습니다. 혹시 혼자 배달음식을 시켜먹는 것을 선호하시거나 혼자 식당에서 눈치보면서 밥을 먹고 계시다면, 집에서 편하게 음식을 만들어서 혼자 밥을 먹어보는건 어떠신가요?'}
                  </Text>
                </View>
                <View style={styles.RtextArea}>
                  <Text style={{...styles.RmbtiTitle, fontWeight: '500'}}>
                    체력 💪🏻
                  </Text>
                  <View style={styles.RmbtiToggle}>
                    <Text
                      style={
                        second === 'S'
                          ? styles.RmbtiActive
                          : styles.RmbtiPassive
                      }>
                      Strong
                    </Text>
                    <Text
                      style={
                        second === 'S'
                          ? styles.RmbtiPassive
                          : styles.RmbtiActive
                      }>
                      Weak
                    </Text>
                  </View>
                  <Text style={styles.resultText}>
                    {second === 'S'
                      ? '규칙적인 생활로 건강한 체력을 보유한 편이군요! 앞으로도  규칙적인 운동과 수면시간을 통해 최상의 컨디션을 유지해 보세요. 또, 커피, 음료보다는 물을 의식적으로 섭취하는 것도 잊지 마세요!'
                      : '요즈음 낮아진 체력으로 인하여 일상생활에서 잦은 피로를 느끼고 있지 않으신가요? 규칙적인 운동과 수면 시간은 회원님께 훨씬 좋은 컨디션을 가져다 줄 것입니다! 또 커피, 음료보다는 물을 의식적으로 섭취하려고 노력해 보는 건 어떨까요?'}
                  </Text>
                </View>
                <View style={styles.RtextArea}>
                  <Text style={{...styles.RmbtiTitle, fontWeight: '500'}}>
                    영양소의 균형 🥕
                  </Text>
                  <View style={styles.RmbtiToggle}>
                    <Text
                      style={
                        third === 'U' ? styles.RmbtiActive : styles.RmbtiPassive
                      }>
                      Unbalanced
                    </Text>
                    <Text
                      style={
                        third === 'U' ? styles.RmbtiPassive : styles.RmbtiActive
                      }>
                      Full Balanced
                    </Text>
                  </View>
                  <Text style={styles.resultText}>
                    {third === 'U'
                      ? '잠깐 밖에서 햇살을 맞으며 산책해보는건 어떤가요?  음식으로 섭취하는 비타민보다 햇빛을 통해 얻는 비타민이 2배는 더 오래 지속됩니다~ 자극적인 음식을 먹을 때 신선한 야채들과 함께 먹어보는건 어떨까요? 영양소의 균형을 맞추기 위해 조금만 더 힘내봐요!'
                      : '회원님은 5대 영양소를 골고루 갖추고 있는 편이네요~ 앞으로도 탄,단,지뿐만 아니라 비타민, 무기질도 잘 챙겨먹으면 좋을 것 같아요! 하루에 우유 한잔과 과일 하나씩 먹으면 비타민과 무기질의 일일권장량을 채울 수 있으니 기억해두세요!'}
                  </Text>
                </View>
                <View style={styles.RtextArea}>
                  <Text style={{...styles.RmbtiTitle, fontWeight: '500'}}>
                    규칙성 🏃🏻
                  </Text>
                  <View style={styles.RmbtiToggle}>
                    <Text
                      style={
                        fourth === 'R'
                          ? styles.RmbtiActive
                          : styles.RmbtiPassive
                      }>
                      Regular
                    </Text>
                    <Text
                      style={
                        fourth === 'R'
                          ? styles.RmbtiPassive
                          : styles.RmbtiActive
                      }>
                      Variable
                    </Text>
                  </View>
                  <Text style={styles.resultText}>
                    {fourth === 'R'
                      ? '정해진 시간에 규칙적으로 식사를 하시는 편이군요. 하루 세끼 영양소의 균형을 고려하여 식사하는 것은 건강에 매우 좋은 습관이에요! 앞으로도 규칙적인 식사 습관을 유지해보세요!'
                      : '식사 시간을 정해두고 세끼를 꼭 챙겨먹는 것은 건강에 필수에요! 처음엔 어려워도 시간을 정해두고 아침, 점심, 저녁 양을 나눠 골고루 먹다보면 속이 더 편해질거에요! 익숙해지면 영양소를 맞춰 식단도 짜보시는 건 어떨까요?'}
                  </Text>
                </View>
                <View style={styles.RtextArea}>
                  <Text style={{...styles.RmbtiTitle, fontWeight: '500'}}>
                    음식에 대한 적극성 😎
                  </Text>
                  <View style={styles.RmbtiToggle}>
                    <Text
                      style={
                        fifth === 'A' ? styles.RmbtiActive : styles.RmbtiPassive
                      }>
                      Active
                    </Text>
                    <Text
                      style={
                        fifth === 'A' ? styles.RmbtiPassive : styles.RmbtiActive
                      }>
                      Passive
                    </Text>
                  </View>
                  <Text style={styles.resultText}>
                    {fifth === 'A'
                      ? '다양한 음식을 골고루 섭취하면서도 식사 횟수가 변동적이지 않는 건강한 식습관을 가지고 있군요. 적극적이면서도 과하지 않는 식습관은 규칙적인 에너지 대사가 이루어지도록 하고, 올바른 영양상태를 유지할 수 있게 합니다 !'
                      : '삼시세끼를 규칙적으로 먹지 않고 불규칙적인 식습관은 근육량 및 체수분 감소, 과식 가능성을 유발할 수 있습니다. 다양한 영양소를 규칙적으로 섭취할 수 있도록 매 끼니마다 단백질 식품과 야채를 골고루 챙겨먹을 수 있도록 하는 것이 어떨까요?'}
                  </Text>
                </View>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: Height * 0.05,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    width: Width * 0.5,
                    height: Height * 0.07,
                  }}
                  onPress={() => navigation.navigate('HomeStack')}>
                  <Text
                    style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
                    홈으로 돌아가기
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Mbti;
