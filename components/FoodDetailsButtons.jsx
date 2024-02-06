import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from "../constants/colours";
import { StyleSheet } from "react-native";
import DeleteIcon from "../svgs/DeleteIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFoodToDiaryDay, removeFoodFromDiaryDay } from "../axiosAPI/diaryDayAPI";

const FoodDetailsButtons = ({foodItem}) => {
  const [added, setAdded] = useState(foodItem?.isConsumedToday || false);
  const queryClient = useQueryClient()

  const addFoodMutation = useMutation({
    mutationFn: addFoodToDiaryDay,
    onSuccess: () => {
      //Invalidate some queries
      queryClient.invalidateQueries(["DiaryDay"])
    },
    onError: (err) => {
      console.log(err, "HERE");
    },
  });
  const removeFoodMutation = useMutation({
    mutationFn: removeFoodFromDiaryDay,
    onSuccess: () => {
      //Invalidate some queries
      queryClient.invalidateQueries(["DiaryDay"])
    },
    onError: (err) => {
      console.log(err, "HERE");
    },
  });

  const handleAddFoodItem = () => {
    addFoodMutation.mutate({
      barcode: foodItem?.barcode,
      name: foodItem?.product_name,
      brand: foodItem?.brand || 'Tesco',
      image_url: foodItem?.image_url,
      ingredients: foodItem?.ingredients || [], // Assuming ingredients is an array
      additives: foodItem?.additives || [], // Assuming additives is an array
      nova_group: foodItem?.nova_group, // Make sure you have this value in foodDetails
    });
    setAdded(true);
  };
  
  const handleRemoveFoodItem = () => {
    removeFoodMutation.mutate({barcode: foodItem?.barcode});
    setAdded(false);
  };

  return (
    <View style={{ flexDirection: "row", gap: 12, marginTop: 15 }}>
      {!added && (
        <Pressable onPress={handleAddFoodItem} style={styles.addButton}>
          <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <Path
              d="M8.62516 1.33331C8.62516 0.988135 8.34534 0.708313 8.00016 0.708313C7.65498 0.708313 7.37516 0.988135 7.37516 1.33331L7.37516 7.37498H1.3335C0.988318 7.37498 0.708496 7.6548 0.708496 7.99998C0.708496 8.34516 0.988318 8.62498 1.3335 8.62498H7.37516V14.6666C7.37516 15.0118 7.65498 15.2916 8.00016 15.2916C8.34534 15.2916 8.62516 15.0118 8.62516 14.6666V8.62498H14.6668C15.012 8.62498 15.2918 8.34516 15.2918 7.99998C15.2918 7.6548 15.012 7.37498 14.6668 7.37498H8.62516L8.62516 1.33331Z"
              fill="#F7F6EF"
            />
          </Svg>
          <Text style={styles.addTodayText}>Add today</Text>
        </Pressable>
      )}
      {added && (
        <Pressable
          onPress={handleRemoveFoodItem}
          style={[styles.addButton, styles.removeButton]}
        >
          <DeleteIcon />
          <Text style={[styles.addTodayText, { color: "#DB1200" }]}>
            Remove
          </Text>
        </Pressable>
      )}
      <Pressable style={[styles.addButton, styles.addToListButton]}>
        <Svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <Path
            d="M16.5595 7.62146L15.8405 7.40816L16.5595 7.62146ZM15.7407 10.3815L16.4597 10.5948L15.7407 10.3815ZM4.25896 10.3815L4.97798 10.1682L4.25896 10.3815ZM3.44018 7.62145L2.72115 7.83475H2.72115L3.44018 7.62145ZM7.48751 14.504L7.695 13.7833H7.695L7.48751 14.504ZM5.12937 12.7439L4.49742 13.1478L5.12937 12.7439ZM14.8703 12.7439L15.5023 13.1478L14.8703 12.7439ZM12.5122 14.504L12.3047 13.7833L12.5122 14.504ZM17.394 4.66666V3.91666H16.8051L16.6654 4.48868L17.394 4.66666ZM2.60569 4.66666V3.91666H1.65044L1.87711 4.84463L2.60569 4.66666ZM1.6665 3.91666C1.25229 3.91666 0.916504 4.25244 0.916504 4.66666C0.916504 5.08087 1.25229 5.41666 1.6665 5.41666V3.91666ZM18.3332 5.41666C18.7474 5.41666 19.0832 5.08087 19.0832 4.66666C19.0832 4.25244 18.7474 3.91666 18.3332 3.91666V5.41666ZM12.4165 7.99999C12.4165 7.58577 12.0807 7.24999 11.6665 7.24999C11.2523 7.24999 10.9165 7.58577 10.9165 7.99999H12.4165ZM10.9165 11.3333C10.9165 11.7475 11.2523 12.0833 11.6665 12.0833C12.0807 12.0833 12.4165 11.7475 12.4165 11.3333H10.9165ZM13.0302 0.802983C12.7373 0.51009 12.2624 0.51009 11.9695 0.802983C11.6766 1.09588 11.6766 1.57075 11.9695 1.86364L13.0302 0.802983ZM8.23237 1.86366C8.52526 1.57076 8.52526 1.09589 8.23237 0.802996C7.93948 0.510102 7.4646 0.510102 7.17171 0.802996L8.23237 1.86366ZM9.08317 7.99999C9.08317 7.58577 8.74738 7.24999 8.33317 7.24999C7.91896 7.24999 7.58317 7.58577 7.58317 7.99999H9.08317ZM7.58317 11.3333C7.58317 11.7475 7.91896 12.0833 8.33317 12.0833C8.74738 12.0833 9.08317 11.7475 9.08317 11.3333H7.58317ZM15.8405 7.40816L15.0217 10.1682L16.4597 10.5948L17.2785 7.83476L15.8405 7.40816ZM4.97798 10.1682L4.1592 7.40815L2.72115 7.83475L3.53993 10.5948L4.97798 10.1682ZM9.99984 13.9167C8.65404 13.9167 8.13349 13.9095 7.695 13.7833L7.28002 15.2248C7.97131 15.4238 8.74906 15.4167 9.99984 15.4167V13.9167ZM3.53993 10.5948C3.89565 11.794 4.11002 12.5416 4.49742 13.1478L5.76133 12.34C5.5156 11.9555 5.36073 11.4584 4.97798 10.1682L3.53993 10.5948ZM7.695 13.7833C6.89635 13.5534 6.20889 13.0402 5.76133 12.34L4.49742 13.1478C5.14147 14.1555 6.13075 14.8939 7.28002 15.2248L7.695 13.7833ZM15.0217 10.1682C14.6389 11.4585 14.4841 11.9555 14.2383 12.34L15.5023 13.1478C15.8897 12.5416 16.104 11.794 16.4597 10.5948L15.0217 10.1682ZM9.99984 15.4167C11.2506 15.4167 12.0284 15.4238 12.7197 15.2248L12.3047 13.7833C11.8662 13.9095 11.3456 13.9167 9.99984 13.9167V15.4167ZM14.2383 12.34C13.7908 13.0402 13.1033 13.5534 12.3047 13.7833L12.7197 15.2248C13.8689 14.8939 14.8582 14.1555 15.5023 13.1478L14.2383 12.34ZM17.2785 7.83476C17.6296 6.65142 17.9211 5.66936 18.1226 4.84463L16.6654 4.48868C16.4746 5.2699 16.1953 6.21214 15.8405 7.40816L17.2785 7.83476ZM4.1592 7.40815C3.80441 6.21214 3.5251 5.2699 3.33427 4.48868L1.87711 4.84463C2.07857 5.66935 2.37011 6.65142 2.72115 7.83475L4.1592 7.40815ZM10.9165 7.99999V11.3333H12.4165V7.99999H10.9165ZM7.58317 7.99999V11.3333H9.08317V7.99999H7.58317ZM11.9695 1.86364L15.3029 5.19699L16.3635 4.13632L13.0302 0.802983L11.9695 1.86364ZM15.8332 5.41666H17.4998V3.91666H15.8332V5.41666ZM17.4998 5.41666H18.3332V3.91666H17.4998V5.41666ZM17.394 5.41666H17.4998V3.91666H17.394V5.41666ZM1.6665 5.41666H4.36871V3.91666H1.6665V5.41666ZM4.36871 5.41666H15.8332V3.91666H4.36871V5.41666ZM7.17171 0.802996L3.83838 4.13632L4.89904 5.19699L8.23237 1.86366L7.17171 0.802996ZM2.60569 5.41666H4.36871V3.91666H2.60569V5.41666Z"
            fill="#1F2C35"
          />
        </Svg>
        <Text style={styles.addToListText}>Add to list</Text>
      </Pressable>
    </View>
  );
};

export default FoodDetailsButtons;

const styles = StyleSheet.create({
  addButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    gap: 8,
    paddingVertical: 8,
    backgroundColor: COLOURS.darkGreen,
  },
  addToListButton: {
    borderColor: COLOURS.lightGray,
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  removeButton: {
    backgroundColor: "rgba(219, 18, 0, 0.08)",
  },
  addToListText: {
    fontFamily: "Mulish_600SemiBold",
    fontSize: 16,
    color: COLOURS.nearBlack,
  },
  addTodayText: {
    fontFamily: "Mulish_600SemiBold",
    fontSize: 16,
    color: COLOURS.lightGreen,
  },
});
