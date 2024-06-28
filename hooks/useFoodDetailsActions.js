import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFoodToDiaryDay,
  removeFoodFromDiaryDay,
} from "../axiosAPI/diaryDayAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addFoodToGroceryList,
  removeFoodFromGroceryList,
} from "../axiosAPI/groceryAPI";
import Toast from "react-native-toast-message";
import { getCurrentDateLocal } from "../utils/dateHelpers";
import { setCurrentFood } from "../redux/foodSlice";
import debounce from "lodash.debounce";
import throttle from "lodash.throttle";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { isPending } from "@reduxjs/toolkit";

// I've decided to just use a small debounce to prevent abuse
// Any larger debounce causes flickering.
// If experience server overload use either useFocusEffect or throttle methods instead

export const useFoodDetailsActions = (expectedId) => {
  const currentFood = useSelector((state) => state.food.currentFood);
  const queryClient = useQueryClient();
  const [buttonsLoaded, setButtonsLoaded] = useState(false);
  const [addedToDiary, setAddedToDiary] = useState(false);
  const mutationCounterDiary = useRef(0);
  const mutationCounterGrocery = useRef(0);
  const navigation = useNavigation();

  const debouncedInvalidate = useCallback(
    debounce(() => {
      queryClient.invalidateQueries({
        queryKey: ["AllDiaryDays"],
      });
    }, 1500),
    []
  );

  const [addedToGroceries, SetAddedToGroceries] = useState(false);
  const chosenDate =
    useSelector((state) => state.diary.chosenDate) || getCurrentDateLocal();
  const dispatch = useDispatch();

  // This is the schema the backend expects to add to database
  const foodItemSchema = {
    barcode: currentFood?.barcode,
    singleFoodId: currentFood.singleFoodId,
    name: currentFood?.name,
    brand: currentFood?.brand,
    description: "",
    image_url: currentFood?.image_url,
    ingredients: currentFood?.ingredients || [],
    additives: currentFood?.additives || [],
    processedScore: currentFood?.processedScore,
    processedState: currentFood?.processedState,
  };

  useEffect(() => {
    if (currentFood) {
      setAddedToDiary(currentFood.isConsumedToday);
      SetAddedToGroceries(currentFood?.isInGroceryList);
      setButtonsLoaded(true);
    }
  }, [currentFood]);

  useEffect(() => {
    return () => {
      dispatch(setCurrentFood({}));
    };
  }, []);

  const addFoodToDiaryMutation = useMutation({
    mutationFn: addFoodToDiaryDay,
    onMutate: async (variables) => {
      mutationCounterDiary.current += 1;
      const queryKey = variables.singleFoodId
        ? ["FoodDetailsIvy", variables.singleFoodId, variables.date]
        : ["FoodDetails", variables.barcode, variables.date];

      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: queryKey });

      // Snapshot the previous value
      const previousFoodDetails = queryClient.getQueryData(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, (old) => ({
        ...old,
        isConsumedToday: true,
      }));

      return { previousFoodDetails };
    },
    onSettled: (data, error, variables) => {
      mutationCounterDiary.current -= 1;
      if (mutationCounterDiary.current !== 0) return;
      queryClient.invalidateQueries({ queryKey: ["DiaryDay", variables.date] });
      queryClient.invalidateQueries({ queryKey: ["TimelineWeek"] });
      debouncedInvalidate();
    },
    onError: (err, variables, context) => {
      if (err.response.data.message.startsWith("Subscription Required")) {
        Toast.show({
          type: "customErrorToast",
          text1: `Upgrade to Pro to add unlimited items!`,
        });
        navigation.navigate("Paywall");
      } else {
        Toast.show({
          type: "customErrorToast",
          text1: `Failed to add food, Please try again later`,
        });
      }

      mutationCounterDiary.current = 0;
      const queryKey = variables.singleFoodId
        ? ["FoodDetailsIvy", variables.singleFoodId, variables.date]
        : ["FoodDetails", variables.barcode, variables.date];
      queryClient.setQueryData(queryKey, context.previousFoodDetails);
    },
  });

  const removeFoodFromDiaryMutation = useMutation({
    mutationFn: removeFoodFromDiaryDay,
    onMutate: async (variables) => {
      mutationCounterDiary.current += 1;
      const queryKey = variables.singleFoodId
        ? ["FoodDetailsIvy", variables.singleFoodId, variables.date]
        : ["FoodDetails", variables.barcode, variables.date];

      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousFoodDetails = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) => ({
        ...old,
        isConsumedToday: false,
      }));

      return { previousFoodDetails };
    },
    onSettled: (data, error, variables) => {
      mutationCounterDiary.current -= 1;
      if (mutationCounterDiary.current !== 0) return;
      queryClient.invalidateQueries({ queryKey: ["DiaryDay", variables.date] });
      queryClient.invalidateQueries({ queryKey: ["TimelineWeek"] });
      debouncedInvalidate();

      // if (variables.barcode) {
      //   queryClient.invalidateQueries({
      //     queryKey: ["FoodDetails", variables.barcode, variables.date],
      //   });
      // } else if (variables.singleFoodId) {
      //   queryClient.invalidateQueries({
      //     queryKey: ["FoodDetailsIvy", variables.singleFoodId, variables.date],
      //   });
      // }
    },
    onError: (err, variables, context) => {
      Toast.show({
        type: "customErrorToast",
        text1: `Failed to remove food, Please try again later`,
      });
      mutationCounterDiary.current = 0;
      const queryKey = variables.singleFoodId
        ? ["FoodDetailsIvy", variables.singleFoodId, variables.date]
        : ["FoodDetails", variables.barcode, variables.date];
      queryClient.setQueryData(queryKey, context.previousFoodDetails);
    },
  });

  const addToGroceryListMutation = useMutation({
    mutationFn: addFoodToGroceryList,
    onMutate: async (variables) => {
      mutationCounterGrocery.current += 1;
      const queryKey = variables.singleFoodId
        ? ["FoodDetailsIvy", variables.singleFoodId, chosenDate]
        : ["FoodDetails", variables.barcode, chosenDate];

      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousFoodDetails = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) => ({
        ...old,
        isInGroceryList: true,
      }));

      return { previousFoodDetails };
    },
    onSettled: (data, error, variables) => {
      mutationCounterGrocery.current -= 1;
      if (mutationCounterGrocery.current !== 0) return;
      queryClient.invalidateQueries({ queryKey: ["Groceries"] });
      // if (variables.barcode) {
      //   queryClient.invalidateQueries({
      //     queryKey: ["FoodDetails", variables.barcode, chosenDate],
      //   });
      // } else if (variables.singleFoodId) {
      //   queryClient.invalidateQueries({
      //     queryKey: ["FoodDetailsIvy", variables.singleFoodId, chosenDate],
      //   });
      // }
    },
    onError: (err, variables, context) => {
      if (err.response.data.message.startsWith("Subscription Required")) {
        Toast.show({
          type: "customErrorToast",
          text1: `Upgrade to Pro to add unlimited items!`,
        });
        navigation.navigate("Paywall");
      } else {
        Toast.show({
          type: "customErrorToast",
          text1: `Failed to add to list, Please try again later`,
        });
      }
      mutationCounterGrocery.current = 0;
      const queryKey = variables.singleFoodId
        ? ["FoodDetailsIvy", variables.singleFoodId, chosenDate]
        : ["FoodDetails", variables.barcode, chosenDate];
      queryClient.setQueryData(queryKey, context.previousFoodDetails);
    },
  });

  const removeFromGroceryListMutation = useMutation({
    mutationFn: removeFoodFromGroceryList,
    onMutate: async (variables) => {
      mutationCounterGrocery.current += 1;
      const queryKey = variables.singleFoodId
        ? ["FoodDetailsIvy", variables.singleFoodId, chosenDate]
        : ["FoodDetails", variables.barcode, chosenDate];

      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousFoodDetails = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) => ({
        ...old,
        isInGroceryList: false,
      }));

      return { previousFoodDetails };
    },
    onSettled: (data, error, variables) => {
      mutationCounterGrocery.current -= 1;
      if (mutationCounterGrocery.current !== 0) return;
      queryClient.invalidateQueries({ queryKey: ["Groceries"] });
      // if (variables.barcode) {
      //   queryClient.invalidateQueries({
      //     queryKey: ["FoodDetails", variables.barcode, chosenDate],
      //   });
      // } else if (variables.singleFoodId) {
      //   queryClient.invalidateQueries({
      //     queryKey: ["FoodDetailsIvy", variables.singleFoodId, chosenDate],
      //   });
      // }
    },
    onError: (err, variables, context) => {
      Toast.show({
        type: "customErrorToast",
        text1: `Failed to remove from list, Please try again later`,
      });
      mutationCounterGrocery.current = 0;
      const queryKey = variables.singleFoodId
        ? ["FoodDetailsIvy", variables.singleFoodId, chosenDate]
        : ["FoodDetails", variables.barcode, chosenDate];
      queryClient.setQueryData(queryKey, context.previousFoodDetails);
    },
  });

  const diaryHandler = (type) => {
    if (type === "add") {
      addFoodToDiaryMutation.mutate({
        ...foodItemSchema,
        date: chosenDate,
      });
    } else if (type === "remove") {
      removeFoodFromDiaryMutation.mutate({
        barcode: currentFood?.barcode,
        singleFoodId: currentFood?.singleFoodId,
        date: chosenDate,
      });
    }
  };

  const groceryHandler = (type) => {
    if (type === "add") {
      addToGroceryListMutation.mutate(foodItemSchema);
    } else if (type === "remove") {
      removeFromGroceryListMutation.mutate({
        barcode: currentFood?.barcode,
        singleFoodId: currentFood?.singleFoodId,
      });
    }
  };

  // Either we debounce like 500 to save some calls or not? Ask farid
  const debouncedDiaryHandler = useCallback(debounce(diaryHandler, 0), []);
  const debouncedGroceryHandler = useCallback(debounce(groceryHandler, 0), []);

  const handleAddToDiaryFinal = () => {
    if (!removeFoodFromDiaryMutation.isPending) {
      debouncedDiaryHandler("add");
      setAddedToDiary(true);
    }
  };

  const handleRemoveFromDiaryFinal = () => {
    if (!addFoodToDiaryMutation.isPending) {
      setAddedToDiary(false);
      debouncedDiaryHandler("remove");
    }
  };

  const handleAddToGroceryFinal = () => {
    if (!removeFromGroceryListMutation.isPending) {
      debouncedGroceryHandler("add");
      SetAddedToGroceries(true);
      Toast.show({
        type: "foodDetailToast",
        text1: "Item added to grocery list",
        text2: "View",
      });
    }
  };

  const handleRemoveFromGroceryFinal = () => {
    if (!addToGroceryListMutation.isPending) {
      debouncedGroceryHandler("remove");
      SetAddedToGroceries(false);
      // Toast.hide();
    }
  };

  return {
    addedToDiary,
    addedToGroceries,
    buttonsLoaded,
    addFoodToDiaryMutation,
    removeFoodFromDiaryMutation,
    addToGroceryListMutation,
    removeFromGroceryListMutation,
    handleAddToDiary: handleAddToDiaryFinal,
    handleRemoveFromDiary: handleRemoveFromDiaryFinal,
    handleAddToGroceryList: handleAddToGroceryFinal,
    handleRemoveFromGroceryList: handleRemoveFromGroceryFinal,
  };
};
