import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "@rneui/base";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      // Pega usuários salvos
      const storedUsers = await AsyncStorage.getItem("@users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Verifica se já existe o e-mail
      if (
        users.some((u: any) => u.email.toLowerCase() === email.toLowerCase())
      ) {
        Alert.alert("Erro", "Este e-mail já está registrado!");
        return;
      }

      // Adiciona novo usuário
      const newUser = { name, email, password };
      users.push(newUser);

      await AsyncStorage.setItem("@users", JSON.stringify(users));

      Alert.alert("Sucesso", "Conta criada com sucesso!");
      router.replace("/"); // volta para login
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível salvar os dados");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.fundoImg}>
          <Image
            source={require("@/assets/images/piso.png")}
            style={styles.img}
            resizeMode="cover"
          />
        </View>

        <View style={styles.container}>
          <Text style={[styles.title, { fontFamily: "Minork" }]}>
            Registrar
          </Text>
          <Text style={[styles.subtitle, { fontFamily: "Wichita" }]}>
            Crie sua conta para gerenciar os compromissos
          </Text>

          <View style={styles.form}>
            <TextInput
              style={[styles.input, { fontFamily: "Wichita" }]}
              placeholder="Nome do estabelecimento"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={[styles.input, { fontFamily: "Wichita" }]}
              placeholder="E-mail"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={[styles.input, { fontFamily: "Wichita" }]}
              placeholder="Senha"
              placeholderTextColor="#666"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={[styles.buttonText, { fontFamily: "Wichita" }]}>
                Registrar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => router.push("/")}
            >
              <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f2e5d5" },
  scroll: { flexGrow: 1, alignItems: "center" },
  fundoImg: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  img: { width: "100%", height: undefined, aspectRatio: 16 / 9 },
  container: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "#ffffffee",
    borderRadius: 20,
    marginTop: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#09402C",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#555",
    marginBottom: 40,
    width: "80%",
  },
  form: { width: "100%", alignItems: "center" },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1.5,
    borderColor: "#09402C",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#ffffffee",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#E65E12",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: { color: "#ffffffee", fontSize: 18, fontWeight: "600" },
  linkContainer: { marginTop: 15, alignItems: "center" },
  linkText: { color: "#09402C", textDecorationLine: "underline", fontSize: 16 },
});
