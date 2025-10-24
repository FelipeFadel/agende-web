import { TextMinork, TextWichita } from "@/components/TextCustom";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

const dayNames = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];

function getWeekDays() {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return {
      key: date.toISOString().split("T")[0], // yyyy-mm-dd
      day: date.getDate(),
      weekDay: dayNames[date.getDay()],
    };
  });
}

export function WeekSelector({
  selectedDay,
  onSelect,
}: {
  selectedDay: string;
  onSelect: (date: string) => void;
}) {
  const days = getWeekDays();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {days.map((d) => {
        const isSelected = selectedDay === d.key;
        return (
          <TouchableOpacity
            key={d.key}
            onPress={() => onSelect(d.key)}
            style={[styles.day, isSelected && styles.daySelected]}
          >
            <TextMinork
              style={[styles.dayNumber, isSelected && { color: "#fff" }]}
            >
              {d.day}
            </TextMinork>
            <TextWichita
              style={[styles.dayName, isSelected && { color: "#fff" }]}
            >
              {d.weekDay}
            </TextWichita>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 80,
    marginBottom: 20,
  },
  day: {
    width: 50,
    height: 70,
    borderRadius: 12,
    backgroundColor: "#ffffffcc",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  daySelected: {
    backgroundColor: "#09402C",
  },
  dayNumber: {
    fontSize: 20,
    color: "#09402C",
  },
  dayName: {
    fontSize: 14,
    color: "#09402C",
  },
});
