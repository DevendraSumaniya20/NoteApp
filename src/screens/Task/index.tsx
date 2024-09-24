import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';
import {moderateHeight, moderateScale} from '../../utils/responsive';
import {
  CustomHeader,
  CustomMargin,
  CustomNormalTextInput,
  CustomText,
} from '../../components';
import {BottomTabParamList} from '../../navigation/AppNavigator';

interface TaskScreenProps {
  navigation: BottomTabNavigationProp<BottomTabParamList, 'Tasks'>;
}

const Task: React.FC<TaskScreenProps> = ({navigation}) => {
  return (
    <LinearGradient
      colors={[colors.darkGray_80, colors.lavender_60]}
      style={styles.container}>
      <CustomMargin>
        <View
          style={{
            marginTop:
              Platform.OS === 'ios' ? moderateScale(40) : moderateScale(26),
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(16),
          }}>
          <CustomHeader
            IconColor={colors.lavender}
            IconName="x"
            iconType="Feather"
            onPress={() => {
              navigation.navigate('Home');
            }}
            size={moderateScale(26)}
          />
          <CustomText
            text="Create a Task"
            textStyle={{
              fontSize: moderateScale(20),
              fontWeight: '500',
              alignItems: 'center',
              color: colors.lavender,
            }}
          />
        </View>

        <View>
          <CustomNormalTextInput label="Task Name" />
          <CustomNormalTextInput
            label="Start Date"
            rightIcon="calendar-number-outline"
            rightIconType="Ionicons"
          />
          <CustomNormalTextInput
            label="End Date"
            rightIcon="calendar-number-outline"
            rightIconType="Ionicons"
          />
          <CustomNormalTextInput label="Description" multiline />
        </View>
      </CustomMargin>
    </LinearGradient>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
