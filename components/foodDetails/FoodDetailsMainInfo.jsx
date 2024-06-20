import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import COLOURS from "../../constants/colours";
import Flask from "../../svgs/Flask";
import FoodDetailsLesson from "./FoodDetailsLesson";
import RainDrops from "../../svgs/RainDrops";
import PalmTree from "../../svgs/PalmTree";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import FakeBlurComponent from "./FakeBlurComponent";
import { Image } from "react-native";
import FoodDetailReasonCard from "./FoodDetailReasonCard";
import { useSubscriptionState } from "../../hooks/useSubscriptionState";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";
// import { BlurView } from "@react-native-community/blur";
import Purchases from "react-native-purchases";
import { useCustomerInfo } from "../../hooks/useCustomerInfo";
import { useNavigation } from "@react-navigation/native";
import { Path, Svg } from "react-native-svg";

const angle = 91;
const angleRad = (Math.PI * angle) / 180;
const start = {
  x: 0.5 - Math.sin(angleRad) / 2,
  y: 0.5 + Math.cos(angleRad) / 2,
};
const end = {
  x: 0.5 + Math.sin(angleRad) / 2,
  y: 0.5 - Math.cos(angleRad) / 2,
};

const Feature = ({ feature }) => {
  const { theme } = useColourTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="11"
        viewBox="0 0 16 11"
        fill="none"
      >
        <Path
          d="M15.1465 1.23345C15.3675 0.968275 15.3316 0.574172 15.0665 0.353194C14.8013 0.132217 14.4072 0.168044 14.1862 0.433217L9.69399 5.82389C8.79163 6.90673 8.15685 7.66611 7.60626 8.16329C7.06852 8.64888 6.69741 8.80321 6.33302 8.80321C5.96864 8.80321 5.59753 8.64888 5.05978 8.16329C4.5092 7.66611 3.87442 6.90673 2.97206 5.82389L1.81316 4.43322C1.59218 4.16804 1.19808 4.13222 0.932908 4.35319C0.667735 4.57417 0.631908 4.96827 0.852885 5.23345L2.04394 6.66272C2.90667 7.69801 3.59757 8.52712 4.22204 9.09102C4.86709 9.6735 5.52647 10.0532 6.33302 10.0532C7.13958 10.0532 7.79896 9.6735 8.44401 9.09102C9.06847 8.52713 9.75937 7.69803 10.6221 6.66275L15.1465 1.23345Z"
          fill={themedColours.primaryText[theme]}
        />
      </Svg>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Mulish_400Regular",
          color: themedColours.primaryText[theme],
        }}
      >
        {feature}
      </Text>
    </View>
  );
};

const FoodDetailsMainInfo = () => {
  const currentFood = useSelector((state) => state.food.currentFood);
  // const { isSubscribed } = useSubscriptionState()
  const { theme } = useColourTheme();
  const [isSubscribed, setIsSubscribed] = useState(undefined);
  const [offeringDetails, setOfferingDetails] = useState("");

  const { customerInfo, error, loading } = useCustomerInfo();

  useEffect(() => {
    if (!customerInfo) return;

    if (typeof customerInfo.entitlements.active["Pro"] !== "undefined") {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }, [customerInfo]);

  const getAndDisplayOffering = async () => {
    const offerings = await Purchases.getOfferings();

    if (
      offerings.current !== null &&
      offerings.current.availablePackages.length !== 0
    ) {
      const price = offerings.current.availablePackages[0].product.priceString;
      const timeframe =
        offerings.current.availablePackages[0].packageType === "ANNUAL"
          ? "year"
          : "month";
      setOfferingDetails(`7 days free then just ${price}/${timeframe}`);
    } else {
      setOfferingDetails("");
    }
  };

  useEffect(() => {
    getAndDisplayOffering(); // Call this function when the component mounts
  }, []);

  const isUnknown = currentFood.processedState === "Unknown";
  const title =
    currentFood.processedState === "Processed"
      ? "Why you should avoid this"
      : `Why it's a great choice`;

  const message =
    currentFood.processedState === "Processed"
      ? "We recommend avoiding this product as it is considered highly processed based on the ingredients and additives."
      : "This product is a great choice as it occurs naturally on the earth, is nutrient dense, and does not contain harmful additives or ingredients.";

  // if (isUnknown) {
  //   return null;
  // }

  const justifyProperty =
    currentFood?.hasPalmOil === "Unknown" ||
    currentFood?.hasVegetableOil === "Unknown"
      ? "space-around"
      : "space-between";

  return (
    <View
      style={[styles.container, { borderColor: themedColours.stroke[theme] }]}
    >
      {!isSubscribed && (
        <LinearGradient
          colors={["#0B5253", "#19999C"]}
          start={start}
          end={end}
          style={styles.proFeatureTextContainer}
        >
          <Text style={styles.proFeatureText}>Pro Feature</Text>
        </LinearGradient>
      )}
      <Text
        style={[styles.titleText, { color: themedColours.primaryText[theme] }]}
      >
        In-Depth Analysis
      </Text>
      {isSubscribed && (
        <View style={{ gap: 14 }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_400Regular",
              color: themedColours.primaryText[theme],
            }}
          >
            {message}
          </Text>
          <View
            style={[
              styles.foodDetailReasonContainer,
              { justifyContent: justifyProperty },
            ]}
          >
            <FoodDetailReasonCard type={"Additive"} currentFood={currentFood} />
            {currentFood?.hasVegetableOil !== "Unknown" && (
              <FoodDetailReasonCard
                type={"Vegetable"}
                currentFood={currentFood}
              />
            )}
            {currentFood?.hasPalmOil !== "Unknown" && (
              <FoodDetailReasonCard type={"Palm"} currentFood={currentFood} />
            )}
          </View>
          {currentFood.additives?.map((el) => (
            <FoodDetailsLesson key={el} additive={el} />
          ))}
        </View>
      )}
      {!isSubscribed && (
        <View style={{ gap: 10, marginTop: 6 }}>
          <Feature feature={"Our personal recommendation"} />
          <Feature feature={"See whether it contains palm oil"} />
          <Feature feature={"See whether it contain vegetable oil"} />
          <Feature feature={"See all additives and their impact on health"} />
        </View>
      )}
    </View>
  );
};

export default FoodDetailsMainInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLOURS.lightGray,
    borderRadius: 20,
    gap: 14,
  },
  proFeatureTextContainer: {
    paddingHorizontal: 12,
    borderRadius: 30,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  proFeatureText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Mulish_700Bold",
  },
  titleText: {
    fontSize: 19,
    color: COLOURS.nearBlack,
    fontFamily: "Mulish_700Bold",
  },
  foodDetailReasonContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  tryProButtonContainer: {
    paddingHorizontal: 14,
    borderRadius: 12,
    paddingVertical: 8,
    gap: 4,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  tryProText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Mulish_700Bold",
  },
});
