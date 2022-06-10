import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert
} from "react-native";
import Clothes from '../assets/Clothes.png';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase'

export default function Register() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function Register() {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() =>{
        Alert.alert(
            'Đăng ký',
            'Đăng ký thành công',
            [{ text: "OK", onPress: () => navigation.navigate('ShopApp')}]
          );
      }
      )
      .catch(() => {
        console.log("dky ko thanh cong")
      });

  };

  return (
    <View style={styles.container}>
        <Text style= {styles.tittle}>REGISTER</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn}
        onPress={() => Register()}>
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack("Login")}>
        <Text style={styles.forgot_button}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dff5ec",
    alignItems: "center",
    justifyContent: "center",
  },
  tittle: {
    fontSize: 30,
    fontWeight: "700",
    paddingBottom: 70,
    color: "#80ad9b"
  },
  inputView: {
    backgroundColor: "#fff",
    width: "70%",
    height: 45,
    marginBottom: 20,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9fd4be",
    color: "#fff",
  },
  forgot_button: {
    height: 30,
    marginTop: 20,
    marginBottom: 10,
  },
});