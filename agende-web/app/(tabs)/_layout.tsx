import { useColorScheme } from "@/components/useColorScheme";
import { Icon } from "@rneui/base";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#E65E12", // Ícone ativo
        tabBarInactiveTintColor: "rgba(0,0,0,0.3)", // Ícone inativo cinza e esmaecido
        tabBarStyle: {
          backgroundColor: "#ecdeccff",
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 16,
        },
      }}
    >
      {/* Aba Dia */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Dia",
          tabBarIcon: ({ color }) => (
            <Icon
              name="calendar-today"
              type="material"
              color={color}
              size={26}
            />
          ),
        }}
      />

      {/* Aba Mês */}
      <Tabs.Screen
        name="two"
        options={{
          title: "Mês",
          tabBarIcon: ({ color }) => (
            <Icon
              name="calendar-month"
              type="material-community"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tabs>
  );
}
