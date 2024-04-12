import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button } from "react-native";
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
const Tab = createBottomTabNavigator();

function MainTabsStack() {
  //SHOULD BE MAIN TABS NOT MAINTABSSTACK
  return (
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
        options={{
          tabBarIcon: ({ color, size }) => (
            <AddLogIcon color={color} size={size} />
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
  );
}

export default MainTabsStack;
