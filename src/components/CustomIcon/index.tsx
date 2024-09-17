import React from 'react';
import {moderateScale} from '../../utils/responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import Fontisto from 'react-native-vector-icons/Fontisto';

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

interface CustomIconProps {
  name: string;
  color: string;
  size?: number;
  type?: IconType;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  name,
  color,
  size = moderateScale(16),
  type = 'Ionicons',
}) => {
  let IconComponent: React.ComponentType<any>;

  switch (type) {
    case 'AntDesign':
      IconComponent = AntDesign;
      break;
    case 'Entypo':
      IconComponent = Entypo;
      break;
    case 'EvilIcons':
      IconComponent = EvilIcons;
      break;
    case 'Feather':
      IconComponent = Feather;
      break;
    case 'FontAwesome':
      IconComponent = FontAwesome;
      break;
    case 'FontAwesome5_Brands':
    case 'FontAwesome5_Regular':
    case 'FontAwesome5_Solid':
      IconComponent = FontAwesome5;
      break;
    case 'FontAwesome6_Brands':
    case 'FontAwesome6_Regular':
    case 'FontAwesome6_Solid':
      IconComponent = FontAwesome6;
      break;
    case 'Foundation':
      IconComponent = Foundation;
      break;
    case 'Ionicons':
      IconComponent = Ionicons;
      break;
    case 'MaterialIcons':
      IconComponent = MaterialIcons;
      break;
    case 'MaterialCommunityIcons':
      IconComponent = MaterialCommunityIcons;
      break;
    case 'SimpleLineIcons':
      IconComponent = SimpleLineIcons;
      break;
    case 'Octicons':
      IconComponent = Octicons;
      break;
    case 'Zocial':
      IconComponent = Zocial;
      break;
    case 'Fontisto':
      IconComponent = Fontisto;
      break;
    default:
      IconComponent = Ionicons;
  }

  return <IconComponent name={name} color={color} size={size} />;
};

export default CustomIcon;
