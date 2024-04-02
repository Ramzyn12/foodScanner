import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Animated,
} from "react-native";
import React from "react";
import AddFoodButton from "./AddFoodButton";
import FoodListItem from "./FoodListItem";
import COLOURS from "../../constants/colours";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDiaryDay,
  removeFoodFromDiaryDay,
} from "../../axiosAPI/diaryDayAPI";
import FruitBowlIcon from "../../svgs/FruitBowlIcon";
import { useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const FoodList = ({ diaryFoodItems, emptyFoodList }) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const chosenDate = useSelector(state => state.diary.chosenDate)

  const removeFoodFromDiaryMutation = useMutation({
    mutationFn: removeFoodFromDiaryDay,
    onSuccess: () => {
      queryClient.invalidateQueries(["DiaryDay"]);
    },
    onError: (err) => {
      console.log(err, "HERE");
    },
  });

  const handleRemoveFromDiary = ({ barcode, singleFoodId }) => {
    removeFoodFromDiaryMutation.mutate({
      barcode: barcode,
      singleFoodId: singleFoodId,
      date: chosenDate || new Date()
    });
  };

  const renderRightActions = (progress, dragX, { barcode, singleFoodId }) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    return (
      <Animated.View style={{ transform: [{ translateX: trans }] }}>
        <TouchableOpacity
          onPress={() => handleRemoveFromDiary({ barcode, singleFoodId })}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View
      style={[
        styles.foodListContainer,
        { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
      ]}
    >
      {/* Food List Item */}
      {diaryFoodItems?.consumedFoods?.map((item) => (
        <Swipeable
          rightThreshold={100}
          overshootFriction={8}
          friction={1.5}
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, {
              barcode: item.barcode,
              singleFoodId: null,
            })
          }
          key={item._id}
        >
          <Pressable
            onPress={() =>
              navigation.navigate("FoodDetailsModal", {
                barcodeId: item.barcode,
              })
            }
            style={{ paddingHorizontal: 8 }}
          >
            <FoodListItem foodItem={item} />
          </Pressable>
        </Swipeable>
      ))}

      {diaryFoodItems?.consumedSingleFoods?.map((item) => (
        <Swipeable
          rightThreshold={100}
          overshootFriction={8}
          friction={1.5}
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, {
              barcode: null,
              singleFoodId: item._id,
            })
          }
          key={item._id}
        >
          <Pressable
            onPress={() =>
              navigation.navigate("FoodDetailsModal", {
                singleFoodId: item._id,
              })
            }
            key={item._id}
            style={{ paddingHorizontal: 8 }}

          >
            <FoodListItem foodItem={{ ...item, brand: "Fresh" }}  />
          </Pressable>
        </Swipeable>
      ))}

      {emptyFoodList && (
        <View style={styles.emptyListContainer}>
          <FruitBowlIcon />
          <Text style={styles.emptyListText}>Add food to get started</Text>
        </View>
      )}
      {/* More food button */}
      <AddFoodButton />
    </View>
  );
};

export default FoodList;

const styles = StyleSheet.create({
  foodListContainer: {
    borderColor: COLOURS.lightGray,
    borderWidth: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 14,
    paddingHorizontal: 15,
  },
  emptyListContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  emptyListText: {
    fontFamily: "Mulish_500Medium",
    fontSize: 16,
    color: COLOURS.tabUnselected,
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
});