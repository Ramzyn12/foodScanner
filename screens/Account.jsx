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
  const [initialFirstName, setInitialFirstName] = useState(""); // Store initial state
  const [initialLastName, setInitialLastName] = useState(""); // Store initial state
  const signInWith = auth()?.currentUser?.providerData[0]?.providerId;
  const queryClient = useQueryClient();
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const { theme } = useColourTheme();
  const userId = auth().currentUser?.uid;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: getUserNames,
    retry: false,
    queryKey: ["UserNames"],
    enabled: false,
  });

  useEffect(() => {
    const fetchNames = async () => {
      const storedFirstName = storage.getString(`${userId}_firstName`);
      const storedLastName = storage.getString(`${userId}_lastName`);
      // Could split this up individually?
      if (!storedFirstName && !storedLastName) {
        
        try {
          const backendNames = await refetch();
          if (backendNames.data) {
            console.log('LOADING FROM BACKEND');
            setFirstName(backendNames.data.firstName);
            setLastName(backendNames.data.lastName);
            setInitialFirstName(backendNames.data.firstName);
            setInitialLastName(backendNames.data.lastName);
            storage.set(`${userId}_firstName`, backendNames.data.firstName);
            storage.set(`${userId}_lastName`, backendNames.data.lastName);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log('LOADING FROM STORAGE');
        if (storedFirstName) {
          setFirstName(storedFirstName);
          setInitialFirstName(storedFirstName);
        }
        if (storedLastName) {
          setLastName(storedLastName);
          setInitialLastName(storedLastName);
        }
      }
    };

    fetchNames();
  }, []);

  const addNamesMutation = useMutation({
    mutationFn: addUserNames,
    onSuccess: async () => {
      // do we need this now we use storage?
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

      // Toast.show({
      //   type: "foodDetailToast",
      //   text1: "Names have been saved!",
      // });
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
    console.log('SAVING NAMES');

    // Check if names have changed
    if (firstName === initialFirstName && lastName === initialLastName) {
      return;
    }

    // Maybe only let them save names if value changes in one input?
    if (firstName.length > 30 || lastName.length > 30) {
      Toast.show({
        type: "foodDetailToast",
        text1: "Names too long, please try again.",
      });
    } else {
      addNamesMutation.mutate({ firstName, lastName });
      storage.set(`${userId}_firstName`, firstName);
      storage.set(`${userId}_lastName`, lastName);
      setInitialFirstName(firstName);
      setInitialLastName(lastName);
    }
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
        queryClient.clear()
        console.log("Signed out!");
      })
      .catch((error) => {
        console.log(error, "Error signing out");
      });
  };

  const opacity = (firstName === initialFirstName && lastName === initialLastName) ? 0.4 : 1

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
          text={isError ? "Failed to fetch first name" : "First name"}
          setName={setFirstName}
        />
        <NameInput
          ref={lastNameInputRef}
          name={lastName}
          // Change this error idea later maybe
          text={isError ? "Failed to fetch last name" : "Last name"}
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
            opacity: opacity,
          }}
        >
          <Text
            style={{
              color: "white",
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
