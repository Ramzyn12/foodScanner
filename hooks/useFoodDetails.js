import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFood } from "../redux/foodSlice";
import { saveRecentScan } from "../utils/RecentsStorageHelper";

// CHANGE THIS??
const DEFAULT_IMAGE =
  "https://static4.depositphotos.com/1026550/376/i/450/depositphotos_3763236-stock-photo-gold-star.jpg";

export const useFoodDetails = (foodDetails, singleFoodDetails) => {
  const dispatch = useDispatch();
  const [showNewDetails, setShowNewDetails] = useState(false);

  useEffect(() => {
    if (foodDetails) {
      const normalizedData = {
        name: foodDetails.name,
        brand: foodDetails?.brand || "Unknown Brand",
        processedState: foodDetails.processedState,
        isConsumedToday: foodDetails.isConsumedToday,
        isInGroceryList: foodDetails?.isInGroceryList,
        image_url: foodDetails?.image_url,
        description: "",
        barcode: foodDetails.barcode,
        singleFoodId: "",
        hasVegetableOil: foodDetails?.hasVegetableOil,
        hasPalmOil: foodDetails.hasPalmOil,
        co2Footprint: foodDetails.co2Footprint,
        ingredients: foodDetails?.ingredients,
        packagingData: foodDetails?.packagingData,
        ingredientsCount: foodDetails?.ingredientsCount,
        additives: foodDetails.additives || [],
        ecoscore: foodDetails.ecoscore,
        novaScore: foodDetails?.novaScore,
        processedScore: foodDetails?.processedScore,
        packagingImpact: foodDetails?.packagingImpact,
      };
      dispatch(setCurrentFood(normalizedData));
      saveRecentScan(normalizedData);
      setShowNewDetails(true);
    }

    if (singleFoodDetails) {
      const normalizedData = {
        name: singleFoodDetails.name,
        singleFoodId: singleFoodDetails._id,
        environment: "",
        brand: "Fresh",
        processedState: 'Perfect',
        isConsumedToday: singleFoodDetails.isConsumedToday,
        isInGroceryList: singleFoodDetails?.isInGroceryList,
        image_url: singleFoodDetails?.image_url || DEFAULT_IMAGE,
        description: singleFoodDetails.description,
        barcode: "",
        ingredientsCount: 1,
        novaScore: 1,
        hasVegetableOil: false,
        ingredients: [singleFoodDetails.name],
        additives: [],
        processedScore: singleFoodDetails.processedScore || 100, // Default to 0 if not present
      };
      dispatch(setCurrentFood(normalizedData));
      saveRecentScan(normalizedData);
      setShowNewDetails(true);
    }
  }, [foodDetails, singleFoodDetails]);

  return showNewDetails;
};
