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
import AddToBasketIcon from "../svgs/AddToBasketIcon";
import COLOURS from "../constants/colours";
import EmptyGroceries from "../components/groceries/EmptyGroceries";
import { Path, Svg } from "react-native-svg";
import SortButton from "../components/groceries/SortButton";
import FilterButton from "../components/groceries/FilterButton";
import ShareList from "../components/groceries/ShareListButton";
import UnmarkButton from "../components/groceries/UnmarkButton";
import GroceryList from "../components/groceries/GroceryList";
import { getGroceryList, updateSortPreference } from "../axiosAPI/groceryAPI";
import { useDispatch } from "react-redux";
import {
  setCurrentGroceries,
  sortByProcessedScore,
} from "../redux/grocerySlice";
import SortOptionsModal from "../components/groceries/SortOptionsModal";
import ContextMenu from "react-native-context-menu-view";
import Toast from "react-native-toast-message";
const Groceries = ({ navigation }) => {
  const [showUnmark, setShowUnmark] = useState(true);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["Groceries"],
    queryFn: getGroceryList,
  });

  useEffect(() => {
    if (data) fetchSortPreference(data?.sortPreference)
  }, [data]);

  const fetchSortPreference = (preference) => {
    if (preference === "Processed Score") {
      dispatch(sortByProcessedScore(data?.groceries));
    } else if (preference === 'Manual') {
      dispatch(setCurrentGroceries(data));
    }
  }

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
    groceryToast: ({ text1, props }) => (
      <Pressable style={{ height: 44, width: '90%', backgroundColor: COLOURS.nearBlack, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        <Text style={{color: 'white', fontFamily: 'Mulish_500Medium', fontSize: 14}}>Item added to grocery list</Text>
        <Text style={{color: 'white', fontFamily: 'Mulish_600SemiBold', fontSize: 14}}>View</Text>
      </Pressable>
    )
  };

  const handleSortPress = (e) => {
    if (e.nativeEvent.index === 0) {
      updateSortMutation.mutate({ sortPreference: "Manual" });
      dispatch(setCurrentGroceries(data));
    }
    if (e.nativeEvent.index === 1) {
      updateSortMutation.mutate({ sortPreference: "Processed Score" });
      dispatch(sortByProcessedScore(data?.groceries));
    }
  };


  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: "white",
        // position: "relative",
      }}
    >
      {(data?.groceries?.length == 0 || !data) && (
        <EmptyGroceries onPress={handleAddFirstItem} />
      )}
      {data && data?.groceries?.length > 0 && (
        <View>
          {/* Top actions */}
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              justifyContent: "space-between",
              paddingVertical: 15,
            }}
          >
            <Text
              style={{
                color: COLOURS.darkGreen,
                fontSize: 14,
                fontFamily: "Mulish_600SemiBold",
              }}
            >
              Edit
            </Text>
            <Text
              style={{
                color: COLOURS.nearBlack,
                fontSize: 16,
                fontFamily: "Mulish_700Bold",
              }}
            >
              Groceries
            </Text>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <Path
                d="M9.75 1C9.75 0.585786 9.41421 0.25 9 0.25C8.58579 0.25 8.25 0.585786 8.25 1L8.25 8.25H1C0.585786 8.25 0.25 8.58579 0.25 9C0.25 9.41421 0.585786 9.75 1 9.75H8.25V17C8.25 17.4142 8.58579 17.75 9 17.75C9.41421 17.75 9.75 17.4142 9.75 17V9.75H17C17.4142 9.75 17.75 9.41421 17.75 9C17.75 8.58579 17.4142 8.25 17 8.25H9.75L9.75 1Z"
                fill="#1F2C35"
              />
            </Svg>
          </View>
          {/* Buttons */}
          <ScrollView
            horizontal={true}
            scrollEnabled={showUnmark}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.buttonsContainer}
          >
            {/* Put context menu in sort button coomponent */}
            <ContextMenu
              actions={[
                { title: "Manual" },
                { title: "processedScore" },
                { title: "Date" },
              ]}
              dropdownMenuMode={true}
              onPress={handleSortPress}
            >
              <SortButton />
            </ContextMenu>
            <FilterButton />
            {showUnmark && <UnmarkButton />}
            <ShareList />
          </ScrollView>

          <GroceryList data={data} />
        </View>
      )}
      {/* {showSortOptions && (
        <SortOptionsModal onPress={() => setShowSortOptions(false)} />
      )} */}
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default Groceries;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 4,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.lightGray,
    // overflow: "hidden",
    // width: "100%",
  },
});
