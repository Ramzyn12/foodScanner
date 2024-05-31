import { View, Text, AppState, Alert, Linking, ScrollView } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/settings/Header";
import NotificationOption from "../components/settings/NotificationOption";
import { useColourTheme } from "../context/Themed";
import { themedColours } from "../constants/themedColours";
import * as Device from "expo-device";
import * as NotificationsObj from "expo-notifications";
import { useFocusEffect } from "@react-navigation/native";

const Notifications = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useColourTheme();
  const appState = useRef(AppState.currentState);
  const [granted, setGranted] = useState("");

  const setNotificationPermissions = async () => {
    const { status: existingStatus } =
      await NotificationsObj.getPermissionsAsync();
    const isGranted = existingStatus === "granted";

    setGranted(isGranted);
    if (!isGranted) {
      console.log("Not granted so cancelling all notificaitons ");
      await NotificationsObj.cancelAllScheduledNotificationsAsync();
    }
    return existingStatus;
  };

  useFocusEffect(
    useCallback(() => {
      setNotificationPermissions();
    }, [setNotificationPermissions])
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        //Coming from background to foreground
        setNotificationPermissions();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [setNotificationPermissions]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themedColours.primaryBackground[theme],
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Header
        onNavigate={() => navigation.goBack()}
        headerText={"Notifications"}
      />
      <ScrollView>
        <View style={{ padding: 14, gap: 14 }}>
          <NotificationOption
            granted={granted}
            title={"Health Tracking"}
            description={"Remind me to log how I'm feeling today"}
          />
          <NotificationOption
            granted={granted}
            title={"Food tracking reminder"}
            description={"Remind me to log the food I have eaten"}
          />
          <NotificationOption
            granted={granted}
            title={"Week completed"}
            description={"Notify me when I have completed the current week"}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Notifications;
