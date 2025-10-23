import { useState } from "react";
import {
  Modal,
  View as RNView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function TabTwoScreen() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Data de hoje formatada como YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>MEU</Text>
        <Text style={styles.subtitle}>mês</Text>

        <Calendar
          markedDates={{
            [today]: { selected: true, selectedColor: "#4CAF50" }, // dia atual
            ...(selectedDay && {
              [selectedDay]: { selected: true, selectedColor: "#007BFF" },
            }),
          }}
          onDayPress={(day) => {
            setSelectedDay(day.dateString);
            setModalVisible(true);
          }}
          theme={{
            todayTextColor: "#4CAF50",
            arrowColor: "#007BFF",
            monthTextColor: "#000",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />

        <View style={styles.separator} />
      </ScrollView>

      {/* Modal do dia selecionado */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <RNView style={styles.modalBackground}>
          <RNView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Dia Selecionado</Text>
            <Text style={styles.modalText}>
              {selectedDay ? selectedDay.split("-").reverse().join("/") : ""}
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </RNView>
        </RNView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 18,
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
