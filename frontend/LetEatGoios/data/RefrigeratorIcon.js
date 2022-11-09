export const array = [src="../asset"]

import  React ,{useState,useEffect}from 'react';
import { View ,StyleSheet,Animated,
  Image,
  Dimensions,
  Easing} from 'react-native';
  const {height} = Dimensions.get('window');
const App=({navigation})=> {
  const animation = useState(new Animated.Value(0))[0];
  const CallAnimation=()=>{
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver:false,
      easing: Easing.linear,
    }).start(() => CallAnimation());
  }
  useEffect(() => {
    CallAnimation();
  }, [])
  const RotateData = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
    return (
      <View style={styles.container}>
       <Animated.Image
        style={[styles.image,{transform: [{ rotate: RotateData }]}]}
        source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
       >
      </Animated.Image>
    </View>
    );
  }