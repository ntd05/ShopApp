import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import ProductListItem from '../components/ProductListItem';
import { getDatabase, ref, onValue, query, equalTo, orderByChild, orderByKey, orderBy } from "firebase/database";

export default function Category({ route }) {
  //const options=({ route }) => ({ title: route.params.categoryName });
  // const navigationOptions = ({navigation, route}) => {
  //    navigation.setOptions({title : route.params.categoryName})
  //   };
  const [products, setProducts] = useState([]);
  const { categoryName, categoryId } = route.params;

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = query(ref(db, "products"), orderByChild("category"), equalTo(categoryId));
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (!Array.isArray(data)) data && setProducts(Object.values(data))
      else
        setProducts(data);
    });
  }, []);

  return (
    <FlatList
      data={products}
      contentContainerStyle={styles.container}
      numColumns={2}
      renderItem={({ item }) =>
        <View style={styles.wrapper}>
          <ProductListItem product={item} />
        </View>

      }
      keyExtractor={(item) => `${item.id} ${item.quantity}`} />

  );
};

styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingTop: 16

  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 8,

  }
});
