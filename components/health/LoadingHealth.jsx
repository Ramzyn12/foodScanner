import { View, Text, ScrollView } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import COLOURS from "../../constants/colours";
import { ViewBase } from "react-native";

const FakeEventCard = ({ week }) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginRight: -1 }}>
        <Text
          style={{
            fontSize: 11,
            fontFamily: "Mulish_800ExtraBold",
            color: COLOURS.nearBlack,
          }}
        >
          week
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Mulish_700Bold",
            color: COLOURS.nearBlack,
          }}
        >
          {week}
        </Text>
      </View>

      {/* Green Dot */}
      <View style={styles.circle}></View>

      <View
        style={{
          flex: 1,
          height: 150,
          backgroundColor: "#F5F5F5",
          borderRadius: 20,
        }}
      />
    </View>
  );
};

const LoadingHealth = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.line}></View>
      <FakeEventCard week={1} />
      <FakeEventCard week={2} />
      <FakeEventCard week={3} />
      <FakeEventCard week={4} />
      <FakeEventCard week={5} />
    </ScrollView>
  );
};

export default LoadingHealth;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    padding: 20,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: COLOURS.darkGreen,
  },
  line: {
    width: 4,
    flex: 1,
    position: "absolute",
    backgroundColor: "#EEEEEE",
    left: 67,
    top: "-50%",
    height: "200%",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: COLOURS.darkGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    borderRadius: 20,
    flexGrow: 1,
    backgroundColor: COLOURS.lightGreen,
    padding: 14,
  },
  tipsTextContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
});
