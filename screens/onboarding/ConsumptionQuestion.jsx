import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import ProgressBar from "../../components/onboarding/ProgressBar";
import COLOURS from "../../constants/colours";
import { Path, Svg } from "react-native-svg";
import RadioButton from "../../components/onboarding/RadioButton";

const options = ["1", "2", "3", "4", "5", "6", "7"];

const ConsumptionQuestion = ({ navigation }) => {
  const [selectedDays, setSelectedDays] = useState(null);

  const handleDaySelect = (value) => {
    setSelectedDays(value); // Set the selected gender
    console.log(value); // Log the selected value
    setTimeout(() => {
      navigation.navigate("MedicalQuestion");
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <ProgressBar percent={48} />
        <Text style={styles.titleText}>
          On average, how many days per week do you consume processed food?
        </Text>
        {/* Radio Buttons */}
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
      </View>
    </SafeAreaView>
  );
};

export default ConsumptionQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
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
