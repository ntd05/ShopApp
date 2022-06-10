import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import CategoryListItem from '../components/CategoryListItem';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';
import { getDatabase, ref, onValue } from "firebase/database";

export default function Settings() {

  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity activeOpacity={0.5}>
        
        <View style={styles.container}>
          <Image></Image>
          <Text style={styles.title}>Hồ sơ của tôi</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5}>
        <View style={styles.container}>
          <Text style={styles.title}>Giao diện</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5}>
        <View style={styles.container}>
          <Text style={styles.title}>Thông báo</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5}>
        <View style={styles.container}>
          <Text style={styles.title}>Ngôn ngữ</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Login')}>
        <View style={styles.container}>
          <Text style={styles.title}>Đăng xuất</Text>
        </View>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 1,
    padding: 16,
    borderRadius: 4,
    backgroundColor: '#FFF',
    shadowOffset: { width: 0, height: 0 }
},
});