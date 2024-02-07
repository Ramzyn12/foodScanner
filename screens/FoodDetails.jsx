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
import { useDispatch } from "react-redux";
const FoodDetails = ({ navigation, route }) => {
  const barcode = route?.params?.barcodeId;
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (foodDetails) {
      dispatch(setCurrentFood(foodDetails)); // Action to fetch food details
    }
  }, [foodDetails]);


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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Top simple info */}
      <FoodDetailsSimpleInfo
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        foodItem={foodDetails}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FoodDetailsScoreStrip processedScore={foodDetails?.processedScore} />
        <FoodDetailsLessonCarousel additives={foodDetails?.additives} />
        <FoodDetailsIngredientsList ingredients={foodDetails?.ingredients} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodDetails;
