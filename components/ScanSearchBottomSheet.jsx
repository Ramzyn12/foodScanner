import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import COLOURS from "../constants/colours";
import { useReducedMotion } from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";
import SearchBar from "./SearchBar";
import FoodListItem from "./FoodListItem";
import { useNavigation } from "@react-navigation/native";

const ScanSearchBottomSheet = () => {
  const navigation = useNavigation();

  const bottomSheetRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const snapPoints = useMemo(() => ["20%", "50%", "90%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      animateOnMount={!reducedMotion}
      snapPoints={snapPoints}
      keyboardBehavior="extend"
      // handleStyle={{ display: "none" }}
      style={styles.contentContainer}
    >
      {/* <BottomSheetView > */}
      <BottomSheetView style={styles.containerHeader}>
        <Text style={{ fontFamily: "Mulish_700Bold", fontSize: 28 }}>
          Search
        </Text>
        <Pressable
          onPress={() => navigation.navigate("MainTabsStack")}
          style={styles.exitButtonContainer}
        >
          <Svg width="14" height="14" viewBox="0 0 8 8" fill="none">
            <Path
              d="M7.52985 0.967342C7.66715 0.830049 7.66715 0.607451 7.52985 0.470158C7.39256 0.332864 7.16996 0.332864 7.03267 0.470158L4.00001 3.50282L0.967342 0.470159C0.830049 0.332865 0.607451 0.332865 0.470158 0.470159C0.332864 0.607453 0.332864 0.83005 0.470158 0.967344L3.50282 4.00001L0.47017 7.03266C0.332877 7.16995 0.332877 7.39255 0.47017 7.52984C0.607464 7.66714 0.830061 7.66714 0.967355 7.52984L4.00001 4.49719L7.03266 7.52984C7.16995 7.66714 7.39255 7.66714 7.52984 7.52984C7.66714 7.39255 7.66714 7.16995 7.52984 7.03266L4.49719 4.00001L7.52985 0.967342Z"
              fill={COLOURS.tabUnselected}
            />
          </Svg>
        </Pressable>
      </BottomSheetView>
      {/* Search bar */}
      <SearchBar />
      <Text style={styles.recentText}>Recent</Text>
      <BottomSheetScrollView onScrollEndDrag={Keyboard.dismiss}>
        <BottomSheetView style={styles.foodListContainer}>
          <View style={styles.foodListItemContainer}>
            <FoodListItem foodName={"Apple"} foodSupplier={"Tesco"} />
          </View>
          <View style={styles.foodListItemContainer}>
            <FoodListItem foodName={"Apple"} foodSupplier={"Tesco"} />
          </View>
          <View style={styles.foodListItemContainer}>
            <FoodListItem foodName={"Apple"} foodSupplier={"Tesco"} />
          </View>
        </BottomSheetView>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default ScanSearchBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 18,
  },
  exitButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 40,
    backgroundColor: "#E9E9EB", //One off colour
    alignItems: "center",
    justifyContent: "center",
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  foodListContainer: {
    borderTopWidth: 1,
    borderTopColor: COLOURS.lightGray,
    marginBottom: 80,
  },
  foodListItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.lightGray,
    paddingVertical: 2,
  },
  recentText: { fontSize: 16, paddingBottom: 10, fontFamily: "Mulish_700Bold" },
});
