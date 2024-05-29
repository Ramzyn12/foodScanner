import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import COLOURS from "../../constants/colours";
import FoodListItem from "../diary/FoodListItem";
import { Swipeable } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import TickIcon from "../../svgs/TickIcon";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addFoodToGroceryList,
  removeFoodFromGroceryList,
  toggleCheckedState,
} from "../../axiosAPI/groceryAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  addVirtualGroceryItem,
  checkGrocery,
  confirmDeletion,
  removeVirtualGroceryItem,
} from "../../redux/grocerySlice";
import Toast from "react-native-toast-message";
import { getCurrentDateLocal } from "../../utils/dateHelpers";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const GroceryListItem = ({ foodItem, id, onLongPress, isActive }) => {
  // Could move this logic into a hook if needed
  const groceries = useSelector((state) => state.grocery.currentGroceries);
  const grocery = groceries.find((item) => item._id === id);
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const deletionTimerRef = useRef(null);
  const singleFoodId = foodItem?.barcode ? "" : foodItem?._id;
  const brand = singleFoodId ? "Fresh" : foodItem?.brand;
  const {theme} = useColourTheme()

  const chosenDate =
    useSelector((state) => state.diary.chosenDate) || getCurrentDateLocal();

  const removeFoodMutation = useMutation({
    mutationFn: removeFoodFromGroceryList,
    onMutate: async (variables) => {
      const queryKey = variables.singleFoodId
        ? ["FoodDetailsIvy", variables.singleFoodId, chosenDate]
        : ["FoodDetails", variables.barcode, chosenDate];

      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: queryKey });

      // Snapshot the previous value
      const previousFoodDetails = queryClient.getQueryData(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, (old) => ({
        ...old,
        isInGroceryList: false,
      }));

      return { previousFoodDetails };
    },
    onSuccess: (data, variables) => {
      dispatch(confirmDeletion(id));
      queryClient.invalidateQueries({ queryKey: ["Groceries"] });
    },
    onError: (err, variables, context) => {
      console.log(err);
      const queryKey = variables.singleFoodId
        ? ["FoodDetailsIvy", variables.singleFoodId, chosenDate]
        : ["FoodDetails", variables.barcode, chosenDate];
      queryClient.setQueryData(queryKey, context.previousFoodDetails);
      dispatch(addVirtualGroceryItem());
      Toast.show({
        type: "customErrorToast",
        text1: "Failed to remove food, please try again later",
      });
    },
  });

  const addFoodToGroceryMutation = useMutation({
    mutationFn: addFoodToGroceryList,
    onMutate: async (variables) => {
      const queryKey = variables.singleFoodId
        ? ["FoodDetailsIvy", variables.singleFoodId, chosenDate]
        : ["FoodDetails", variables.barcode, chosenDate];

      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: queryKey });

      // Snapshot the previous value
      const previousFoodDetails = queryClient.getQueryData(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, (old) => ({
        ...old,
        isInGroceryList: true,
      }));

      return { previousFoodDetails };
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Groceries"] });
    },
    onError: (err, variables, context) => {
      console.log(err);
      const queryKey = variables.singleFoodId
        ? ["FoodDetailsIvy", variables.singleFoodId, chosenDate]
        : ["FoodDetails", variables.barcode, chosenDate];
      queryClient.setQueryData(queryKey, context.previousFoodDetails);
      dispatch(removeVirtualGroceryItem(id));
      Toast.show({
        type: "customErrorToast",
        text1: "Failed undo action, please find in recents",
      });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: toggleCheckedState,
    onMutate: async (variables) => {
      await queryClient.cancelQueries(["groceries"]);

      const previousGroceries = queryClient.getQueryData(["groceries"]);

      // Optimistically update to the new state
      dispatch(checkGrocery(id));

      return { previousGroceries };
    },
    onError: (error, variables, context) => {
      dispatch(checkGrocery(id)); // Does the opposite to onMutate check
      queryClient.setQueryData(["groceries"], context.previousGroceries);
      Toast.show({
        type: "customErrorToast",
        text1: "Failed to check, please try again later",
      });
    },
  });

  const foodItemSchema = {
    barcode: foodItem?.barcode,
    singleFoodId: singleFoodId,
    name: foodItem?.name,
    brand: foodItem?.brand,
    description: "",
    image_url: foodItem?.image_url,
    ingredients: foodItem?.ingredients || [],
    additives: foodItem?.additives || [],
    processedScore: foodItem?.processedScore,
    processedState: foodItem?.processedState,
  };

  const handleUndo = () => {
    if (deletionTimerRef.current) {
      clearTimeout(deletionTimerRef.current);
      deletionTimerRef.current = null;
    }

    // Add back temporarily removed item
    dispatch(addVirtualGroceryItem());
    addFoodToGroceryMutation.mutate(foodItemSchema);
    Toast.hide();
  };

  const handleDeletePress = () => {
    dispatch(removeVirtualGroceryItem(id));

    // Clear any existing timer to ensure we don't have multiple timers running
    if (deletionTimerRef.current) {
      clearTimeout(deletionTimerRef.current);
    }

    removeFoodMutation.mutate({
      barcode: foodItem?.barcode,
      singleFoodId,
    });

    // // Start a new timer
    // deletionTimerRef.current = setTimeout(() => {
    //   removeFoodMutation.mutate({
    //     barcode: foodItem?.barcode,
    //     singleFoodId
    //   });
    // }, 4000);

    Toast.show({
      type: "groceryToast",
      text1: "Item removed",
      text2: "Undo",
      props: {
        onUndo: handleUndo,
        backgroundColor: themedColours.primaryText[theme],
        textColor: themedColours.primaryBackground[theme]
      },
    });
  };

  const handleToggleCheck = () => {
    toggleMutation.mutate({ groceryItemId: id });
  };

  const handleGoToFood = () => {
    navigation.navigate("FoodDetailsModal", {
      barcodeId: foodItem?.barcode,
      singleFoodId,
    });
  };

  // Need to use callback this one I think
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
      rightThreshold={100}
      overshootFriction={8}
      friction={1.5}
      renderRightActions={renderRightActions}
    >
      <View
        style={[styles.listItemContainer, isActive && styles.isActiveStyles, {backgroundColor: themedColours.primaryBackground[theme]}]}
      >
        {/* Check Box */}
        <Pressable onPress={handleToggleCheck}>
          <View
            style={[
              [styles.unChecked, {backgroundColor: themedColours.secondaryBackground[theme]}],
              grocery?.checked && { backgroundColor: themedColours.primary[theme] },
            ]}
          >
            {grocery?.checked && <TickIcon color={themedColours.primaryBackground[theme]} />}
          </View>
        </Pressable>

        {/* Food Item */}
        <Pressable
          onLongPress={onLongPress}
          style={[styles.foodItemContainer, {borderBottomColor: themedColours.stroke[theme]}]}
          onPress={handleGoToFood}
          delayLongPress={200}
        >
          <FoodListItem
            foodSelected={grocery?.checked}
            foodItem={{ ...foodItem, brand: brand }}
          />
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
