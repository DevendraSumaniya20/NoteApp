import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';
import {moderateHeight, moderateScale} from '../../utils/responsive';
import {CustomHeader} from '../../components';
import {BottomTabParamList} from '../../navigation/AppNavigator';

interface TaskScreenProps {
  navigation: BottomTabNavigationProp<BottomTabParamList, 'Tasks'>;
}

const Task: React.FC<TaskScreenProps> = ({navigation}) => {
  return (
    <LinearGradient
      colors={[colors.neonBlue, colors.neonRed]}
      style={styles.container}>
      <View style={styles.marginContainer}>
        <CustomHeader style={{marginTop: moderateHeight(8)}} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Tasks')}>
          <Text style={styles.buttonText}>Go to Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Go to Profile</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: moderateScale(16),
  },
  button: {
    backgroundColor: colors.lavender,
    paddingVertical: moderateHeight(12),
    paddingHorizontal: moderateScale(24),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginVertical: moderateHeight(10),
  },
  buttonText: {
    color: 'white',
    fontSize: moderateScale(16),
  },
});
