import { TextMinork, TextWichita } from "@/components/TextCustom";
import MOCK_DATA from "@/mocks/MOCK_DATA.json";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

function getFormattedDate() {
  const today = new Date();
  const day = today.getDate();
  const months = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];
  return `${day} ${months[today.getMonth()]}`;
}

const BORDER_COLORS = ["#09402C", "#F2D541", "#E65E12", "#D94814"];

export default function TabOneScreen() {
  const today = getFormattedDate();
  const key = new Date().toISOString().split("T")[0];
  const todayData = MOCK_DATA.find((d) => d.date === key);
  const appointments = todayData?.appointments || [];

  const [doneItems, setDoneItems] = useState<string[]>([]);

  function toggleDone(id: string) {
    setDoneItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  return (
    <View style={styles.container}>
      <TextMinork style={styles.title}>Compromissos</TextMinork>
      <TextWichita style={styles.subtitle}>— {today} —</TextWichita>

      <View style={styles.separator} />

      {appointments.length > 0 ? (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => {
            const borderColor = BORDER_COLORS[index % BORDER_COLORS.length];
            const isDone = doneItems.includes(item.id.toString());

            return (
              <View style={[styles.card, isDone && { opacity: 0.5 }]}>
                <View style={styles.cardContent}>
                  <View>
                    <View style={styles.cardHeader}>
                      <TextMinork style={styles.cardTime}>
                        {item.time}
                      </TextMinork>
                      <TextWichita style={styles.cardService}>
                        {item.service}
                      </TextWichita>
                    </View>
                    <TextWichita style={styles.cardClient}>
                      {item.client}
                    </TextWichita>
                  </View>
                </View>

                {/* Botão de borda à direita */}
                <TouchableOpacity
                  style={[styles.checkButton, { backgroundColor: borderColor }]}
                  onPress={() => toggleDone(item.id.toString())}
                >
                  <Ionicons name="checkmark" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      ) : (
        <TextWichita style={styles.emptyText}>
          Nenhum compromisso hoje!
        </TextWichita>
      )}
    </View>
  );
}

const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2e5d5",
    alignItems: "center",
    paddingTop: 60,
  },
  title: {
    fontSize: 46,
    color: "#09402C",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 22,
    color: "#E65E12",
    marginBottom: 20,
  },
  separator: {
    width: "70%",
    height: 2,
    backgroundColor: "#09402C",
    borderRadius: 2,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 40,
  },
  card: {
    width: SCREEN_WIDTH * 0.8,
    height: 110, // tamanho fixo
    backgroundColor: "#ffffffee",
    borderRadius: 16,
    flexDirection: "row",
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  cardContent: {
    justifyContent: "center",
    padding: 16,
  },
  checkButton: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTime: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#09402C",
  },
  cardClient: {
    fontSize: 20,
    color: "#222",
  },
  cardService: {
    fontSize: 16,
    marginLeft: 10,
    color: "#E65E12",
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
    marginTop: 40,
  },
});
