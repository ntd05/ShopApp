import { StyleSheet, View } from 'react-native';
import React from 'react';
import OrderList from '../components/OrderList';


export default function OrderCompleted() {

  return (
    <View style={styles.container}>
      <OrderList status={3} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
