import React from 'react';
import {StyleSheet, Text, View, TextStyle, ViewStyle} from 'react-native';
import {moderateHeight, moderateScale} from '../../utils/responsive';
import colors from '../../theme/colors';

interface CustomTextProps {
  text: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const CustomText: React.FC<CustomTextProps> = ({
  text,
  textStyle,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: moderateScale(16),
    color: colors.black,
  },
});
