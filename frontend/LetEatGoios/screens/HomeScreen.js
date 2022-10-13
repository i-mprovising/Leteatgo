import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Top5Page from '../pages/Top5Page';
import {Dimensions} from 'react-native';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
function HomeScreen() {
  const {top} = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['bottom']}
        style={{flex: 1, backgroundColor: 'white'}}>
        <View style={[styles.statusBarPlaceholder, {height: top}]} />
        <StatusBar barStyle="dark-content" />
        <View style={styles.block}>
          <Text style={styles.text}>입맛춤</Text>
          <TouchableOpacity activeOpacity={0.65}>
            <Image
              style={{marginRight: '5.01%', marginTop: '0.24%'}}
              source={require('../assets/icons/Search.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.65}>
            <Image
              style={{marginRight: '5.01%'}}
              source={require('../assets/icons/Notice.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{...styles.box, flex: 1.15}}>
          <Top5Page />
        </View>
        <View style={{...styles.box, flex: 1.15}}>
          <View>
            <Text style={styles.BeforeText}>내 취향에 맞는 레시피</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.TextBox}>
              <Text style={styles.ButtonText}>찾아보기</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{...styles.box, flex: 1, marginBottom: '10%'}}>
          <View>
            <Text style={styles.BeforeText}>나의 식습관 지표 MBTI</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.TextBox}>
              <Text style={styles.ButtonText}>알아보기</Text>
            </View>
          </TouchableOpacity>
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
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '900',
    color: 'white',
    fontFamily: 'Happiness-Sans-Bold',
    paddingRight: Width * 0.226,
  },
  box: {
    flex: 1,
    paddingHorizontal: Width * 0.013,
    marginTop: Height * 0.012,
    marginBottom: Height * 0.012,
    backgroundColor: 'white',
    marginHorizontal: Width * 0.018,
    borderWidth: 1.8,
    borderBottomRightRadius: 23,
    borderColor: '#FFCDD2',
    borderStyle: 'solid',
    shadowColor: '#FFAAB3',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,

    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BeforeText: {
    fontWeight: '900',
    fontSize: 20,
    fontFamily: 'Cafe24Ssurround',
    paddingBottom: '1%',
  },
  ButtonText: {
    fontWeight: '700',
    fontSize: 18,
    fontFamily: 'Cafe24Ssurround',
    color: 'white',
  },

  TextBox: {
    backgroundColor: '#FFAAB3',
    paddingHorizontal: '3%',
    paddingVertical: '1.5%',
    borderRadius: 7,
  },
});

export default HomeScreen;
