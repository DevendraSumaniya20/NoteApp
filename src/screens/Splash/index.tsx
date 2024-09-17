import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {RootNavigationProps} from '../../navigation/AppNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
} from '../../utils/responsive';
import colors from '../../theme/colors';

interface SplashScreenProps {
  navigation: StackNavigationProp<RootNavigationProps, 'Splash'>;
}

const Splash = ({navigation}: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={[
        colors.backgroundWhite,
        colors.primaryGradientEnd,
        colors.primaryGradientStart,
      ]}
      style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primaryGradientStart}
      />
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>📝</Text>
      </View>
      <Text style={styles.title}>Welcome to Note App</Text>
      <Text style={styles.subtitle}>Your personal note-taking assistant</Text>
    </LinearGradient>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: moderateScale(140),
    height: moderateScale(140),
    borderRadius: moderateScale(70),
    backgroundColor: colors.primaryGradientEnd,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateHeight(30),
    borderWidth: moderateScale(2),
    borderColor: colors.backgroundWhite,
  },
  logoText: {
    fontSize: moderateScale(60),
    color: colors.backgroundWhite,
    textShadowColor: colors.textShadow,
    textShadowOffset: {width: 0, height: moderateScale(2)},
    textShadowRadius: moderateScale(5),
  },
  title: {
    fontSize: moderateScale(26),
    fontWeight: '700',
    color: colors.backgroundWhite,
    textAlign: 'center',
    marginVertical: moderateHeight(8),
    textShadowColor: colors.textShadow,
    textShadowOffset: {width: 0, height: moderateScale(2)},
    textShadowRadius: moderateScale(4),
  },
  subtitle: {
    fontSize: moderateScale(18),
    color: colors.backgroundWhite,
    textAlign: 'center',
    marginHorizontal: moderateWidth(20),
    lineHeight: moderateScale(22),
    textShadowColor: colors.textShadow,
    textShadowOffset: {width: 0, height: moderateScale(2)},
    textShadowRadius: moderateScale(4),
  },
});
