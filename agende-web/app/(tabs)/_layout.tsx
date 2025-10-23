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
      }}
    >
      {/* Aba dia */}
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

      {/* Aba mês */}
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
