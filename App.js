import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
import ToConfirmOrder from './screens/ToConfirmOrder';
import ToShipOrder from './screens/ToShipOrder';
import ToReceiveOrder from './screens/ToReceiveOrder';
import OrderCompleted from './screens/OrderCompleted';
import 'react-native-get-random-values'

const Stack = createNativeStackNavigator();
const TabBottom = createBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();

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
    <TabBottom.Navigator>
      <TabBottom.Screen name="Home " component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="home" color={"#b6baba"} size={25} />)
        }}
      />
      <TabBottom.Screen name="Cart" component={Cart}
        options={{
          tabBarBadge: quantity,
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="cart" color={"#b6baba"} size={25} />)
        }}
      />
      <TabBottom.Screen name="Order" component={Order}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="wallet" color={"#b6baba"} size={25} />)
        }}
      />
      <TabBottom.Screen name="Setting" component={Settings}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="settings" color={"#b6baba"} size={25} />)
        }}
      />
    </TabBottom.Navigator>
  );
};

function Order() {
  return (
    <TabTop.Navigator>
      <TabTop.Screen name='to confirm' component={ToConfirmOrder}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="wallet-outline" color={"#b6baba"} size={20} />)
        }} />
      <TabTop.Screen name='to ship' component={ToShipOrder}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="cube-outline" color={"#b6baba"} size={20} />)
        }} />
      <TabTop.Screen name='to receive' component={ToReceiveOrder}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="car-outline" color={"#b6baba"} size={20} />)
        }} />
      <TabTop.Screen name='completed' component={OrderCompleted}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="checkmark-circle-outline" color={"#b6baba"} size={20} />)
        }} />
    </TabTop.Navigator>
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