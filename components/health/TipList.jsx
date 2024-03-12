import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import SaladBowl from "../../svgs/SaladBowl";
import Carousel from "react-native-reanimated-carousel";
import { Path, Svg } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import COLOURS from "../../constants/colours";
import Shuttle from "../../svgs/Shuttle";
import ShareIcon from "../../svgs/ShareIcon";
import ArrowDown from "../../svgs/ArrowDown";
import Animated, {
  Easing,
  Extrapolate,
  Extrapolation,
  FadeIn,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import ArrowLeft from "../../svgs/ArrowLeft";
import TipsHeader from "./TipsHeader";
import CurrentIndexLabel from "./CurrentIndexLabel";
import GoToTopButton from "./GoToTopButton";
import TipCard from "./TipCard";

const { height, width } = Dimensions.get("window"); // Get the height of the device screen
const CARD_HEIGHT = height * 0.65; // Set card height to 75% of the screen height
const CARD_MARGIN = 40;

const DATA = new Array(6).fill(null).map((_, index) => ({
  id: String(index),
  text: `Tip #${index}: Choosing to eliminate processed foods from your diet sets the foundation for profound long-term health benefits.`,
}));

const TipList = ({ onSlideChange }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const carouselRef = useRef(null);
  const navigation = useNavigation();
  const scrollY = useSharedValue(0); // Step 2: Use useSharedValue to track scroll position

  // Step 3: Create an animated scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, CARD_HEIGHT / 2], // Adjust these values based on your header height and desired fade effect
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const handleScrollToStart = () => {
    if (currentTipIndex === 0) {
      setCurrentTipIndex(1);
      carouselRef.current.scrollToIndex({ index: 1 });
    } else {
      carouselRef.current.scrollToIndex({ index: 0 });
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentTipIndex(newIndex);
      onSlideChange(newIndex); // Info
    }
  }).current;

  const renderItem = ({ item }) => {
    const headerCard = item.id === "0";
    if (headerCard)
      return (
        <Animated.View style={headerStyle}>
          <TipsHeader
            handleScrollToStart={handleScrollToStart}
            cardWidth={width}
            cardHeight={CARD_HEIGHT}
          />
        </Animated.View>
      );
    //Else
    return (
      <TipCard cardHeight={CARD_HEIGHT} cardMargin={CARD_MARGIN} item={item} />
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Actions */}
      <View style={styles.topActionsContainer}>
        {/* Go Back Button */}
        <Pressable
          onPress={() => navigation.navigate("Health")}
          style={styles.backButtonContainer}
        >
          <ArrowLeft />
        </Pressable>
        {currentTipIndex > 0 && (
          <CurrentIndexLabel currentTipIndex={currentTipIndex} />
        )}
      </View>

      {/* Go To Top Button */}
      {currentTipIndex > 1 && (
        <GoToTopButton handleScrollToStart={handleScrollToStart} />
      )}

      {/* List of tip cards */}
      <Animated.FlatList
        data={DATA}
        renderItem={renderItem}
        onScroll={scrollHandler} // Use the animated scroll handler
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
          waitForInteraction: true,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        ref={carouselRef}
        keyExtractor={(item) => item.id}
        snapToAlignment="start"
        snapToInterval={CARD_HEIGHT + CARD_MARGIN}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        getItemLayout={(data, index) => ({
          length: CARD_HEIGHT + CARD_MARGIN,
          offset: (CARD_HEIGHT + CARD_MARGIN) * index,
          index,
        })}
      />
    </View>
  );
};

export default TipList;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  topActionsContainer: {
    position: "absolute",
    paddingHorizontal: 30,
    top: 10,
    zIndex: 300,
    flexDirection: "row",
    alignItems: "center",
  },
  cardContainer: {
    backgroundColor: "white",
    padding: 40,
    gap: 40,
    width: "95%",
    alignSelf: "center",
    borderRadius: 20,
    height: CARD_HEIGHT,
    marginVertical: CARD_MARGIN / 2,
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F6EF",
    borderRadius: 20,
  },
  contentContainer: {
    alignItems: "center",
    paddingTop: (height - CARD_HEIGHT) / 2 - CARD_MARGIN, // Center the first item
    paddingBottom: (height - CARD_HEIGHT) / 2,
    paddingHorizontal: 30,
  },
  backButtonContainer: {
    backgroundColor: "white",
    width: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    height: 40,
    alignSelf: "flex-start",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
