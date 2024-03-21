import {
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchFoodWithBarcode } from "../axiosAPI/openFoodFactsAPI";
import { useQuery } from "@tanstack/react-query";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";
import COLOURS from "../constants/colours";
import FoodDetailsSimpleInfo from "../components/foodDetails/FoodDetailsSimpleInfo";
import FoodDetailsScoreStrip from "../components/foodDetails/FoodDetailsScoreStrip";
import FoodDetailsLessonCarousel from "../components/foodDetails/FoodDetailsLessonCarousel";
import FoodDetailsIngredientsList from "../components/foodDetails/FoodDetailsIngredientsList";
import { setCurrentFood } from "../redux/foodSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodWithIvyId } from "../axiosAPI/searchSingleAPI";
import Toast, { BaseToast } from "react-native-toast-message";
import {
  clearRecentScans,
  saveRecentScan,
} from "../utils/RecentsStorageHelper";
import { useFoodDetails } from "../hooks/useFoodDetails";
import FoodDetailsMainInfo from "../components/foodDetails/FoodDetailsMainInfo";
import FoodDetailsEnvironment from "../components/foodDetails/FoodDetailsEnvironment";

const FoodDetails = ({ navigation, route }) => {
  const barcode = route?.params?.barcodeId;
  const singleFoodId = route?.params?.singleFoodId;
  const currentFood = useSelector((state) => state.food.currentFood);
  const chosenDate = useSelector(state => state.diary.chosenDate)

  const {
    data: foodDetails,
    isLoading,
    isError,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["FoodDetails", barcode],
    retry: false,
    enabled: !!barcode,
    queryFn: () => fetchFoodWithBarcode(barcode, chosenDate || new Date()),
  });

  // Need to add loading states here ASWELL!!
  const { data: singleFoodDetails } = useQuery({
    queryKey: ["FoodDetailsIvy", singleFoodId],
    retry: false,
    enabled: !!singleFoodId,
    queryFn: () => fetchFoodWithIvyId(singleFoodId, chosenDate || new Date()),
  });


  // handle the normalisation
  const readyToShow = useFoodDetails(foodDetails, singleFoodDetails);

  if (isLoading || !readyToShow) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    console.log(error);
    return <Text>Product doesnt exist...</Text>;
  }

  const toastConfig = {
    foodDetailToast: ({ text1, text2, props }) => (
      <Pressable
        onPress={() => navigation.navigate("GroceriesStack")}
        style={styles.toastContainer}
      >
        <Text style={styles.toastTextOne}>{text1}</Text>
        <Text style={styles.toastTextTwo}>{text2}</Text>
      </Pressable>
    ),
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FoodDetailsSimpleInfo foodItem={foodDetails} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {currentFood?.processedScore && <FoodDetailsScoreStrip />}
        {/* {currentFood?.additives?.length > 0 && <FoodDetailsLessonCarousel />} */}
        {/* {currentFood?.description && <Text>{currentFood?.description}</Text>} */}
        <View style={{ paddingHorizontal: 20 }}>
          <FoodDetailsMainInfo />
          {currentFood?.ingredients && <FoodDetailsIngredientsList />}

          <FoodDetailsEnvironment />
        </View>
      </ScrollView>
      {/* <Toast position="bottom" config={toastConfig} /> */}
      <Toast position="bottom" bottomOffset={40} config={toastConfig} />
    </SafeAreaView>
  );
};

export default FoodDetails;

const styles = StyleSheet.create({
  toastContainer: {
    height: 44,
    width: "90%",
    backgroundColor: COLOURS.nearBlack,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  toastTextOne: {
    color: "white",
    fontFamily: "Mulish_500Medium",
    fontSize: 14,
  },
  toastTextTwo: {
    color: "white",
    fontFamily: "Mulish_600SemiBold",
    fontSize: 14,
  },
});
