import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import COLOURS from "../constants/colours";
import EmptyGroceries from "../components/groceries/EmptyGroceries";
import { Path, Svg } from "react-native-svg";
import SortButton from "../components/groceries/SortButton";
import FilterButton from "../components/groceries/FilterButton";
import ShareList from "../components/groceries/ShareListButton";
import UnmarkButton from "../components/groceries/UnmarkButton";
import GroceryList from "../components/groceries/GroceryList";
import { getGroceryList, updateSortPreference } from "../axiosAPI/groceryAPI";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import TopActions from "../components/groceries/TopActions";
import FoodDetails from "./FoodDetails";
import { useGrocerySortPreference } from "../hooks/useGrocerySortPreference";
import LoadingGroceries from "../components/groceries/LoadingGroceries";
import { useColourTheme } from "../context/Themed";
import { themedColours } from "../constants/themedColours";
import ErrorPage from "./ErrorPage";

const Groceries = ({ navigation }) => {
  const {theme} = useColourTheme()
  const currentGroceries = useSelector(
    (state) => state.grocery.currentGroceries
  );
  const anyChecked = currentGroceries.some(
    (groceryItem) => groceryItem.checked === true
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["Groceries"],
    queryFn: getGroceryList,
    // staleTime: 1000 * 60 * 60,
    // gcTime: 1000 * 60 * 60,
    retry: 1,
  });

  const { handleAddFirstItem, handleSortPress, updateSortMutation } =
    useGrocerySortPreference(data);

  if (isLoading) return <LoadingGroceries />;
  if (isError) return <ErrorPage onPress={() => refetch()} />

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: themedColours.primaryBackground[theme]}]}>
      {(data?.groceries?.length == 0 || !data) && (
        <EmptyGroceries onPress={handleAddFirstItem} />
      )}
      {data && data?.groceries?.length > 0 && (
        <>
          <View>
            <TopActions />
            {/* Buttons */}
            <ScrollView
              horizontal={true}
              scrollEnabled={anyChecked}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.buttonsContainer, {borderBottomColor: themedColours.stroke[theme]}]}
            >
              <SortButton onPress={handleSortPress} />
              {anyChecked && <UnmarkButton />}
              <ShareList />
            </ScrollView>
          </View>
          <GroceryList data={data} />
        </>
      )}
    </SafeAreaView>
  );
};

export default Groceries;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "white",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 4,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.lightGray,
    minWidth: '100%'
    // flex: 1
  },
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
  toastLeftText: {
    color: "white",
    fontFamily: "Mulish_500Medium",
    fontSize: 14,
  },
  toastRightText: {
    color: "white",
    fontFamily: "Mulish_600SemiBold",
    fontSize: 14,
  },
});
