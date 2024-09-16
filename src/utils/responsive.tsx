import {Dimensions, PixelRatio, StatusBar} from 'react-native';
import {hasDynamicIsland, hasNotch} from 'react-native-device-info';

// Get dimensions of the screen
const {width, height} = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

// Scaling functions with proper types
const scale = (size: number): number => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number): number =>
  (height / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;

const moderateWidth = (widthPercent: string | number): number => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

const moderateHeight = (heightPercent: string | number): number => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};

// Exporting the scaling functions
export {scale, verticalScale, moderateScale, moderateWidth, moderateHeight};

// Status bar height
export const STATUSBAR_HEIGHT = StatusBar.currentHeight || 0;

// Margin top with consideration for dynamic island and notch
export const MARGIN_TOP_STATUSBAR =
  hasNotch() || hasDynamicIsland()
    ? moderateScale(50)
    : STATUSBAR_HEIGHT + moderateWidth(5);
