import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from "../../constants/colours";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uncheckAllItems } from "../../axiosAPI/groceryAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  restartCount,
  setCurrentGroceries,
  unmarkAllChecked,
} from "../../redux/grocerySlice";
import UnmarkIcon from "../../svgs/UnmarkIcon";
import Toast from "react-native-toast-message";

const UnmarkButton = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const unMarkMutation = useMutation({
    mutationFn: uncheckAllItems,
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ["Groceries"]});
    },
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['Groceries']);

      // Snapshot the previous value
      const previousGroceries = queryClient.getQueryData(['Groceries']);

      // Optimistically update to the new value
      dispatch(unmarkAllChecked());

      return { previousGroceries };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      dispatch(setCurrentGroceries(context.previousGroceries))
      Toast.show({
        type: 'customErrorToast',
        text1: 'Unmark all failed, please try again later'
      });
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
