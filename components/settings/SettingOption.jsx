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
import ContextMenu from "react-native-context-menu-view";
import ArrowDownShort from "../../svgs/ArrowDownShort";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../hooks/useTheme";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const storeDarkModePreference = async (preference) => {
  try {
    await AsyncStorage.setItem("darkModePreference", preference);
  } catch (error) {
    console.error("Failed to save the data to the storage", error);
  }
};

const SettingOption = ({
  optionText,
  optionSvg,
  showArrow,
  onPress,
  showDropdown,
}) => {
  // const [isEnabled, setIsEnabled] = useState(false);
  const isHapticsEnabled = useSelector((state) => state.user.hapticsEnabled);
  const dispatch = useDispatch();

  const { theme, setTheme, themePreference } = useColourTheme();

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

  const handleMenuPress = (e) => {
    if (e.nativeEvent.index === 0) {
      setTheme("system");
      // storeDarkModePreference("System");
    } else if (e.nativeEvent.index === 1) {
      setTheme("light");
      // storeDarkModePreference("Light");
    } else if (e.nativeEvent.index === 2) {
      setTheme("dark");
      // storeDarkModePreference("Dark");
    }
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
          color: themedColours.primaryText[theme],
        }}
      >
        {optionText}
      </Text>
      {showArrow && <ArrowRight color={themedColours.primaryText[theme]} />}
      {!showArrow && !showDropdown && (
        <Switch
          thumbColor={themedColours.primaryBackground[theme]}
          ios_backgroundColor={themedColours.fillSecondary[theme]}
          trackColor={{ true: themedColours.primary[theme] }}
          
          value={isHapticsEnabled}
          onValueChange={toggleSwitch}
        />
      )}
      {!showArrow && showDropdown && (
        <ContextMenu
          actions={[
            { title: "System", selected: themePreference === "system" },
            { title: "Light", selected: themePreference === "light" },
            { title: "Dark", selected: themePreference === "dark" },
          ]}
          dropdownMenuMode={true}
          onPress={handleMenuPress}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            <Text
              style={{
                color: themedColours.secondaryText[theme],
                fontSize: 15,
                fontFamily: "Mulish_500Medium",
              }}
            >
              {themePreference}
            </Text>
            <ArrowDownShort color={themedColours.secondaryText[theme]} width={11.5} height={5.5} />
          </View>
        </ContextMenu>
      )}
    </Pressable>
  );
};

export default SettingOption;
