import { AddAppointmentModal } from "@/components/AddAppointmentModal";
import { TextMinork, TextWichita } from "@/components/TextCustom";
import { useAppointmentStore } from "@/store/useAppointmentStore"; // ✅ importa o Zustand store
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function TabTwoScreen() {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDay, setSelectedDay] = useState<string | null>(today);
  const [modalVisible, setModalVisible] = useState(false);

  const { data, addAppointment } = useAppointmentStore();

  const markedDates = data.reduce((acc, day) => {
    acc[day.date] = {
      marked: true,
      dotColor: "#E65E12",
    };
    return acc;
  }, {} as Record<string, any>);

  markedDates[today] = {
    ...(markedDates[today] || {}),
    selected: true,
    selectedColor: "#09402C",
  };
  if (selectedDay) {
    markedDates[selectedDay] = {
      ...(markedDates[selectedDay] || {}),
      selected: true,
      selectedColor: "#E65E12",
    };
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextMinork style={styles.title}>Compromissos</TextMinork>
        <TextWichita style={styles.subtitle}>do mês</TextWichita>

        <Calendar
          current={today}
          onDayPress={(day) => {
            setSelectedDay(day.dateString);
            setModalVisible(true);
          }}
          markedDates={markedDates}
          theme={{
            todayTextColor: "#09402C",
            arrowColor: "#E65E12",
            monthTextColor: "#09402C",
            textDayFontSize: 18,
            textMonthFontSize: 22,
            textDayHeaderFontSize: 16,
          }}
          style={styles.calendar}
          hideExtraDays={false}
          firstDay={1}
        />

        <View style={styles.separator} />
      </ScrollView>

      {/* Modal para adicionar novo compromisso */}
      {selectedDay && (
        <AddAppointmentModal
          visible={modalVisible}
          selectedDay={selectedDay}
          onClose={() => setModalVisible(false)}
          onSave={(newAppointment) => {
            addAppointment(selectedDay, {
              id: Date.now().toString(),
              ...newAppointment,
            });
            setModalVisible(false);
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
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
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
    width: "80%",
    height: 1,
    backgroundColor: "#09402C",
    marginVertical: 20,
    borderRadius: 2,
  },
  calendar: {
    width: "95%",
    borderRadius: 16,
    backgroundColor: "#ffffffee",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
});
