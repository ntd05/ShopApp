import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { decreaseCart, addToCart } from '../store/cartReducer';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash'
import { formatPriceType } from '../lib/utils';

export default function CartListItem(props) {
  const { productCartItems, cartQuantity, isHideBtn = false } = props;
  const dispatch = useDispatch();

  const handleClickDecreaseCart = (product) => {
    dispatch(decreaseCart({ product }));
  }

  const handleClickAddCart = (product) => {
    dispatch(addToCart({ product }));
  }

  return (
    <View>
      {productCartItems &&
        <View style={styles.container}>
          <Image style={styles.categoryImage} source={{ uri: productCartItems.img }} />
          <View style={styles.infoProduct}>
            <Text style={styles.title}>{productCartItems.name}</Text>
            <Text style={styles.price}>{formatPriceType(productCartItems.price)}</Text>
          </View>
          <View style={styles.changeNumber}>
            {!isHideBtn &&
              <Ionicons name="remove-circle" style={styles.icons} onPress={() => handleClickDecreaseCart(productCartItems)} />
            }
            {isHideBtn && <Text>X </Text>}
            <Text style={styles.numberProduct}>{cartQuantity}</Text>
            {!isHideBtn &&
              <Ionicons name="add-circle" style={styles.icons} onPress={() => handleClickAddCart(productCartItems)} />
            }
          </View>
        </View>
      }
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
    fontSize: 18,
    marginRight: 45,
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
