import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TextMinork } from "./TextCustom";

interface EditAppointmentModalProps {
  visible: boolean;
  appointment: any;
  onClose: () => void;
  onSave: (updated: any) => void;
  onDelete: () => void;
}

export function EditAppointmentModal({
  visible,
  appointment,
  onClose,
  onSave,
  onDelete,
}: EditAppointmentModalProps) {
  const [service, setService] = useState(appointment.service);
  const [time, setTime] = useState(appointment.time);
  const [client, setClient] = useState(appointment.client);

  useEffect(() => {
    setService(appointment.service);
    setTime(appointment.time);
    setClient(appointment.client);
  }, [appointment]);

  const handleSave = () => {
    if (!service || !time || !client) {
      Alert.alert("Atenção", "Todos os campos devem ser preenchidos!");
      return;
    }

    onSave({
      ...appointment,
      service,
      time,
      client,
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Deletar compromisso",
      "Tem certeza que deseja deletar este compromisso?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Deletar", style: "destructive", onPress: onDelete },
      ]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TextMinork style={styles.title}>Editar Compromisso</TextMinork>

          <TextInput
            style={styles.input}
            placeholder="Serviço"
            value={service}
            onChangeText={setService}
          />
          <TextInput
            style={styles.input}
            placeholder="Horário"
            value={time}
            onChangeText={setTime}
          />
          <TextInput
            style={styles.input}
            placeholder="Cliente"
            value={client}
            onChangeText={setClient}
          />

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Ionicons name="checkmark" size={20} color="#fff" />
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Ionicons name="trash" size={20} color="#fff" />
              <Text style={styles.buttonText}>Deletar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={28} color="#09402C" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: "#ffffffee",
    borderRadius: 16,
    padding: 20,
    position: "relative",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#09402C",
    textAlign: "center",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#09402C",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 12,
    backgroundColor: "#ffffffee",
    color: "#222",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  saveButton: { backgroundColor: "#09402C" },
  deleteButton: { backgroundColor: "#D94814" },
  buttonText: { color: "#fff", marginLeft: 6, fontWeight: "bold" },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
  },
});
