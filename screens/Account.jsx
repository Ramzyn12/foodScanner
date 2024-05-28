import { View, Text, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import { useAppleAuth } from "../hooks/useAppleAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUserNames, getUserNames } from "../axiosAPI/userAPI";
import Toast from "react-native-toast-message";
import { useColourTheme } from "../context/Themed";
import { themedColours } from "../constants/themedColours";

const Account = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [firstName, setFirstName] = useState(""); // Get first name here for inital state
  const [lastName, setLastName] = useState(""); // Get last name here for inital state
  const signInWith = auth()?.currentUser?.providerData[0]?.providerId;
  const queryClient = useQueryClient();
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const {theme} = useColourTheme()

  const { data, isLoading, isError, error } = useQuery({
    queryFn: getUserNames,
    retry: false,
    queryKey: ["UserNames"],
  });

  useEffect(() => {
    if (data) {
      setFirstName(data?.firstName);
      setLastName(data?.lastName);
    }
  }, [data]);

  const addNamesMutation = useMutation({
    mutationFn: addUserNames,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["UserNames"] });

      const user = auth().currentUser;
      if (user) {
        user
          .updateProfile({ displayName: firstName || lastName })
          .then(() => {
            console.log("Success updating display name");
          })
          .catch((err) => console.log(err));
      }

      if (firstNameInputRef.current) {
        firstNameInputRef.current.blur();
      }
      if (lastNameInputRef.current) {
        lastNameInputRef.current.blur();
      }

      Toast.show({
        type: "foodDetailToast",
        text1: "Names have been saved!",
      });
    },
    onError: (err) => {
      if (Array.isArray(err.response.data?.errors)) {
        // If Validation error
        Toast.show({
          type: "foodDetailToast",
          text1: err.response.data?.errors[0].msg,
        });
      } else {
        // If any other error
        Toast.show({
          type: "foodDetailToast",
          text1: "Failed to save names, please try again later",
        });
      }
    },
  });

  const handleSaveNames = () => {
    // Maybe only let them save names if value changes in one input?
    addNamesMutation.mutate({ firstName, lastName });
  };

  const { handleAppleAccountRevoke } = useAppleAuth();

  const handleDeleteAccount = () => {
    if (signInWith === "apple.com") {
      handleAppleAccountRevoke();
    } else if (signInWith === "password") {
      navigation.navigate("DeleteAccount");
    } else {
      return;
    }
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .then(async () => {
        storage.delete("firebaseToken");
        console.log("Signed out!");
      })
      .catch((error) => {
        console.log(error, 'Error signing out');
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themedColours.primaryBackground[theme],
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Header headerText={"Account"} onNavigate={() => navigation.goBack()} />
      <View style={{ padding: 20, gap: 8 }}>
        <NameInput
          ref={firstNameInputRef}
          name={firstName}
          text={isError ? 'Failed to fetch first name' : "First name"}
          setName={setFirstName}
        />
        <NameInput
          ref={lastNameInputRef}
          name={lastName}
          // Change this error idea later maybe
          text={isError ? 'Failed to fetch last name' : "Last name"}
          setName={setLastName}
        />
        <InformationInput
          defaultValue={auth().currentUser.email}
          inputText={"Email Address"}
        />
        <Pressable
          onPress={handleSaveNames}
          style={{
            backgroundColor: themedColours.primary[theme],
            height: 44,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
            // opacity: 0.4,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
            }}
          >
            Save
          </Text>
        </Pressable>
      </View>
      {signInWith === "password" && (
        <SettingOption
          onPress={() => navigation.navigate("UpdatePassword")}
          optionText={"Change Password"}
          showArrow={true}
        />
      )}
      <SettingOption
        optionSvg={<LogoutIcon color={themedColours.primaryText[theme]} />}
        onPress={handleLogout}
        optionText={"Sign out"}
        showArrow={true}
      />
      <Pressable
        onPress={handleDeleteAccount}
        style={{ paddingHorizontal: 20, paddingVertical: 14 }}
      >
        <Text
          style={{
            color: themedColours.danger[theme],
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
