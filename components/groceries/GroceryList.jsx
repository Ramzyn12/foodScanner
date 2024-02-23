import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import COLOURS from "../../constants/colours";
import FoodListItem from "../FoodListItem";
import GroceryListItem from "./GroceryListItem";
import { BlurView } from "expo-blur";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getGroceryList, updateOrder } from "../../axiosAPI/groceryAPI";
import { useDispatch, useSelector } from "react-redux";
import DraggableFlatList from "react-native-draggable-flatlist";
import { updateGroceryOrder } from "../../redux/grocerySlice";
import { useFocusEffect } from "@react-navigation/native";
const GroceryList = () => {
  const groceries = useSelector((state) => state?.grocery?.currentGroceries);
  // const orderedGroceries = groceries.itemOrder.map(id => groceries.find(item => item._id === id));
  const dispatch = useDispatch();
  const [newOrder, setNewOrder] = useState([]); // Temporary state to hold the new order

  console.log(groceries);
  const renderItem = ({ item, drag, isActive }) => {
    return (
      <GroceryListItem
        foodItem={item.item}
        id={item._id}
        onLongPress={drag}
        isActive={isActive}
      />
    );
  };

  const updateOrderMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      console.log('order updated');
    },
    onError: (err) => {
      console.log(' failed', err);
    },
  })

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (newOrder.length > 0) {
          updateOrderMutation.mutate({ itemOrder: newOrder });
          setNewOrder([]); // Reset the temporary state
        }
      };
    }, [newOrder, updateOrderMutation, dispatch])
  );

  const handleDragEnd = ({ data }) => {
    // const itemOrder = data.map(item => item._id);
    // updateOrderMutation.mutate({itemOrder})

    setNewOrder(data.map(item => item.item._id));
    dispatch(updateGroceryOrder(data));
  };


  return (
    <View style={{ paddingBottom: 120 }}>
      {groceries && groceries.length > 0 &&  <DraggableFlatList
        data={groceries}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item._id}`}
        onDragEnd={handleDragEnd}
      />}
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
