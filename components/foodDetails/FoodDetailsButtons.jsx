import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from "../../constants/colours";
import { StyleSheet } from "react-native";
import DeleteIcon from "../../svgs/DeleteIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addFoodToDiaryDay,
  removeFoodFromDiaryDay,
} from "../../axiosAPI/diaryDayAPI";
import { useSelector } from "react-redux";
import {
  addFoodToGroceryList,
  removeFoodFromGroceryList,
} from "../../axiosAPI/groceryAPI";
import Toast from "react-native-toast-message";
import { useFoodDetailsActions } from "../../hooks/useFoodDetailsActions";
import PlusIcon from "../../svgs/PlusIcon";
import XIcon from "../../svgs/XIcon";

const handleErrorResponse = (errorResponse, actionType) => {
  const {error} = errorResponse
  Toast.show({
    type: 'foodDetailToast',
    text1: `Failed to ${actionType} food, Please try again later`,
  })
}

const FoodDetailsButtons = ({ expectedId }) => {
  const {
    addedToDiary,
    addedToGroceries,
    handleAddToDiary,
    handleRemoveFromDiary,
    addFoodToDiaryMutation,
    removeFoodFromDiaryMutation,
    addToGroceryListMutation,
    removeFromGroceryListMutation,
    handleAddToGroceryList,
    handleRemoveFromGroceryList,
    buttonsLoaded,
  } = useFoodDetailsActions(expectedId);
  
  useEffect(() => {
    if (addFoodToDiaryMutation.isError && addFoodToDiaryMutation.error?.response?.data) {
      handleErrorResponse(addFoodToDiaryMutation.error.response.data, 'add');
    }
    if (removeFoodFromDiaryMutation.isError && removeFoodFromDiaryMutation.error?.response?.data) {
      handleErrorResponse(removeFoodFromDiaryMutation.error.response.data, 'remove');
    }
    if (addToGroceryListMutation.isError && addToGroceryListMutation.error?.response?.data) {
      handleErrorResponse(addToGroceryListMutation.error.response.data, 'add');
    }
    if (removeFromGroceryListMutation.isError && removeFromGroceryListMutation.error?.response?.data) {
      handleErrorResponse(removeFromGroceryListMutation.error.response.data, 'remove');
    }
  }, [addFoodToDiaryMutation.isError, addFoodToDiaryMutation.error, removeFoodFromDiaryMutation.isError, removeFoodFromDiaryMutation.error, addToGroceryListMutation.isError, addToGroceryListMutation.error,removeFromGroceryListMutation.isError, removeFoodFromDiaryMutation.error,]);


  // Is thius doing anything?? 
  if (!buttonsLoaded) return;

  return (
    <View style={{ flexDirection: "row", gap: 8, marginTop: 15 }}>
      {/* Could reduce down to single button to be neater if needed */}
      {!addedToDiary && (
        <Pressable onPress={handleAddToDiary} style={styles.addButton}>
          <PlusIcon colour={"#F7F6EF"} size={14} />
          <Text style={styles.addTodayText}>Eat today</Text>
        </Pressable>
      )}
      {addedToDiary && (
        <Pressable onPress={handleRemoveFromDiary} style={[styles.addButton]}>
          <XIcon />
          <Text style={[styles.addTodayText]}>Remove</Text>
        </Pressable>
      )}

      {addedToGroceries && (
        <Pressable
          onPress={handleRemoveFromGroceryList}
          style={[styles.addButton, styles.addToListButton]}
        >
          <XIcon size={12} colour={"#1F2C35"} />
          <Text style={styles.addToListText}>Remove from list</Text>
        </Pressable>
      )}
      {!addedToGroceries && (
        <Pressable
          onPress={handleAddToGroceryList}
          style={[styles.addButton, styles.addToListButton]}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
          >
            <Path
              d="M14.9037 6.65933L14.1847 6.44603L14.1847 6.44603L14.9037 6.65933ZM14.1668 9.1434L14.8858 9.3567L14.8858 9.3567L14.1668 9.1434ZM3.83321 9.1434L4.55224 8.9301L4.55224 8.9301L3.83321 9.1434ZM3.0963 6.65932L2.37728 6.87262L2.37728 6.87262L3.0963 6.65932ZM6.73891 12.8536L6.9464 12.1329L6.9464 12.1329L6.73891 12.8536ZM4.61658 11.2695L3.98463 11.6734L3.98463 11.6734L4.61658 11.2695ZM13.3834 11.2695L14.0154 11.6734L14.0154 11.6734L13.3834 11.2695ZM11.2611 12.8536L11.0536 12.1329L11.0536 12.1329L11.2611 12.8536ZM15.6547 4.00001V3.25001H15.0659L14.9262 3.82204L15.6547 4.00001ZM2.34527 4.00001V3.25001H1.39001L1.61669 4.17798L2.34527 4.00001ZM1.5 3.25001C1.08579 3.25001 0.75 3.58579 0.75 4.00001C0.75 4.41422 1.08579 4.75001 1.5 4.75001V3.25001ZM16.5 4.75001C16.9142 4.75001 17.25 4.41422 17.25 4.00001C17.25 3.58579 16.9142 3.25001 16.5 3.25001V4.75001ZM11.25 7.00001C11.25 6.58579 10.9142 6.25001 10.5 6.25001C10.0858 6.25001 9.75 6.58579 9.75 7.00001H11.25ZM9.75 10C9.75 10.4142 10.0858 10.75 10.5 10.75C10.9142 10.75 11.25 10.4142 11.25 10H9.75ZM11.7804 0.46967C11.4875 0.176777 11.0126 0.176777 10.7197 0.46967C10.4268 0.762563 10.4268 1.23744 10.7197 1.53033L11.7804 0.46967ZM7.46231 1.53034C7.7552 1.23745 7.7552 0.762575 7.46231 0.469681C7.16942 0.176788 6.69454 0.176788 6.40165 0.469681L7.46231 1.53034ZM8.25 7.00001C8.25 6.58579 7.91421 6.25001 7.5 6.25001C7.08579 6.25001 6.75 6.58579 6.75 7.00001H8.25ZM6.75 10C6.75 10.4142 7.08579 10.75 7.5 10.75C7.91421 10.75 8.25 10.4142 8.25 10H6.75ZM14.1847 6.44603L13.4478 8.9301L14.8858 9.3567L15.6227 6.87263L14.1847 6.44603ZM4.55224 8.9301L3.81533 6.44602L2.37728 6.87262L3.11418 9.3567L4.55224 8.9301ZM9 12.25C7.78403 12.25 7.3284 12.2429 6.9464 12.1329L6.53142 13.5744C7.16622 13.7571 7.87905 13.75 9 13.75V12.25ZM3.11418 9.3567C3.43297 10.4314 3.62888 11.1168 3.98463 11.6734L5.24854 10.8656C5.03446 10.5306 4.89806 10.0958 4.55224 8.9301L3.11418 9.3567ZM6.9464 12.1329C6.24515 11.931 5.64152 11.4805 5.24854 10.8656L3.98463 11.6734C4.5741 12.5957 5.47954 13.2715 6.53142 13.5744L6.9464 12.1329ZM13.4478 8.9301C13.1019 10.0959 12.9655 10.5306 12.7515 10.8656L14.0154 11.6734C14.3711 11.1168 14.567 10.4314 14.8858 9.3567L13.4478 8.9301ZM9 13.75C10.121 13.75 10.8338 13.7571 11.4686 13.5744L11.0536 12.1329C10.6716 12.2429 10.216 12.25 9 12.25V13.75ZM12.7515 10.8656C12.3585 11.4805 11.7549 11.931 11.0536 12.1329L11.4686 13.5744C12.5205 13.2715 13.4259 12.5957 14.0154 11.6734L12.7515 10.8656ZM15.6227 6.87263C15.9385 5.80826 16.2015 4.92241 16.3833 4.17798L14.9262 3.82204C14.7549 4.52296 14.5042 5.36898 14.1847 6.44603L15.6227 6.87263ZM3.81533 6.44602C3.49583 5.36898 3.24506 4.52295 3.07385 3.82204L1.61669 4.17798C1.79853 4.92241 2.06153 5.80826 2.37728 6.87262L3.81533 6.44602ZM9.75 7.00001V10H11.25V7.00001H9.75ZM6.75 7.00001V10H8.25V7.00001H6.75ZM10.7197 1.53033L13.7197 4.53034L14.7804 3.46968L11.7804 0.46967L10.7197 1.53033ZM14.25 4.75001H15.75V3.25001H14.25V4.75001ZM15.75 4.75001H16.5V3.25001H15.75V4.75001ZM15.6547 4.75001H15.75V3.25001H15.6547V4.75001ZM1.5 4.75001H3.93198V3.25001H1.5V4.75001ZM3.93198 4.75001H14.25V3.25001H3.93198V4.75001ZM6.40165 0.469681L3.40165 3.46968L4.46231 4.53034L7.46231 1.53034L6.40165 0.469681ZM2.34527 4.75001H3.93198V3.25001H2.34527V4.75001Z"
              fill="#1F2C35"
            />
          </Svg>
          <Text style={styles.addToListText}>{"Add to list"}</Text>
        </Pressable>
      )}
      {/* <Pressable style={[styles.addButton, styles.addToListButton]}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <Path
            d="M4.41337 14.7038L4.29604 15.4446H4.29605L4.41337 14.7038ZM1.29617 11.5866L0.555402 11.704H0.555403L1.29617 11.5866ZM14.7038 11.5866L15.4446 11.704V11.704L14.7038 11.5866ZM11.5866 14.7038L11.704 15.4446H11.704L11.5866 14.7038ZM14.5999 6.79956C14.3512 6.46837 13.881 6.40156 13.5498 6.65032C13.2186 6.89909 13.1518 7.36924 13.4006 7.70043L14.5999 6.79956ZM2.5994 7.70043C2.84817 7.36924 2.78135 6.89909 2.45016 6.65032C2.11897 6.40156 1.64882 6.46837 1.40005 6.79956L2.5994 7.70043ZM7.25 11.75C7.25 12.1642 7.58579 12.5 8 12.5C8.41422 12.5 8.75 12.1642 8.75 11.75H7.25ZM4.41232 3.78403C4.15497 4.1086 4.20946 4.58034 4.53403 4.83768C4.8586 5.09503 5.33034 5.04054 5.58768 4.71597L4.41232 3.78403ZM6.04839 2.92777L5.4607 2.4618V2.4618L6.04839 2.92777ZM9.95162 2.92777L10.5393 2.4618L9.95162 2.92777ZM10.4123 4.71597C10.6697 5.04054 11.1414 5.09503 11.466 4.83768C11.7905 4.58034 11.845 4.1086 11.5877 3.78403L10.4123 4.71597ZM7.812 1.26492L7.694 0.524259L7.69399 0.524259L7.812 1.26492ZM8.188 1.26492L8.30601 0.524259L8.30601 0.524259L8.188 1.26492ZM14 9.5V10.25H15.5V9.5H14ZM10.25 14H5.75V15.5H10.25V14ZM2 10.25V9.5H0.5V10.25H2ZM5.75 14C5.02459 14 4.7492 13.9977 4.53069 13.9631L4.29605 15.4446C4.66054 15.5023 5.0819 15.5 5.75 15.5V14ZM0.5 10.25C0.5 10.9181 0.497672 11.3395 0.555402 11.704L2.03694 11.4693C2.00233 11.2508 2 10.9754 2 10.25H0.5ZM4.5307 13.9631C3.24702 13.7597 2.24025 12.753 2.03693 11.4693L0.555403 11.704C0.860374 13.6295 2.37053 15.1396 4.29604 15.4446L4.5307 13.9631ZM14 10.25C14 10.9754 13.9977 11.2508 13.9631 11.4693L15.4446 11.704C15.5023 11.3395 15.5 10.9181 15.5 10.25H14ZM10.25 15.5C10.9181 15.5 11.3395 15.5023 11.704 15.4446L11.4693 13.9631C11.2508 13.9977 10.9754 14 10.25 14V15.5ZM13.9631 11.4693C13.7598 12.753 12.753 13.7597 11.4693 13.9631L11.704 15.4446C13.6295 15.1396 15.1396 13.6295 15.4446 11.704L13.9631 11.4693ZM15.5 9.5C15.5 8.48782 15.1649 7.55173 14.5999 6.79956L13.4006 7.70043C13.7772 8.20176 14 8.82377 14 9.5H15.5ZM2 9.5C2 8.82377 2.22284 8.20176 2.5994 7.70043L1.40005 6.79956C0.835078 7.55173 0.5 8.48782 0.5 9.5H2ZM8.75 11.75V2H7.25V11.75H8.75ZM5.58768 4.71597L6.63607 3.39374L5.4607 2.4618L4.41232 3.78403L5.58768 4.71597ZM9.36393 3.39374L10.4123 4.71597L11.5877 3.78403L10.5393 2.4618L9.36393 3.39374ZM6.63607 3.39374C7.06549 2.85216 7.34846 2.49713 7.584 2.26067C7.81621 2.02757 7.90874 2.00896 7.93001 2.00558L7.69399 0.524259C7.20574 0.602051 6.83451 0.887643 6.5213 1.20206C6.21143 1.51313 5.86735 1.94893 5.4607 2.4618L6.63607 3.39374ZM10.5393 2.4618C10.1327 1.94893 9.78857 1.51313 9.4787 1.20206C9.1655 0.887643 8.79426 0.602051 8.30601 0.524259L8.06999 2.00558C8.09126 2.00896 8.1838 2.02757 8.416 2.26068C8.65155 2.49713 8.93452 2.85216 9.36393 3.39374L10.5393 2.4618ZM7.93001 2.00558C7.95354 2.00183 7.97687 2 8 2V0.5C7.89755 0.5 7.7953 0.508119 7.694 0.524259L7.93001 2.00558ZM8 2C8.02313 2 8.04646 2.00183 8.07 2.00558L8.30601 0.524259C8.2047 0.508119 8.10246 0.5 8 0.5V2ZM8.75 2V1.25H7.25V2H8.75Z"
            fill="#2D264B"
          />
        </Svg>
        <Text style={styles.addToListText}>Share</Text>
      </Pressable> */}
    </View>
  );
};

export default FoodDetailsButtons;

const styles = StyleSheet.create({
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    justifyContent: "center",
    flex: 1,

    borderRadius: 20,
    gap: 8,
    height: 36,
    backgroundColor: COLOURS.darkGreen,
  },
  addToListButton: {
    borderColor: COLOURS.lightGray,
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  addToListText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 14,
    color: COLOURS.nearBlack,
  },
  addTodayText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 14,
    color: COLOURS.lightGreen,
  },
});
