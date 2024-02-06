import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Svg, { G, Path, ClipPath, Rect, Defs } from "react-native-svg";
import COLOURS from '../constants/colours'
import Leaf from "../svgs/Leaf";

const TodayScore = () => {

  return (
    <View style={styles.todayScoreContainer}>
      <View style={styles.todayScoreTextContainer}>
        <Text style={styles.todayScoreText}>Todays Score</Text>
        <Svg width="6" height="10" viewBox="0 0 6 10" fill="none">
          <Path
            d="M1.77334 0.389419C1.52818 0.146433 1.13245 0.148198 0.889465 0.393363C0.646479 0.638527 0.648244 1.03425 0.893408 1.27724L2.36255 2.73333C2.95879 3.32428 3.36779 3.73098 3.64455 4.07558C3.91338 4.41033 4.0056 4.62534 4.03015 4.81791C4.04556 4.93882 4.04556 5.06117 4.03015 5.18208C4.0056 5.37465 3.91338 5.58966 3.64455 5.92441C3.3678 6.26901 2.95879 6.67571 2.36255 7.26666L0.893408 8.72275C0.648244 8.96574 0.646479 9.36146 0.889465 9.60663C1.13245 9.85179 1.52818 9.85356 1.77334 9.61057L3.26895 8.12825C3.83226 7.56996 4.29266 7.11367 4.61916 6.70711C4.95868 6.28434 5.20446 5.85522 5.27012 5.34013C5.2989 5.11427 5.2989 4.88572 5.27012 4.65986C5.20446 4.14477 4.95868 3.71565 4.61916 3.29288C4.29265 2.88632 3.83226 2.43003 3.26895 1.87174L1.77334 0.389419Z"
            fill={COLOURS.nearBlack}
          />
        </Svg>
      </View>
      <Text style={styles.todayScoreNumber}>87</Text>
      <Leaf direction={"left"} />
      <Leaf direction={"right"} />
    </View>
  );
};

export default TodayScore;

const styles = StyleSheet.create({
  todayScoreContainer: {
    width: "100%",
    padding: 18,
    position: "relative",
    alignItems: "center",
    borderColor: COLOURS.lightGray,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 8,
  },
  todayScoreTextContainer: {
    textAlign: "center",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  todayScoreText: {
    fontFamily: "Mulish_500Medium",
    color: COLOURS.nearBlack
  },
  todayScoreNumber: {
    fontFamily: "Mulish_700Bold",
    fontSize: 40,
    color: COLOURS.nearBlack
  },
});
