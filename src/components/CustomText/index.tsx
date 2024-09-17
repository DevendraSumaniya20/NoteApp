import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {moderateHeight, moderateScale} from '../../utils/responsive';
import colors from '../../theme/colors';

interface CustomTextProps {
  text: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  onPress?: () => void;
  pressable?: boolean;
}

const CustomText: React.FC<CustomTextProps> = ({
  text,
  textStyle,
  containerStyle,
  onPress,
  pressable = false,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {pressable ? (
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={[styles.text, textStyle]}>{text}</Text>
      )}
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
