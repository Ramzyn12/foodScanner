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
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchFoodWithBarcode } from "../axiosAPI/openFoodFactsAPI";
import { useQuery } from "@tanstack/react-query";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";
import COLOURS from "../constants/colours";
import FoodDetailsSimpleInfo from "../components/FoodDetailsSimpleInfo";
import FoodDetailsScoreStrip from "../components/FoodDetailsScoreStrip";
import FoodDetailsLessonCarousel from "../components/FoodDetailsLessonCarousel";
import FoodDetailsIngredientsList from "../components/FoodDetailsIngredientsList";
import { setCurrentFood } from "../redux/foodSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodWithIvyId } from "../axiosAPI/searchSingleAPI";
import Toast, { BaseToast } from "react-native-toast-message";

const DEFAULT_IMAGE =
  "https://static4.depositphotos.com/1026550/376/i/450/depositphotos_3763236-stock-photo-gold-star.jpg";

const FoodDetails = ({ navigation, route }) => {
  const barcode = route?.params?.barcodeId;
  const singleFoodId = route?.params?.singleFoodId;
  const dispatch = useDispatch();
  const currentFood = useSelector((state) => state.food.currentFood);

  // Cant this be one level down?
  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: foodDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["FoodDetails", barcode],
    retry: false,
    enabled: !!barcode,
    queryFn: () => fetchFoodWithBarcode(barcode),
  });

  const { data: singleFoodDetails } = useQuery({
    queryKey: ["FoodDetailsIvy", singleFoodId],
    retry: false,
    enabled: !!singleFoodId,
    queryFn: () => fetchFoodWithIvyId(singleFoodId),
  });

  useEffect(() => {
    if (foodDetails) {
      const normalizedData = {
        name: foodDetails.name,
        brand: foodDetails?.brand || "Unknown Brand", // Default value if not present
        isConsumedToday: foodDetails.isConsumedToday, // Not applicable for single foods
        isInGroceryList: foodDetails?.isInGroceryList, // Not applicable for single foods
        image_url: foodDetails?.image_url || DEFAULT_IMAGE,
        description: "", // Empty since OFF doesn't provide it
        barcode: foodDetails.barcode,
        singleFoodId: "",
        environment: {
          hasPalmOil: foodDetails.hasPalmOil,
          co2Footprint: foodDetails.co2Footprint,
        },
        ingredients: foodDetails?.ingredients, // Assuming comma-separated string
        additives: foodDetails.additives || [],
        processedScore: foodDetails?.processedScore, // Hypothetical function
      };
      dispatch(setCurrentFood(normalizedData));
    }

    if (singleFoodDetails) {
      const normalizedData = {
        name: singleFoodDetails.name,
        singleFoodId: singleFoodDetails._id,
        environment: "",
        brand: "Fresh", // Not applicable for single foods
        isConsumedToday: singleFoodDetails.isConsumedToday, // Not applicable for single foods
        isInGroceryList: singleFoodDetails?.isInGroceryList, // Not applicable for single foods
        image_url: singleFoodDetails?.image_url || DEFAULT_IMAGE,
        description: singleFoodDetails.description,
        barcode: "", // Empty since single foods don't have barcodes
        ingredients: [singleFoodDetails.name],
        additives: [], // Assuming no additives for single foods
        processedScore: singleFoodDetails.processedScore || 100, // Default to 0 if not present
      };
      dispatch(setCurrentFood(normalizedData));
    }
  }, [foodDetails, singleFoodDetails]);

  if (isLoading) {
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
    foodDetailToast: ({ text1, props }) => (
      <Pressable onPress={() => navigation.navigate('GroceriesStack')} style={{ height: 44, width: '90%', backgroundColor: COLOURS.nearBlack, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        <Text style={{color: 'white', fontFamily: 'Mulish_500Medium', fontSize: 14}}>Item added to grocery list</Text>
        <Text style={{color: 'white', fontFamily: 'Mulish_600SemiBold', fontSize: 14}}>View</Text>
      </Pressable>
    )
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Top simple info */}
      <FoodDetailsSimpleInfo
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        foodItem={foodDetails}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {currentFood?.processedScore && <FoodDetailsScoreStrip />}
        {currentFood?.additives?.length > 0 && <FoodDetailsLessonCarousel />}
        {currentFood?.description && <Text>{currentFood?.description}</Text>}
        {currentFood?.ingredients && <FoodDetailsIngredientsList />}
        {!currentFood?.ingredients && (
          <Button title="Add Missing ingredients" />
        )}
        {currentFood?.environment && (
          <View>
            <Text>
              {currentFood?.environment?.hasPalmOil == "Yes"
                ? "Has Palm Oil"
                : currentFood?.environment?.hasPalmOil == "Unknown"
                ? "Unsure palm oil"
                : "No palm oil found"}
            </Text>
            <Text>{currentFood?.environment?.co2Footprint}</Text>
          </View>
        )}
      </ScrollView>
      <Toast position="bottom" config={toastConfig} />
    </SafeAreaView>
  );
};

export default FoodDetails;
