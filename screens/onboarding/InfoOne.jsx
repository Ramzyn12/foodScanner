import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from "../../constants/colours";
import SeedOils from "../../svgs/SeedOils";
import FastFood from "../../svgs/FastFood";
import VeganBurger from "../../svgs/VeganBurger";
import ImageCard from "../../components/onboarding/ImageCard";
import Animated from "react-native-reanimated";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const InfoOne = ({ navigation }) => {
  const {theme} = useColourTheme()


  return (
    <View style={[styles.container, {backgroundColor: themedColours.primaryBackground[theme]}]}>
      <View style={styles.contentContainer}>
        <Text style={[styles.titleText, {color: themedColours.primaryText[theme]}]}>
          Since the 20th century, processed foods have invaded our diets.
        </Text>
        <Text style={[styles.subtitleText, {color: themedColours.primaryText[theme]}]}>Foods such as:</Text>
        <View style={styles.imageCardsContainer}>
          <ImageCard svg={<SeedOils color={themedColours.primaryText[theme]} />} text="Seed Oils" />
          <ImageCard svg={<FastFood color={themedColours.primaryText[theme]} />} text="Fast Food" />
          <ImageCard svg={<VeganBurger color={themedColours.primaryText[theme]} />} text="Substitutes" />
        </View>
        <Text style={[styles.descriptionText, {color: themedColours.primaryText[theme]}]}>
          These are often marketed as ‘heart-healthy’ and much healthier
          alternatives to other more natural food sources.
        </Text>
      </View>
      {/* Button */}
      <Pressable onPress={() => navigation.navigate("InfoTwo")}>
        <Animated.View sharedTransitionTag="greenButton" style={[styles.button, {backgroundColor: themedColours.primary[theme]}]}>
          <Text style={[styles.buttonText, {color: themedColours.primaryBackground[theme]}]}>Next</Text>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
          >
            <Path
              d="M10.396 0.655536C10.1753 0.436848 9.81917 0.438437 9.60048 0.659085C9.38179 0.879733 9.38338 1.23588 9.60403 1.45457L10.9263 2.76505C11.4629 3.29691 11.831 3.66294 12.0801 3.97308C12.161 4.07387 12.2242 4.16261 12.2732 4.24255L1 4.24255C0.68934 4.24255 0.4375 4.49439 0.4375 4.80505C0.4375 5.11572 0.68934 5.36755 1 5.36755L12.2732 5.36755C12.2242 5.4475 12.161 5.53623 12.0801 5.63702C11.831 5.94717 11.4629 6.3132 10.9263 6.84505L9.60403 8.15554C9.38338 8.37422 9.38179 8.73038 9.60048 8.95102C9.81917 9.17167 10.1753 9.17326 10.396 8.95457L11.742 7.62048C12.249 7.11802 12.6634 6.70736 12.9572 6.34146C13.2628 5.96097 13.484 5.57476 13.5431 5.11118C13.556 5.00954 13.5625 4.9073 13.5625 4.80505C13.5625 4.70281 13.556 4.60057 13.5431 4.49893C13.484 4.03535 13.2628 3.64914 12.9572 3.26865C12.6634 2.90274 12.249 2.49208 11.742 1.98962L10.396 0.655536Z"
              fill={themedColours.primaryBackground[theme]}
            />
          </Svg>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default InfoOne;

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
    gap: 40,
    flex: 1,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 28,
    fontFamily: "Mulish_700Bold",
    textAlign: "center",
    color: COLOURS.nearBlack,
  },
  subtitleText: {
    fontSize: 18,
    fontFamily: "Mulish_700Bold",
    textAlign: "center",
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
  // buttonContainer: { paddingHorizontal: 30, paddingBottom: 10 },
  imageCardsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Mulish_600SemiBold",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  descriptionText: {
    color: COLOURS.nearBlack,
    textAlign: "center",
    fontSize: 17,
    fontFamily: "Mulish_600SemiBold",
  },
});
