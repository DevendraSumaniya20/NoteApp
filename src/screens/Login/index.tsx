import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationProps} from '../../navigation/AppNavigator';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
} from '../../utils/responsive';
import colors from '../../theme/colors';
import {CustomInput, CustomText} from '../../components';

interface LoginScreenProps {
  navigation: StackNavigationProp<RootNavigationProps, 'Login'>;
}

const Login = ({navigation}: LoginScreenProps) => {
  return (
    <LinearGradient
      colors={[
        colors.backgroundWhite,
        colors.primaryGradientEnd,
        colors.primaryGradientStart,
      ]}
      style={styles.container}>
      <View>
        <CustomText
          text="Login"
          containerStyle={styles.loginTextContainer}
          textStyle={styles.loginText}
        />
      </View>
      <View style={styles.inputContainer}>
        <CustomInput
          placeholder="Enter Email "
          autoFocus={true}
          keyboardType="email-address"
          onChangeText={text => console.log(text)}
          placeholderTextColor={colors.white}
          // value=""
        />

        <CustomInput
          placeholder="Enter Password"
          rightIcon="eye-outline"
          rightIconType="Ionicons"
          color={colors.white}
          keyboardType="default"
          onChangeText={text => console.log(text)}
          secureTextEntry
          placeholderTextColor={colors.white}
        />
      </View>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginTextContainer: {
    marginTop: moderateHeight(16),
    alignItems: 'center',
  },
  loginText: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: colors.backgroundWhite,
    textShadowColor: colors.textShadow,
    textShadowOffset: {width: 0, height: moderateScale(2)},
    textShadowRadius: moderateScale(4),
    lineHeight: moderateHeight(4),
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: moderateHeight(16),
    gap: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});
