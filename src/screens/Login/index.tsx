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
  GradientComponent,
} from '../../components';
import Toast from 'react-native-toast-message';
// import {useDispatch, useSelector} from 'react-redux';
import {loginUser, selectAuth} from '../../redux/slices/authSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';

interface LoginScreenProps {
  navigation: StackNavigationProp<RootNavigationProps, 'Login'>;
}

const Login: React.FC<LoginScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {loading, error, isAuthenticated, user} = useAppSelector(selectAuth);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isButtonDisabled = !(email && password);

  const handleLogin = async () => {
    console.log('Attempting to log in with email:', email);

    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: 'Please enter both email and password',
      });
      console.warn('Login Error: Email or Password is empty');
      return;
    }

    try {
      // Dispatch the loginUser action
      const res = await dispatch(loginUser({email, password}));

      console.log('Login response:', res);

      // Check if the login was successful
      if (res.meta.requestStatus === 'fulfilled') {
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: `Welcome back, ${email}!`,
        });
        console.log('Navigating with ID: ', res.payload._id);
        // navigation.navigate('BottomTab', {id: res.payload._id});
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: error || 'Invalid credentials',
        });
        console.warn('Login failed:', error);
      }
    } catch (err) {
      console.error('Network Error:', err);
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please try again later.',
      });
    }
  };

  const handleSignUp = () => {
    console.log('Navigating to Sign Up screen');
    navigation.navigate('SignUp');
  };

  return (
    <GradientComponent>
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
    </GradientComponent>
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
