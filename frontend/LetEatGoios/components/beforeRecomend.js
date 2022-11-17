import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../style';
import {useNavigation} from '@react-navigation/native';
function BeforeRecommend(Props) {
  const navigation = useNavigation();
  const location = Props.location;
  return (
    <View style={{...styles.HomeBox}}>
      <View>
        <Text style={styles.BeforeText}>{Props.title}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.65}
        onPress={() => {
          navigation.navigate(location);
        }}>
        <View style={styles.TextBox}>
          <Text style={styles.ButtonText}>{Props.button}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default BeforeRecommend;
