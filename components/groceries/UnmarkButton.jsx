import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from "../../constants/colours";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uncheckAllItems } from "../../axiosAPI/groceryAPI";
import { useDispatch } from "react-redux";
import { restartCount, setCurrentGroceries } from "../../redux/grocerySlice";
import UnmarkIcon from "../../svgs/UnmarkIcon";

const UnmarkButton = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch()
  const unMarkMutation = useMutation({
    mutationFn: uncheckAllItems,
    onSuccess: () => {
      dispatch(restartCount())
      queryClient.invalidateQueries(["Groceries"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleUnselectAll = () => {
    unMarkMutation.mutate();
  };

  return (
    <Pressable onPress={handleUnselectAll} style={styles.container}>
      <UnmarkIcon />
      <Text style={styles.buttonText}>Unmark all</Text>
    </Pressable>
  );
};

export default UnmarkButton;

const styles = StyleSheet.create({
  container: {
    height: 36,
    paddingHorizontal: 15,
    gap: 8,
    borderWidth: 1,
    borderColor: COLOURS.lightGray,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Mulish_600SemiBold",
    color: COLOURS.nearBlack,
  },
});
