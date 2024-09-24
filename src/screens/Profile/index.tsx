import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';
import {moderateHeight, moderateScale} from '../../utils/responsive';
import {CustomHeader, CustomMargin} from '../../components';
import {BottomTabParamList} from '../../navigation/AppNavigator';

interface ProfileScreenProps {
  navigation: BottomTabNavigationProp<BottomTabParamList, 'Profile'>;
}

const Profile: React.FC<ProfileScreenProps> = ({navigation}) => {
  return (
    <LinearGradient
      colors={[colors.darkGray_80, colors.lavender_60]}
      style={styles.container}>
      <CustomMargin>
        <View></View>
      </CustomMargin>
    </LinearGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
