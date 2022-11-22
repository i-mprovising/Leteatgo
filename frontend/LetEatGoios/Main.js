import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, Image, TextInput, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import SearchPage from './pages/SearchPage';
import styles from './style';
import RefrigeratorScreen from './screens/RefrigeratorScreen';
import Recipe from './pages/Recipe';
import Cart from './screens/CartScreen';
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
function Search_Page({navigation}) {
  return <SearchPage />;
}
function Home_Screen({navigation}) {
  return <HomeScreen />;
}

function Recipe_Page({navigation}) {
  return <Recipe />;
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeStack"
        component={Home_Screen}
        options={{
          title: '',
          headerShown: false,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="Search"
        component={Search_Page}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="Recipe"
        component={Recipe_Page}
        options={{
          headerTransparent: true,
          headerBackTitleVisible: false,
          title: '',
          headerTintColor: 'white',
        }}
      />
    </HomeStack.Navigator>
  );
}

function CartScreen() {
  return <Cart />;
}
function Refrigerator() {
  return <RefrigeratorScreen />;
}
function ManageScreen() {
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
}

function Main() {
  return (
    <Tab.Navigator
      style={styles.top}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
        },
      }}
      tabBarOptions={{
        labelStyle: {
          color: '#FFAAB3',
          fontWeight: '500',
          fontSize: 11,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <Image source={require('./assets/icons/Home.png')} />;
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <Image source={require('./assets/icons/Cart.png')} />;
          },
        }}
      />
      <Tab.Screen
        name="Refrigerator"
        component={Refrigerator}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image source={require('./assets/icons/Refrigerator.png')} />
            );
          },
        }}
      />
      <Tab.Screen
        name="My Recipe"
        component={ManageScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <Image source={require('./assets/icons/MyRecipe.png')} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default Main;
