import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import FoodListItem from "../FoodListItem";
import GroceryListItem from "./GroceryListItem";
import { BlurView } from "expo-blur";
const GroceryList = () => {
  const dummyItem = {
    brand: "Tesco",
    name: "sweet potato",
    image_url:
      "https://img.freepik.com/free-photo/sweet-potato_144627-20748.jpg?w=2000&t=st=1708436069~exp=1708436669~hmac=d5806ccc5e3e06c555d0549193a77a804c4abdba921bada59b1375174593f0ca",
  };

  return (
    // MAybe use flatlist instead
    //Remove scroll if dropdown
    <ScrollView contentContainerStyle={{paddingBottom: 120}}>
      {/* List ITem*/}
      <GroceryListItem />
      <GroceryListItem />
      {/* <BlurView intensity={80} tint="light" style={styles.dropdownContainer}>
        <Text style={{width: '100%', flex: 1, backgroundColor: '#F5F5F5'}}>Item</Text>
      </BlurView> */}
    </ScrollView>
  );
};

export default GroceryList;

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,

  },
  dropdownContainer: {
    width: '100%',
    top: 0,
    zIndex: 4000,
    position: 'absolute',
    height: 100,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 12,
    shadowOpacity: 0.5,
    shadowOffset: 20,
    
  },
  unChecked: {
    width: 30,
    height: 30,
    marginLeft: 15,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: COLOURS.lightGray,
    borderRadius: 6,
  },
  foodItemContainer: {
    borderBottomWidth: 1,
    flex: 1,
    borderBottomColor: COLOURS.lightGray,
    width: "100%",
    paddingRight: 15,
    paddingVertical: 2,
  },
});
