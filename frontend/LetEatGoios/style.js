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
    height: Height * 0.23,
    width: Height * 0.3,
    marginHorizontal: Width * 0.01,
    marginBottom: Height * 0.015,
    borderRadius: 10,
  },
  IconImage: {
    height: Height * 0.075,
    width: Height * 0.075,
    resizeMode: 'contain',
    paddingHorizontal: '12%',
  },
  ListImage: {
    height: Height * 0.05,
    width: Height * 0.05,
    resizeMode: 'contain',
    paddingHorizontal: '12%',
  },

  selectImage: {
    height: Height * 0.138,
    width: Height * 0.135,
    marginHorizontal: Width * 0.01,
    marginBottom: Height * 0.01,
    borderBottomRightRadius: 13,
  },
  InfoText: {
    fontFamily: 'Happiness-Sans-Bold',
    fontWeight: '400',
    fontSize: 16,
    paddingTop: Height * 0.005,
    marginBottom: Height * 0.005,
  },
  InBoxtext: {
    fontFamily: 'Happiness-Sans-Bold',
    fontWeight: '900',
    fontSize: 18,
    marginTop: Height * 0.017,
    marginBottom: Height * 0.02,
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
    width: Width * 0.95,
    marginTop: Height * 0.012,
    marginBottom: Height * 0.012,
    backgroundColor: 'white',
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
    fontWeight: '500',
    fontSize: 20,
    fontFamily: 'Happiness-Sans-Regular',
    paddingBottom: '1%',
  },
  ButtonText: {
    fontWeight: '700',
    fontSize: 18,
    fontFamily: 'Happiness-Sans-Regular',
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
    width: Width * 0.86,
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
  refrigeSearch: {
    backgroundColor: 'white',
    width: Width * 0.92,
    height: Height * 0.045,
    marginLeft: '3%',
    borderRadius: 18,
    fontSize: 15.5,
    fontFamily: 'Happiness-Sans-Regular',
    shadowColor: '#CB9CA1',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    paddingLeft: '7%',
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  SearchHistory: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: '2%',
    marginVertical: '2%',
    padding: '2%',
    borderColor: '#FFAAB3',
  },
  CategoryBox: {
    width: '20%',
    paddingVertical: 6,
    fontStyle: '',
    alignItems: 'center',
    marginLeft: '5%',
    width: '35%',
    marginTop: '6%',
    flexDirection: 'row',
  },
  CongratIcon: {
    marginTop: '30%',
    marginBottom: '7%',
    width: Width * 0.2,
    height: Width * 0.2,
  },
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
    height: Height * 0.05,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 20,
    width: Width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Width * 0.01,
    elevation: 1,
  },
  bottomButtonText: {
    fontSize: 19,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  bottomButtonText2: {
    fontSize: 13,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  recipeText: {
    fontSize: 17,
    fontWeight: '900',
    padding: 5,
    flex: 0.5,
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
    marginHorizontal: '6%',
    // marginRight: Width * 0.07,
  },
  texticon: {
    height: Height * 0.02,
    width: Width * 0.02,
    margin: Width * 0.04,
  },
  RecipeImage: {
    height: Height * 0.2,
    width: Height * 0.35,
    marginLeft: '9.5%',
    marginVertical: Height * 0.015,
    borderRadius: 10,
  },
  cartList: {
    borderRadius: 23,
    borderColor: '#949494',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 10,
    marginHorizontal: 4,
    marginTop: 5,
    width: Width * 0.42,

    borderWidth: 1,
  },
});

export default styles;
