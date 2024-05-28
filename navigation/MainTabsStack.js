import React, { useCallback, useRef } from "react";

import {
  BottomTabView,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Button, Pressable, Text, View } from "react-native";
import Diary from "../screens/Diary";
import Health from "../screens/Health";
import Settings from "../screens/SettingsOne";
import COLOURS from "../constants/colours";
import DiaryIcon from "../svgs/DiaryIcon";
import List from "../screens/Groceries";
import HeartIcon from "../svgs/HeartIcon";
import SettingsIcon from "../svgs/SettingsIcon";
import AddLogIcon from "../svgs/AddLogIcon";
import ListIcon from "../svgs/ListIcon";
import DiaryStack from "./DiaryStack";
import Groceries from "../screens/Groceries";
import GroceriesStack from "./GroceriesStack";
import HealthStack from "./HealthStack";
import MeStack from "./MeStack";
import MeProfile from "../svgs/MeProfile";
import DiaryTab from "../svgs/DiaryTab";
import MeProfileFill from "../svgs/MeProfileFill";
import GroceryIconNoFill from "../svgs/GroceryIconNoFill";
import HeartTabNoFill from "../svgs/HeartTabNoFill";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import ClearIcon from "../svgs/ClearIcon";
import { Path, Svg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import AddLog from "../screens/AddLog";
import { useColourTheme } from "../context/Themed";
import { themedColours } from "../constants/themedColours";

const Tab = createBottomTabNavigator();

function MainTabsStack() {
  //SHOULD BE MAIN TABS NOT MAINTABSSTACK
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();

  const renderBackdrop = useCallback((props) => {
    return (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    );
  }, []);

  const handleSheetOpen = () => {
    console.log("SHeet open");
    bottomSheetRef?.current?.present();
  };

  const { theme } = useColourTheme();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: themedColours.primary[theme],
          tabBarInactiveTintColor: themedColours.primaryText[theme],
          tabBarLabelStyle: { fontFamily: "Mulish_700Bold", fontSize: 12 },
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: themedColours.primaryBackground[theme],
            borderTopColor: themedColours.stroke[theme],
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="DiaryStack"
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <DiaryIcon color={color} size={size} />
              ) : (
                <DiaryTab color={color} />
              ),
            tabBarLabel: "Diary",
          }}
          component={DiaryStack}
        />
        <Tab.Screen
          name="HealthStack"
          options={{
            headerShown: false,
            tabBarLabel: "Health",
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <HeartIcon color={color} size={size} />
              ) : (
                <HeartTabNoFill color={color} />
              ),
          }}
          component={HealthStack}
        />

        <Tab.Screen
          name="AddLog"
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
            },
          }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Pressable hitSlop={20} onPress={handleSheetOpen}>
                <AddLogIcon color={color} size={size} />
              </Pressable>
            ),
            tabBarLabelStyle: { display: "none" },
          }}
          component={AddLog}
        />
        <Tab.Screen
          name="GroceriesStack"
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <ListIcon color={color} size={size} />
              ) : (
                <GroceryIconNoFill color={color} />
              ),
            tabBarLabel: "Groceries",
          }}
          component={GroceriesStack}
        />
        <Tab.Screen
          name="MeStack"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <MeProfileFill color={color} size={size} />
              ) : (
                <MeProfile color={color} />
              ),
            tabBarLabel: "Me",
          }}
          component={MeStack}
        />
      </Tab.Navigator>
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        // enableDynamicSizing
        handleStyle={{ display: "none" }}
        ref={bottomSheetRef}
        backgroundStyle={{
          backgroundColor: themedColours.primaryBackground[theme],
        }}
        snapPoints={[300]}
      >
        <BottomSheetView style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 34,
              fontFamily: "Mulish_700Bold",
              color: themedColours.primaryText[theme],
              width: 300,
            }}
          >
            What would you like to log?
          </Text>
          <Pressable style={{ position: "absolute", top: 14, right: 14 }}>
            <ClearIcon
              background={themedColours.secondaryBackground[theme]}
              crossColor={themedColours.secondaryText[theme]}
              size={30}
            />
          </Pressable>
          <BottomSheetView style={{ paddingVertical: 20, gap: 20 }}>
            <LoggingOption
              svg={"plus"}
              title="Something I’ve eaten"
              subtitle="Tell us what you’ve eaten."
              onPress={() => {
                navigation.navigate("ScanStack");
                bottomSheetRef.current.close();
              }}
            />
            <LoggingOption
              svg={"heart"}
              title="A biological or mood change"
              subtitle="Weight, mood, energy & more."
              onPress={() => {
                navigation.navigate("MeStack");
                bottomSheetRef.current.close();
              }}
            />
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

const LoggingOption = ({ onPress, title, subtitle, svg }) => {
  const { theme } = useColourTheme();
  const SVG =
    svg === "plus" ? (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <Path
          d="M6.54571 12.5625H11.1411V17.1579C11.1411 17.625 11.5253 18.0167 11.9999 18.0167C12.4746 18.0167 12.8588 17.625 12.8588 17.1579V12.5625H17.4542C17.9213 12.5625 18.313 12.1783 18.313 11.7037C18.313 11.2291 17.9213 10.8449 17.4542 10.8449H12.8588V6.24944C12.8588 5.78237 12.4746 5.39062 11.9999 5.39062C11.5253 5.39062 11.1411 5.78237 11.1411 6.24944V10.8449H6.54571C6.07863 10.8449 5.68689 11.2291 5.68689 11.7037C5.68689 12.1783 6.07863 12.5625 6.54571 12.5625Z"
          fill={themedColours.primary[theme]}
        />
      </Svg>
    ) : (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
      >
        <Path
          d="M4.00001 6.77673C4.2068 6.10613 4.57722 5.47603 5.14527 4.91284C5.59251 4.46941 6.05668 4.17698 6.52241 4M12.6007 2.14593C14.2743 1.08425 16.9773 0.0803204 19.3115 2.46071C24.8525 8.11136 15.3502 19 11 19C6.64988 19 -2.85249 8.11136 2.68853 2.46072C5.02272 0.0803466 7.72564 1.08427 9.39929 2.14593C10.345 2.74582 11.655 2.74582 12.6007 2.14593Z"
          stroke={themedColours.primary[theme]}
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </Svg>
    );
  return (
    <Pressable onPress={onPress} style={{ flexDirection: "row", gap: 20 }}>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 44,
          backgroundColor:
            theme === "dark"
              ? "rgba(18, 102, 104, 0.12)"
              : "rgba(18, 102, 104, 0.12)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {SVG}
      </View>
      <View style={{ justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Mulish_700Bold",
            color: themedColours.primaryText[theme],
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Mulish_400Regular",
            color: themedColours.tabUnselected[theme],
          }}
        >
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
};

export default MainTabsStack;
