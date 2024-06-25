import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from "../../constants/colours";
import Animated from "react-native-reanimated";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";
// import { SharedElement } from "react-navigation-shared-element";
import * as Device from "expo-device";
import * as NotificationsObj from "expo-notifications";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Notifications = ({ navigation }) => {
  //ONLY SHOW THIS PAGE IF NOTIFCAITIONS NOT ENABLED?
  const { theme } = useColourTheme();
  const UID = auth().currentUser.uid

  const handleSkipNotifications = () => {
    navigation.navigate("InfoOne");
  };

  const handleSaveTime = async () => {
    const time = new Date(2020, 0, 1, 12, 0)
    const title = 'Food tracking'
    try {
      await AsyncStorage.setItem(
        `notification-${title}-${UID}`,
        time.toISOString()
      );
    } catch (error) {
      console.error("Error saving notification time:", error);
    }
   
    await NotificationsObj.scheduleNotificationAsync({
      content: {
        title,
        body: "Test From notifications",
        data: { data: "goes here" }, // Probs dont need
      },
      // trigger: {
      //   hour: time.getHours(),
      //   minute: time.getMinutes(),
      //   repeats: true,
      // },
      trigger: {seconds: 2}
    });

  };

  const handleAllowNotificationPress = async () => {
    if (!Device.isDevice) return;

    const { status: existingStatus, ios } =
      await NotificationsObj.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    let firstTime =
      NotificationsObj.IosAuthorizationStatus[ios.status] === "NOT_DETERMINED";
    if (existingStatus !== "granted") {
      const { status } = await NotificationsObj.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted" && !firstTime) {
      Alert.alert(
        "Enable Notifications",
        "To enable in app notifications, you must enable notifications in settings",
        [
          {
            text: "Ok",
            onPress: () => {
              Linking.openSettings();
              navigation.navigate("InfoOne");
            },
          },
          { text: "Cancel", onPress: () => navigation.navigate("InfoOne") },
        ]
      );
    } else if (finalStatus === "granted" && firstTime) {
      // set up notifications
      handleSaveTime()
    } else {
      // granted and not first time
      // not granted and first time
      console.log("move on");
      navigation.navigate("InfoOne");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          { backgroundColor: themedColours.primaryBackground[theme] },
        ]}
      >
        <View style={styles.contentContainer}>
          <Svg width="120" height="121" viewBox="0 0 120 121" fill="none">
            <Path
              d="M13.8936 22.962C99.2687 23.1651 94.7718 22.4921 97.3866 23.4771C101.808 23.5043 104.5 28.3261 105.389 30.772C106.829 34.7353 106.576 39.0821 106.389 43.2948C105.842 55.6199 106.021 67.9776 106.925 80.2819C107.227 84.3897 106.57 88.8811 103.758 91.8907C100.968 94.8765 97.2231 95.1631 93.1373 95.0876C83.3911 94.9079 73.6448 94.7279 63.8986 94.5479C62.6928 95.5861 60.8131 97.6084 60.4361 97.9507C53.0051 104.7 48.4747 109.884 42.6257 108.975C40.7388 109.106 39.2706 107.831 38.9348 106.183C37.9473 101.286 36.9504 96.1351 35.9656 90.9789H13.8936C9.63146 90.9789 6.16403 87.5114 6.16403 83.2493V30.6915C6.16403 26.4294 9.63146 22.962 13.8936 22.962ZM8.62978 83.2493C8.62978 86.1517 10.9912 88.5131 13.8936 88.5131C38.1977 88.5346 37.3725 88.3094 37.9208 88.9702C38.3549 89.4956 38.0211 89.2097 41.3523 105.693C41.5214 106.529 42.5712 106.835 43.1567 106.188C44.6693 104.514 46.5633 102.396 47.1828 101.826L47.1588 101.803C60.172 87.7494 58.1593 89.3476 59.4843 88.8775H94.6807C97.5831 88.8775 99.9445 86.5161 99.9445 83.6121V30.6915C99.9445 27.7891 97.5831 25.4277 94.6807 25.4277H13.8936C10.9912 25.4277 8.62978 27.7891 8.62978 30.6915V83.2493Z"
              fill={themedColours.primaryText[theme]}
            />
            <Path
              d="M14.6882 42.6238H88.176C88.8566 42.6238 89.4089 43.176 89.4089 43.8567C89.4089 44.5373 88.8566 45.0895 88.176 45.0895H14.6882C14.0076 45.0895 13.4553 44.5373 13.4553 43.8567C13.4553 43.176 14.0076 42.6238 14.6882 42.6238Z"
              fill={themedColours.primaryText[theme]}
            />
            <Path
              d="M38.596 60.5903H79.9921C80.6728 60.5903 81.225 61.1426 81.225 61.8232C81.225 62.5039 80.6728 63.0561 79.9921 63.0561H38.596C37.9154 63.0561 37.3632 62.5039 37.3632 61.8232C37.3632 61.1426 37.9154 60.5903 38.596 60.5903Z"
              fill={themedColours.primaryText[theme]}
            />
            <Path
              d="M52.7741 73.0443H63.0931C63.7737 73.0443 64.3259 73.5965 64.3259 74.2772C64.3259 74.9578 63.7737 75.5101 63.0931 75.5101H52.7741C52.0935 75.5101 51.5413 74.9578 51.5413 74.2772C51.5413 73.5965 52.0935 73.0443 52.7741 73.0443Z"
              fill={themedColours.primaryText[theme]}
            />
          </Svg>
          <Text
            style={[
              styles.titleText,
              { color: themedColours.primaryText[theme] },
            ]}
          >
            Enable notifications
          </Text>
          <Text
            style={[
              styles.descriptionText,
              { color: themedColours.primaryText[theme] },
            ]}
          >
            When there are important changes to your health or important updates
            in research, we’ll let you know.
          </Text>
          {/* <SharedElement style={{width: '100%'}} id="button"> */}

          <Pressable
            style={{ width: "100%" }}
            onPress={handleAllowNotificationPress}
          >
            <Animated.View
              sharedTransitionTag="greenButton"
              style={[
                styles.button,
                { backgroundColor: themedColours.primary[theme] },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: themedColours.primaryBackground[theme] },
                ]}
              >
                Allow Notifications
              </Text>
            </Animated.View>
          </Pressable>
          {/* </SharedElement> */}
        </View>
        <View style={styles.ActionContainer}>
          <Pressable hitSlop={20} onPress={handleSkipNotifications}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Mulish_600SemiBold",
                color: themedColours.primaryText[theme],
              }}
            >
              I'll do it later
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  contentContainer: {
    alignItems: "center",
    gap: 20,
    flex: 1,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 28,
    fontFamily: "Mulish_700Bold",
    color: COLOURS.nearBlack,
  },
  descriptionText: {
    textAlign: "center",
    fontFamily: "Mulish_600SemiBold",
    fontSize: 16,
    color: COLOURS.nearBlack,
  },
  button: {
    backgroundColor: COLOURS.darkGreen,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 44,
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Mulish_600SemiBold",
  },
  ActionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingBottom: 10,
  },
});
