import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLOURS from "../../constants/colours";
import FoodListItem from "../FoodListItem";
const dummyItem = {
  brand: "Tesco",
  name: "sweet potato",
  image_url:
    "https://img.freepik.com/free-photo/sweet-potato_144627-20748.jpg?w=2000&t=st=1708436069~exp=1708436669~hmac=d5806ccc5e3e06c555d0549193a77a804c4abdba921bada59b1375174593f0ca",
};
import { Swipeable } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { Path, Svg } from "react-native-svg";
import TickIcon from "../../svgs/TickIcon";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  removeFoodFromGroceryList,
  toggleCheckedState,
} from "../../axiosAPI/groceryAPI";
import { useDispatch, useSelector } from "react-redux";
import { checkGrocery } from "../../redux/grocerySlice";
import Toast from "react-native-toast-message";

const GroceryListItem = ({ foodItem, checked, id, onLongPress, isActive }) => {
  const groceries = useSelector((state) => state.grocery.currentGroceries);
  const grocery = groceries.find((item) => item._id === id);
  // const [foodSelected, setFoodSelected] = useState(grocery?.checked);
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleDeletePress = () => {
    Toast.show({
      type: "groceryToast",
      text1: "Item removed",
      text2: "Undo",
    });
    removeFoodMutation.mutate({
      barcode: foodItem?.barcode,
      singleFoodId: foodItem?.singleFoodId,
    });
  };

  useEffect(() => {
    console.log(grocery.checked, id);
  }, [grocery]);

  const removeFoodMutation = useMutation({
    mutationFn: removeFoodFromGroceryList,
    onSuccess: () => {
      // removeFoodFromGroceryList(id)
      queryClient.invalidateQueries(["Groceries"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const toggleMutation = useMutation({
    mutationFn: toggleCheckedState,
    onSuccess: () => {
      console.log("checked");
    },
    onError: (err) => {
      console.log(err);
    },
  });

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

  const handleSelectFood = () => {
    console.log("Checked");
    toggleMutation.mutate({ groceryItemId: id });
    dispatch(checkGrocery(id));
  };

  const handleGoToFood = () => {
    navigation.navigate("FoodDetailsGroceries", {
      barcodeId: foodItem?.barcode,
      singleFoodId: foodItem?.singleFoodId,
    });
  };

  return (
    <Swipeable
      // onSwipeableOpen={() => console.log("deleted by drag")}
      rightThreshold={100}
      overshootFriction={8}
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
  isActiveStyles: {
    transform: [{ scale: 1.05 }],
  },
});
