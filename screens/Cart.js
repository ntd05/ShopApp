import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';
import { getDatabase, ref, onValue } from "firebase/database";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clothes from '../assets/Clothes.png';
import { useSelector, useDispatch } from 'react-redux';
import CartListItem from '../components/CartListItem';


export default function Cart() {

  const navigation = useNavigation();

  // const [products, setProducts] = useState([]);
  const cart = useSelector(state => state.cart);
  const productCart = cart.cartItems;

  return (
    <View>
      <FlatList
        data={productCart}
        contentContainerStyle={styles.container}
        renderItem={({ item }) =>
          <View>
            <CartListItem productCartItems={item.product} cartQuantity={item.cartQuantity} />
          </View>
        }
        keyExtractor={(item) => `${item.product.id}`} />
      <View style={styles.Orders}>
        <Text >{cart.cartTotalAmount}</Text>
        <TouchableOpacity style={styles.buttonOrder} onPress={() => navigation.navigate('CheckInfoOrder')}>
          <Text style={styles.textOrder}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    top: 480,
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
    backgroundColor: '#72b898',
    fontSize: 18
  }
});