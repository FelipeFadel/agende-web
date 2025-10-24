import { TextMinork, TextWichita } from "@/components/TextCustom";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function AgendarClienteScreen() {
  const today = new Date().toISOString().split("T")[0];
  const { addAppointment, data } = useAppointmentStore();

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [serviceInput, setServiceInput] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");

  const horarios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const dataForDay = data.find((d) => d.date === selectedDate);
  const unavailableHours = dataForDay?.appointments.map((a) => a.time) || [];

  function confirmar() {
    if (!serviceInput || !selectedHour || !clientName) {
      Alert.alert(
        "Atenção",
        "Preencha nome, serviço e horário antes de confirmar."
      );
      return;
    }

    const novo = {
      id: Date.now().toString(),
      time: selectedHour,
      service: serviceInput,
      client: clientName,
    };

    addAppointment(selectedDate, novo);

    Alert.alert(
      "Agendamento confirmado!",
      `${serviceInput} de ${clientName} em ${selectedDate} às ${selectedHour}`
    );

    setSelectedHour(null);
    setServiceInput("");
    setClientName("");
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <TextMinork style={styles.title}>Agendar horario!</TextMinork>
      <TextWichita style={styles.subtitle}>
        Escolha o dia, serviço e horário...
      </TextWichita>

      <Calendar
        current={today}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#E65E12" },
        }}
        theme={{
          todayTextColor: "#09402C",
          arrowColor: "#E65E12",
          monthTextColor: "#09402C",
          textDayFontSize: 16,
          textMonthFontSize: 20,
        }}
        style={styles.calendar}
      />

      <TextWichita style={styles.sectionTitle}>Nome do Cliente</TextWichita>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        placeholderTextColor="#666"
        value={clientName}
        onChangeText={setClientName}
      />

      <TextWichita style={styles.sectionTitle}>Serviço</TextWichita>
      <TextInput
        style={styles.input}
        placeholder="Digite o serviço"
        placeholderTextColor="#666"
        value={serviceInput}
        onChangeText={setServiceInput}
      />

      <TextWichita style={styles.sectionTitle}>Horário</TextWichita>
      <View style={styles.row}>
        {horarios.map((h) => {
          const isUnavailable = unavailableHours.includes(h);
          const isSelected = selectedHour === h;

          return (
            <TouchableOpacity
              key={h}
              onPress={() => !isUnavailable && setSelectedHour(h)}
              style={[
                styles.option,
                {
                  backgroundColor: isSelected
                    ? "#09402C"
                    : isUnavailable
                    ? "#aaa"
                    : "#E65E12",
                },
              ]}
              disabled={isUnavailable}
            >
              <TextWichita style={styles.optionText}>{h}</TextWichita>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={confirmar}
        style={[
          styles.confirmButton,
          { opacity: clientName && serviceInput && selectedHour ? 1 : 0.6 },
        ]}
        disabled={!clientName || !serviceInput || !selectedHour}
      >
        <TextWichita style={styles.confirmText}>
          Confirmar agendamento
        </TextWichita>
      </TouchableOpacity>

      {/* Exemplo de lista de agendamentos */}
      {dataForDay?.appointments.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <TextMinork style={styles.cardTime}>{item.time}</TextMinork>
            <TextWichita style={styles.cardService}>{item.service}</TextWichita>
          </View>
          <TextWichita style={styles.cardClient}>{item.client}</TextWichita>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, backgroundColor: "#f2e5d5", alignItems: "center" },
  title: {
    fontSize: 38,
    color: "#09402C",
    marginBottom: 4,
    marginTop: 30,
  },
  subtitle: { fontSize: 18, color: "#E65E12", marginBottom: 20 },
  calendar: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#ffffffee",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    paddingBottom: 10,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#09402C",
    marginTop: 25,
    marginBottom: 10,
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1.5,
    borderColor: "#09402C",
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: "#ffffffee",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 6,
    borderRadius: 10,
  },
  optionText: { color: "#fff", fontSize: 16 },
  confirmButton: {
    backgroundColor: "#09402C",
    padding: 14,
    borderRadius: 12,
    marginTop: 30,
    width: "100%",
  },
  confirmText: { color: "#fff", textAlign: "center", fontSize: 18 },
  card: {
    width: "100%",
    backgroundColor: "#ffffffee",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardTime: { fontSize: 16, color: "#09402C" },
  cardService: { fontSize: 16, color: "#E65E12" },
  cardClient: { fontSize: 16, color: "#09402C" },
});
