import { View, Text, StyleSheet, Touchable, Pressable } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import { TouchableOpacity } from "react-native";
import { Path, Svg } from "react-native-svg";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";
const CheckBox = ({ value, selectedValues, onSelect }) => {
  
  const isSelected = selectedValues.includes(value);
  const {theme} = useColourTheme()
  return (
    <Pressable
      style={[
        [styles.checkBoxContainer, {borderColor: themedColours.stroke[theme]}],
        isSelected && [styles.checkBoxContainerSelected, {borderColor: themedColours.primary[theme]}],
      ]}
      onPress={() => onSelect(value)}
    >
      <View style={[[styles.checkBox, {backgroundColor: themedColours.tertiaryBackground[theme]}], isSelected && [styles.checkBoxSelected, {backgroundColor: themedColours.primary[theme]}]]}>
        {isSelected && (
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="13"
            viewBox="0 0 18 13"
            fill="none"
          >
            <Path
              d="M17.5762 1.48016C17.8414 1.16195 17.7984 0.689026 17.4802 0.423853C17.1619 0.15868 16.689 0.201673 16.4239 0.519881L11.0332 6.98869C9.95034 8.2881 9.18861 9.19936 8.52791 9.79597C7.88262 10.3787 7.43728 10.5639 7.00002 10.5639C6.56276 10.5639 6.11742 10.3787 5.47213 9.79597C4.81143 9.19935 4.04969 8.28809 2.96686 6.98869L1.57618 5.31988C1.31101 5.00167 0.838088 4.95868 0.519881 5.22385C0.201673 5.48903 0.15868 5.96195 0.423853 6.28016L1.85312 7.99528C2.88839 9.23764 3.71748 10.2326 4.46684 10.9092C5.24089 11.6082 6.03216 12.0639 7.00002 12.0639C7.96788 12.0639 8.75914 11.6082 9.5332 10.9092C10.2826 10.2326 11.1116 9.23766 12.1469 7.99532L17.5762 1.48016Z"
              fill={themedColours.primaryBackground[theme]}
            />
          </Svg>
        )}
      </View>
      <Text style={[styles.checkBoxText, {color: themedColours.primaryText[theme]}]}>{value}</Text>
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkBoxContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLOURS.lightGray,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 20,
  },
  checkBoxContainerSelected: {
    borderWidth: 2,
    paddingHorizontal: 11,
    marginVertical: -1,
    borderColor: COLOURS.darkGreen,
  },
  checkBox: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: "#F7F6EF",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBoxSelected: {
    backgroundColor: COLOURS.darkGreen,
  },
  checkBoxText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
    color: COLOURS.nearBlack,
  },
});
