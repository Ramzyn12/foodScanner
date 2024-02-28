import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchIcon from "../svgs/SearchIcon";
import { SearchBar } from "@rneui/base";
import COLOURS from "../constants/colours";
function Settings() {
  //If need
  // const token = useSelector(state => state.auth.token)

  const handleLogout = () => {
    signOut(auth)
      .then(async () => {
        await AsyncStorage.removeItem("firebaseToken");
        console.log("Signed out!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [search, setSearch] = useState("");

  const updateSearch = (s) => {
    setSearch(s);
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleLogout} title="logout" />
      <SearchBar
        platform="ios"
        searchIcon={<SearchIcon />}
        clearIcon={{
          type: "material-icons",
          name: "close",
          color: "#606060",
          width: 20,
          height: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLOURS.lightGray,
          borderRadius: 30,
          size: 14,
        }}
        onChangeText={updateSearch}
        value={search}
        onClear={() => setSearch("")}
        placeholder="Search food and drink"
        // containerStyle={styles.searchContainerStyle}
        // inputStyle={styles.searchInputStyle}
        // rightIconContainerStyle={{ paddingLeft: 6 }}
        // inputContainerStyle={styles.searchInputContainerStyle}
        // cancelButtonProps={{
        //   buttonStyle: {
        //     backgroundColor: "white",
        //     marginLeft: 5,
        //     paddingRight: 0,
        //   },
        //   buttonTextStyle: {
        //     fontFamily: "Mulish_600SemiBold",
        //     color: "#126668",
        //     fontSize: 14,
        //   },
        // }}
      />
      {/* <TextInput style={{backgroundColor: 'red'}} onChange={updateSearch} value={search} /> */}
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
