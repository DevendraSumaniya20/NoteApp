import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  TextInputProps,
  StyleProp,
  TextStyle,
  KeyboardTypeOptions,
} from 'react-native';
import {moderateScale} from '../../utils/responsive';
import CustomIcon from '../CustomIcon';
import colors from '../../theme/colors';

type IconType =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5_Brands'
  | 'FontAwesome5_Regular'
  | 'FontAwesome5_Solid'
  | 'FontAwesome6_Brands'
  | 'FontAwesome6_Regular'
  | 'FontAwesome6_Solid'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'SimpleLineIcons'
  | 'Octicons'
  | 'Zocial'
  | 'Fontisto';

interface CustomInputProps {
  placeholder?: string;
  inputStyle?: StyleProp<TextStyle>;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  onPressRight?: () => void;
  rightIcon?: string;
  rightIconType?: IconType;
  autoFocus?: boolean;
  placeholderTextColor?: string;
  value?: string;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  numberOfLines?: number;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  editable?: boolean;
  color?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder = '',
  inputStyle = {},
  onChangeText = () => {},
  secureTextEntry,
  onPressRight,
  rightIcon,
  rightIconType = 'Ionicons',
  autoFocus,
  placeholderTextColor,
  value,
  multiline,
  keyboardType,
  numberOfLines,
  textAlignVertical,
  editable,
  color = 'black',
}) => {
  return (
    <View style={styles.textInput}>
      <TextInput
        placeholder={placeholder}
        style={[styles.inputStyle, inputStyle]}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        placeholderTextColor={placeholderTextColor}
        value={value}
        multiline={multiline}
        keyboardType={keyboardType}
        numberOfLines={numberOfLines}
        textAlignVertical={textAlignVertical}
        editable={editable}
      />
      {!!rightIcon && (
        <View style={styles.rightIconContainer}>
          <TouchableOpacity onPress={onPressRight} style={styles.iconButton}>
            <CustomIcon
              name={rightIcon}
              type={rightIconType}
              size={20}
              color={color}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputStyle: {
    padding: moderateScale(12),
    fontSize: moderateScale(14),
    height: moderateScale(50),
    fontWeight: '400',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    justifyContent: 'space-between',
    width: moderateScale(343),
    paddingHorizontal: moderateScale(12),
    borderColor: colors.white,
  },
  rightIconContainer: {
    marginRight: moderateScale(8),
    alignItems: 'center',
  },
  iconButton: {
    padding: moderateScale(0),
  },
});
