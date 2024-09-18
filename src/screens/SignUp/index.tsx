import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationProps} from '../../navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';
import {CustomButton, CustomInput, CustomText} from '../../components';
import {moderateHeight, moderateScale} from '../../utils/responsive';

interface SignUpScreenProps {
  navigation: StackNavigationProp<RootNavigationProps, 'SignUp'>;
}

const SignUp: React.FC<SignUpScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isButtonDisabled = !(email && password);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
      colors={[colors.neonBlue, colors.neonRed]}
      style={styles.container}>
      <View style={styles.innerContainer}>
        <CustomText
          text="Sign up"
          containerStyle={styles.loginTextContainer}
          textStyle={styles.loginText}
        />

        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Enter UserName"
            autoFocus={true}
            onChangeText={(text: string) => setEmail(text)}
            placeholderTextColor={colors.white}
          />
          <CustomInput
            placeholder="Enter Email"
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
            title="Sign up"
            onPress={() => console.log('Sign up Button Pressed')}
            disabled={isButtonDisabled}
          />
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.accountText}>Already have account ?</Text>
          <TouchableOpacity
            onPress={() => {
              handleLogin();
            }}
            style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SignUp;

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
    marginTop: moderateHeight(12),
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
