import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  setCurrentGroceries,
  setSortPreference,
  sortByProcessedScore,
} from "../redux/grocerySlice";
import { updateSortPreference } from "../axiosAPI/groceryAPI";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export const useGrocerySortPreference = (data) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigation = useNavigation()
  
  useEffect(() => {
    if (data) {
      handleSortPreferenceChange(data?.sortPreference);
    }
  }, [data]);

  const handleSortPreferenceChange = (preference) => {
    if (preference === "Processed Score") {
      dispatch(sortByProcessedScore(data?.groceries));
    } else if (preference === "Manual") {
      dispatch(setCurrentGroceries(data));
    }
    dispatch(setSortPreference(preference));
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

  const handleAddFirstItem = () => {
    navigation.navigate("ScanStack");
  };
  return {handleSortPress, handleAddFirstItem, updateSortMutation};
};
