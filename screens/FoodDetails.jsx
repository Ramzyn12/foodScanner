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
const FoodDetails = ({ navigation, route }) => {
  const barcode = route?.params?.barcodeId;

  const {
    data: foodDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["FoodDetails", barcode],
    retry: false,
    queryFn: () => fetchFoodWithBarcode(barcode),
  });

  const [modalVisible, setModalVisible] = useState(false);

  if (isLoading) {
    return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><ActivityIndicator /></View>
  }

  if (isError) {
    return <Text>Product doesnt exist...</Text>
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Top simple info */}
      <FoodDetailsSimpleInfo
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        foodItem={foodDetails}
      />
      <FoodDetailsScoreStrip nova_group={foodDetails?.nova_group} />
      <ScrollView>
        <FoodDetailsLessonCarousel additives={foodDetails?.additives} />
        <FoodDetailsIngredientsList ingredients={foodDetails?.ingredients} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodDetails;
