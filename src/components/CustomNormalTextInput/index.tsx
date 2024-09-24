import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TextInputProps,
  KeyboardTypeOptions,
  TouchableOpacity,
} from 'react-native';
import {moderateScale, moderateWidth} from '../../utils/responsive';
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

interface CustomNormalTextInputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
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
  onPress?: () => void;
  style?: any;
}

const CustomNormalTextInput: React.FC<CustomNormalTextInputProps> = ({
  label,
  placeholder = '',
  onChangeText = () => {},
  secureTextEntry,
  onPressRight,
  rightIcon,
  rightIconType = 'Ionicons',
  autoFocus,
  placeholderTextColor,
  value,
  multiline = false,
  keyboardType,
  numberOfLines,
  textAlignVertical = 'top',
  editable = true,
  color = colors.white,
  style,
  onPress,
}) => {
  const [inputHeight, setInputHeight] = useState<number>(
    multiline ? moderateScale(40) : moderateScale(40),
  );

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, style, {height: inputHeight}]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || colors.lightGray}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          value={value}
          multiline={multiline}
          keyboardType={keyboardType}
          numberOfLines={numberOfLines}
          textAlignVertical={textAlignVertical}
          editable={editable}
          onContentSizeChange={e =>
            multiline ? setInputHeight(e.nativeEvent.contentSize.height) : null
          }
        />
        {rightIcon && (
          <TouchableOpacity onPress={onPressRight} activeOpacity={0.7}>
            <CustomIcon name={rightIcon} type={rightIconType} color={color} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomNormalTextInput;

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.lavender,
  },
  label: {
    fontSize: moderateScale(16),
    marginBottom: moderateScale(8),
    color: colors.darkGray,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: moderateScale(16),
  },
  icon: {
    padding: moderateScale(10),
  },
});
