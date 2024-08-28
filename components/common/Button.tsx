//React
import { adjustColorBrightness } from "@/Service";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";

interface ButtonProps {
    icon: React.ReactNode;
    title: string;
    color: string;
    hovercolor: string;
    borderradius: number;
    onPress: () => void;
    fontColor: string;
    small?: boolean;
    disabled?: boolean;
    borderColor?: string;
}

const Button: React.FC<ButtonProps> = ({ icon, title, color, hovercolor, borderradius, onPress, fontColor, small, disabled, borderColor }) => {

  return (
    <>
    <View
      style={[
        { backgroundColor: disabled ? adjustColorBrightness(color, -0.15) : color,  width: small ? "100%" : "80%", borderRadius: 10},
        styles.container,
      ]}
    >
      <TouchableNativeFeedback
        onPress={() => {
          onPress();
        }}
        background={TouchableNativeFeedback.Ripple(hovercolor, false)}
        style={{ height: "100%", width: "100%", zIndex: 10000}}
        disabled={disabled}
      >
        <View style={[styles.touchable,{borderColor: borderColor ? borderColor : "rgba(0,0,0,0)", borderWidth: 2}]}>
          <Text style={[{ color: fontColor }, styles.title]}>{title}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
    </>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    zIndex: 10,
    borderRadius: 10,
    overflow: "hidden"
  },
  container2: {
    height: 10,
    width: "75%",
    overflow: "hidden",
    alignSelf: "center",
    position: "relative"
  },
  title: {
    fontSize: 15,
    fontFamily: "PoppinsMedium",
    zIndex: 6,
    marginTop: 3,
  },
  touchable: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 10,
  },
});