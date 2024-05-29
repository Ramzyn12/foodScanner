import { View, Text, Switch, Pressable, Alert, Linking } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Clock from "../../svgs/Clock";
import ArrowDownShort from "../../svgs/ArrowDownShort";
import COLOURS from "../../constants/colours";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import { themedColours } from "../../constants/themedColours";
import { useColourTheme } from "../../context/Themed";
import * as Device from "expo-device";
import * as NotificationsObj from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotificationOption = ({ title, description, time, granted }) => {
  const [timeSet, setTimeSet] = useState(new Date(2020, 0, 1, 9, 0)); // initial time set to 09:00
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [shouldNotify, setShouldNotify] = useState(false);
  const notificationRef = useRef()
  const { theme } = useColourTheme();

  useEffect(() => {
    if (granted === false) {
      //And remove from async storage
      removeNotificationTime();
      setShouldNotify(false)
    } else {
      loadNotificationTime();
    }
  }, [granted])

  const handleNotificationPermissions = async (val) => {
    if (!Device.isDevice) return;

    const { status: existingStatus } =
      await NotificationsObj.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await NotificationsObj.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "Enable Notifications",
        "To enable in app notifications, you must enable notifications in settings",
        [
          {
            text: "Ok",
            onPress: () => {
              Linking.openSettings();
              setShouldNotify(false);
            },
          },
          { text: "Cancel", onPress: () => setShouldNotify(false) },
        ]
      );
    } else {
      // Save to async and setShouldNotify
      // Maybe only save if turning on not off?
      saveNotificationTime(timeSet)
      setShouldNotify(val);
    }
  };

  const saveNotificationTime = async (time) => {
    try {
      await AsyncStorage.setItem(`notification-${title}`, time.toISOString());
      console.log('Notification time saved:', time);
    } catch (error) {
      console.error('Error saving notification time:', error);
    }
  };

  const removeNotificationTime = async () => {
    try {
      await AsyncStorage.removeItem(`notification-${title}`);
      console.log('Notification time removed');
    } catch (error) {
      console.error('Error removing notification time:', error);
    }
  };

  const loadNotificationTime = async () => {
    try {
      const storedTime = await AsyncStorage.getItem(`notification-${title}`);
      if (storedTime) {
        setTimeSet(new Date(storedTime));
        setShouldNotify(true);
      }
      // console.log(storedTime, title);
    } catch (error) {
      console.error('Error loading notification time:', error);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setTimeSet(selectedTime);
    }
  };

  const handleSwitchPress = async (val) => {
    
    if (val === false) {
      setShowTimePicker(false)
      removeNotificationTime()
      if (notificationRef.current) {
        await Notifications.cancelScheduledNotificationAsync(notificationRef.current)
        notificationRef.current = null
      }
      setShouldNotify(false)
      return
    }
    handleNotificationPermissions(val);

  };

  const handleSaveTime = async () => {
    saveNotificationTime(timeSet);
    notificationRef.current = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: "Test From notifications",
        data: { data: "goes here" },
      },
      // trigger: { hour: timeSet.getHours(), minute: timeSet.getMinutes(), repeats: true },
      trigger: {seconds: 10}
    });

    setShowTimePicker(false);
  };

  const handleDropdownPress = () => {
    if (showTimePicker === true) {
      // Go back to original time
      setTimeSet(new Date(2020, 0, 1, 9, 0));
    }
    setShowTimePicker((prev) => !prev);
  };

  const formattedTime = `${timeSet
    .getHours()
    .toString()
    .padStart(2, "0")}:${timeSet.getMinutes().toString().padStart(2, "0")}`;

  return (
    <Pressable
      style={{
        backgroundColor: themedColours.secondaryBackground[theme],
        borderRadius: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 14,
        }}
      >
        <View style={{ gap: 2 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Mulish_500Medium",
              color: themedColours.primaryText[theme],
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: themedColours.secondaryText[theme],
              fontSize: 11,
              fontFamily: "Mulish_700Bold",
            }}
          >
            {description}
          </Text>
        </View>
        <Switch
          thumbColor={themedColours.primaryBackground[theme]}
          ios_backgroundColor={themedColours.fillSecondary[theme]}
          trackColor={{ true: themedColours.primary[theme] }}
          value={shouldNotify}
          onValueChange={handleSwitchPress}
        />
      </View>
      {shouldNotify && (
        <Pressable
          onPress={handleDropdownPress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
            paddingHorizontal: 20,
            paddingVertical: 14,
          }}
        >
          <Clock color={themedColours.primaryText[theme]} />
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontFamily: "Mulish_500Medium",
              color: themedColours.primaryText[theme],
            }}
          >
            {formattedTime}
          </Text>
          <ArrowDownShort color={themedColours.primaryText[theme]} />
        </Pressable>
      )}
      {showTimePicker && (
        <View>
          <DateTimePicker
            value={timeSet}
            mode="time"
            display="spinner"
            textColor={themedColours.primaryText[theme]}
            onChange={handleTimeChange}
            style={{ alignItems: "flex-start" }}
          />
          <Pressable
            onPress={handleSaveTime}
            style={{
              height: 44,
              backgroundColor: themedColours.primary[theme],
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontFamily: "Mulish_700Bold",
              }}
            >
              Save
            </Text>
          </Pressable>
        </View>
      )}
    </Pressable>
  );
};

export default NotificationOption;
