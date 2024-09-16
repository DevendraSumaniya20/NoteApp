import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationProps} from '../../navigation/AppNavigator';

interface SignUpScreenProps {
  navigation: StackNavigationProp<RootNavigationProps, 'SignUp'>;
}

const SignUp = ({navigation}: SignUpScreenProps) => {
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
