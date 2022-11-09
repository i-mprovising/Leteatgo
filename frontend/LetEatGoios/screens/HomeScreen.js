import React from 'react';
import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Top5Page from '../pages/Top5Page';
import {useNavigation} from '@react-navigation/native';
import styles from '../style';
import LinearGradient from 'react-native-linear-gradient';
function HomeScreen() {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();

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
        <View style={{...styles.HomeBox, flex: 1.15}}>
          <Top5Page />
        </View>
        <View style={{...styles.HomeBox, flex: 1.15}}>
          <View>
            <Text style={styles.BeforeText}>내 취향에 맞는 레시피</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.65}
            onPress={() => {
              navigation.navigate('Selection');
            }}>
            <View style={styles.TextBox}>
              <Text style={styles.ButtonText}>찾아보기</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{...styles.HomeBox, flex: 1, marginBottom: '10%'}}>
          <View>
            <Text style={styles.BeforeText}>나의 식습관 지표 MBTI</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.65}
            onPress={() => {
              navigation.navigate('MbtiSurvey');
            }}>
            <View style={styles.TextBox}>
              <Text style={styles.ButtonText}>알아보기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default HomeScreen;
