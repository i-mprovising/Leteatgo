import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import {Dimensions} from 'react-native';
import PaginationDot from 'react-native-animated-pagination-dot';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
function Top5Page() {
  const [curPage] = React.useState(0);
  return (
    <View>
      <Text style={styles.text}>Top5 레시피</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        <Image
          style={styles.image}
          source={require('../assets/Images/food1.jpeg')}></Image>
        <Image
          style={styles.image}
          source={require('../assets/Images/food2.jpeg')}></Image>
        <Image
          style={styles.image}
          source={require('../assets/Images/food3.jpeg')}></Image>
        <Image
          style={styles.image}
          source={require('../assets/Images/food4.jpeg')}></Image>
        <Image
          style={styles.image}
          source={require('../assets/Images/food5.jpeg')}></Image>
      </ScrollView>
      <PaginationDot activeDotColor={'#FFAAB3'} curPage={curPage} maxPage={2} />
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Happiness-Sans-Bold',
    fontWeight: '900',
    fontSize: 19,
    marginTop: Height * 0.017,
    marginBottom: Height * 0.017,
    paddingLeft: '35%',
  },
  image: {
    height: Height * 0.138,
    width: Height * 0.135,
    marginHorizontal: Width * 0.01,
    marginBottom: Height * 0.04,
    borderBottomRightRadius: 13,
  },
});
export default Top5Page;
