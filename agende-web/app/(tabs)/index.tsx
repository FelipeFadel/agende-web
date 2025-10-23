import { TextMinork, TextWichita } from "@/components/TextCustom";
import MOCK_DATA from "@/mocks/MOCK_DATA.json";
import { FlatList, StyleSheet, View } from "react-native";

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

export default function TabOneScreen() {
  const today = getFormattedDate();
  const key = new Date().toISOString().split("T")[0];
  const todayData = MOCK_DATA.find((d) => d.date === key);
  const appointments = todayData?.appointments || [];

  return (
    <View style={styles.container}>
      <TextMinork style={styles.title}>Compromissos</TextMinork>
      <TextWichita style={styles.subtitle}>-- {today} --</TextWichita>

      <View style={styles.separator} />

      {appointments.length > 0 ? (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TextMinork style={styles.cardTime}>{item.time}</TextMinork>
              <TextWichita style={styles.cardClient}>{item.client}</TextWichita>
              <TextWichita style={styles.cardService}>
                {item.service}
              </TextWichita>
            </View>
          )}
        />
      ) : (
        <TextWichita>Nenhum compromisso hoje!</TextWichita>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 40 },
  title: { fontSize: 50 },
  subtitle: { fontSize: 30, marginTop: -10 },
  separator: { width: "80%", height: 1, marginVertical: 20 },
  card: {
    width: "90%",
    padding: 16,
    backgroundColor: "#f8f1ff",
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTime: { fontSize: 18, fontWeight: "bold" },
  cardClient: { fontSize: 20, fontWeight: "600" },
  cardService: { fontSize: 16, color: "#555" },
});
