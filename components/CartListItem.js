import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

export default function CartListItem(props) {
  const { productCartItems, cartQuantity} = props;  

  const cart = useSelector((state) => state.cart);
  console.log(productCartItems);

  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.categoryImage} source={{ uri: productCartItems.img }} />
        <View style={styles.infoProduct}>
          <Text style={styles.title}>{productCartItems.name}</Text>
          <Text style={styles.price}>{productCartItems.price}</Text>
        </View>
        <View style={styles.changeNumber}>
          <Ionicons name="remove-circle" style={styles.icons} />
          <Text style={styles.numberProduct}>{cartQuantity}</Text>
          <Ionicons name="add-circle" style={styles.icons} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    flexDirection: 'row'
  },
  categoryImage: {
    width: 64,
    height: 64
  },
  infoProduct: {
    margin: 10
  },
  title: {
    marginBottom: 8,
    fontWeight: '700',
    fontSize: 20
  },
  numberProduct: {
    fontWeight: '700',
    fontSize: 18
  },
  price: {
    color: '#969999',
    fontSize: 17
  },
  icons: {
    color: "#969999",
    fontSize: 30,
    marginHorizontal: 5
  },
  changeNumber: {
    flexDirection: 'row',
    marginLeft: 'auto',
    fontSize: 20,
    alignItems: 'center',
    fontWeight: '700',
  }
});
