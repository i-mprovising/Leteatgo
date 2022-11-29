import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {atom, useRecoilState} from 'recoil';

import {
  eCount,
  iCount,
  sCount,
  wCount,
  uCount,
  fCount,
  rCount,
  vCount,
  aCount,
  pCount,
} from '../recoil/mbtiCount';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function MbtiSurveyComponent({text, type}) {
  const [eTemp, setETemp] = useRecoilState(eCount);
  const [iTemp, setITemp] = useRecoilState(iCount);
  const [sTemp, setSTemp] = useRecoilState(sCount);
  const [wTemp, setWTemp] = useRecoilState(wCount);
  const [uTemp, setUTemp] = useRecoilState(uCount);
  const [fTemp, setFTemp] = useRecoilState(fCount);
  const [rTemp, setRTemp] = useRecoilState(rCount);
  const [vTemp, setVTemp] = useRecoilState(vCount);
  const [aTemp, setATemp] = useRecoilState(aCount);
  const [pTemp, setPTemp] = useRecoilState(pCount);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);

  function upCount(degree, type) {
    if (type === 'E') {
      setETemp(eTemp + degree);
    } else if (type === 'I') {
      setITemp(iTemp + degree);
    } else if (type === 'S') {
      setSTemp(sTemp + degree);
    } else if (type === 'W') {
      setWTemp(wTemp + degree);
    } else if (type === 'U') {
      setUTemp(uTemp + degree);
    } else if (type === 'F') {
      setFTemp(fTemp + degree);
    } else if (type === 'R') {
      setRTemp(rTemp + degree);
    } else if (type === 'V') {
      setVTemp(vTemp + degree);
    } else if (type === 'A') {
      setATemp(aTemp + degree);
    } else if (type === 'P') {
      setPTemp(pTemp + degree);
    }
  }

  return (
    <View style={{alignItems: 'center', marginVertical: Height * 0.03}}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: Height * 0.01,
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '95%',
        }}>
        {text}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Text>그렇지</Text>
          <Text>않다</Text>
        </View>

        <TouchableOpacity
          style={{
            ...styles.Button,
            borderColor: '#c0c4e2',
            backgroundColor: checked1 ? '#c0c4e2' : '#FFFFFF',
          }}
          onPress={() => {
            setChecked1(!checked1);
            setChecked2(false);
            setChecked3(false);
            setChecked4(false);
            setChecked5(false);
            upCount(-20, type);
          }}>
          <Image source={require('../assets/icons//MbtiCheck.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.Button,
            width: Width * 0.12,
            height: Width * 0.12,
            borderColor: '#c0c4e2',
            backgroundColor: checked2 ? '#c0c4e2' : '#FFFFFF',
          }}
          onPress={() => {
            setChecked2(!checked2);
            setChecked1(false);
            setChecked3(false);
            setChecked4(false);
            setChecked5(false);
            upCount(-10, type);
          }}>
          <Image source={require('../assets/icons/MbtiCheck.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.Button,
            width: Width * 0.1,
            height: Width * 0.1,
            borderColor: '#c4c4c4',
            backgroundColor: checked3 ? '#c4c4c4' : '#FFFFFF',
          }}
          onPress={() => {
            setChecked3(!checked3);
            setChecked1(false);
            setChecked2(false);
            setChecked4(false);
            setChecked5(false);
            upCount(0, type);
          }}>
          <Image source={require('../assets/icons/MbtiCheck.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.Button,
            width: Width * 0.12,
            height: Width * 0.12,
            backgroundColor: checked4 ? '#FFCDD2' : '#FFFFFF',
          }}
          onPress={() => {
            setChecked4(!checked4);
            setChecked1(false);
            setChecked2(false);
            setChecked3(false);
            setChecked5(false);
            upCount(10, type);
          }}>
          <Image source={require('../assets/icons/MbtiCheck.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.Button,
            backgroundColor: checked5 ? '#FFCDD2' : '#FFFFFF',
          }}
          onPress={() => {
            setChecked5(!checked5);
            setChecked1(false);
            setChecked2(false);
            setChecked3(false);
            setChecked4(false);
            upCount(20, type);
          }}>
          <Image source={require('../assets/icons/MbtiCheck.png')} />
        </TouchableOpacity>
        <Text>그렇다</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Button: {
    width: Width * 0.15,
    height: Width * 0.15,
    borderWidth: 3,
    borderColor: '#FFCDD2',
    borderRadius: 50,
    marginHorizontal: Width * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MbtiSurveyComponent;
