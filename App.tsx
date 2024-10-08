import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import colors from './src/theme/colors';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider>
          <LinearGradient
            colors={[colors.neonBlue, colors.neonRed]}
            style={styles.container}>
            <View style={styles.container}>
              <AppNavigator />
              <Toast />
            </View>
          </LinearGradient>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
