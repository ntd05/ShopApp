import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Category from './screens/Category';
import Categories from './screens/Categories';
import Login from './screens/Login';
import Register from './screens/Register';
import Cart from './screens/Cart';
import Settings from './screens/Settings';
import Orders from './screens/Orders';
import CheckInfoOrder from './screens/CheckInfoOrder';
import { Provider } from 'react-redux';
import store from './store';
import EditProduct from './components/EditProduct';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Categories} />
      <Stack.Screen name="Category" component={Category} options={({ route }) => ({ title: route.params.categoryName })} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
    </Stack.Navigator>
  );
};

function ShopApp() {
  
  const cart = useSelector(state => state.cart);
  const quantity = cart.cartTotalQuantity;
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home1" component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="home" color={"#b6baba"} size={25} />)
        }}
      />
      <Tab.Screen name="Cart" component={Cart}
        options={{
          tabBarBadge: quantity,
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="cart" color={"#b6baba"} size={25} />)
        }}
      />
      <Tab.Screen name="Order" component={Orders}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="wallet" color={"#b6baba"} size={25} />)
        }}
      />
      <Tab.Screen name="Setting" component={Settings}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="settings" color={"#b6baba"} size={25} />)
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}
            options={{
              headerShown: false
            }} />
          <Stack.Screen name="Register" component={Register}
            options={{
              headerShown: false
            }} />
          <Stack.Screen name="ShopApp" component={ShopApp}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name='CheckInfoOrder' component={CheckInfoOrder}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};