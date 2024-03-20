import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import PotionIcon from "../../svgs/PotionIcon";
import COLOURS from "../../constants/colours";
import DangerTriangle from "../../svgs/DangerTriangle";

const FoodDetailsLesson = ({ additive }) => {
  const angle = 122;
  const angleRad = (Math.PI * angle) / 180;
  const start = {
    x: 0.5 - Math.sin(angleRad) / 2,
    y: 0.5 + Math.cos(angleRad) / 2,
  };
  const end = {
    x: 0.5 + Math.sin(angleRad) / 2,
    y: 0.5 - Math.cos(angleRad) / 2,
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 8, alignItems: 'center' }}>
        <DangerTriangle />
        <Text style={styles.chemicalNameText}>{additive.split(' - ')[1]} ({additive.split(' - ')[0]})</Text>
      </View>

      <Text style={styles.chemicalDescription}>
        Extracted using chemical processes which alter their natural form.
      </Text>
      {/* <Pressable style={styles.lessonButton}>
        <BadgeIcon />
        <Text style={styles.lessonButtonText}>
          Take lesson
        </Text>
      </Pressable> */}
    </View>
  );
};

export default FoodDetailsLesson;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLOURS.lightGray,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 20,
    gap: 12,
  },
  chemicalNameText: { fontFamily: "Mulish_600SemiBold", fontSize: 16 },
  chemicalDescription: { fontFamily: "Mulish_400Regular", fontSize: 14 },
  lessonButton: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    backgroundColor: "white",
    height: 36,
    alignItems: "center",
    borderRadius: 20,
  },
  lessonButtonText: { fontFamily: "Mulish_600SemiBold", fontSize: 15 },
});
