import {StyleSheet, View} from 'react-native';
import React from 'react';
import {generateRandomLinearGradient} from '../../constants/LinearColorFn';
import LinearGradient from 'react-native-linear-gradient';

const GradientComponent: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {colors, angle} = generateRandomLinearGradient();

  const angleInRadians = parseInt(angle) * (Math.PI / 180);
  const start = {
    x: 0.5 + 0.5 * Math.cos(angleInRadians),
    y: 0.5 + 0.5 * Math.sin(angleInRadians),
  };
  const end = {
    x: 0.5 - 0.5 * Math.cos(angleInRadians),
    y: 0.5 - 0.5 * Math.sin(angleInRadians),
  };

  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={styles.container}>
      <View style={styles.innerContainer}>{children}</View>
    </LinearGradient>
  );
};

export default GradientComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
});
