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

const FoodDetailsSimpleInfo = ({ foodItem }) => {
  const navigation = useNavigation();


  const currentFood = useSelector(state => state.food.currentFood)
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.simpleInfoContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            style={styles.image}
            source={{
              uri: currentFood?.image_url,
            }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.foodSupplierText}>{currentFood?.brand}</Text>
          <Text style={styles.foodNameText}>{currentFood?.name}</Text>
        </View>
        {/* exit svg */}
        <Pressable style={{alignSelf: 'flex-start'}} onPress={() => navigation.goBack()}>
          <ClearIcon size={28} />
        </Pressable>
      </View>
      <FoodDetailsButtons foodItem={foodItem} />
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
  simpleInfoContainer: { flexDirection: "row", alignItems: "center", gap: 15 },
  image: { width: 48, height: 58, borderRadius: 10 },
  foodSupplierText: {
    fontFamily: "Mulish_600SemiBold",
    fontSize: 16,
    color: COLOURS.tabUnselected,
  },
  foodNameText: {
    fontFamily: "Mulish_600SemiBold",
    fontSize: 16,
    color: COLOURS.nearBlack,
  },
});
