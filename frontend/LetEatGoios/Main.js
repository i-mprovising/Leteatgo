import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';

const Tab = createBottomTabNavigator();

function Home_Screen() {
  return <HomeScreen />;
}

function CartScreen() {
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
}
function Refrigerator() {
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
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
        component={Home_Screen}
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

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#FFAAB3',
  },
});
export default Main;
