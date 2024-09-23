import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {moderateScale} from '../../utils/responsive';

type CustomMarginProps = {
  customStyle?: ViewStyle;
  children: ReactNode;
};

const CustomMargin: React.FC<CustomMarginProps> = ({customStyle, children}) => {
  return (
    <View style={[styles.customMarginContainer, customStyle]}>{children}</View>
  );
};

export default CustomMargin;

const styles = StyleSheet.create({
  customMarginContainer: {
    marginHorizontal: moderateScale(16),
  },
});
