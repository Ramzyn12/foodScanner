import { View, Text, Pressable } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import ArrowRight from "../../svgs/ArrowRight";
import GreenIvyOne from "../../svgs/GreenIvyOne";
import GreenIvyTwo from "../../svgs/GreenIvyTwo";
import GreenIvyThree from "../../svgs/GreenIvyThree";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";


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


const ProBanner = () => {
  const navigation = useNavigation();
  const {theme} = useColourTheme()

  return (
    <Pressable
      onPress={() => navigation.navigate("Paywall")}
      style={{
        width: "100%",
        height: 93,
        flexDirection: "row",
        gap: 16,
        backgroundColor: themedColours.tertiaryBackground[theme],
        borderRadius: 12,
        alignItems: "center",
        paddingHorizontal: 40,
        overflow: "hidden",
      }}
    >
      {/* <View
        style={{
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 6,
          backgroundColor: COLOURS.greatFoodBackground,
        }}
      >
        <Text
          style={{
            color: COLOURS.greatFoodText,
            fontSize: 11,
            fontFamily: "Mulish_700Bold",
          }}
        >
          PRO
        </Text>
      </View> */}
      <View style={{ gap: 8, flex: 1 }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
          <Text
          style={{
            fontSize: 19,
            fontFamily: "Mulish_700Bold",
            color: themedColours.primaryText[theme],
          }}
        >
          Ivy
        </Text>
        <LinearGradient
          colors={["#0B5253", "#19999C"]}
          start={start}
          end={end}
          style={{paddingHorizontal: 10, paddingVertical: 6, borderRadius:6 }}
        >
          <Text style={{fontSize: 14, fontFamily: 'Mulish_700Bold', color: 'white'}}>Pro</Text>
        </LinearGradient>
        </View>
        
        <Text style={{ fontSize: 14, fontFamily: "Mulish_400Regular", color: themedColours.primaryText[theme] }}>
          Plans and benefits of going Pro
        </Text>
      </View>
      <ArrowRight color={themedColours.primaryText[theme]} />
      <GreenIvyOne />
      <GreenIvyTwo />
      <GreenIvyThree />
    </Pressable>
  );
};

export default ProBanner;
