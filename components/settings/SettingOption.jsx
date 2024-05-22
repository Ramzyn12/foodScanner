import { View, Text, Switch, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import COLOURS from "../../constants/colours";
import { Path, Svg } from "react-native-svg";
import ArrowRight from "../../svgs/ArrowRight";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserHaptics, toggleUserHaptics } from "../../axiosAPI/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { setHapticSetting } from "../../redux/userSlice";
import Toast from "react-native-toast-message";

const SettingOption = ({ optionText, optionSvg, showArrow, onPress }) => {
  // const [isEnabled, setIsEnabled] = useState(false);
  const isHapticsEnabled = useSelector((state) => state.user.hapticsEnabled);
  const dispatch = useDispatch();

  const toggleHaptics = useMutation({
    mutationFn: toggleUserHaptics,
    onMutate: (newSetting) => {
      // Make sure isEnabled is the correct value??
      const previousValue = isHapticsEnabled;

      dispatch(setHapticSetting(newSetting));

      return { previousValue };
    },
    onError: (err, newSetting, context) => {
      // Roll back to the previous setting if the mutation fails

      if (context?.previousValue !== undefined) {
        dispatch(setHapticSetting(context.previousValue));
      }
      Toast.show({
        type: "customErrorToast",
        text1: "Failed to set haptics, please try again later",
      });
    },
  });

  const { data: hapticsEnabledData, isError: isErrorFetchHaptics } = useQuery({
    queryFn: getUserHaptics,
    queryKey: ["HapticsEnabled"],
  });

  useEffect(() => {
    if (
      hapticsEnabledData !== undefined &&
      hapticsEnabledData !== isHapticsEnabled
    ) {
      dispatch(setHapticSetting(hapticsEnabledData));
    }
  }, [hapticsEnabledData]);

  const toggleSwitch = (val) => {
    // setIsEnabled(val);
    toggleHaptics.mutate(val);
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        gap: 14,
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 20,
      }}
    >
      {optionSvg}
      <Text
        style={{
          fontSize: 16,
          flex: 1,
          fontFamily: "Mulish_500Medium",
          color: COLOURS.nearBlack,
        }}
      >
        {optionText}
      </Text>
      {showArrow && <ArrowRight />}
      {!showArrow && (
        <Switch
          trackColor={{ true: COLOURS.darkGreen }}
          value={isHapticsEnabled}
          onValueChange={toggleSwitch}
        />
      )}
    </Pressable>
  );
};

export default SettingOption;
