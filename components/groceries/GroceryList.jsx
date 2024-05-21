import { View, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import COLOURS from "../../constants/colours";
import GroceryListItem from "./GroceryListItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "../../axiosAPI/groceryAPI";
import { useDispatch, useSelector } from "react-redux";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import * as Haptics from "expo-haptics";
import {
  setCurrentGroceries,
  updateGroceryOrder,
} from "../../redux/grocerySlice";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const GroceryList = () => {
  const groceries = useSelector((state) => state?.grocery?.currentGroceries);
  const dispatch = useDispatch();
  const [newOrder, setNewOrder] = useState([]);
  const sortPreference = useSelector((state) => state.grocery.sortPreference);
  const queryClient = useQueryClient();
  const hapticsEnabled = useSelector((state) => state.user.hapticsEnabled);

  const updateOrderMutation = useMutation({
    mutationFn: updateOrder,
    onMutate: async () => {

      await queryClient.cancelQueries(["Groceries"]);

      const previousGroceries = queryClient.getQueryData(["Groceries"]);

      return { previousGroceries };
    },
    onError: (err, variables, context) => {
      dispatch(setCurrentGroceries(context.previousGroceries));
      Toast.show({
        type: "customErrorToast",
        text1: "Failed to sort order, please try again later",
      });
    },
  });

  const renderItem = ({ item, drag, isActive }) => {
    // Don't allow drag unless in manual sort mode
    const onLongPress = sortPreference === "Manual" ? drag : null;

    return (
      <ScaleDecorator>
        <GroceryListItem
          foodItem={item.item}
          id={item._id}
          onLongPress={onLongPress}
          isActive={isActive}
        />
      </ScaleDecorator>
    );
  };

  const renderPlaceholder = useCallback(({ item, isActive, drag }) => {
    return (
      <GroceryListItem
        foodItem={item.item}
        id={item._id}
        onLongPress={drag}
        isActive={isActive}
      />
    );
  }, []);

  // maybe change this to throttle/debounce instead?
  const handleDragEnd = ({ data }) => {
    const orderIds = data.map((item) => item.item._id);
    if (JSON.stringify(orderIds) !== JSON.stringify(newOrder)) {
      setNewOrder(orderIds);
      dispatch(updateGroceryOrder(data));
      updateOrderMutation.mutate({ itemOrder: orderIds });
    }
  };

  const handleIndexChange = () => {
    if (hapticsEnabled) {
      Haptics.selectionAsync();
    }
  };

  return (
    <View style={{ paddingBottom: 120, flex: 1 }}>
      {groceries && groceries.length > 0 && (
        <DraggableFlatList
          data={groceries}
          renderItem={renderItem}
          renderPlaceholder={renderPlaceholder}
          onPlaceholderIndexChange={handleIndexChange}
          keyExtractor={(item, index) => `draggable-item-${item._id}`}
          onDragEnd={handleDragEnd}
          containerStyle={{ flexGrow: 1 }}
        />
      )}
    </View>
  );
};

export default GroceryList;

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
  },

  unChecked: {
    width: 30,
    height: 30,
    marginLeft: 15,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: COLOURS.lightGray,
    borderRadius: 6,
  },
  foodItemContainer: {
    borderBottomWidth: 1,
    flex: 1,
    borderBottomColor: COLOURS.lightGray,
    width: "100%",
    paddingRight: 15,
    paddingVertical: 2,
  },
});
