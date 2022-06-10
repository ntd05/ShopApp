import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import CategoryListItem from '../components/CategoryListItem';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';
import { getDatabase, ref, onValue } from "firebase/database";

export default function Orders({ navigation }) {
  return (
    <View>
        <Text>Orders</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16
  }
});