import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
  DatePickerAndroid,
} from 'react-native';

import YoutubePlayer from 'react-native-youtube-iframe';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import foodid from '../recoil/foodid';
import {useRecoilValue} from 'recoil';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function RecipeTopArea({food_name}) {
  const [like, setLike] = useState(false);
  const [made, setMade] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [videoName, setVideoName] = useState('');
  const [videoId, setVideoId] = useState('j7s9VRsrm9o');

  const FoodId = useRecoilValue(foodid);

  async function getLike() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:80/user/like?userid=97`,
      );

      response.data.result.map(key => {
        console.log(key.foodid);
        if (key.foodid === FoodId) {
          setLike(true);
          return;
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  async function getMade() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:80/user/made?userid=97`,
      );

      response.data.result.map(key => {
        console.log(key.foodid);
        if (key.foodid === FoodId) {
          setMade(true);
          return;
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getMade();
    getLike();
  }, []);
  async function putLike(Like) {
    console.log(Like);
    const userid = 97;
    try {
      const response = await axios.put('http://127.0.0.1:80/user/like/update', {
        favorite: Like,
        foodid: FoodId,
        userid: userid,
      });
    } catch (e) {
      console.log(e);
    }
  }
  async function putMade(Made) {
    console.log(Made);
    try {
      const response = await axios.put('http://127.0.0.1:80/user/made/update', {
        made: Made,
        foodid: FoodId,
        userid: 97,
      });
    } catch (e) {
      console.log(e);
    }
  }
  const params = {
    key: 'AIzaSyC5Ss_A2H0Z9kWdY21AcQawsWCJRvFPA3k',
    q: food_name,
    type: 'video',
    maxResults: 1,
    part: 'snippet',
  };

  axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';

  const findLink = useCallback(async () => {
    await axios
      .get('/search', {params})
      .then(response => {
        console.log(response.data.items[0].snippet.title);
        setVideoName(response.data.items[0].snippet.title);
        console.log('videoName');
        setVideoId(response.data.items[0].id.videoId);
        if (!response) {
          setError('검색된 영상이 없습니다');
          return;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [params.q]);

  const link = `https://www.youtube.com/watch?v=${videoId}`;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: link,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('activityType!');
        } else {
          console.log('Share!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed!');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const tryFindLink = async () => {
      await findLink();
    };

    tryFindLink();
  }, [findLink]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 0.65,
          justifyContent: 'flex-end',
        }}>
        <YoutubePlayer height={'100%'} play={playing} videoId={videoId} />
      </View>

      <View style={{flex: 0.3}}>
        <Text style={{...styles.text, marginLeft: 10, maxWidth: '90%'}}>
          {videoName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: Width * 0.01,
            padding: 5,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                flex: 0.5,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 0.5,
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor: 'pink',

                  marginRight: Width * 0.025,
                  borderStyle: 'solid',
                }}>
                <TouchableOpacity
                  style={styles.bottomButton}
                  onPress={() => {
                    setLike(!like);

                    putLike(!like);
                  }}>
                  <Image
                    style={{height: 18, width: 18}}
                    source={
                      like
                        ? require('../assets/icons/Heart.png')
                        : require('../assets/icons/EmptyHeart.png')
                    }
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 0.5,
                  borderWidth: 1,
                  borderRadius: 20,
                  marginRight: Width * 0.025,

                  borderColor: 'pink',
                  borderStyle: 'solid',
                }}>
                <TouchableOpacity
                  style={styles.bottomButton}
                  onPress={() => {
                    setMade(!made);
                    putMade(!made);
                  }}>
                  <Image
                    style={{height: 18, width: 18}}
                    source={
                      made === true
                        ? require('../assets/icons/Checked.png')
                        : require('../assets/icons/Check.png')
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 0.5,
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                style={{
                  ...styles.bottomButton,
                  borderColor: 'pink',
                  borderSyle: 'solid',
                  borderWidth: 1,
                  width: Width * 0.25,
                  marginRight: Width * 0.01,
                }}>
                <Image source={require('../assets/icons/Share.png')} />
                <Text
                  style={styles.bottomButtonText2}
                  onPress={() => onShare()}>
                  공유하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <Text>
              조회수{' '}
              {view.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}회
            </Text> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topButton: {
    height: Height * 0.05,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 20,
    width: Width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Width * 0.01,
    elevation: 1,
  },
  bottomButton: {
    height: Height * 0.04,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 20,
    width: Width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Width * 0.02,
    elevation: 2.5,
  },
  bottomButtonText: {
    fontSize: 19,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  bottomButtonText2: {
    fontSize: 15,
    backgroundColor: 'white',
    marginLeft: 10,
  },
  image: {
    height: Height * 0.15,
    width: Height * 0.15,
  },
  text: {
    fontSize: 17,
    fontWeight: '900',
    paddingTop: 5,
    fontSize: 17,
    fontFamily: 'Happiness-Sans-Regular',
    fontWeight: '800',
    flex: 1,
  },
  topButtonText: {
    fontSize: 14,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  iconArea: {
    backgroundColor: 'white',
    height: Height * 0.12,
    width: Width * 0.12,
  },
  icon: {
    height: Height * 0.12,
    width: Width * 0.12,
    marginRight: Width * 0.07,
  },
  texticon: {
    height: Height * 0.02,
    width: Width * 0.03,
    margin: Width * 0.04,
    resizeMode: 'stretch',
  },
});

export default RecipeTopArea;
