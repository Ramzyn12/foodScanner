import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/settings/Header";
import COLOURS from "../constants/colours";
import { TextInput } from "react-native-gesture-handler";
import InformationInput from "../components/settings/InformationInput";
import SettingOption from "../components/settings/SettingOption";
import LogoutIcon from "../svgs/LogoutIcon";
import auth from "@react-native-firebase/auth";
import { storage } from "../utils/MMKVStorage";
import NameInput from "../components/settings/NameInput";

const Account = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const recivedFirstName = 'Rambo'
  const [firstName, setFirstName] = useState(recivedFirstName); // Get first name here for inital state
  const [lastName, setLastName] = useState(""); // Get last name here for inital state

  const handleLogout = () => {
    auth()
      .signOut()
      .then(async () => {
        // await AsyncStorage.removeItem("firebaseToken");
        storage.delete("firebaseToken");
        console.log("Signed out!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Header headerText={"Account"} onNavigate={() => navigation.goBack()} />
      <View style={{ padding: 20, gap: 8 }}>
        <NameInput
          name={firstName}
          text={"First name"}
          setName={setFirstName}
        />
        <NameInput name={lastName} text={"Last name"} setName={setLastName} />
        <InformationInput defaultValue={'ram@gmail.com'}  inputText={"Email Address"} />
        <Pressable
          style={{
            backgroundColor: COLOURS.darkGreen,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#F7F6EF",
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
            }}
          >
            Save
          </Text>
        </Pressable>
      </View>

      <SettingOption optionText={"Change Password"} showArrow={true} />
      <SettingOption
        optionSvg={<LogoutIcon />}
        onPress={handleLogout}
        optionText={"Sign out"}
        showArrow={true}
      />
      <Pressable style={{ paddingHorizontal: 20, paddingVertical: 14 }}>
        <Text
          style={{
            color: COLOURS.badFoodText,
            fontSize: 16,
            fontFamily: "Mulish_500Medium",
          }}
        >
          Delete my account
        </Text>
      </Pressable>
    </View>
  );
};

export default Account;
