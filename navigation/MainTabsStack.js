import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button } from "react-native";
import Diary from "../screens/Diary";
import Health from "../screens/Health";
import Settings from "../screens/Settings";
import COLOURS from "../constants/colours";
import DiaryIcon from "../svgs/DiaryIcon";
import AddLog from "../screens/AddLog";
import List from "../screens/List";
import HeartIcon from "../svgs/HeartIcon";
import SettingsIcon from "../svgs/SettingsIcon";
import AddLogIcon from "../svgs/AddLogIcon";
import ListIcon from "../svgs/ListIcon";
const Tab = createBottomTabNavigator();

function MainTabsStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLOURS.nearBlack,
        tabBarInactiveTintColor: COLOURS.tabUnselected,
        tabBarLabelStyle: { fontFamily: "Mulish_700Bold", fontSize: 12 },
        tabBarStyle: { borderTopWidth: 0 },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Diary"
        options={{
          tabBarIcon: ({ color, size }) => (
            <DiaryIcon color={color} size={size} />
          ),
        }}
        component={Diary}
      />
      <Tab.Screen
        name="Health"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HeartIcon color={color} size={size} />
          ),
        }}
        component={Health}
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
        name="List"
        options={{
          tabBarIcon: ({ color, size }) => (
            <ListIcon color={color} size={size} />
          ),
        }}
        component={List}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon color={color} size={size} />
          ),
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
}

export default MainTabsStack;
