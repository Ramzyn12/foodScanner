import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import BadgeIcon from "../../svgs/BadgeIcon";
import PotionIcon from "../../svgs/PotionIcon";

const FoodDetailsLesson = ({additive}) => {
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
    <LinearGradient
      colors={["#F2E5CC", "#F3D2D2"]}
      start={start}
      end={end}
      style={styles.container}
    >
      <PotionIcon />
      <Text style={styles.chemicalNameText}>
        Carotenoids {additive}
      </Text>
      <Text style={styles.chemicalDescription}>
        Extracted using chemical processes which alter their natural form.
      </Text>
      <Pressable style={styles.lessonButton}>
        <BadgeIcon />
        <Text style={styles.lessonButtonText}>
          Take lesson
        </Text>
      </Pressable>
    </LinearGradient>
  );
};

export default FoodDetailsLesson;

const styles = StyleSheet.create({
  container: {
    width: 290,
    backgroundColor: "blue",
    padding: 25,
    borderRadius: 25,
    gap: 12,
  },
  chemicalNameText: { fontFamily: "Mulish_700Bold", fontSize: 20 },
  chemicalDescription: { fontFamily: "Mulish_500Medium", fontSize: 16 },
  lessonButton: {flexDirection: 'row', gap: 8, justifyContent: 'center', backgroundColor: 'white', height: 36, alignItems: 'center', borderRadius: 20},
  lessonButtonText: { fontFamily: "Mulish_600SemiBold", fontSize: 15 }
})