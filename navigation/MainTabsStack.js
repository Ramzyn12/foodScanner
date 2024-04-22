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
import AddLog from "../screens/AddLog";
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

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLOURS.darkGreen,
          tabBarInactiveTintColor: COLOURS.nearBlack,
          tabBarLabelStyle: { fontFamily: "Mulish_700Bold", fontSize: 12 },
          tabBarStyle: { borderTopWidth: 0 },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="DiaryStack"
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? <DiaryIcon color={color} size={size} /> : <DiaryTab />,
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
                <HeartTabNoFill />
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
                <GroceryIconNoFill />
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
                <MeProfile />
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
        snapPoints={[350]}
      >
        <BottomSheetView style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 34,
              fontFamily: "Mulish_700Bold",
              color: COLOURS.nearBlack,
              width: 300,
            }}
          >
            What would you like to log?
          </Text>
          <Pressable style={{ position: "absolute", top: 14, right: 14 }}>
            <ClearIcon size={30} />
          </Pressable>
          <BottomSheetView style={{ paddingVertical: 20, gap: 20 }}>
            <LoggingOption
              onPress={() => {
                navigation.navigate("MeStack");
                bottomSheetRef.current.close()
              }}
            />
            <LoggingOption />
            <LoggingOption />
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

const LoggingOption = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={{ flexDirection: "row", gap: 20 }}>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 44,
          backgroundColor: COLOURS.lightGray,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path
            d="M6.54571 12.5625H11.1411V17.1579C11.1411 17.625 11.5253 18.0167 11.9999 18.0167C12.4746 18.0167 12.8588 17.625 12.8588 17.1579V12.5625H17.4542C17.9213 12.5625 18.313 12.1783 18.313 11.7037C18.313 11.2291 17.9213 10.8449 17.4542 10.8449H12.8588V6.24944C12.8588 5.78237 12.4746 5.39062 11.9999 5.39062C11.5253 5.39062 11.1411 5.78237 11.1411 6.24944V10.8449H6.54571C6.07863 10.8449 5.68689 11.2291 5.68689 11.7037C5.68689 12.1783 6.07863 12.5625 6.54571 12.5625Z"
            fill="#126668"
          />
        </Svg>
      </View>
      <View style={{ justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Mulish_700Bold",
            color: COLOURS.nearBlack,
          }}
        >
          Something I've eaten
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Mulish_400Regular",
            color: "#607A8C",
          }}
        >
          Tell us what you've eaten
        </Text>
      </View>
    </Pressable>
  );
};

export default MainTabsStack;
