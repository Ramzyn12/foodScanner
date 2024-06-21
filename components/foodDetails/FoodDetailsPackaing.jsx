import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";
import { useCustomerInfo } from "../../hooks/useCustomerInfo";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
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

const capitalizeWords = (str) => {
  return str
    .split(/[- ]/) // Split by hyphens and spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const FoodDetailsPackaing = () => {
  const currentFood = useSelector((state) => state.food.currentFood);
  const { theme } = useColourTheme();

  const transformedData = currentFood?.packagingData?.map(
    ({ shape, material }) => {
      return {
        shape: capitalizeWords(shape),
        material: capitalizeWords(material),
      };
    }
  )

   // Remove duplicates
   const uniqueData = transformedData?.filter((value, index, self) =>
   index === self.findIndex((t) => (
     t.shape === value.shape && t.material === value.material
   ))
 );

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

  // console.log(currentFood?.packagingData);

  return (
    <View
      style={{
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: themedColours.stroke[theme],
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
      <View style={{ marginBottom: 20, gap: 10 }}>
        <Text
          style={{
            fontSize: 19,
            fontFamily: "Mulish_700Bold",
            color: themedColours.primaryText[theme],
          }}
        >
          Packaging
        </Text>
        {!isSubscribed && <Text
          style={{
            fontSize: 14,
            fontFamily: "Mulish_700Bold",
            color: themedColours.secondaryText[theme],
          }}
        >
          See how this product is packaged 
        </Text>}
      </View>

      {uniqueData?.length > 0 &&
        isSubscribed &&
        uniqueData.map((el, ind) => {
          return (
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Mulish_400Regular",
                color: themedColours.secondaryText[theme],
              }}
              key={el.shape + ind}
            >{`${el.shape} (${el.material})`}</Text>
          );
        })}
      {uniqueData?.length === 0 && isSubscribed && (
        <Text
          style={{
            fontFamily: "Mulish_700Bold",
            fontSize: 14,
            color: themedColours.secondaryText[theme],
            marginTop: -10,
          }}
        >
          Packaging materials missing for this product
        </Text>
      )}
      {!isSubscribed && (
        <View style={{ gap: 10, marginTop: 6 }}>
          <Feature feature={"Packaging impact on the environment  "} />
          <Feature feature={"See what materials are used"} />
        </View>
      )}
    </View>
  );
};

export default FoodDetailsPackaing;

const styles = StyleSheet.create({
  proFeatureTextContainer: {
    paddingHorizontal: 12,
    borderRadius: 30,
    marginBottom: 20,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  proFeatureText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Mulish_700Bold",
  },
});
