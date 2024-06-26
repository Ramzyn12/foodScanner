import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import TeaCup from "../../svgs/TeaCup";
import FruitBowlIcon from "../../svgs/FruitBowlIcon";
import FruitBowlAuth from "../../svgs/FruitBowlAuth";
import CoffeeIcon from "../../svgs/CoffeeIcon";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const AuthDesign = () => {
  const {theme} = useColourTheme()
  return (
    <View style={{ position: "relative" }}>
      <View style={styles.iconsContainer}>
        <TeaCup color={themedColours.primaryText[theme]} />
        <View style={{ position: "relative", bottom: 13 }}>
          <FruitBowlAuth color={themedColours.primaryText[theme]} width={162} height={162} />
        </View>
        <CoffeeIcon color={themedColours.primaryText[theme]} />
      </View>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="430"
        height="109"
        viewBox="0 0 430 109"
        fill="none"
      >
        <Path
          d="M0 0H430V86.4251C263.786 116.45 170.232 116.6 0 86.4251V0Z"
          fill={themedColours.tertiaryBackground[theme]}
        />
        <Path
          d="M0 0H430V86.4251C263.786 116.45 170.232 116.6 0 86.4251V0Z"
          fill="black"
          fillOpacity="0.04"
        />
      </Svg>
    </View>
  );
};

export default AuthDesign;

const styles = StyleSheet.create({
  iconsContainer: {
    position: "absolute",
    flexDirection: "row",
    zIndex: 20,
    alignItems: "flex-end",
    justifyContent: "center",
    bottom: "30%",
    width: "100%",
  },
});
