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


const getHapticsPreference = async () => {
  try {
    const value = await AsyncStorage.getItem("hapticsPreference");
    if (value !== null) {
      return JSON.parse(value);
    }
    return false; // default value
  } catch (error) {
    console.error("Failed to fetch the haptics preference from storage", error);
    return false;
  }
};

const SettingOption = ({
  optionText,
  optionSvg,
  showArrow,
  onPress,
  showDropdown,
}) => {
  const dispatch = useDispatch();

  const { theme, setTheme, themePreference } = useColourTheme();
  const [hapticEnabled, setHapticEnabled] = useState(false)

  const storeHapticsPreference = async (preference) => {
    try {
      await AsyncStorage.setItem("hapticsPreference", JSON.stringify(preference));
      setHapticEnabled(preference)
      dispatch(setHapticSetting(preference));
    } catch (error) {
      console.error("Failed to save the haptics preference to storage", error);
    }
  };

  useEffect(() => {
    const fetchHapticsPreference = async () => {
      const storedPreference = await getHapticsPreference();
      setHapticEnabled(storedPreference)
      dispatch(setHapticSetting(storedPreference));
    };
    fetchHapticsPreference();
  }, []);

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
      {optionSvg && <View style={{ width: 18, height: 18 }}>{optionSvg}</View>}

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
          value={hapticEnabled}
          onValueChange={storeHapticsPreference}
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
            <ArrowDownShort
              color={themedColours.secondaryText[theme]}
              width={11.5}
              height={5.5}
            />
          </View>
        </ContextMenu>
      )}
    </Pressable>
  );
};

export default SettingOption;
