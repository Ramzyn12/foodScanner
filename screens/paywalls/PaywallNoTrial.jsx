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

import { themedColours } from "../../constants/themedColours";
import { useColourTheme } from "../../context/Themed";
import TrialTimeline from "../../components/paywalls/TrialTimeline";
import { LinearGradient } from "expo-linear-gradient";
import StartTrialPrompt from "../../components/paywalls/StartTrialPrompt";
import BenefitCards from "../../components/paywalls/BenefitCards";
import PlanCards from "../../components/paywalls/PlanCards";
import CancelInfo from "../../components/paywalls/CancelInfo";
import BottomButtons from "../../components/paywalls/BottomButtons";
import ClearIcon from "../../svgs/ClearIcon";
import { useNavigation } from "@react-navigation/native";

const angle = 109;
const angleRad = (Math.PI * angle) / 180;
const start = {
  x: 0.5 - Math.sin(angleRad) / 2,
  y: 0.5 + Math.cos(angleRad) / 2,
};
const end = {
  x: 0.5 + Math.sin(angleRad) / 2,
  y: 0.5 - Math.cos(angleRad) / 2,
};

const PaywallNoTrial = ({offering}) => {
  const { theme } = useColourTheme();
  const navigation = useNavigation()
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
          <View style={{ flexDirection: "row", gap: 8, alignItems: 'center' }}>
            <Text
              style={{
                color: themedColours.primaryText[theme],
                fontSize: 26,
                fontFamily: "Mulish_700Bold",
              }}
            >
              Upgrade to Ivy
            </Text>
            <LinearGradient
              colors={["#0B5253", "#19999C"]}
              start={start}
              end={end}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Mulish_700Bold",
                  color: "white",
                }}
              >
                Pro
              </Text>
            </LinearGradient>
          </View>
          <View>
            <Text style={{marginBottom: 8, fontSize: 20, fontFamily: 'Mulish_700Bold', color: themedColours.primaryText[theme]}}>Our plans</Text>
            <Text style={{marginBottom: 14, fontFamily: 'Mulish_400Regular', color: themedColours.secondaryText[theme],fontSize: 14}}>
              Choose the plan that suits you best. You can easily cancel your
              plan at any time.
            </Text>
            <PlanCards offerings={offering?.availablePackages} freeTrial={false} />
          </View>
          <View style={{ gap: 14 }}>
            {/* <StartTrialPrompt /> */}
            <Text style={{marginBottom: 8, fontSize: 20, fontFamily: 'Mulish_700Bold', color: themedColours.primaryText[theme]}}>Everything you need to thrive</Text>
            <BenefitCards />
          </View>
          
          <CancelInfo />
          <BottomButtons />
        </View>
      </ScrollView>
    </View>
  );
};

export default PaywallNoTrial;
