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
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
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

const GroceryListItem = ({ foodItem, id, onLongPress, isActive }) => {
  // Could move this logic into a hook if needed
  const groceries = useSelector((state) => state.grocery.currentGroceries);
  const grocery = groceries.find((item) => item._id === id);
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const deletionTimerRef = useRef(null);
  const singleFoodId = foodItem?.barcode ? '' : foodItem?._id
  const brand = singleFoodId ? 'Fresh' : foodItem?.brand
  const chosenDate =
    useSelector((state) => state.diary.chosenDate) || getCurrentDateLocal();

    
  const removeFoodMutation = useMutation({
    mutationFn: removeFoodFromGroceryList,
    onMutate: async (variables) => {
      const queryKey = variables.singleFoodId
      ? ["FoodDetailsIvy", variables.singleFoodId, chosenDate]
      : ["FoodDetails", variables.barcode, chosenDate];

    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries({queryKey: queryKey});

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
      dispatch(confirmDeletion(id))
      queryClient.invalidateQueries({queryKey: ["Groceries"]});
      // if (variables.barcode) {
      //   queryClient.invalidateQueries({
      //     queryKey: ["FoodDetails", variables.barcode],
      //     refetchType: 'all',
      //   });
      // } else if (variables.singleFoodId) {
      //   queryClient.invalidateQueries({
      //     queryKey: ["FoodDetailsIvy", variables.singleFoodId],
      //     refetchType: 'all',
      //   });
      // }
    },
    onError: (err) => {
      console.log(err);
      const queryKey = variables.singleFoodId
      ? ["FoodDetailsIvy", variables.singleFoodId, chosenDate]
      : ["FoodDetails", variables.barcode, chosenDate];
    queryClient.setQueryData(queryKey, context.previousFoodDetails);    },
  });

  const addFoodToGroceryMutation = useMutation({
    mutationFn: addFoodToGroceryList,
    onMutate: async (variables) => {
      const queryKey = variables.singleFoodId
      ? ["FoodDetailsIvy", variables.singleFoodId, chosenDate]
      : ["FoodDetails", variables.barcode, chosenDate];

    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries({queryKey: queryKey});

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
      queryClient.invalidateQueries({queryKey: ["Groceries"]});
      // if (variables.barcode) {
      //   queryClient.invalidateQueries({
      //     queryKey: ["FoodDetails", variables.barcode],
      //     refetchType: 'all',
      //   });
      // } else if (variables.singleFoodId) {
      //   queryClient.invalidateQueries({
      //     queryKey: ["FoodDetailsIvy", variables.singleFoodId],
      //     refetchType: 'all',
      //   });
      // }
    },
    onError: (err) => {
      console.log(err);
      const queryKey = variables.singleFoodId
      ? ["FoodDetailsIvy", variables.singleFoodId, chosenDate]
      : ["FoodDetails", variables.barcode, chosenDate];
    queryClient.setQueryData(queryKey, context.previousFoodDetails);
    },
  })


  const toggleMutation = useMutation({
    mutationFn: toggleCheckedState,
    onSuccess: () => {},
    onError: (err) => {
      console.log(err);
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
    addFoodToGroceryMutation.mutate(foodItemSchema)
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
      singleFoodId
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
      },
    });
  };


  const handleToggleCheck = () => {
    toggleMutation.mutate({ groceryItemId: id });
    dispatch(checkGrocery(id));
  };


  const handleGoToFood = () => {
    navigation.navigate("FoodDetailsModal", {
      barcodeId: foodItem?.barcode,
      singleFoodId
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
        style={[styles.listItemContainer, isActive && styles.isActiveStyles]}
      >

        {/* Check Box */}
        <Pressable onPress={handleToggleCheck}>
          <View
            style={[
              styles.unChecked,
              grocery?.checked && { backgroundColor: COLOURS.darkGreen },
            ]}
          >
            {grocery?.checked && <TickIcon />}
          </View>
        </Pressable>

        {/* Food Item */}
        <Pressable
          onLongPress={onLongPress}
          style={styles.foodItemContainer}
          onPress={handleGoToFood}
          delayLongPress={200}
        >
          <FoodListItem foodSelected={grocery?.checked} foodItem={{...foodItem, brand: brand}} />
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
