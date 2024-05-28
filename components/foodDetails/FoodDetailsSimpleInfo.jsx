import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";
import COLOURS from "../../constants/colours";
import { Image } from "react-native";
import { Pressable } from "react-native";
import FoodDetailsButtons from "./FoodDetailsButtons";
import { Modal } from "react-native";
import FoodImageModal from "./FoodImageModal";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import ClearIcon from "../../svgs/ClearIcon";
import unknown from "../../assets/unknown.webp";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const FoodDetailsSimpleInfo = ({ foodItem, expectedId }) => {
  const navigation = useNavigation();
  const {theme} = useColourTheme()
  const currentFood = useSelector((state) => state.food.currentFood);
  const processedState = currentFood?.processedState;
  const isUnknown = processedState === 'Unknown'
  const [modalVisible, setModalVisible] = useState(false);
  const background =
  isUnknown ? themedColours.secondaryBackground[theme] : 
    processedState === "Processed"
      ? COLOURS.badFoodBackground
      : COLOURS.greatFoodBackground;
  const textColour =
  isUnknown ? themedColours.secondaryText[theme] :
    processedState === "Processed"
      ? COLOURS.badFoodText
      : COLOURS.greatFoodText;

  return (
    <View style={styles.container}>
      <View style={styles.simpleInfoContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            style={styles.image}
            source={
              currentFood?.image_url ? { uri: currentFood.image_url } : unknown
            }
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={[styles.foodSupplierText, {color: themedColours.secondaryText[theme]}]}>{currentFood?.brand}</Text>
          <Text style={[styles.foodNameText, {color: themedColours.primaryText[theme]}]}>{currentFood?.name}</Text>
          <View
            style={[styles.scoreBackground, { backgroundColor: background }]}
          >
            <Text style={[styles.scoreText, { color: textColour }]}>
              {processedState}
            </Text>
          </View>
        </View>
        {/* exit svg */}
        <Pressable
          style={{ alignSelf: "flex-start" }}
          onPress={() => navigation.goBack()}
        >
          <ClearIcon background={themedColours.secondaryBackground[theme]} crossColor={themedColours.secondaryText[theme]} size={28} />
        </Pressable>
      </View>
      <FoodDetailsButtons expectedId={expectedId} />
      <FoodImageModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        image_url={currentFood?.image_url}
      />
    </View>
  );
};

export default FoodDetailsSimpleInfo;

const styles = StyleSheet.create({
  container: { padding: 20 },
  simpleInfoContainer: { flexDirection: "row", alignItems: "flex: start", gap: 15 },
  image: { width: 48, height: 65, borderRadius: 10, },
  foodSupplierText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
    color: COLOURS.tabUnselected,
  },
  foodNameText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
    color: COLOURS.nearBlack,
  },
  scoreBackground: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    // alignItems: "center",
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginTop: 14,
    // justifyContent: "center",
    borderRadius: 6,
    backgroundColor: COLOURS.greatFoodText,
  },
  scoreText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 14,
  },
});
