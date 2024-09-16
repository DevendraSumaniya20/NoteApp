import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationProps} from '../../navigation/AppNavigator';
interface HomeScreenProps {
  navigation: StackNavigationProp<RootNavigationProps, 'Home'>;
}

const Home = ({navigation}: HomeScreenProps) => {
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
