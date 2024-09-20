import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationProps} from '../../navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';
import {moderateHeight, moderateScale} from '../../utils/responsive';
import {CustomHeader} from '../../components';
interface HomeScreenProps {
  navigation: StackNavigationProp<RootNavigationProps, 'Home'>;
}

const Home: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <LinearGradient
      colors={[colors.neonBlue, colors.neonRed]}
      style={styles.container}>
      <View style={styles.marginContainer}>
        <View>
          <CustomHeader style={{marginTop: moderateHeight(8)}} />
        </View>
        <View></View>
      </View>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1},
  marginContainer: {marginHorizontal: moderateScale(16)},
});
