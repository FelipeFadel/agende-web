import React from "react";
import { Text, TextProps } from "react-native";

type CustomTextProps = TextProps & {
  children: React.ReactNode;
};

export function TextMinork({ style, children, ...props }: CustomTextProps) {
  return (
    <Text {...props} style={[{ fontFamily: "Minork" }, style]}>
      {children}
    </Text>
  );
}

export function TextWichita({ style, children, ...props }: CustomTextProps) {
  return (
    <Text {...props} style={[{ fontFamily: "Wichita" }, style]}>
      {children}
    </Text>
  );
}
