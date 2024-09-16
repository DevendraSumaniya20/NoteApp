import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {RootNavigationProps} from '../../navigation/AppNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
} from '../../utils/responsive';

interface SplashScreenProps {
  navigation: StackNavigationProp<RootNavigationProps, 'Splash'>;
}

const Splash = ({navigation}: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>📝</Text>
      </View>
      <Text style={styles.title}>Welcome to Note App</Text>
      <Text style={styles.subtitle}>Your personal note-taking assistant</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background for a clean look
    padding: moderateWidth(20), // Add padding to avoid content sticking to the edges
  },
  logoContainer: {
    width: moderateScale(140), // Slightly larger logo for more impact
    height: moderateScale(140),
    borderRadius: moderateScale(70),
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateHeight(30),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: moderateHeight(15)},
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(20),
    elevation: 12,
    borderWidth: moderateScale(2),
    borderColor: '#ffffff', // White border to add a subtle contrast
  },
  logoText: {
    fontSize: moderateScale(60), // Larger font size for better visibility
    color: '#ffffff',
  },
  title: {
    fontSize: moderateScale(32),
    fontWeight: '800', // Bolder font for emphasis
    color: '#333',
    marginBottom: moderateHeight(10),
    textAlign: 'center',
    letterSpacing: moderateScale(1.5),
  },
  subtitle: {
    fontSize: moderateScale(20),
    color: '#666',
    textAlign: 'center',
    marginHorizontal: moderateWidth(20),
    lineHeight: moderateScale(24),
  },
});
