import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
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

const Paywall = ({ navigation }) => {
  const [offering, setOffering] = useState(null);
  const { theme } = useColourTheme();

  // Handle all errors well!

  const getOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      const customerInfo = await Purchases.checkTrialOrIntroductoryPriceEligibility(['rc_2499_1y_1w0', 'Pro']);
      // console.log(JSON.stringify(offerings.current, null, 2));
      console.log(JSON.stringify(customerInfo, null, 2));
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
      <ScrollView>
        <View style={{ padding: 20, gap: 40, paddingBottom: 80 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                color: themedColours.primaryText[theme],
                fontSize: 26,
                fontFamily: "Mulish_700Bold",
              }}
            >
              Your free trial
            </Text>
          </View>
          <TrialTimeline />
          <View style={{ gap: 14 }}>
            <StartTrialPrompt />
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
            <PlanCards />
          </View>
          <CancelInfo />
          <BottomButtons />
        </View>
      </ScrollView>
    </View>
  );
};

export default Paywall;
