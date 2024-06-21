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
import { getCurrentDateLocal } from "../utils/dateHelpers";
import LoadingFoodDetails from "../components/foodDetails/LoadingFoodDetails";
import { useColourTheme } from "../context/Themed";
import { themedColours } from "../constants/themedColours";
import { useCustomerInfo } from "../hooks/useCustomerInfo";
import { useNavigation } from "@react-navigation/native";
import Purchases from "react-native-purchases";
import TryProButton from "../components/foodDetails/TryProButton";
import FoodDetailsPackaing from "../components/foodDetails/FoodDetailsPackaing";
import ErrorPage from "./ErrorPage";

const FoodDetails = ({ navigation, route }) => {
  const barcode = route?.params?.barcodeId;
  const singleFoodId = route?.params?.singleFoodId;
  const currentFood = useSelector((state) => state.food.currentFood);
  const {theme} = useColourTheme()

  const chosenDate =
    useSelector((state) => state.diary.chosenDate) || getCurrentDateLocal();

  const {
    data: foodDetails,
    isLoading: isLoadingFoodDetails, // isPending made it pend when not enabled?
    isError: isErrorOFF,
    isFetching,
    refetch: refetchOFF,
    error: errorOFF,
  } = useQuery({
    queryKey: ["FoodDetails", barcode, chosenDate],
    retry: false,
    enabled: !!barcode,
    queryFn: () => fetchFoodWithBarcode(barcode, chosenDate),
  });

  // Need to add loading states here ASWELL!!
  const {
    data: singleFoodDetails,
    isError: isErrorIvy,
    error: errorIvy,
    refetch: refetchIvy,
    isLoading: isLoadingSingleFood,
  } = useQuery({
    queryKey: ["FoodDetailsIvy", singleFoodId, chosenDate],
    retry: false,
    enabled: !!singleFoodId,
    queryFn: async () => await fetchFoodWithIvyId(singleFoodId, chosenDate),
  });


 
  // handle the normalisation
  const readyToShow = useFoodDetails(foodDetails, singleFoodDetails);

  const handleRefetch = () => {
    if (isErrorOFF) {
      refetchOFF()
    } else if (isErrorIvy) {
      refetchIvy()
    }
  }

  if (isErrorOFF || isErrorIvy) {
    if (errorOFF?.response && errorOFF.response.data.statusCode === 404) {
      return <Text>Product doesn't exist...</Text>
    } else {
      return <ErrorPage onPress={handleRefetch} />
    }
    
  }

  if (isLoadingFoodDetails || isLoadingSingleFood || !readyToShow) {
    return <LoadingFoodDetails />;
  }

  const toastConfig = {
    foodDetailToast: ({ text1, text2, props }) => (
      <Pressable
        onPress={() => navigation.navigate("GroceriesStack")}
        style={[styles.toastContainer, {backgroundColor: themedColours.primaryText[theme]}]}
      >
        <Text style={[styles.toastTextOne, {color: themedColours.primaryBackground[theme]}]}>{text1}</Text>
        <Text style={[styles.toastTextTwo, {color: themedColours.primaryBackground[theme]}]}>{text2}</Text>
      </Pressable>
    ),
    customErrorToast: ({ text1, text2, onViewPress, props }) => (
      <Pressable
        onPress={onViewPress}
        style={{
          height: 44,
          width: "90%",
          backgroundColor: '#DB1200',
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: themedColours.primaryBackground[theme],
            fontFamily: "Mulish_500Medium",
            fontSize: 14,
          }}
        >
          {text1}
        </Text>
        <Text
          style={{
            color: themedColours.primaryBackground[theme],
            fontFamily: "Mulish_600SemiBold",
            fontSize: 14,
          }}
        >
          {text2}
        </Text>
      </Pressable>
    ),
  };

  return (
    <View style={{ flex: 1, backgroundColor: themedColours.primaryBackground[theme] }}>
      <FoodDetailsSimpleInfo expectedId={singleFoodId || barcode} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {currentFood?.processedScore && <FoodDetailsScoreStrip />}
        {/* {currentFood?.additives?.length > 0 && <FoodDetailsLessonCarousel />} */}
        {/* {currentFood?.description && <Text>{currentFood?.description}</Text>} */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 60 }}>
          <FoodDetailsIngredientsList />
          <FoodDetailsMainInfo />
          <FoodDetailsEnvironment />
          <FoodDetailsPackaing />
          <TryProButton />
        </View>
      </ScrollView>
      {/* <Toast position="bottom" config={toastConfig} /> */}
      <Toast position="bottom" bottomOffset={40} config={toastConfig} />
    </View>
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
