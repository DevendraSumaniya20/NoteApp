import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationProps} from '../../navigation/AppNavigator';
import colors from '../../theme/colors';
import {
  CustomButton,
  CustomInput,
  CustomLoader,
  CustomText,
  GradientComponent,
} from '../../components';
import {moderateHeight, moderateScale} from '../../utils/responsive';
import Toast from 'react-native-toast-message';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'; // Use your hook to access Redux
import {registerUser, selectAuth} from '../../redux/slices/authSlice';

interface SignUpScreenProps {
  navigation: StackNavigationProp<RootNavigationProps, 'SignUp'>;
}

const SignUp: React.FC<SignUpScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector(selectAuth);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isButtonDisabled = !(name && email && password);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = async () => {
    if (isButtonDisabled) {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please fill in all the fields',
      });
      return;
    }

    try {
      console.log('Attempting to register with:', {name, email, password});
      const res = await dispatch(registerUser({email, password, name}));

      console.log('Register response:', res);

      if (res.meta.requestStatus === 'fulfilled') {
        Toast.show({
          type: 'success',
          text1: 'Registration Successful',
          text2: `Welcome, ${name}!`,
        });
        console.log('Navigating with ID: ', res.payload._id);
        navigation.navigate('BottomTab', {id: res.payload._id});
      } else {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: error || 'Something went wrong!',
        });
        console.warn('Registration failed:', error);
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

  return (
    <GradientComponent>
      <CustomLoader visible={loading} />
      <View style={styles.innerContainer}>
        <CustomText
          text="Sign Up"
          containerStyle={styles.loginTextContainer}
          textStyle={styles.loginText}
        />

        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Enter Name"
            autoFocus={true}
            onChangeText={(text: string) => setName(text)}
            placeholderTextColor={colors.white}
          />
          <CustomInput
            placeholder="Enter Email"
            keyboardType="email-address"
            onChangeText={(text: string) => setEmail(text)}
            placeholderTextColor={colors.white}
          />
          <CustomInput
            placeholder="Enter Password"
            rightIcon="eye-outline"
            rightIconType="Ionicons"
            color={colors.white}
            onChangeText={(text: string) => setPassword(text)}
            secureTextEntry
            placeholderTextColor={colors.white}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Sign Up"
            onPress={handleSignUp}
            disabled={isButtonDisabled || loading}
          />
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.accountText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleLogin} style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GradientComponent>
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
