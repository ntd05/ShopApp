import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import CategoryListItem from '../components/CategoryListItem';
import { getDatabase, ref, onValue } from "firebase/database";

export default function Categories({ navigation }) {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "categories");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      //console.log("categories", data);
      setCategories(data);
    });
  }, []);

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) =>
        <CategoryListItem
          category={item}
          onPress={() => navigation.navigate('Category', {
            categoryName: item.name,
            categoryId: item.id,
          })} />
      }
      keyExtractor={item => `${item.id}`}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16
  }
});