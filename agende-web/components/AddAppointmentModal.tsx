import { TextMinork, TextWichita } from "@/components/TextCustom";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function AddAppointmentModal({
  visible,
  onClose,
  onSave,
  selectedDay,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { time: string; client: string; service: string }) => void;
  selectedDay: string;
}) {
  const [time, setTime] = useState("");
  const [client, setClient] = useState("");
  const [service, setService] = useState("");

  function handleSave() {
    if (!time || !client || !service) return;
    onSave({ time, client, service });
    setTime("");
    setClient("");
    setService("");
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TextMinork style={styles.title}>Novo Compromisso</TextMinork>
          <TextWichita style={styles.subtitle}>
            Dia: {selectedDay.split("-").reverse().join("/")}
          </TextWichita>

          <TextInput
            placeholder="Horário (ex: 14:00)"
            value={time}
            onChangeText={setTime}
            style={styles.input}
          />
          <TextInput
            placeholder="Cliente"
            value={client}
            onChangeText={setClient}
            style={styles.input}
          />
          <TextInput
            placeholder="Serviço"
            value={service}
            onChangeText={setService}
            style={styles.input}
          />

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.btn, styles.cancel]}
            >
              <TextWichita style={{ color: "#fff" }}>Cancelar</TextWichita>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={[styles.btn, styles.save]}
            >
              <TextWichita style={{ color: "#fff" }}>Salvar</TextWichita>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    color: "#09402C",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#E65E12",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: "#555",
  },
  save: {
    backgroundColor: "#09402C",
  },
});
