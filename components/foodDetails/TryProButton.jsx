import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useCustomerInfo } from "../../hooks/useCustomerInfo";
import Purchases from "react-native-purchases";
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

const TryProButton = () => {
  const navigation = useNavigation();

  const { customerInfo, error, loading } = useCustomerInfo();
  const [isSubscribed, setIsSubscribed] = useState(undefined);
  const [offeringDetails, setOfferingDetails] = useState("");

  useEffect(() => {
    if (!customerInfo) return;

    if (typeof customerInfo.entitlements.active["Pro"] !== "undefined") {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }, [customerInfo]);

  useEffect(() => {
    getAndDisplayOffering(); // Call this function when the component mounts
  }, []);

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

  return (
    <>
      {!isSubscribed && (
        <Pressable onPress={() => navigation.navigate("Paywall")}>
          <LinearGradient
            colors={["#0B5253", "#19999C"]}
            start={start}
            end={end}
            style={styles.tryProButtonContainer}
          >
            <Text style={styles.tryProText}>Try Pro</Text>
            <Text
              style={{
                color: "#F7F6EF",
                fontSize: 12,
                fontFamily: "Mulish_700Bold",
              }}
            >
              {offeringDetails}
            </Text>
          </LinearGradient>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tryProButtonContainer: {
    paddingHorizontal: 14,
    borderRadius: 12,
    gap: 4,
    height: 60,
    marginBottom: 55,

    justifyContent: "center",
    alignItems: "center",
  },
  tryProText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Mulish_700Bold",
  },
});

export default TryProButton;
