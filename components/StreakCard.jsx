import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Svg, { G, Path, ClipPath, Rect, Defs } from "react-native-svg";
import COLOURS from '../constants/colours'


const StreakCard = () => {

  return (
    <View style={styles.streakCardContainer}>
      <Text style={styles.streakCardText}>You're on a streak! Keep going.</Text>
      <View style={styles.streakCardNumbersContainer}>
        {/* [[day], [day-1] ...] */}
        <Text style={styles.streakCardNumber}>23</Text>
        <Text style={styles.streakCardNumber}>24</Text>
        <Text style={styles.streakCardNumber}>25</Text>
        <Text style={[styles.streakCardNumber, styles.streakCardNumberCurrent]}>
          26
        </Text>
        <Text style={styles.streakCardNumber}>27</Text>
        <Text style={styles.streakCardNumber}>28</Text>
        <Text style={styles.streakCardNumber}>29</Text>
      </View>
      <Svg
        style={styles.streakCardSvg}
        width="146"
        height="114"
        viewBox="0 0 146 114"
        fill="none"
      >
        <G clipPath="url(#clip0_229_397)">
          <Path
            d="M-49.6505 149.231C-35.7808 141.809 -20.0605 133.398 -0.421074 108.6C19.2188 83.8006 23.8057 66.5708 27.8529 51.3693C31.6803 36.9934 34.9855 24.5777 50.2467 5.30771C65.5081 -13.9626 76.8364 -20.0244 89.9529 -27.0431C93.7924 -29.0979 97.3442 -33.9578 97.886 -37.8987C98.4277 -41.8397 95.755 -43.3694 91.9155 -41.3145C78.0455 -33.8924 62.3246 -25.4803 42.6845 -0.681257C23.0445 24.1178 18.4576 41.3476 14.4106 56.5492C10.5832 70.9251 7.27795 83.3409 -7.98321 102.611C-23.2441 121.88 -34.5713 127.941 -47.6876 134.959C-51.5268 137.014 -55.0788 141.874 -55.6208 145.815C-56.1629 149.756 -53.4897 151.286 -49.6505 149.231Z"
            fill="white"
            fillOpacity={0.04}
          />
          <Path
            d="M-70.3318 132.852C-56.4622 125.431 -40.7421 117.02 -21.1024 92.2209C-1.46231 67.4218 3.12463 50.192 7.17161 34.9904C10.999 20.6145 14.3039 8.19912 29.5654 -11.0712C44.8263 -30.3408 56.1544 -36.4027 69.2716 -43.422C73.1115 -45.4765 76.6624 -50.3365 77.2041 -54.2775C77.7462 -58.2188 75.0722 -59.7476 71.2332 -57.693C57.363 -50.271 41.6427 -41.8585 22.0033 -17.0602C2.36321 7.73889 -2.22372 24.9687 -6.2707 40.1703C-10.0981 54.5462 -13.4033 66.9619 -28.6645 86.2319C-43.9251 105.501 -55.2526 111.562 -68.3689 118.58C-72.2083 120.635 -75.7604 125.495 -76.3021 129.436C-76.8442 133.377 -74.171 134.907 -70.3318 132.852Z"
            fill="white"
            fillOpacity={0.04}
          />
          <Path
            d="M112.597 -24.9356C98.7265 -17.5135 83.0056 -9.1014 63.3656 15.6977C43.7255 40.4968 39.1386 57.7265 35.0916 72.9282C31.2642 87.3041 27.959 99.7198 12.6978 118.99C-2.56217 138.258 -13.89 144.32 -27.0059 151.338L-27.0069 151.339C-30.8457 153.393 -34.3972 158.253 -34.9396 162.194C-35.4814 166.135 -32.8082 167.664 -28.969 165.61C-15.0991 158.188 0.621083 149.776 20.26 124.979C39.9 100.18 44.4869 82.9499 48.5339 67.7482C52.3613 53.3723 55.6665 40.9566 70.9277 21.6867C86.1892 2.41631 97.5175 -3.64543 110.634 -10.6641C114.473 -12.7189 118.025 -17.5789 118.567 -21.5198C119.109 -25.4608 116.436 -26.9904 112.597 -24.9356Z"
            fill="white"
            fillOpacity={0.04}
          />
        </G>
        <Defs>
          <ClipPath id="clip0_229_397">
            <Rect
              width="243.916"
              height="123.474"
              fill="white"
              transform="translate(-102.982 111.235) rotate(-51.6219)"
            />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
};

export default StreakCard;

const styles = StyleSheet.create({
  streakCardContainer: {
    backgroundColor: COLOURS.darkGreen,
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 25,
    gap: 10,
    borderRadius: 20,
    position: "relative",
  },
  streakCardNumbersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakCardText: {
    fontFamily: "Mulish_500Medium",
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  streakCardNumber: {
    color: "#FFFFFF",
    fontFamily: "Mulish_500Medium",
    opacity: 0.5,
    fontSize: 19,
  },
  streakCardNumberCurrent: {
    fontSize: 40,
    fontFamily: "Mulish_700Bold",
    color: "#FFFFFF",
    opacity: 1,
  },
  streakCardSvg: {
    position: "absolute",
    left: 0, // adjust as needed
  },
})