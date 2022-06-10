import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image, FlatList, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';
import { getDatabase, ref, child, push, update, setPriority, remove, set } from "firebase/database";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clothes from '../assets/Clothes.png';
import { useSelector } from 'react-redux';
import CartListItem from '../components/CartListItem';


export default function EditProduct({ route }) {

    const { productEdit } = route.params;
    const navigation = useNavigation();

    const [imgEdit, setImgEdit] = useState(productEdit.img);
    const [nameEdit, setNameEdit] = useState(productEdit.name);
    const [quantityEdit, setQuantityEdit] = useState(productEdit.quantity);
    const [priceEdit, setPriceEdit] = useState(productEdit.price);


    function addProduct() {
        set(ref(db, 'products/' + 9),
            {
                id: 9,
                category: productEdit.category,
                img: imgEdit,
                name: nameEdit,
                quantity: quantityEdit,
                price: priceEdit
            })
            .then(() => {
                console.log(idcount);
            })
            .catch((e) => {
                console.log(e);
            })
    }


    function editProduct() {
        const db = getDatabase();
        const dbRef = ref(db, "products/" + productEdit.id)
        update(dbRef, {
            id: productEdit.id,
            category: productEdit.category,
            img: imgEdit,
            name: nameEdit,
            quantity: quantityEdit,
            price: priceEdit
        })
            .then(() => {
            })
            .catch((e) => {
                console.log(e);
            })
    };

    function deleteProduct() {
        const db = getDatabase();
        remove(ref(db, "products/" + productEdit.id))
            .then(() => {
            })
            .catch((e) => {
                console.log(e);
            })
    }

    function Edit() {
        Alert.alert(
            "Sửa",
            "Bạn có chắc chắn sửa",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => {
                    editProduct();
                    navigation.goBack();
                }}
            ]
        );

    };

    function Delete() {
        Alert.alert(
            "Xóa",
            "Bạn có chắc chắn xóa",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => {
                    deleteProduct();
                    navigation.goBack();
                }}
            ]
        );

    };


    return (
        <View style={styles.shadow}>
            <Image style={styles.img} source={{ uri: productEdit.img }} />
            <View style={styles.container}>
                <Text style={styles.attributeEdit}>Ảnh</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(img) => setImgEdit(img)}>{productEdit.img}</TextInput>
            </View>
            <View style={styles.container}>
                <Text style={styles.attributeEdit}>Tên sản phẩm</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(name) => setNameEdit(name)}>{productEdit.name}</TextInput>
            </View>
            <View style={styles.container}>
                <Text style={styles.attributeEdit}>Còn</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(quantity) => setQuantityEdit(quantity)}>{productEdit.quantity}</TextInput>
            </View>
            <View style={styles.container}>
                <Text style={styles.attributeEdit}>Giá</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(price) => setPriceEdit(price)}>{productEdit.price}</TextInput>
            </View>
            <View  style={styles.selection}>
                <TouchableOpacity style={styles.editBtn}
                    onPress={() => {
                        addProduct();
                        Alert.alert(
                            "Thêm",
                            "Thêm thành công",
                            [
                                { text: "OK", onPress: () => {
                                    navigation.goBack();
                                }}
                            ]
                        );
                    }}>
                    <Text>Thêm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editBtn}
                    onPress={() => Edit()}>
                    <Text>Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editBtn}
                    onPress={() => Delete()}>
                    <Text>Xóa</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    shadow: {
        alignItems: 'center'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    formInput: {
        borderColor: "#89c7ae",
        padding: 10,
        width: 200
    },
    attributeEdit: {
        fontSize: 16,
        width: 120,
        fontWeight: '700'
    },
    img: {
        height: 180,
        width: 180,
    },
    editBtn: {
        marginTop: 20,
        width: "20%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9fd4be",
        color: "#fff",
        marginHorizontal: 10
    },
    selection: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
