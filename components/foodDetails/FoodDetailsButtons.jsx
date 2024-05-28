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
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";


const FoodDetailsButtons = ({ expectedId }) => {
  const {theme} = useColourTheme()
  const {
    addedToDiary,
    addedToGroceries,
    handleAddToDiary,
    handleRemoveFromDiary,
    handleAddToGroceryList,
    handleRemoveFromGroceryList,
    buttonsLoaded,
  } = useFoodDetailsActions(expectedId);
  

  // Is thius doing anything?? 
  if (!buttonsLoaded) return;

  return (
    <View style={{ flexDirection: "row", gap: 8, marginTop: 15 }}>
      {/* Could reduce down to single button to be neater if needed */}
      {!addedToDiary && (
        <Pressable onPress={handleAddToDiary} style={[styles.addButton, {backgroundColor: themedColours.primary[theme]}]}>
          <PlusIcon colour={themedColours.primaryBackground[theme]} size={14} />
          <Text style={[styles.addTodayText, {color: themedColours.primaryBackground[theme]}]}>Eat today</Text>
        </Pressable>
      )}
      {addedToDiary && (
        <Pressable onPress={handleRemoveFromDiary} style={[styles.addButton, {backgroundColor: themedColours.primary[theme]}]}>
          <XIcon colour={themedColours.primaryBackground[theme]} />
          <Text style={[styles.addTodayText, {color: themedColours.primaryBackground[theme]}]}>Remove</Text>
        </Pressable>
      )}

      {addedToGroceries && (
        <Pressable
          onPress={handleRemoveFromGroceryList}
          style={[styles.addButton, styles.addToListButton, {borderColor: themedColours.stroke[theme]}]}
        >
          <XIcon size={12} colour={themedColours.primaryText[theme]} />
          <Text style={[styles.addToListText, {color: themedColours.primaryText[theme]}]}>Remove from list</Text>
        </Pressable>
      )}
      {!addedToGroceries && (
        <Pressable
          onPress={handleAddToGroceryList}
          style={[styles.addButton, styles.addToListButton, {borderColor: themedColours.stroke[theme]}]}
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
              fill={themedColours.primaryText[theme]}
            />
          </Svg>
          <Text style={[styles.addToListText, {color: themedColours.primaryText[theme]}]}>{"Add to list"}</Text>
        </Pressable>
      )}
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
