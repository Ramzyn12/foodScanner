import { View, Text, Pressable } from "react-native";
import React from "react";
import SinglePlanCard from "./SinglePlanCard";
import Purchases from "react-native-purchases";

const PlanCards = ({ freeTrial, offerings }) => {
  const getPercentSaved = () => {
    const decimalSaved =
      1 - offerings[0].product.price / (offerings[1].product.price * 12);
    return decimalSaved.toFixed(2) * 100;
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

  return (
    <View style={{ gap: 14 }}>
      {offerings.map((offering) => {
        const description =
          offering.packageType === "ANNUAL"
            ? "7 DAY FREE TRIAL INCLUDED"
            : offering.packageType === "MONTHLY"
            ? "CANCEL ANYTIME"
            : "ONE-TIME PAYMENT";

        const percentSaved =
          offering.packageType === "ANNUAL" ? getPercentSaved() : null;
        const hideSubtitle = offering.packageType === "ANNUAL" && !freeTrial;
        console.log(percentSaved, 'EAACH');
        return (
          <Pressable
            onPress={() => onPurchase(offering)}
            key={offering.identifier}
          >
            <SinglePlanCard
              timeframe={offering.packageType}
              hideSubtitle={hideSubtitle}
              subtitle={description}
              savePercent={percentSaved}
              price={offering.product.priceString}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default PlanCards;
