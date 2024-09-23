import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Login, SignUp, Splash} from '../screens';
import BottomNavigator from './BottomNavigator';

export type RootNavigationProps = {
  SignUp: undefined;
  Login: undefined;
  Splash: undefined;
  BottomTab: undefined;
  Tasks: undefined;
  Profile: undefined;
  Home: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Tasks: undefined;
  Profile: undefined;
};

export type RootTabParamList = {
  BottomTab: undefined;
};

const Stack = createStackNavigator<RootNavigationProps>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomTab" component={BottomNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
