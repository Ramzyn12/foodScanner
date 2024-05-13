import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Animated,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import AddFoodButton from "./AddFoodButton";
import FoodListItem from "./FoodListItem";
import COLOURS from "../../constants/colours";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDiaryDay,
  removeFoodFromDiaryDay,
  toggleFastedState,
} from "../../axiosAPI/diaryDayAPI";
import FruitBowlIcon from "../../svgs/FruitBowlIcon";
import { useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Skeleton } from "moti/skeleton";
import { getCurrentDateLocal } from "../../utils/dateHelpers";

const FoodList = ({ diaryFoodItems, emptyFoodList, loadingFoodDiary, isErrorFoodDiary }) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const chosenDate =
    useSelector((state) => state.diary.chosenDate) || getCurrentDateLocal();
  const [isFasting, setIsFasting] = useState(false);
  const [isLoadingFasted, setIsLoadingFasted] = useState(false)

  const numberOfItems =
    diaryFoodItems?.consumedFoods?.length +
    diaryFoodItems?.consumedSingleFoods?.length;

  const itemsString = numberOfItems > 1 ? `${numberOfItems} items` : `${numberOfItems} item`

  useEffect(() => {
    setIsLoadingFasted(true)
    if (diaryFoodItems) {
      setIsFasting(diaryFoodItems.fastedState);
      setIsLoadingFasted(false)
    }
    if (isErrorFoodDiary) {
      setIsLoadingFasted(false)
      console.log('errrrrr');
    }
  }, [diaryFoodItems]);

  const removeFoodFromDiaryMutation = useMutation({
    mutationFn: removeFoodFromDiaryDay,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["DiaryDay", variables.date]});
      queryClient.invalidateQueries({ queryKey: ["AllDiaryDays"]});
      if (variables.barcode) {
        queryClient.invalidateQueries({
          queryKey: ["FoodDetails", variables.barcode],
          refetchType: "inactive",
        });
      } else if (variables.singleFoodId) {
        queryClient.invalidateQueries({
          queryKey: ["FoodDetailsIvy", variables.singleFoodId],
          refetchType: "inactive",
        });
      }
    },
    onError: (err) => {
      console.log(err, "HERE");
    },
  });

  const toggleFastedMutation = useMutation({
    mutationFn: toggleFastedState,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["DiaryDay", chosenDate]});
      queryClient.invalidateQueries({queryKey: ["AllDiaryDays"]});
    },
    onError: (err) => {
      console.log(err, "HERE");
    },
  });

  const handleValueChange = (val) => {
    setIsFasting(val);
    toggleFastedMutation.mutate({
      fastedState: val,
      date: chosenDate,
    });
  };

  const handleRemoveFromDiary = ({ barcode, singleFoodId }) => {
    removeFoodFromDiaryMutation.mutate({
      barcode: barcode,
      singleFoodId: singleFoodId,
      date: chosenDate || getCurrentDateLocal(),
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

  if (loadingFoodDiary || isLoadingFasted) {
    return (
      <View
        style={[
          styles.foodListContainer,
          { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
        ]}
      >
        <View style={{ width: "100%", gap: 6 }}>
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton
              key={index}
              colorMode='light'
              height={50} // Approximate height of your list items
              width="100%"
            />
          ))}
        </View>
        <AddFoodButton />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.foodListContainer,
        { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
      ]}
    >
      {numberOfItems > 0 && (
        <Text
          style={{
            paddingHorizontal: 10,
            paddingBottom: 20,
            paddingTop: 5,
            fontFamily: "Mulish_700Bold",
            fontSize: 14,
            color: COLOURS.nearBlack,
          }}
        >
          {itemsString}
        </Text>
      )}

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
            <FoodListItem foodItem={{ ...item, brand: "Fresh" }} />
          </Pressable>
        </Swipeable>
      ))}

      {emptyFoodList && !isFasting && (
        <View style={styles.emptyListContainer}>
          <FruitBowlIcon />
          <Text style={styles.emptyListText}>Add food to get started</Text>
        </View>
      )}
      {/* More food button */}
      {!isFasting && <AddFoodButton />}
      
      {emptyFoodList && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 14,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.nearBlack,
              fontFamily: "Mulish_700Bold",
            }}
          >
            I'm fasting today
          </Text>
          <Switch value={isFasting} onValueChange={handleValueChange} />
        </View>
      )}
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
    paddingHorizontal: 14,
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
