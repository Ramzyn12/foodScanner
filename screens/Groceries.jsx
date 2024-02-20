import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AddToBasketIcon from "../svgs/AddToBasketIcon";
import COLOURS from "../constants/colours";
import EmptyGroceries from "../components/groceries/EmptyGroceries";
import { Path, Svg } from "react-native-svg";
import SortButton from "../components/groceries/SortButton";
import FilterButton from "../components/groceries/FilterButton";
import ShareList from "../components/groceries/ShareListButton";
import UnmarkButton from "../components/groceries/UnmarkButton";
import GroceryList from "../components/groceries/GroceryList";
const Groceries = ({ navigation }) => {
  const groceries = [];
  const [showSortOptions, setShowSortOptions] = useState(false);

  const handleAddFirstItem = () => {
    navigation.navigate("ScanStack");
  };

  const handleShowSortOptions = () => {
    setShowSortOptions(curr => !curr);
    //Remove all the others
  }


  const [showUnmark, setShowUnmark] = useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: "white",
        position: "relative",
      }}
    >
      {false && <EmptyGroceries onPress={handleAddFirstItem} />}
      <View>
        {/* Top actions */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            justifyContent: "space-between",
            paddingVertical: 15,
          }}
        >
          <Text
            style={{
              color: COLOURS.darkGreen,
              fontSize: 14,
              fontFamily: "Mulish_600SemiBold",
            }}
          >
            Edit
          </Text>
          <Text
            style={{
              color: COLOURS.nearBlack,
              fontSize: 16,
              fontFamily: "Mulish_700Bold",
            }}
          >
            Groceries
          </Text>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <Path
              d="M9.75 1C9.75 0.585786 9.41421 0.25 9 0.25C8.58579 0.25 8.25 0.585786 8.25 1L8.25 8.25H1C0.585786 8.25 0.25 8.58579 0.25 9C0.25 9.41421 0.585786 9.75 1 9.75H8.25V17C8.25 17.4142 8.58579 17.75 9 17.75C9.41421 17.75 9.75 17.4142 9.75 17V9.75H17C17.4142 9.75 17.75 9.41421 17.75 9C17.75 8.58579 17.4142 8.25 17 8.25H9.75L9.75 1Z"
              fill="#1F2C35"
            />
          </Svg>
        </View>
        {/* Buttons */}
        <ScrollView
          horizontal={true}
          scrollEnabled={showUnmark}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonsContainer}
        >
          <SortButton onPress={handleShowSortOptions} />
          <FilterButton />
          {showUnmark && <UnmarkButton />}
          <ShareList />
        </ScrollView>
        <GroceryList />
      </View>
      {showSortOptions && <Pressable onPress={() => setShowSortOptions(false)} style={styles.modalOverlay}>
        <View style={{position: 'absolute', bottom: 0, backgroundColor: 'white', width: '100%'}}>
          <Pressable onPress={() =>  console.log('sort pressed')} style={{padding: 15, borderWidth: 1}}>
            <Text>Manual</Text>
          </Pressable>
          <Pressable onPress={() =>  console.log('sort pressed')} style={{padding: 15, borderWidth: 1}}>
            <Text>Manual</Text>
          </Pressable>
          <Pressable onPress={() =>  console.log('sort pressed')} style={{padding: 15, borderWidth: 1}}>
            <Text>Manual</Text>
          </Pressable>
      
        </View>
      </Pressable>}
    </SafeAreaView>
  );
};

export default Groceries;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 4,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.lightGray,
    overflow: "hidden",
    width: "100%",
  },
  modalOverlay: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    opacity: 0.8,
    backgroundColor: COLOURS.lightGray,
  },
});
