import { View, Text, StyleSheet, Keyboard, Pressable } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import COLOURS from "../../constants/colours";
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import FoodListItem from "../diary/FoodListItem";
import {
  clearRecentScans,
  getRecentScans,
} from "../../utils/RecentsStorageHelper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const RecentSearchList = () => {
  const [recentList, setRecentList] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchRecents = async () => {
        const recents = await getRecentScans(); //From storage
        setRecentList(recents);
      };

      fetchRecents();

      return () => {
        // Cleanup logic here (if needed)
      };
    }, [])
  );

  // const handleClearRecent = async () => {
  //   setRecentList([]);
  //   await clearRecentScans(); // From storage
  // };

  const handleListItemPress = (item) => {
    navigation.navigate("FoodDetails", {
      singleFoodId: item.singleFoodId,
      barcodeId: item.barcode,
    });
  };

  return (
    <>
      <View
        style={styles.container}
      >
        <Text style={styles.recentText}>Recent</Text>
        {/* <Pressable onPress={handleClearRecent}>
          <Text style={{fontFamily: 'Mulish_500Medium'}}>Clear</Text>
        </Pressable> */}
      </View>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={Keyboard.dismiss}
        keyboardShouldPersistTaps={"always"}
      >
        <BottomSheetView style={styles.foodListContainer}>
          {recentList.length === 0 && <Text>Need to add recents...</Text>}
          {recentList.length > 0 &&
            recentList.map((item) => (
              <Pressable
                onPress={() => handleListItemPress(item)}
                key={item.image_url + item.name}
              >
                <View style={styles.foodListItemContainer}>
                  <FoodListItem foodItem={item} />
                </View>
              </Pressable>
            ))}
        </BottomSheetView>
      </BottomSheetScrollView>
    </>
  );
};

export default RecentSearchList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  foodListContainer: {
    borderTopWidth: 2,
    borderTopColor: "white",
    marginBottom: 80,
  },
  foodListItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.lightGray,
    paddingVertical: 2,
  },
  recentText: { fontSize: 16, paddingBottom: 10, fontFamily: "Mulish_700Bold" },
});
