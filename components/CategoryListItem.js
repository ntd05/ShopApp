import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert} from "react-native";

export default function CategoryListItem(props) {
    const { category, onPress } = props;
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.title}>{category.name}</Text>
                <Image style={styles.categoryImage} source= {{uri: category.img}}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
        padding: 16,
        borderRadius: 4,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 }
    },
    categoryImage: {
        width: 64,
        height: 64
    },
    tittle: {
        textTransform: 'uppercase',
        marginBottom: 8,
        fontWeight: '700'
    }
});
