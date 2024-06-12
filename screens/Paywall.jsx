import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Purchases from "react-native-purchases";
import ClearIcon from "../svgs/ClearIcon";
import { themedColours } from "../constants/themedColours";
import { useColourTheme } from "../context/Themed";
import TrialTimeline from "../components/paywalls/TrialTimeline";
import { LinearGradient } from "expo-linear-gradient";
import StartTrialPrompt from "../components/paywalls/StartTrialPrompt";
import BenefitCards from "../components/paywalls/BenefitCards";
import PlanCards from "../components/paywalls/PlanCards";
import CancelInfo from "../components/paywalls/CancelInfo";
import BottomButtons from "../components/paywalls/BottomButtons";
import PaywallNoTrial from "./paywalls/PaywallNoTrial";

const Paywall = ({ navigation }) => {
  const [offering, setOffering] = useState(null);
  const [elegibleFreeTrial, setElegibleFreeTrial] = useState(undefined);
  const { theme } = useColourTheme();
  const scrollViewRef = useRef(null); // Create a ref for the ScrollView

  // Handle all errors well!

  const getOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      // const customerInfo = await Purchases.getCustomerInfo()
      console.log(JSON.stringify(offerings, null, 2));
      if (
        offerings.current !== null &&
        offerings.current.availablePackages.length !== 0
      ) {
        const firstProduct = offerings.current.availablePackages[0].product;
        const trialStatus =
          await Purchases.checkTrialOrIntroductoryPriceEligibility([
            firstProduct.identifier,
          ]);

        if (
          Purchases.INTRO_ELIGIBILITY_STATUS[
            trialStatus[firstProduct.identifier].status
          ] === "INTRO_ELIGIBILITY_STATUS_ELIGIBLE"
        ) {
          console.log("ELEGIBLE!!");
          setElegibleFreeTrial(true);
        } else {
          console.log("NOT ELIGIBLE OR UNKOWN :(");
          setElegibleFreeTrial(false);
        }
        setOffering(offerings.current);
      }
    } catch (e) {
      console.log(e);
    }
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

  const handleStartTrial = () => {
    if (offering.availablePackages.length > 0) {
      // Make sure you pick the trial offer and not any other one!
      onPurchase(offering.availablePackages[0]);
    }
  };

  if (!offering || elegibleFreeTrial === undefined)
    return <ActivityIndicator />;

  if (elegibleFreeTrial === false) {
    // change to false
    return <PaywallNoTrial offering={offering} />;
  }

  const handleScrollToPlans = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 800, animated: true });
    }
  };

  // Else return free trial one
  return (
    <View>
      <Pressable
        hitSlop={30}
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 20, right: 20, zIndex: 3000 }}
      >
        <ClearIcon
          size={28}
          crossColor={themedColours.secondaryText[theme]}
          background={themedColours.secondaryBackground[theme]}
        />
      </Pressable>
      <ScrollView ref={scrollViewRef}>
        <View style={{ padding: 20, gap: 40, paddingBottom: 80 }}>
          <Text
            style={{
              color: themedColours.primaryText[theme],
              fontSize: 26,
              fontFamily: "Mulish_700Bold",
            }}
          >
            Your free trial
          </Text>

          <TrialTimeline
            price={offering.availablePackages[0].product.priceString}
          />
          <View style={{ gap: 14 }}>
            <StartTrialPrompt
              yearlyPrice={offering.availablePackages[0].product.priceString}
              onScroll={handleScrollToPlans}
              onPress={handleStartTrial}
            />
            <BenefitCards />
          </View>
          <View>
            <Text
              style={{
                fontFamily: "Mulish_700Bold",
                fontSize: 20,
                color: themedColours.primaryText[theme],
                marginBottom: 14,
              }}
            >
              Choose another plan
            </Text>
            <PlanCards
              offerings={offering?.availablePackages}
              freeTrial={true}
            />
          </View>
          <CancelInfo />
          <BottomButtons />
        </View>
      </ScrollView>
    </View>
  );
};

export default Paywall;
