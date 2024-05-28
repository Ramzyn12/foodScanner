import { View, Text, Pressable } from "react-native";
import React from "react";
import ArrowLeft from "../../svgs/ArrowLeft";
import COLOURS from "../../constants/colours";
import { useNavigation } from "@react-navigation/native";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const OverviewHeader = ({ week, title, day, onSave, notes }) => {
  const navigation = useNavigation();

  const handleGoback = () => {
    navigation.goBack()
    // if (onSave && notes) {
    //   onSave()
    // }
  }
  const {theme} = useColourTheme()

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        marginTop: 10,
        paddingBottom: 10,
      }}
    >
      <Pressable
        hitSlop={40}
        onPress={handleGoback}
        style={{ position: "absolute", left: 25, zIndex: 40000, top: 10 }}
      >
        <ArrowLeft color={themedColours.primaryText[theme]} width={5.5} height={11.5} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 11,
            textAlign: "center",
            fontFamily: "Mulish_800ExtraBold",
            color: themedColours.primary[theme],
          }}
        >
          {week ? "WEEK" : "DAY"} {week ? week : day}
        </Text>
        <Text
          style={{
            fontSize: 19,
            textAlign: "center",
            fontFamily: "Mulish_700Bold",
            color: themedColours.primaryText[theme],
          }}
        >
          {title}
        </Text>
      </View>
      {day && (
        <Pressable hitSlop={40} onPress={onSave}>
          <Text
            style={{
              paddingRight: 20,
              marginLeft: -45,
              fontSize: 16,
              textAlign: "center",
              fontFamily: "Mulish_700Bold",
              color: themedColours.primary[theme],
            }}
          >
            Save
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default OverviewHeader;
