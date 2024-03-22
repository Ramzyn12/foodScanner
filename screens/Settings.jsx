import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { sendPasswordResetEmail, signOut, updatePassword } from "firebase/auth";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchIcon from "../svgs/SearchIcon";
import { SearchBar } from "@rneui/base";
import COLOURS from "../constants/colours";
import { SvgXml } from "react-native-svg";
import { useAppleAuth } from "../hooks/useAppleAuth";
import auth from "@react-native-firebase/auth";

function Settings() {
  //If need
  // const token = useSelector(state => state.auth.token)

  const signInWith = auth().currentUser.providerData[0].providerId;

  const handleLogout = () => {
    auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem("firebaseToken");
        console.log("Signed out!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePasswordReset = () => {
    auth().sendPasswordResetEmail(auth().currentUser.email)
      .then(() => {
        console.log("email sent! Check Junk FOlder!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePasswordUpdate = () => {
    auth().currentUser.updatePassword("Ramzy2002.123")
      .then(() => {
        console.log("Password updated!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleEmailUpdate = () => {
  //   auth().currentUser.updateEmail("ramzy.football1@hotmail.com")
  //     .then(() => {
  //       console.log("Email updated!");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const { handleAppleAccountRevoke } = useAppleAuth();

  const handleRevokeApple = () => {
    handleAppleAccountRevoke();
  };

  return (
    <View style={styles.container}>
      <Button
        hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
        onPress={handleLogout}
        title="logout"
      />

      {signInWith === "password" && (
        <Pressable
          style={{ margin: 30 }}
          hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
          onPress={handlePasswordReset}
        >
          <Text>Reset password</Text>
        </Pressable>
      )}

      {signInWith === "password" && (
        <Pressable
          style={{ margin: 30 }}
          hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
          onPress={handlePasswordUpdate}
        >
          <Text>Update password (to Ramzy2002.123)</Text>
        </Pressable>
      )}
      {/* {signInWith === "password" && (
        <Pressable
          style={{ margin: 30 }}
          hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
          onPress={handleEmailUpdate}
        >
          <Text>Update email (to ramzy.football1@hotmail.com)</Text>
        </Pressable>
      )} */}
       
      {signInWith !== "password" && (
        <Pressable
          style={{ margin: 30 }}
          hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
          onPress={handleRevokeApple}
        >
          <Text>delete apple account</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  searchContainerStyle: {
    borderWidth: 0,
    backgroundColor: "white",
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
    marginVertical: 15,
    borderWidth: 0,
  },
  searchInputStyle: {
    backgroundColor: "#EEEEF0",
    // paddingRight: 7,
    borderWidth: 0,
  },
  searchInputContainerStyle: {
    backgroundColor: "#EEEEF0",
    height: 40,
    flex: 1,
    // overflow: 'hidden',
    marginLeft: 0,
    borderWidth: 0,
  },
  exitButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 40,
    backgroundColor: "#E9E9EB", //One off colour
    alignItems: "center",
    justifyContent: "center",
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  foodListContainer: {
    borderTopWidth: 1,
    borderTopColor: COLOURS.lightGray,
    marginBottom: 80,
  },
  foodListItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.lightGray,
    paddingVertical: 2,
  },
  recentText: { fontSize: 16, paddingBottom: 10, fontFamily: "Mulish_700Bold" },
});

export default Settings;
