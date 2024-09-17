import React, {useState} from 'react';
import {StyleSheet, Text, ViewStyle, TextStyle} from 'react-native';
import Ripple from 'react-native-material-ripple';
import colors from '../../theme/colors';
import {moderateScale} from '../../utils/responsive';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  disabled = false,
}) => {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    if (!disabled) {
      setPressed(true);
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      setPressed(false);
    }
  };

  return (
    <Ripple
      style={[
        styles.button,
        buttonStyle,
        disabled
          ? styles.disabledButton
          : pressed
          ? styles.pressedButton
          : styles.activeButton,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      rippleColor={colors.white}
      rippleContainerBorderRadius={moderateScale(12)}
      rippleDuration={200}
      rippleCentered={true}
      disabled={disabled}>
      <Text
        style={[styles.buttonText, disabled && styles.disabledText, textStyle]}>
        {title}
      </Text>
    </Ripple>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: moderateScale(16),
    borderColor: colors.white,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    letterSpacing: 0.5,
    color: colors.white,
  },
  activeButton: {
    backgroundColor: colors.neonRed_60,
  },
  pressedButton: {
    backgroundColor: colors.neonRed_80,
  },
  disabledButton: {
    backgroundColor: colors.lightGray_80,
    borderColor: colors.lightGray_80,
  },
  disabledText: {
    color: colors.textHint,
  },
});
