import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { addFoodToDiaryDay, removeFoodFromDiaryDay } from '../axiosAPI/diaryDayAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFoodToGroceryList, removeFoodFromGroceryList } from '../axiosAPI/groceryAPI';
import Toast from 'react-native-toast-message';

export const useFoodDetailsActions = () => {
  const currentFood = useSelector((state) => state.food.currentFood);
  const queryClient = useQueryClient();
  const [addedToDiary, setAddedToDiary] = useState(
    currentFood?.isConsumedToday
  );
  const [addedToGroceries, SetAddedToGroceries] = useState(
    currentFood?.isInGroceryList
  );
  
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
  };

  useEffect(() => {
    setAddedToDiary(currentFood?.isConsumedToday);
    SetAddedToGroceries(currentFood?.isInGroceryList);
  }, [currentFood]);

  const addFoodToDiaryMutation = useMutation({
    mutationFn: addFoodToDiaryDay,
    onSuccess: () => {
      queryClient.invalidateQueries(["DiaryDay"]);
    },
    onError: (err) => {
      console.log(err, "HERE");
    },
  });

  const addToGroceryListMutation = useMutation({
    mutationFn: addFoodToGroceryList,
    onSuccess: () => {
      Toast.show({
        type: "foodDetailToast",
        text1: "Item added to grocery list",
        text2: "View",
      });
      queryClient.invalidateQueries(["Groceries"]);
    },
    onError: (err) => {
      console.log(err, "HERE");
    },
  });

  const removeFoodFromDiaryMutation = useMutation({
    mutationFn: removeFoodFromDiaryDay,
    onSuccess: () => {
      queryClient.invalidateQueries(["DiaryDay"]);
    },
    onError: (err) => {
      console.log(err, "HERE");
    },
  });

  const removeFromGroceryListMutation = useMutation({
    mutationFn: removeFoodFromGroceryList,
    onSuccess: () => {
      queryClient.invalidateQueries(["Groceries"]);
    },
    onError: (err) => {
      console.log(err, "HERE");
    },
  });

  const handleAddToDiary = () => {
    if (removeFoodFromDiaryMutation.isPending) return null;

    addFoodToDiaryMutation.mutate(foodItemSchema);
    setAddedToDiary(true);
  };

  const handleRemoveFromDiary = () => {
    if (addFoodToDiaryMutation.isPending) return null;

    removeFoodFromDiaryMutation.mutate({
      barcode: currentFood?.barcode,
      singleFoodId: currentFood?.singleFoodId,
    });
    setAddedToDiary(false);
  };

  const handleAddToGroceryList = () => {
    if (removeFromGroceryListMutation.isPending) return null;

    addToGroceryListMutation.mutate(foodItemSchema);
    SetAddedToGroceries(true);
  };

  const handleRemoveFromGroceryList = () => {
    if (addToGroceryListMutation.isPending) return null;

    removeFromGroceryListMutation.mutate({
      barcode: currentFood?.barcode,
      singleFoodId: currentFood?.singleFoodId,
    });
    SetAddedToGroceries(false);
  };

  return {
    addedToDiary,
    addedToGroceries,
    handleAddToDiary,
    handleRemoveFromDiary,
    handleAddToGroceryList,
    handleRemoveFromGroceryList,
  };}