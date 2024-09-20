import React from 'react';
import {StyleSheet, View, ActivityIndicator, Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';

interface LoaderProps {
  visible: boolean;
  size?: 'small' | 'large';
  color?: string;
  gradientColors?: string[];
}

const CustomLoader: React.FC<LoaderProps> = ({
  visible,
  size = 'large',
  color = '#ffffff',
  gradientColors = [colors.neonBlue, colors.neonRed],
}) => {
  if (!visible) return null;

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <LinearGradient colors={gradientColors} style={styles.container}>
        <ActivityIndicator size={size} color={color} />
      </LinearGradient>
    </Modal>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
