import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {CustomHeader, CustomMargin, GradientComponent} from '../../components';
import {BottomTabParamList} from '../../navigation/AppNavigator';

interface ProfileScreenProps {
  navigation: BottomTabNavigationProp<BottomTabParamList, 'Profile'>;
}

const Profile: React.FC<ProfileScreenProps> = ({navigation}) => {
  return (
    <GradientComponent>
      <CustomMargin>
        <View></View>
      </CustomMargin>
    </GradientComponent>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
