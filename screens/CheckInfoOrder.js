import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';
import { getDatabase, ref, onValue } from "firebase/database";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clothes from '../assets/Clothes.png';
import { useSelector } from 'react-redux';
import CartListItem from '../components/CartListItem';
import Cart from './Cart';


export default function CheckInfoOrder() {

  const navigation = useNavigation();

  // const [products, setProducts] = useState([]);
  const cart = useSelector(state => state.cart);
  const productCart = cart.cartItems;

  return (
    <View>
      <View style={styles.Address}>
        <Text style={{fontSize: 18}}>Địa chỉ nhận hàng</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Họ tên"
            placeholderTextColor="#98acb5"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Số điện thoại"
            placeholderTextColor="#98acb5"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Địa chỉ"
            placeholderTextColor="#98acb5"
          /></View>
      </View>
      <Cart/>
      <View style={styles.Orders}>
        <Text >{cart.cartTotalAmount}</Text>
        <TouchableOpacity 
          style={styles.buttonOrder}
          onPress={() => navigation.navigate('Order')}>
          <Text style={styles.textOrder}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Address: {
    marginTop: 20,
    paddingTop: 25,
    paddingLeft: 16,
    paddingRight: 16
  },
  inputView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 45,
    marginTop: 5,
  },
  container: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  Orders: {
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    flexDirection: 'row',
    position: 'absolute',
    top: 590,
    width: '100%',
    height: 75

  },
  buttonOrder: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  textOrder: {
    marginHorizontal: 20,
    color: 'white',
    padding: 15,
    backgroundColor: '#8acfba',
    fontSize: 18
  },
  TextInput: {
    height: 50,
    flex: 1,
    marginLeft: 20,
  }
});