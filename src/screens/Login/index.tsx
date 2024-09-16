import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationProps} from '../../navigation/AppNavigator';
interface LoginScreenProps {
  navigation: StackNavigationProp<RootNavigationProps, 'Login'>;
}

const Login = ({navigation}: LoginScreenProps) => {
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
