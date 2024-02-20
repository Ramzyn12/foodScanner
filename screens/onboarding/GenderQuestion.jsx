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


const GenderQuestion = ({navigation}) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (value) => {
    setSelectedGender(value); // Set the selected gender
    console.log(value); // Log the selected value
    setTimeout(() => {
      navigation.navigate('ConsumptionQuestion');
    }, 800); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <ProgressBar percent={36} />
        <Text style={styles.titleText}>What is your gender?</Text>
        {/* Radio Buttons */}
        <View style={{ gap: 12 }}>
          <RadioButton selectedValue={selectedGender} value={'Female'} onSelect={handleGenderSelect} />
          <RadioButton selectedValue={selectedGender} value={'Male'} onSelect={handleGenderSelect} />
          <RadioButton selectedValue={selectedGender} value={'Non-binary'} onSelect={handleGenderSelect} />
          <RadioButton selectedValue={selectedGender} value={'Prefer not to say'} onSelect={handleGenderSelect} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GenderQuestion;

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
