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
import * as Notifications from "expo-notifications";
import LoadingPaywall from "../components/paywalls/LoadingPaywall";
import { ENTITLEMENT_ID } from "../constants/rcConstants";
// import { useCustomerInfo } from "../hooks/useCustomerInfo";

const Paywall = ({ navigation }) => {
  const [offering, setOffering] = useState(null);
  const [elegibleFreeTrial, setElegibleFreeTrial] = useState(undefined);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { theme } = useColourTheme();
  const scrollViewRef = useRef(null); // Create a ref for the ScrollView

  // Handle all errors well!

  const getOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      console.log(offerings);

      // console.log(JSON.stringify(offerings.current, null, 2))
      if (
        offerings.current !== null &&
        offerings.current.availablePackages.length !== 0
      ) {
        // maybe change to offerings.current.annual to be more accurate
        const firstPackage = offerings.current.availablePackages[0];
        const isElegible = await getElegibilityStatus(firstPackage);

        if (isElegible) {
          console.log("ELEGIBLE");
          setElegibleFreeTrial(true);
        } else {
          console.log("NOT ELIGIBLE");
          setElegibleFreeTrial(false);
        }
        setOffering(offerings.current);
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Paywall Error", 'Please try again later');
    }
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
    setIsPurchasing(true);

    try {
      const isFreeTrial = await getElegibilityStatus(item);
      const { customerInfo } = await Purchases.purchasePackage(item);
      if (
        typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== "undefined"
      ) {
        navigation.goBack();
        Alert.alert("Welcome to Pro", "Your in"); // Improve - see what others do
        if (isFreeTrial) {
          // May need to prompt for notifications now
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Free trial ending 2 days",
              body: "Trial ending two days ",
            },
            // trigger: { seconds: 20 },
            trigger: { seconds: 5 * 24 * 60 * 60 }, // 5 days in seconds
          });
        }
      }
    } catch (e) {
      if (!e.userCancelled) {
        console.log(e); // Log this to central logging system!
        Alert.alert("Error purchasing", "Please try again later"); // Improve - see what others do
      }
      // if (e.code === Purchases.PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
      //   Alert.alert("Error purchasing package", "Please try again later");
      // }
    } finally {
      setIsPurchasing(false);
    }
  };

  useEffect(() => {
    getOfferings();
  }, []);

  const handleStartTrial = () => {
    if (offering.availablePackages.length > 0) {
      // Make sure you pick the trial offer and not any other one!
      // is there better way to do this than pick first one?
      onPurchase(offering.availablePackages[0]);
    }
  };

  if (!offering || elegibleFreeTrial === undefined) return <LoadingPaywall />;

  if (elegibleFreeTrial === false) {
    // change to false
    return <PaywallNoTrial isPurchasing={isPurchasing} offering={offering} />;
  }

  const handleScrollToPlans = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 800, animated: true });
    }
  };

  // Else elegible so return free trial one
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
              setIsPurchasing={setIsPurchasing}
              offerings={offering?.availablePackages}
              freeTrial={true}
            />
          </View>
          <CancelInfo />
          <BottomButtons />
        </View>
      </ScrollView>
      {isPurchasing && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
            bottom: 0,
            opacity: 0.3,
            backgroundColor: "black",
          }}
        >
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

export default Paywall;
