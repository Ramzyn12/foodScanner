import { View, Text, Pressable } from "react-native";
import React from "react";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";
import { LinearGradient } from "expo-linear-gradient";

const angle = 109;
const angleRad = (Math.PI * angle) / 180;
const start = {
  x: 0.5 - Math.sin(angleRad) / 2,
  y: 0.5 + Math.cos(angleRad) / 2,
};
const end = {
  x: 0.5 + Math.sin(angleRad) / 2,
  y: 0.5 - Math.cos(angleRad) / 2,
};

const StartTrialPrompt = ({ onPress, onScroll, yearlyPrice }) => {
  const { theme } = useColourTheme();

  return (
    <View
      style={{
        padding: 20,
        borderRadius: 12,
        backgroundColor: themedColours.tertiaryBackground[theme],
      }}
    >
      <Text
        style={{
          color: themedColours.primaryText[theme],
          fontSize: 20,
          fontFamily: "Mulish_700Bold",
        }}
      >
        Everything you need to thrive
      </Text>
      <Text
        style={{
          color: themedColours.primaryText[theme],
          fontSize: 14,
          fontFamily: "Mulish_500Medium",
          marginTop: 8,
        }}
      >
        {`Free unlimited access for 7 days, then just ${yearlyPrice} per year `}
        <Text style={{fontFamily: 'Mulish_700Bold'}}>(the price of a heavily processed takeaway).</Text>
      </Text>

      <Pressable onPress={onPress}>
        <LinearGradient
          colors={["#0B5253", "#19999C"]}
          start={start}
          end={end}
          style={{
            height: 44,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
              color: "white",
            }}
          >
            Start My Free 7-Day Trial
          </Text>
        </LinearGradient>
      </Pressable>
      <Pressable onPress={onScroll}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            color: themedColours.primary[theme],
            fontFamily: "Mulish_700Bold",
          }}
        >
          Other plans
        </Text>
      </Pressable>
    </View>
  );
};

export default StartTrialPrompt;
