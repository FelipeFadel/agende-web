import { AddAppointmentModal } from "@/components/AddAppointmentModal";
import { EditAppointmentModal } from "@/components/EditAppointmentModal";
import { FloatingButton } from "@/components/FloatingButton";
import { TextMinork, TextWichita } from "@/components/TextCustom";
import { WeekSelector } from "@/components/WeekSelector";
import { useAppointmentStore } from "@/store/useAppointmentStore";
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
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function TabOneScreen() {
  const today = getFormattedDate();
  const todayKey = new Date().toISOString().split("T")[0];

  const [selectedDay, setSelectedDay] = useState(todayKey);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<any>(null);

  const {
    data,
    addAppointment,
    toggleDone,
    doneItems,
    editAppointment: updateAppointment,
    removeAppointment: deleteAppointment,
  } = useAppointmentStore();

  const dataForDay = data.find((d) => d.date === selectedDay);
  const appointments = dataForDay?.appointments || [];

  const handleEdit = (appointment: any) => {
    setEditingAppointment(appointment);
    setEditModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TextMinork style={styles.title}>Compromissos</TextMinork>
      <TextWichita style={styles.subtitle}>— {today} —</TextWichita>

      <WeekSelector selectedDay={selectedDay} onSelect={setSelectedDay} />
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
                  <View style={styles.cardHeader}>
                    <TextMinork style={styles.cardTime}>{item.time}</TextMinork>
                    <TextWichita style={styles.cardService}>
                      {item.service}
                    </TextWichita>
                  </View>
                  <TextWichita style={styles.cardClient}>
                    {item.client}
                  </TextWichita>
                </View>

                {/* Container de Botões Vertical */}
                <View style={styles.buttonsContainer}>
                  {/* Concluir */}
                  <TouchableOpacity
                    style={[
                      styles.checkButton,
                      { backgroundColor: borderColor },
                    ]} // verde
                    onPress={() => toggleDone(item.id.toString())}
                  >
                    <Ionicons name="checkmark" size={24} color="#fff" />
                  </TouchableOpacity>

                  {/* Editar */}
                  <TouchableOpacity
                    style={[
                      styles.checkButton,
                      { backgroundColor: borderColor },
                    ]} // amarelo
                    onPress={() => handleEdit(item)}
                  >
                    <Ionicons name="pencil" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <TextWichita style={styles.emptyText}>
          Nenhum compromisso hoje!
        </TextWichita>
      )}

      {/* Floating Button */}
      <FloatingButton onPress={() => setModalVisible(true)} />

      {/* Modal Adicionar */}
      <AddAppointmentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedDay={selectedDay}
        onSave={(newAppointment) => {
          addAppointment(selectedDay, {
            id: Date.now().toString(),
            ...newAppointment,
          });
          setModalVisible(false);
        }}
      />

      {/* Modal Editar */}
      {editingAppointment && (
        <EditAppointmentModal
          visible={editModalVisible}
          appointment={editingAppointment}
          onClose={() => setEditModalVisible(false)}
          onSave={(updated) => {
            updateAppointment(selectedDay, updated);
            setEditModalVisible(false);
          }}
          onDelete={() => {
            deleteAppointment(selectedDay, editingAppointment.id);
            setEditModalVisible(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2e5d5",
    alignItems: "center",
    paddingTop: 60,
  },
  title: { fontSize: 46, color: "#09402C", marginBottom: 4 },
  subtitle: { fontSize: 22, color: "#E65E12", marginBottom: 20 },
  separator: {
    width: "70%",
    height: 2,
    backgroundColor: "#09402C",
    borderRadius: 2,
    marginBottom: 20,
  },
  list: { paddingBottom: 40 },
  card: {
    width: SCREEN_WIDTH * 0.8,
    height: 110,
    backgroundColor: "#ffffffee",
    borderRadius: 16,
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "space-between",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: { justifyContent: "center", padding: 16, flex: 1 },
  buttonsContainer: { flexDirection: "column", width: 50, height: "100%" },
  checkButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardTime: { fontSize: 18, color: "#09402C", fontWeight: "bold" },
  cardClient: { fontSize: 20, color: "#222" },
  cardService: { fontSize: 16, marginLeft: 10, color: "#E65E12" },
  emptyText: { fontSize: 18, color: "#555", marginTop: 40 },
});
