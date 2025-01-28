/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native';
import React, {StrictMode} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductListing from './screens/ProductListing';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import store from './redux/store';

const Stack = createStackNavigator();
const queryClient = new QueryClient();
const App = () => {
  return (
    <StrictMode>
      <SafeAreaView style={{flex: 1, backgroundColor: 'teal'}}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Products">
                <Stack.Screen name="Products" component={ProductListing} />
                <Stack.Screen
                  name="ProductDetails"
                  component={ProductDetails}
                />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="Checkout" component={Checkout} />
              </Stack.Navigator>
            </NavigationContainer>
          </Provider>
        </QueryClientProvider>
      </SafeAreaView>
    </StrictMode>
  );
};

export default App;
