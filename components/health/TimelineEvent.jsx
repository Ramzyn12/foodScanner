import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import { Path, Svg } from "react-native-svg";
import Shuttle from "../../svgs/Shuttle";
import ArrowRight from "../../svgs/ArrowRight";
import TimerCircle from "../../svgs/TimerCircle";
import { useNavigation } from "@react-navigation/native";

const TimelineEvent = ({ unlocked }) => {

  const navigation = useNavigation()

  return (
    <Pressable onPress={() => navigation.navigate('UnlockedDetails')} style={styles.container}>
      {/* Tick */}
      {unlocked && (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 19.1667C15.0627 19.1667 19.1667 15.0626 19.1667 10C19.1667 4.9374 15.0627 0.833344 10 0.833344C4.93743 0.833344 0.833374 4.9374 0.833374 10C0.833374 15.0626 4.93743 19.1667 10 19.1667ZM15.0956 7.70859C15.3489 7.42571 15.3248 6.99107 15.042 6.7378C14.7591 6.48453 14.3244 6.50854 14.0712 6.79143L10.9828 10.241C10.3569 10.94 9.9355 11.4083 9.57518 11.7111C9.23193 11.9996 9.03033 12.0625 8.85421 12.0625C8.67809 12.0625 8.47648 11.9996 8.13323 11.7111C7.77291 11.4083 7.35146 10.94 6.72566 10.241L5.92892 9.35109C5.67565 9.06821 5.24101 9.0442 4.95813 9.29746C4.67524 9.55073 4.65123 9.98537 4.9045 10.2683L5.73528 11.1962C6.31814 11.8473 6.8043 12.3903 7.24853 12.7637C7.71845 13.1587 8.22531 13.4375 8.85421 13.4375C9.48311 13.4375 9.98997 13.1587 10.4599 12.7637C10.9041 12.3903 11.3903 11.8473 11.9731 11.1962L15.0956 7.70859Z"
            fill="#126668"
          />
        </Svg>
      )}
      {!unlocked && (
        // If Day > 100, MarginRight: -9
        <View style={{alignItems: 'center', marginRight: -1}}>
          <Text style={{fontSize: 11, fontFamily: 'Mulish_700Bold'}}>Day</Text>
          <Text style={{fontSize: 16, fontFamily: 'Mulish_600SemiBold'}}>6</Text>
        </View>
      )}
      <View style={styles.circle}></View>
      {/* Card container */}
      <View
        style={[
          styles.cardContainer,
          { backgroundColor: unlocked ? COLOURS.lightGreen : "white" },
          { borderWidth: unlocked ? 0 : 1, borderColor: COLOURS.lightGray },
        ]}
      >
        {/* Icon */}
        <View style={{ flexDirection: "row", gap: 14 }}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: unlocked ? COLOURS.darkGreen : "white" },
              { borderWidth: unlocked ? 0 : 1, borderColor: COLOURS.lightGray },
            ]}
          >
            <Shuttle colour={unlocked ? "white" : COLOURS.darkGreen} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 8, fontFamily: "Mulish_600SemiBold" }}>
              Fresh Start
            </Text>
            <Text style={{ marginBottom: 14, fontFamily: "Mulish_400Regular" }}>
              Embark on a journey toward health, feeling empowered and
              motivated.
            </Text>
            {unlocked && (
              <View style={styles.tipsTextContainer}>
                <Text style={{ fontSize: 11, fontFamily: "Mulish_700Bold" }}>
                  5 tips available
                </Text>
              </View>
            )}
          </View>
          <ArrowRight />
        </View>
        {!unlocked && (
          <View
            style={{
              backgroundColor: COLOURS.lightGreen,
              flexDirection: "row",
              gap: 8,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              paddingVertical: 8,
            }}
          >
            <TimerCircle />
            <Text style={{ fontSize: 14, fontFamily: "Mulish_600SemiBold" }}>
              Unlock In 10 Days
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default TimelineEvent;

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
