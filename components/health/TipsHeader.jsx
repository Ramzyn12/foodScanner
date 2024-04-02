import { View, Text, Pressable } from "react-native";
import React, { useRef } from "react";
import Shuttle from "../../svgs/Shuttle";
import ShareIcon from "../../svgs/ShareIcon";
import ArrowDown from "../../svgs/ArrowDown";
import { StyleSheet } from "react-native";
import COLOURS from "../../constants/colours";
import ViewShot from "react-native-view-shot"; // Import ViewShot
import Share from "react-native-share"; // Import Share

const TipsHeader = ({
  handleScrollToStart,
  cardHeight,
  cardWidth,
  numItems,
}) => {
  const viewShotRef = useRef(null); // Create a ref for the ViewShot

  const shareAchievement = () => {
    viewShotRef.current.capture().then((uri) => {
      Share.open({
        message: 'New Ivy App Achievement!',
        url: `file://${uri}`,
        type: "image/png",
      }).catch((error) => {
        console.log(error);
      });
    });
  };

  return (
    <View
      style={[
        styles.headerContainer,
        { height: cardHeight, width: cardWidth - 50 },
      ]}
    >
      <ViewShot
        style={{ alignItems: "center", gap: 40, justifyContent: "center" }}
        ref={viewShotRef}
        options={{ format: "png", quality: 0.8 }}
      >
        <View style={{ gap: 14 }}>
          <Text style={styles.headerTitle}>Fresh Start</Text>
          <Text style={{ textAlign: "center" }}>
            Embark on a journey toward health, feeling empowered and motivated.
          </Text>
        </View>

        <View style={styles.headerIconContainer}>
          <Shuttle size={100} colour={"white"} />
        </View>
      </ViewShot>
      {/* Buttons */}
      <View style={styles.headerButtonsContainer}>
        <Pressable onPress={shareAchievement} style={styles.headerShareButton}>
          <ShareIcon colour={"#F7F6EF"} size={13} />
          <Text style={styles.headerShareButtonText}>Share achievement</Text>
        </Pressable>
        <Pressable
          onPress={handleScrollToStart}
          style={styles.headerViewButton}
        >
          <Text style={styles.headerViewButtonText}>View {numItems} tips</Text>
          <ArrowDown />
        </Pressable>
      </View>
    </View>
  );
};

export default TipsHeader;

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    gap: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: "Mulish_700Bold",
    fontSize: 34,
    textAlign: "center",
  },
  headerIconContainer: {
    width: 185,
    height: 185,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOURS.darkGreen,
    borderRadius: 40,
    shadowColor: "#00484A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  headerButtonsContainer: { width: "100%", gap: 14 },
  headerShareButton: {
    width: "100%",
    backgroundColor: COLOURS.nearBlack,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    borderRadius: 12,
  },
  headerShareButtonText: {
    fontSize: 14,
    color: "#F7F6EF",
    fontFamily: "Mulish_600SemiBold",
  },
  headerViewButton: {
    width: "100%",
    backgroundColor: "#FFF",
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLOURS.lightGray,
  },
  headerViewButtonText: {
    fontSize: 14,
    color: COLOURS.nearBlack,
    fontFamily: "Mulish_600SemiBold",
  },
});
