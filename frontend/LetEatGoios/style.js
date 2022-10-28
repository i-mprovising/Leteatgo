import {StyleSheet, Dimensions} from 'react-native';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: '900',
    color: 'white',
    fontFamily: 'Happiness-Sans-Bold',
  },
  image: {
    height: Height * 0.138,
    width: Height * 0.135,
    marginHorizontal: Width * 0.01,
    marginBottom: Height * 0.04,
    borderBottomRightRadius: 13,
  },
  InfoText: {
    fontFamily: 'Happiness-Sans-Bold',
    fontWeight: '400',
    fontSize: 17,
    paddingTop: Height * 0.005,
    marginBottom: Height * 0.005,
  },
  InBoxtext: {
    fontFamily: 'Happiness-Sans-Bold',
    fontWeight: '900',
    fontSize: 19,
    marginTop: Height * 0.017,
    marginBottom: Height * 0.017,
    paddingLeft: '35%',
  },
  SearchWord: {
    color: 'black',
  },
  top: {
    backgroundColor: '#FFAAB3',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '900',
    color: 'white',
    fontFamily: 'Happiness-Sans-Bold',
    paddingRight: Width * 0.226,
  },
  HomeBox: {
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
  TextInput: {
    backgroundColor: 'white',
    width: Width * 0.85,
    height: Height * 0.045,
    marginLeft: '3%',
    borderRadius: 17,
    paddingLeft: '11%',
    fontSize: 15.5,
    fontFamily: 'Happiness-Sans-Regular',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
});

export default styles;
