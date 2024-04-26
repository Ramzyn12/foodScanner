import { View, Text, Switch, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import COLOURS from "../../constants/colours";
import { Path, Svg } from "react-native-svg";
import ArrowRight from "../../svgs/ArrowRight";
import { validate } from "../../api/models/User";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserHaptics, toggleUserHaptics } from "../../axiosAPI/userAPI";
const SettingOption = ({ optionText, optionSvg, showArrow, onPress }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleHaptics = useMutation({
    mutationFn: toggleUserHaptics,
    onSuccess: () => {
      console.log(isEnabled);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { data: hapticsEnabledData } = useQuery({
    queryFn: getUserHaptics,
    queryKey: ["HapticsEnabled"],
  });

  useEffect(() => {
    if (hapticsEnabledData) {
      setIsEnabled(hapticsEnabledData);
    }
  }, [hapticsEnabledData]);

  const toggleSwitch = (val) => {
    setIsEnabled(val);
    toggleHaptics.mutate();
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
          value={isEnabled}
          onValueChange={toggleSwitch}
        />
      )}
    </Pressable>
  );
};

export default SettingOption;
