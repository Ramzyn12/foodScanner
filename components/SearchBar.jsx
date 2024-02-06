import { View, Text } from "react-native";
import React, { useState } from "react";
import { Path, Svg } from "react-native-svg";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import COLOURS from '../constants/colours'
import { Pressable } from "react-native";
const SearchBar = () => {

  const [searchIconColour, setSearchIconColour] = useState('#606060')
  const [searchInput, setSearchInput] = useState('')
  const [showClear, setShowClear] = useState(false)

  // When start getting search results, remove "Recent"

  const handleSearchChange = (input) => {
    setSearchInput(input); // Update search input immediately for each keystroke
    setShowClear(input.length > 0);
  }

  const handleClearInput = () => {
    setSearchInput('')
    setShowClear(false)
  }

  return (
    <View
      style={{
        backgroundColor: "#EEEEF0",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        height: 42,
        gap: 8,
        borderRadius: 15,
        marginVertical: 20,
      }}
    >
      <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <Path
          d="M13.197 11.4698C12.9041 11.1769 12.4292 11.1769 12.1363 11.4697C11.8434 11.7626 11.8434 12.2375 12.1363 12.5304L13.197 11.4698ZM14.8029 15.197C15.0958 15.4899 15.5707 15.4899 15.8636 15.197C16.1564 14.9042 16.1565 14.4293 15.8636 14.1364L14.8029 15.197ZM12.1363 12.5304L14.8029 15.197L15.8636 14.1364L13.197 11.4698L12.1363 12.5304ZM7.33325 11.9167C4.43376 11.9167 2.08325 9.56618 2.08325 6.66669H0.583252C0.583252 10.3946 3.60533 13.4167 7.33325 13.4167V11.9167ZM12.5833 6.66669C12.5833 9.56618 10.2327 11.9167 7.33325 11.9167V13.4167C11.0612 13.4167 14.0833 10.3946 14.0833 6.66669H12.5833ZM7.33325 1.41669C10.2327 1.41669 12.5833 3.76719 12.5833 6.66669H14.0833C14.0833 2.93877 11.0612 -0.083313 7.33325 -0.083313V1.41669ZM7.33325 -0.083313C3.60533 -0.083313 0.583252 2.93877 0.583252 6.66669H2.08325C2.08325 3.76719 4.43376 1.41669 7.33325 1.41669V-0.083313Z"
        
          fill={searchIconColour}
        />
      </Svg>
      <BottomSheetTextInput
        onScroll={() => console.log("scrolled")}
        onFocus={() => setSearchIconColour("#2D264B")}
        placeholderTextColor={"#606060"}
        placeholder="Search food and drink"
        value={searchInput}
        onChangeText={handleSearchChange}
        style={{ flex: 1, fontSize: 17, fontFamily: "Mulish_400Regular" }}
      />
      {showClear && <Pressable
        style={{
          width: 18,
          height: 18,
          borderRadius: 20,
          backgroundColor: "#D5D5D5",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handleClearInput}
      >
        <Svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <Path
            d="M7.52985 0.967342C7.66715 0.830049 7.66715 0.607451 7.52985 0.470158C7.39256 0.332864 7.16996 0.332864 7.03267 0.470158L4.00001 3.50282L0.967342 0.470159C0.830049 0.332865 0.607451 0.332865 0.470158 0.470159C0.332864 0.607453 0.332864 0.83005 0.470158 0.967344L3.50282 4.00001L0.47017 7.03266C0.332877 7.16995 0.332877 7.39255 0.47017 7.52984C0.607464 7.66714 0.830061 7.66714 0.967355 7.52984L4.00001 4.49719L7.03266 7.52984C7.16995 7.66714 7.39255 7.66714 7.52984 7.52984C7.66714 7.39255 7.66714 7.16995 7.52984 7.03266L4.49719 4.00001L7.52985 0.967342Z"
            fill="#606060"
          />
        </Svg>
      </Pressable>}
    </View>
  );
};

export default SearchBar;
