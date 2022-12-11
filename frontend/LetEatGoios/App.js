import React from 'react';
import Main from './Main';
import SplashScreen from './screens/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';
import SelectionPage from './pages/SelectionPage';
import MbitSurvery from './pages/MbtiSurvey';
import AfterSurvery from './pages/AfterSurvey';
import SearchResult from './pages/SearchResult';
import Mbti from './pages/Mbti';
import Tos from './pages/tos';
Stack = createNativeStackNavigator();
import {RecoilRoot} from 'recoil';
function Selection_Screen() {
  return <SelectionPage />;
}
function Splash_Screen() {
  return <SplashScreen />;
}
function SignIn_Screen() {
  return <SignInScreen />;
}
function SearchResult_Screen() {
  return <SearchResult />;
}
function Main_Screen() {
  return <Main />;
}
function MbitSurvery_Screen() {
  return <MbitSurvery />;
}
function Mbit_Screen() {
  return <Mbti />;
}

function Register_Screen() {
  return <RegisterScreen />;
}
function After_Screen() {
  return <AfterSurvery />;
}
function Tos_Screen() {
  return <Tos />;
}
function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash_Screen}
            options={{
              title: '',
              headerTintColor: 'white',
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn_Screen}
            options={{
              title: '',
              headerTransparent: true,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Tos"
            component={Tos_Screen}
            options={{
              title: '',
              headerTransparent: true,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Main"
            component={Main_Screen}
            options={{
              title: '',
              headerShown: false,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register_Screen}
            options={{
              title: '',
              headerTransparent: true,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Selection"
            component={Selection_Screen}
            options={{
              title: '',
              headerTransparent: true,
              headerBackTitleVisible: false,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="afterSurvey"
            component={After_Screen}
            options={{
              title: '',
              headerShown: false,
              headerBackTitleVisible: false,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="SearchResult"
            component={SearchResult_Screen}
            options={{
              title: '',
              headerShown: false,
              headerBackTitleVisible: false,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="MbtiSurvey"
            component={MbitSurvery_Screen}
            options={{
              title: '',
              headerTransparent: true,
              headerBackTitleVisible: false,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="MbtiResult"
            component={Mbit_Screen}
            options={{
              title: '',
              headerTransparent: true,
              headerBackTitleVisible: false,
              headerTintColor: 'white',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
export default App;
