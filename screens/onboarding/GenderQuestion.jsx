import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import ProgressBar from "../../components/onboarding/ProgressBar";
import COLOURS from "../../constants/colours";
import RadioButton from "../../components/onboarding/RadioButton";
import { useDispatch } from "react-redux";
import { setGender } from "../../redux/onboardingSlice";

const GenderQuestion = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const dispatch = useDispatch();

  const handleGenderSelect = (value) => {
    setSelectedGender(value);
    dispatch(setGender(value));
    setTimeout(() => {
      navigation.navigate("ConsumptionQuestion");
    }, 800);
  };

  return (
    <View style={styles.container}>
      <ProgressBar percent={36} />
      <Text style={styles.titleText}>What is your gender?</Text>
      {/* Radio Buttons */}
      <View style={{ gap: 12 }}>
        <RadioButton
          selectedValue={selectedGender}
          value={"Female"}
          onSelect={handleGenderSelect}
        />
        <RadioButton
          selectedValue={selectedGender}
          value={"Male"}
          onSelect={handleGenderSelect}
        />
        <RadioButton
          selectedValue={selectedGender}
          value={"Non-binary"}
          onSelect={handleGenderSelect}
        />
        <RadioButton
          selectedValue={selectedGender}
          value={"Prefer not to say"}
          onSelect={handleGenderSelect}
        />
      </View>
    </View>
  );
};

export default GenderQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 40,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
    paddingVertical: 40,
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
    fontSize: 28,
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
