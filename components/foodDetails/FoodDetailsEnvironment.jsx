import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import COLOURS from "../../constants/colours";
import { useSelector } from "react-redux";
import PalmTree from "../../svgs/PalmTree";
import CarIcon from "../../svgs/CarIcon";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";
import PackagingIcon from "../../svgs/PackagingIcon";
import { Path, Svg } from "react-native-svg";
import { useCustomerInfo } from "../../hooks/useCustomerInfo";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

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

const FoodDetailsEnvironment = () => {
  const currentFood = useSelector((state) => state.food.currentFood);
  const { theme } = useColourTheme();
  const showCarbonFootprint = currentFood.co2Footprint[0] && currentFood.co2Footprint[1]

  const [isSubscribed, setIsSubscribed] = useState(undefined);

  const { customerInfo, error, loading } = useCustomerInfo(); // Handle error and loading

  useEffect(() => {
    if (!customerInfo) return;

    if (typeof customerInfo.entitlements.active["Pro"] !== "undefined") {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }, [customerInfo]);

  const impacts = ["low", "medium", "high"];

  const detectedImpact = impacts.find((impact) =>
    currentFood?.packagingImpact?.includes(impact)
  );

  const palmOilString = currentFood?.hasPalmOil === 'Yes' ? 'Contains Palm Oil' : 'Palm Oil Free'

  const noDataAvailable = currentFood?.hasPalmOil === 'Unknown' && !showCarbonFootprint && !detectedImpact
  const subtitle = noDataAvailable ? 'Environment data missing for this product' : 'How this affects the environment'

  return (
    <View
      style={{
        marginTop: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: themedColours.stroke[theme],
        borderRadius: 20,
        marginBottom: isSubscribed ? 60:  20,
        gap: 20,
      }}
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
      <View style={{ gap: 4 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 19,
              fontFamily: "Mulish_700Bold",
              color: themedColours.primaryText[theme],
            }}
          >
            Environment
          </Text>
          {currentFood.ecoscore && isSubscribed &&  (
            <View
              style={{
                backgroundColor: "#DB1200",
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 6,
                alignSelf: "flex-end",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Mulish_700Bold",
                  color: "white",
                }}
              >
                {currentFood.ecoscore}
              </Text>
            </View>
          )}
        </View>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Mulish_700Bold",
            color: themedColours.secondaryText[theme],
          }}
        >
          {subtitle}
        </Text>
      </View>
      {currentFood.hasPalmOil !== 'Unknown' && isSubscribed && (
        <View
          style={{ flexDirection: "row", gap: 14, alignContent: "flex-start" }}
        >
          <PalmTree color={themedColours.primaryText[theme]} />
          <View style={{ gap: 8, flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Mulish_700Bold",
                color: themedColours.primaryText[theme],
              }}
            >
              {palmOilString}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Mulish_400Regular",
                color: themedColours.secondaryText[theme],
              }}
            >
              Tropical forests in Asia, Africa and Latin America are destroyed
              to create and expand oil palm tree plantations. The deforestation
              contributes to climate change, and it endangers species such as
              the orangutan, the pigmy elephant and the Sumatran rhino.
            </Text>
          </View>
        </View>
      )}
      {showCarbonFootprint && isSubscribed && (
        <View
          style={{ flexDirection: "row", gap: 14, alignContent: "flex-start" }}
        >
          <CarIcon color={themedColours.primaryText[theme]} />
          <View style={{ gap: 8, flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Mulish_700Bold",
                color: themedColours.primaryText[theme],
              }}
            >
              Carbon Footprint
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Mulish_400Regular",
                color: themedColours.secondaryText[theme],
              }}
            >
              {`Producing this product generates ${
                currentFood.co2Footprint[0]
              } which is equivalent ${currentFood.co2Footprint[1].slice(6)}`}
            </Text>
          </View>
        </View>
      )}
      {detectedImpact && isSubscribed && (
        <View
          style={{ flexDirection: "row", gap: 14, alignContent: "flex-start" }}
        >
          <PackagingIcon />
          <View style={{ gap: 8, flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Mulish_700Bold",
                color: themedColours.primaryText[theme],
              }}
            >
              Packaging
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Mulish_400Regular",
                color: themedColours.secondaryText[theme],
              }}
            >
              {`The packaging of this product has a ${detectedImpact} impact on the environment. `}
            </Text>
          </View>
        </View>
      )}
      {!isSubscribed && (
        <View style={{ gap: 10, marginTop: 6 }}>
          <Feature feature={"Overall environment impact score"} />
          <Feature feature={"View the Palm Oil content"} />
          <Feature feature={"Understand the carbon footprint"} />
          <Feature feature={"Packing impact and type"} />
        </View>
      )}
    </View>
  );
};

export default FoodDetailsEnvironment;

const styles = StyleSheet.create({
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
});
