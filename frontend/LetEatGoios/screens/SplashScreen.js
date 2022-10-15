import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [animating, setAnimating] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.replace('SignIn');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/Text_logo.png')}
        style={{width: wp(75), resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="white"
        size="large"
        style={styles.ActivityIndicator}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFAAB3',
  },
  ActivityIndicator: {
    alignItems: 'center',

    height: 80,
  },
});
export default SplashScreen;
