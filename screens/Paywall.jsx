import { View, Text, ActivityIndicator, Alert, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Purchases from "react-native-purchases";

const Paywall = () => {
  const [offering, setOffering] = useState(null);

  // Handle all errors well!

  const getOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      console.log(JSON.stringify(offerings.current, null, 2));
      if (
        offerings.current !== null &&
        offerings.current.availablePackages.length !== 0
      ) {
        setOffering(offerings.current);
      }
    } catch (e) {}
  };

  const onPurchase = async (item) => {

    // return console.log(item);
    try {
      const { customerInfo } = await Purchases.purchasePackage(item);
      if (typeof customerInfo.entitlements.active["Pro"] !== "undefined") {
        Alert.alert("Welcome to Pro", "Your in");
      }
    } catch (e) {
      if (!e.userCancelled) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getOfferings();
  }, []);

  if (!offering) return <ActivityIndicator />;

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{ fontSize: 34, fontFamily: "Mulish_700", textAlign: "center" }}
      >
        Pro Access
      </Text>
      <Pressable onPress={() => onPurchase(offering.availablePackages[0])}
        style={{
          width: "100%",
          backgroundColor: "lightgray",
          padding: 14,
          borderRadius: 20,
          marginTop: 20,
        }}
      >
        <Text style={{ textAlign: "center" }}>
          {offering.availablePackages[0].product.description}
        </Text>
        <Text style={{ textAlign: "center" }}>
          {offering.availablePackages[0].product.priceString}
        </Text>
      </Pressable>
    </View>
  );
};

export default Paywall;
