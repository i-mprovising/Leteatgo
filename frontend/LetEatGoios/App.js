import React from 'react';
import Main from './Main';
import {View, Text} from 'react-native';
import SplashScreen from './screens/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';
Stack = createNativeStackNavigator();
function Splash_Screen() {
  return <SplashScreen />;
}
function SignIn_Screen() {
  return <SignInScreen />;
}
function Main_Screen() {
  return <Main />;
}

function Register_Screen() {
  return <RegisterScreen />;
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash_Screen}
          options={{title: '', headerTransparent: true}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn_Screen}
          options={{title: '', headerTransparent: true}}
        />
        <Stack.Screen
          name="Main"
          component={Main_Screen}
          options={{title: '', headerTransparent: true}}
        />
        <Stack.Screen
          name="Register"
          component={Register_Screen}
          options={{title: '', headerTransparent: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
