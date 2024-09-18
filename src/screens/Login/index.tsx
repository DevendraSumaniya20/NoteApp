import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationProps} from '../../navigation/AppNavigator';
import {moderateHeight, moderateScale} from '../../utils/responsive';
import colors from '../../theme/colors';
import {CustomButton, CustomInput, CustomText} from '../../components';

interface LoginScreenProps {
  navigation: StackNavigationProp<RootNavigationProps, 'Login'>;
}

const Login: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isButtonDisabled = !(email && password);

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <LinearGradient
      colors={[colors.neonBlue, colors.neonRed]}
      style={styles.container}>
      <View style={styles.innerContainer}>
        <CustomText
          text="Login"
          containerStyle={styles.loginTextContainer}
          textStyle={styles.loginText}
        />

        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Enter Email"
            autoFocus={true}
            keyboardType="email-address"
            onChangeText={(text: string) => setEmail(text)}
            placeholderTextColor={colors.white}
          />
          <CustomInput
            placeholder="Enter Password "
            rightIcon="eye-outline"
            rightIconType="Ionicons"
            color={colors.white}
            keyboardType="default"
            onChangeText={(text: string) => setPassword(text)}
            secureTextEntry
            placeholderTextColor={colors.white}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Login"
            onPress={() => console.log('Login Button Pressed')}
            disabled={isButtonDisabled}
          />
        </View>

        <View style={styles.forgotPasswordContainer}>
          <CustomText
            text="Forgot Password ?"
            textStyle={styles.forgotPasswordText}
            pressable
            onPress={() => console.log('Forgot Password Pressed')}
          />
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.accountText}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              handleSignUp();
            }}
            style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: moderateScale(16),
  },
  loginTextContainer: {
    alignItems: 'center',
    marginTop: moderateHeight(16),
  },
  loginText: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: colors.white,
    textShadowColor: colors.primaryDark,
    textShadowOffset: {width: 0, height: moderateScale(2)},
    textShadowRadius: moderateScale(4),
  },
  inputContainer: {
    marginTop: moderateHeight(16),
    gap: 26,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: moderateHeight(8),
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginVertical: moderateScale(16),
  },
  forgotPasswordText: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: colors.white,
    textShadowColor: colors.lightGray_80,
    textShadowOffset: {width: 0, height: moderateScale(2)},
    textShadowRadius: moderateScale(4),
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginVertical: moderateHeight(16),
  },
  accountText: {
    fontSize: moderateScale(16),
    color: colors.white,
  },
  signUpButton: {},
  signUpButtonText: {
    color: colors.lavender,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});
