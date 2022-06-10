import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addCart, addToCart, getTotals } from '../store/cartReducer';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProductListItem(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { product, onAddToCartClick } = props;

    const cart = useSelector(state => state.cart);
    useEffect(() => {
        dispatch(getTotals());
      }, [cart, dispatch]);

    const handleClickAdd = (product) => {
        Alert.alert('Đã thêm sản phẩm');
        //dispatch(addCart({ product }));
        dispatch(addToCart({product}));
    }

    const editProduct = (product) => {
        navigation.navigate('EditProduct',{
            productEdit: product
        });
    }

    return (
        <View style={styles.shadow}>
            <View style={styles.container}>
                <Image style={styles.img} source={{ uri: product.img }} />
                <View style={styles.info}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>Còn : {product.quantity}</Text>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>{product.price}</Text>
                        <TouchableOpacity onPress={onAddToCartClick}>
                            <Text style={styles.cartText}>
                                <Ionicons
                                    name="pencil" color={"#b84444"} size={20}
                                    onPress={() => editProduct(product)} />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onAddToCartClick}>
                            <Text style={styles.cartText}>
                                <Ionicons
                                    name="cart" color={"#b6baba"} size={20}
                                    onPress={() => handleClickAdd(product)} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cartText: {
        textTransform: 'uppercase',
        fontSize: 16,
        color: '#2f95dc',
        marginLeft: 10
    },
    shadow: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 }
    },
    container: {
        marginBottom: 20,
        borderRadius: 4,
        backgroundColor: '#FFF',
        overflow: 'hidden'
    },
    info: {
        padding: 8
    },
    img: {
        height: 150,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4
    },
    name: {
        fontSize: 16,
        marginBottom: 8
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    price: {
        fontSize: 16,
        color: '#888',
        flex: 1
    }
});