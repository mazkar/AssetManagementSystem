import {View, Text} from 'react-native';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import Route from './src/root/Route';
import {theme} from './src/assets/theme';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/store/index';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          {/* <FlashMessage statusBarHeight={30} /> */}
          <NavigationContainer>
            <Route />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
