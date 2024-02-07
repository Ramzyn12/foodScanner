import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFoodWithSearch } from "../axiosAPI/openFoodFactsAPI";
import FoodListItem from "../components/FoodListItem";
import { fetchFoodWithSearchUSDA } from "../axiosAPI/usdaAPI";
const List = () => {
  
  // const { data, isError, error } = useQuery({
  //   queryFn: () => fetchFoodWithSearch("Chicken Breast"),
  //   queryKey: ["searchFood"],
  //   retry: false,
  // });

  // const { data: usdaFoods } = useQuery({
  //   queryFn: () => fetchFoodWithSearchUSDA("Chicken Breast"),
  //   queryKey: ["usdaSearch"],
  //   // retry: false
  // });

  // if (data) console.log(data)
  // if (usdaFoods) console.log(usdaFoods);

  return (
    <SafeAreaView style={{ flex: 1, padding: 30 }}>
      <ScrollView>
        {/* {usdaFoods?.map((item) => (
          <FoodListItem key={item.fdcId} foodItem={item} />
        ))}
        {data?.map((item) => (
          <FoodListItem key={item.barcode} foodItem={item} />
        ))} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default List;
