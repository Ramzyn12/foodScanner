import { View, Text, StyleSheet } from "react-native";
import React from "react";
import TimelineEvent from "../components/health/TimelineEvent";
import { ScrollView } from "react-native";

const Health = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.line}></View>
      {/* Events */}
      <TimelineEvent unlocked={true} />
      <TimelineEvent />
      <TimelineEvent />
      <TimelineEvent />
      <TimelineEvent />
    </ScrollView>
  );
};

export default Health;

const styles = StyleSheet.create({
  line: {
    width: 4,
    flex: 1,
    position: "absolute",
    backgroundColor: "#EEEEEE",
    left: 60,
    top: '-50%',
    height: "200%",
  },
});
