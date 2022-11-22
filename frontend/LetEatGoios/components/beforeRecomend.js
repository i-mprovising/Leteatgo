import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../style';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';
const Height = Dimensions.get('window').height;

function BeforeRecommend(Props) {
  const navigation = useNavigation();
  const location = Props.location;
  return (
    <View style={{...styles.HomeBox, height: Height * 0.2}}>
      <View>
        <Text style={styles.BeforeText}>{Props.title}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.65}
        onPress={() => (Props.setSurvey(true), navigation.navigate(location))}>
        <View style={styles.TextBox}>
          <Text style={styles.ButtonText}>{Props.button}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default BeforeRecommend;
