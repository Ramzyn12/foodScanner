import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import ProgressBar from "../../components/onboarding/ProgressBar";
import COLOURS from "../../constants/colours";
import { Path, Svg } from "react-native-svg";
import RadioButton from "../../components/onboarding/RadioButton";
import { useDispatch } from "react-redux";
import { setProcessedFoodConsumption } from "../../redux/onboardingSlice";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const options = ["1", "2", "3", "4", "5", "6", "7"];

const ConsumptionQuestion = ({ navigation }) => {
  const [selectedDays, setSelectedDays] = useState(null);
  const dispatch = useDispatch();
  const { theme } = useColourTheme();

  const handleDaySelect = (value) => {
    setSelectedDays(value); // Set the selected gender
    dispatch(setProcessedFoodConsumption(value));
    setTimeout(() => {
      navigation.navigate("MedicalQuestion");
    }, 800);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themedColours.primaryBackground[theme] },
      ]}
    >
      <ProgressBar percent={48} />
      <Text
        style={[styles.titleText, { color: themedColours.primaryText[theme] }]}
      >
        On average, how many days per week do you consume processed food?
      </Text>
      {/* Radio Buttons */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ gap: 12 }}>
          {options.map((option) => (
            <RadioButton
              key={option}
              selectedValue={selectedDays}
              value={option}
              onSelect={handleDaySelect}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ConsumptionQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
    paddingVertical: 40,
    gap: 40,
  },
  contentContainer: {
    // alignItems: "center",
    gap: 40,
    width: "100%",
    paddingHorizontal: 30,
    flex: 1,
  },
  topContainer: {
    alignItems: "center",
    gap: 40,
    width: "100%",
    flex: 1,
  },
  titleText: {
    fontSize: 19,
    paddingHorizontal: 45, //DO we need this?
    fontFamily: "Mulish_700Bold",
    textAlign: "center",
    color: COLOURS.nearBlack,
  },
  button: {
    backgroundColor: COLOURS.darkGreen,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 44,
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Mulish_600SemiBold",
  },
});
