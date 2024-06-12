import { View, Text, Pressable } from "react-native";
import React from "react";
import SinglePlanCard from "./SinglePlanCard";
import Purchases from "react-native-purchases";
import * as Notifications from "expo-notifications";

const PlanCards = ({ freeTrial, offerings }) => {
  const getPercentSaved = () => {
    const decimalSaved =
      1 - offerings[0].product.price / (offerings[1].product.price * 12);
    return decimalSaved.toFixed(2) * 100;
  };

  const getElegibilityStatus = async (item) => {
    const trialStatus =
      await Purchases.checkTrialOrIntroductoryPriceEligibility([
        item.product.identifier,
      ]);

    if (
      Purchases.INTRO_ELIGIBILITY_STATUS[
        trialStatus[item.product.identifier].status
      ] === "INTRO_ELIGIBILITY_STATUS_ELIGIBLE"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onPurchase = async (item) => {
    const isFreeTrial = await getElegibilityStatus(item);

    try {
      const { customerInfo } = await Purchases.purchasePackage(item);
      if (typeof customerInfo.entitlements.active["Pro"] !== "undefined") {
        Alert.alert("Welcome to Pro", "Your in"); // Improve - see what others do
        if (isFreeTrial) {
          // May need to prompt for notifications now 
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Free trial ending 2 days",
              body: "Trial ending two days ",
            },
            // trigger: { seconds: 2 },
            trigger: { seconds: 5 * 24 * 60 * 60,}  // 5 days in seconds
          });
        }
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
