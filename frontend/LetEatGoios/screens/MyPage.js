import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import usernickname from '../recoil/userNickname';
import userid from '../recoil/userId';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import styles from '../style';

function RecipeComponent() {
  const [like, setLike] = useState(false);
  const [check, setCheck] = useState(false);

  return (
    <View
      style={{
        ...styles.mybox,
        height: Height * 0.2,
      }}>
      <View style={{flex: 0.9}}></View>
      <View
        style={{
          flex: 0.1,
          paddingBottom: Height * 0.04,
        }}>
        <View style={{width: Width * 0.85, flexDirection: 'row-reverse'}}>
          <TouchableOpacity onPress={() => setCheck(!check)}>
            <Image
              source={
                check
                  ? require('../assets/icons/Checked2.png')
                  : require('../assets/icons/Check2.png')
              }
              style={styles.myicon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLike(!like)}>
            <Image
              source={
                like
                  ? require('../assets/icons/Heart2.png')
                  : require('../assets/icons/EmptyHeart2.png')
              }
              style={styles.myicon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function MyRecipe() {
  const [userId, setUserId] = useRecoilState(userid);
  const [nickname, setNickname] = useRecoilState(usernickname);
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const [active, setActive] = useState(true);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['bottom']}
        style={{backgroundColor: 'white', flex: 1}}>
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
          <Text style={{...styles.text, marginLeft: 218}}>마이레시피</Text>
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
        <View style={{flex: 1, backgroundColor: 'white'}}>
          {/* <Topbar navigation={navigation} /> */}
          <View style={{flex: 1, paddingHorizontal: Width * 0.03}}>
            <View style={{flex: 0.25}}>
              <View style={{...styles.mybox, flexDirection: 'row'}}>
                <Image
                  source={require('../assets/icons/User_default.png')}
                  style={{
                    marginLeft: Width * 0.05,
                    width: Width * 0.27,
                    height: Width * 0.27,
                  }}
                />
                <View style={{marginLeft: Width * 0.02}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: Height * 0.015,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Happiness-Sans-Regular',
                        fontSize: 17,
                        marginLeft: 15,
                        fontWeight: '500',
                      }}>
                      {nickname}
                    </Text>
                    <TouchableOpacity
                      style={styles.mylogoutButton}
                      onPress={() => {
                        Alert.alert('로그아웃 하시겠습니까?', '', [
                          {
                            text: '네',
                            onPress: () => {
                              AsyncStorage.removeItem('user_id');
                              navigation.replace('Splash');
                            },
                          },
                          {
                            text: '아니오',
                          },
                        ]);
                      }}>
                      <Text style={styles.mylogoutText}>로그아웃</Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Happiness-Sans-Regular',
                      fontSize: 14,
                      marginLeft: 10,
                      fontWeight: '400',
                    }}>
                    {userId}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flex: 0.7}}>
              <View
                style={{
                  flex: 0.1,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  style={{
                    ...styles.myblock,
                    backgroundColor: active ? '#FFCDD2' : '#F0F0F0',
                  }}
                  onPress={active ? null : () => setActive(!active)}>
                  <Text>만들어 본 레시피</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.myblock,
                    backgroundColor: active ? '#F0F0F0' : '#FFCDD2',
                  }}
                  onPress={active ? () => setActive(!active) : null}>
                  <Text>관심 있는 레시피</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={{flex: 0.9}}>
                <RecipeComponent />
                <RecipeComponent />
                <RecipeComponent />
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default MyRecipe;
