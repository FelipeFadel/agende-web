import { Image } from "@rneui/base";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* --- IMAGEM (NÃO ALTERADA) --- */}
        <View style={styles.fundoImg}>
          <Image
            source={require("@/assets/images/piso.png")}
            style={styles.img}
            resizeMode="cover"
          />
        </View>

        {/* --- CONTEÚDO --- */}
        <View style={styles.container}>
          <Text style={[styles.title, { fontFamily: "Minork" }]}>
            Bem-Vindo!
          </Text>

          <Text style={[styles.subtitle, { fontFamily: "Wichita" }]}>
            Faça seu login para ver os compromissos de hoje
          </Text>

          <View style={styles.form}>
            <TextInput
              style={[styles.input, { fontFamily: "Wichita" }]}
              placeholder="Nome de seu estabelecimento"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={[styles.input, { fontFamily: "Wichita" }]}
              placeholder="Sua senha"
              placeholderTextColor="#666"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={[styles.buttonText, { fontFamily: "Wichita" }]}>
                Entrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f2e5d5",
  },
  scroll: {
    flexGrow: 1,
    alignItems: "center",
  },
  fundoImg: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
  },
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
  form: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1.5,
    borderColor: "#09402C",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "rgba(255,255,255,0.95)",
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
  buttonText: {
    color: "#F2D541",
    fontSize: 18,
    fontWeight: "600",
  },
});
