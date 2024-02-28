import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import COLOURS from "../../constants/colours";
import FoodListItem from "../FoodListItem";
import { Swipeable } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import TickIcon from "../../svgs/TickIcon";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  removeFoodFromGroceryList,
  toggleCheckedState,
} from "../../axiosAPI/groceryAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  addVirtualGroceryItem,
  checkGrocery,
  removeVirtualGroceryItem,
} from "../../redux/grocerySlice";
import Toast from "react-native-toast-message";

const GroceryListItem = ({ foodItem, checked, id, onLongPress, isActive }) => {
  const groceries = useSelector((state) => state.grocery.currentGroceries);
  const grocery = groceries.find((item) => item._id === id);
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const deletionTimerRef = useRef(null);

  const removeFoodMutation = useMutation({
    mutationFn: removeFoodFromGroceryList,
    onSuccess: () => {
      queryClient.invalidateQueries(["Groceries"]);
      // queryClient.invalidateQueries(["DiaryDay"]); //Maybe?
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const toggleMutation = useMutation({
    mutationFn: toggleCheckedState,
    onSuccess: () => {},
    onError: (err) => {
      console.log(err);
    },
  });

  const handleUndo = () => {
    if (deletionTimerRef.current) {
      // Reset Ref
      clearTimeout(deletionTimerRef.current);
      deletionTimerRef.current = null;
    }

    dispatch(addVirtualGroceryItem());
    Toast.hide();
  };

  const handleDeletePress = () => {
    dispatch(removeVirtualGroceryItem(id));

    // Clear any existing timer to ensure we don't have multiple timers running
    if (deletionTimerRef.current) {
      clearTimeout(deletionTimerRef.current);
    }

    // Start a new timer
    deletionTimerRef.current = setTimeout(() => {
      removeFoodMutation.mutate({
        barcode: foodItem?.barcode,
        singleFoodId: foodItem?._id,
      });
    }, 4000); 

    Toast.show({
      type: "groceryToast",
      text1: "Item removed",
      text2: "Undo",
      props: {
        onUndo: handleUndo,
      },
    });
  };

  const handleSelectFood = () => {
    toggleMutation.mutate({ groceryItemId: id });
    dispatch(checkGrocery(id));
  };

  const handleGoToFood = () => {
    navigation.navigate("FoodDetailsGroceries", {
      barcodeId: foodItem?.barcode,
      singleFoodId: foodItem?._id,
    });
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    return (
      <Animated.View style={{ transform: [{ translateX: trans }] }}>
        <TouchableOpacity
          onPress={handleDeletePress}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      // onSwipeableOpen={() => console.log("deleted by drag")}
      rightThreshold={100}
      overshootFriction={8}
      friction={1.5}
      renderRightActions={renderRightActions}
    >
      <View
        style={[styles.listItemContainer, isActive && styles.isActiveStyles]}
      >
        {/* Unchecked */}
        <Pressable onPress={handleSelectFood}>
          <View
            style={[
              styles.unChecked,
              grocery?.checked && { backgroundColor: COLOURS.darkGreen },
            ]}
          >
            {grocery?.checked && <TickIcon />}
          </View>
        </Pressable>
        <Pressable
          onLongPress={onLongPress}
          style={styles.foodItemContainer}
          onPress={handleGoToFood}
          delayLongPress={200}
        >
          <FoodListItem foodSelected={grocery?.checked} foodItem={foodItem} />
        </Pressable>
      </View>
    </Swipeable>
  );
};

export default GroceryListItem;

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    backgroundColor: "white",
  },
  deleteButton: {
    backgroundColor: "#DB1200",
    justifyContent: "center",
    alignItems: "center",
    width: 100, // Adjust the width as necessary
    height: "100%",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Mulish_600SemiBold",
  },
  unChecked: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
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
