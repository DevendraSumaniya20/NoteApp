import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationProps} from '../../navigation/AppNavigator';
import {moderateHeight, moderateScale} from '../../utils/responsive';
import colors from '../../theme/colors';
import {
  CustomButton,
  CustomInput,
  CustomLoader,
  CustomText,
} from '../../components';
import Toast from 'react-native-toast-message';
import config from '../../config/config';

interface LoginScreenProps {
  navigation: StackNavigationProp<RootNavigationProps, 'Login'>;
}

const Login: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const isButtonDisabled = !(email && password);

  const handleLogin = async () => {
    console.log('Attempting to log in with email:', email);

    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: 'Please enter both email and password',
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${config.baseUrl}${config.endpoints.login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      const data = await res.json();
      if (res.ok) {
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: `Welcome back, ${email}!`,
        });
        console.log('Navigating with ID: ', data._id);
        navigation.navigate('BottomTab', {id: data._id});
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: data.message || 'Invalid credentials',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <LinearGradient
      colors={[colors.neonBlue, colors.neonRed]}
      style={styles.container}>
      <CustomLoader visible={loading} />

      <View style={styles.innerContainer}>
        <CustomText
          text="Login"
          containerStyle={styles.loginTextContainer}
          textStyle={styles.loginText}
        />

        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Enter Email"
            autoFocus
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholderTextColor={colors.white}
          />
          <CustomInput
            placeholder="Enter Password"
            rightIcon="eye-outline"
            rightIconType="Ionicons"
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={colors.white}
            color={colors.white}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Login"
            onPress={handleLogin}
            disabled={isButtonDisabled || loading}
          />
        </View>

        <View style={styles.forgotPasswordContainer}>
          <CustomText
            text="Forgot Password?"
            textStyle={styles.forgotPasswordText}
            pressable
            onPress={() => console.log('Forgot Password Pressed')}
          />
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.accountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignUp}>
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
  signUpButtonText: {
    color: colors.lavender,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});
