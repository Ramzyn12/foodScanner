import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import Shuttle from "../../svgs/Shuttle";
import ArrowRight from "../../svgs/ArrowRight";
import TimerCircle from "../../svgs/TimerCircle";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import WeekOverviewLines from "../WeeklyOverview/WeekOverviewLines";

const TimelineEventCard = ({ unlocked, data, destination }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(destination)}
      style={[
        styles.cardContainer,
        { backgroundColor: unlocked ? COLOURS.lightGreen : "white" },
        { borderWidth: unlocked ? 0 : 1, borderColor: COLOURS.lightGray },
      ]}
    >
      {/* Top Section when locked */}
      <View style={styles.cardTopContainer}>
        
        {/* Icon (Shown if locked) */}
        {!unlocked && (
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: unlocked ? COLOURS.darkGreen : "white" },
              { borderWidth: unlocked ? 0 : 1, borderColor: COLOURS.lightGray },
            ]}
          >
            <SvgXml
              width={"100%"}
              height={"100%"}
              xml={data?.svg.replaceAll(
                "white",
                unlocked ? "white" : COLOURS.darkGreen
              )}
            />
          </View>
        )}

        {/* Show when both locked and unlocked */}
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 8, fontFamily: "Mulish_700Bold" , fontSize: 16}}>
            {data.title}
          </Text>
          <Text style={{ marginBottom: 14, fontFamily: "Mulish_400Regular", fontSize: 14 }}>
            {data.description}
          </Text>
          {unlocked && (
            <View style={{ paddingBottom: 16 }}>
              <WeekOverviewLines />
            </View>
          )}
          {unlocked && (
            <View style={styles.tipsTextContainer}>
              <Text style={{ fontSize: 11, fontFamily: "Mulish_800ExtraBold" }}>
                5 days remaining
              </Text>
            </View>
          )}
        </View>

        <ArrowRight />

      </View>

      {!unlocked && (
        <View style={styles.cardLockedMessage}>
          <TimerCircle />
          <Text style={{ fontSize: 14, fontFamily: "Mulish_600SemiBold" }}>
            Unlock In 10 Days
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default TimelineEventCard;

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
  iconContainer: {
    width: 60,
    height: 60,
    padding: 18,
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
  cardTopContainer: { flexDirection: "row", gap: 14 },
  tipsTextContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 40,
  },
  cardLockedMessage: {
    backgroundColor: COLOURS.lightGreen,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 8,
  },
});
