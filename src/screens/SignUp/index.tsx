import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationProps} from '../../navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';
import {
  CustomButton,
  CustomInput,
  CustomLoader,
  CustomText,
} from '../../components';
import {moderateHeight, moderateScale} from '../../utils/responsive';
import Toast from 'react-native-toast-message';
import config from '../../config/config';

interface SignUpScreenProps {
  navigation: StackNavigationProp<RootNavigationProps, 'SignUp'>;
}

const SignUp: React.FC<SignUpScreenProps> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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

    setLoading(true);

    try {
      const res = await fetch(`${config.baseUrl}${config.endpoints.register}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, name}),
      });

      const data = await res.json();

      if (res.ok) {
        Toast.show({
          type: 'success',
          text1: 'Sign Up Successful',
          text2: `Welcome, ${name}!`,
        });
        setName('');
        setEmail('');
        setPassword('');
        console.log('Navigating with ID: ', data._id);
        navigation.navigate('BottomTab', {id: data._id});
      } else {
        Toast.show({
          type: 'error',
          text1: 'Sign Up Failed',
          text2: data.message || 'Please try again',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please try again later.',
      });
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.neonBlue, colors.neonRed]}
      style={styles.container}>
      <CustomLoader visible={loading} />
      <View style={styles.innerContainer}>
        <CustomText
          text="Sign up"
          containerStyle={styles.loginTextContainer}
          textStyle={styles.loginText}
        />

        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Enter name"
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
            keyboardType="default"
            onChangeText={(text: string) => setPassword(text)}
            secureTextEntry
            placeholderTextColor={colors.white}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Sign up"
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
