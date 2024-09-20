import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomIcon from '../CustomIcon';
import colors from '../../theme/colors';
import {moderateScale} from '../../utils/responsive';

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

interface CustomHeaderProps {
  IconName?: string;
  iconType?: IconType;
  IconColor?: string;
  size?: number;
  onPress?: () => void;
  style?: any;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  IconName = 'left',
  iconType = 'AntDesign',
  IconColor = colors.black,
  size = moderateScale(26),
  onPress = () => {},
  style = {},
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <CustomIcon
        name={IconName}
        type={iconType}
        size={size}
        color={IconColor}
      />
    </TouchableOpacity>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
