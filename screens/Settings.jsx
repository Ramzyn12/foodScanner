import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchIcon from "../svgs/SearchIcon";
import { SearchBar } from "@rneui/base";
import COLOURS from "../constants/colours";
import { SvgXml } from "react-native-svg";
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

  xml = `<svg id="fi_2285551" enable-background="new 0 0 512.004 512.004" height="512" viewBox="0 0 512.004 512.004" width="512" xmlns="http://www.w3.org/2000/svg "><path d="m130.239 138.268-44.358 3.427c-12.343.954-23.336 7.423-30.162 17.748l-51.157 77.372c-5.177 7.83-6 17.629-2.203 26.213 3.798 8.584 11.603 14.566 20.878 16.003l40.615 6.29c9.501-50.42 32.245-100.716 66.387-147.053z"></path><path d="m226.682 448.151 6.291 40.615c1.437 9.275 7.419 17.08 16.002 20.877 3.571 1.58 7.351 2.36 11.112 2.36 5.283 0 10.529-1.539 15.102-4.563l77.374-51.156c10.325-6.827 16.794-17.821 17.746-30.162l3.427-44.358c-46.338 34.143-96.633 56.887-147.054 66.387z"></path><path d="m211.407 420c1.41 0 2.828-.116 4.243-.352 21.124-3.532 41.484-9.482 60.906-17.27l-166.93-166.93c-7.788 19.421-13.738 39.781-17.27 60.906-1.392 8.327 1.401 16.81 7.37 22.78l93.144 93.144c4.956 4.955 11.645 7.722 18.537 7.722z"></path><path d="m471.178 227.003c40.849-78.974 42.362-162.43 40.227-201.57-.731-13.411-11.423-24.103-24.835-24.834-6.373-.348-13.926-.599-22.439-.599-43.766 0-113.017 6.629-179.131 40.826-52.542 27.177-121.439 87.018-162.087 165.66.48.375.949.773 1.391 1.215l180 180c.442.442.839.91 1.214 1.39 78.642-40.649 138.483-109.546 165.66-162.088zm-173.48-118.763c29.241-29.241 76.822-29.244 106.065 0 14.166 14.165 21.967 33 21.967 53.033s-7.801 38.868-21.967 53.033c-14.619 14.619-33.829 21.93-53.032 21.932-19.209.001-38.41-7.309-53.033-21.932-14.166-14.165-21.968-33-21.968-53.033s7.802-38.868 21.968-53.033z"></path><path d="m318.911 193.092c17.545 17.545 46.095 17.546 63.64 0 8.499-8.5 13.18-19.8 13.18-31.82s-4.681-23.32-13.18-31.819c-8.772-8.773-20.296-13.159-31.82-13.159-11.523 0-23.047 4.386-31.819 13.159-8.499 8.499-13.181 19.799-13.181 31.819s4.681 23.321 13.18 31.82z"></path><path d="m15.305 421.938c3.839 0 7.678-1.464 10.606-4.394l48.973-48.973c5.858-5.858 5.858-15.355 0-21.213-5.857-5.858-15.355-5.858-21.213 0l-48.973 48.973c-5.858 5.858-5.858 15.355 0 21.213 2.929 2.929 6.768 4.394 10.607 4.394z"></path><path d="m119.765 392.239c-5.857-5.858-15.355-5.858-21.213 0l-94.155 94.155c-5.858 5.858-5.858 15.355 0 21.213 2.929 2.929 6.768 4.393 10.607 4.393s7.678-1.464 10.606-4.394l94.154-94.154c5.859-5.858 5.859-15.355.001-21.213z"></path><path d="m143.432 437.12-48.972 48.973c-5.858 5.858-5.858 15.355 0 21.213 2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.464 10.606-4.394l48.973-48.973c5.858-5.858 5.858-15.355 0-21.213-5.857-5.858-15.355-5.858-21.213 0z"></path></svg>`;

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
      <SvgXml xml={xml} width={50} height={50} fill={COLOURS.darkGreen} />
        {/* <Carousel
        data={DATA}
        renderItem={renderItem}s
        style={{ flexGrow: 1 }}
        vertical
        // onProgressChange={() => console.log('Scroll begib')}
        height={CARD_HEIGHT + CARD_MARGIN}
        autoPlay={false}
        ref={carouselRef}
        loop={false}
        scrollAnimationDuration={600}
        onSnapToItem={(index) => setCurrentTipIndex(index)}
      /> */}
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
