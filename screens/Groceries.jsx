import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  StyleSheet,
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
import {
  addVirtualGroceryItem,
  setCurrentGroceries,
  setSortPreference,
  sortByProcessedScore,
} from "../redux/grocerySlice";
import Toast from "react-native-toast-message";
import TopActions from "../components/groceries/TopActions";

const Groceries = ({ navigation }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const checkedCount = useSelector((state) => state.grocery.checkedCount);

  const { data } = useQuery({
    queryKey: ["Groceries"],
    queryFn: getGroceryList,
  });

  useEffect(() => {
    if (data) {
      fetchSortPreference(data?.sortPreference);
    }
    console.log("reconfiguring data");
  }, [data]);

  const fetchSortPreference = (preference) => {
    if (preference === "Processed Score") {
      dispatch(sortByProcessedScore(data?.groceries));
    } else if (preference === "Manual") {
      dispatch(setCurrentGroceries(data));
    }
    dispatch(setSortPreference(preference));
  };

  const handleAddFirstItem = () => {
    navigation.navigate("ScanStack");
  };

  const updateSortMutation = useMutation({
    mutationFn: updateSortPreference,
    onSuccess: () => {
      queryClient.invalidateQueries(["Groceries"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const toastConfig = {
    groceryToast: ({ text1, text2, props }) => (
      <Pressable onPress={() => props.onUndo()} style={styles.toastContainer}>
        <Text style={styles.toastLeftText}>{text1}</Text>
        <Text style={styles.toastRightText}>{text2}</Text>
      </Pressable>
    ),
  };

  //Could put this and filter logic in a custom hook? 
  const handleSortPress = (e) => {
    if (e.nativeEvent.index === 0) {
      updateSortMutation.mutate({ sortPreference: "Manual" });
      dispatch(setCurrentGroceries(data));
      dispatch(setSortPreference("Manual"));
    }
    if (e.nativeEvent.index === 1) {
      updateSortMutation.mutate({ sortPreference: "Processed Score" });
      dispatch(sortByProcessedScore(data?.groceries));
      dispatch(setSortPreference("Processed Score"));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {(data?.groceries?.length == 0 || !data) && (
        <EmptyGroceries onPress={handleAddFirstItem} />
      )}
      {data && data?.groceries?.length > 0 && (
        <>
          <View>
            {/* Top actions */}
            <TopActions />
            {/* Buttons */}
            <ScrollView
              horizontal={true}
              scrollEnabled={checkedCount > 0}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.buttonsContainer}
            >
              <SortButton onPress={handleSortPress} />
              <FilterButton />
              {checkedCount > 0 && <UnmarkButton />}
              <ShareList />
            </ScrollView>
          </View>
          <GroceryList data={data} />
        </>
      )}
      <Toast position="bottom" config={toastConfig} />
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
