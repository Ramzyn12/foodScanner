import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React from "react";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";
import COLOURS from "../constants/colours";
import { Image } from "react-native";
import { Pressable } from "react-native";
import FoodDetailsButtons from "./FoodDetailsButtons";
import { Modal } from "react-native";
import FoodImageModal from "./FoodImageModal";
import { useNavigation } from "@react-navigation/native";

const FoodDetailsSimpleInfo = ({ modalVisible, setModalVisible, foodItem }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.simpleInfoContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            style={styles.image}
            source={{
              uri: foodItem?.image_url,
            }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.foodSupplierText}>{foodItem?.brand || 'Tesco'}</Text>
          <Text style={styles.foodNameText}>{foodItem?.name && foodItem?.name}</Text>
        </View>
        {/* exit svg */}
        <Pressable onPress={() => navigation.navigate("Scan")}>
          <Svg
            style={{ alignSelf: "flex-start" }}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <G clip-path="url(#clip0_324_1968)">
              <Path
                d="M30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15Z"
                fill="#767680"
                fillOpacity="0.12"
              />
              <Path
                d="M9.78516 20.4189C9.64681 20.2806 9.5555 20.1201 9.51123 19.9375C9.46696 19.7493 9.46696 19.564 9.51123 19.3813C9.5555 19.1987 9.64404 19.041 9.77686 18.9082L13.6699 15.0151L9.77686 11.1304C9.64404 10.9976 9.5555 10.8398 9.51123 10.6572C9.46696 10.4746 9.46696 10.292 9.51123 10.1094C9.5555 9.92122 9.64681 9.75798 9.78516 9.61963C9.91797 9.48682 10.0757 9.39827 10.2583 9.354C10.4465 9.3042 10.6318 9.3042 10.8145 9.354C11.0026 9.39827 11.1631 9.48405 11.2959 9.61133L15.1807 13.5044L19.0737 9.61963C19.2065 9.48682 19.3615 9.39827 19.5386 9.354C19.7212 9.3042 19.9038 9.3042 20.0864 9.354C20.2746 9.39827 20.4351 9.48958 20.5679 9.62793C20.7118 9.76074 20.8058 9.92122 20.8501 10.1094C20.8944 10.292 20.8944 10.4746 20.8501 10.6572C20.8058 10.8398 20.7145 10.9976 20.5762 11.1304L16.6997 15.0151L20.5762 18.9082C20.7145 19.041 20.8058 19.1987 20.8501 19.3813C20.8944 19.564 20.8944 19.7493 20.8501 19.9375C20.8058 20.1201 20.7118 20.2778 20.5679 20.4106C20.4351 20.549 20.2746 20.6431 20.0864 20.6929C19.9038 20.7371 19.7212 20.7371 19.5386 20.6929C19.3615 20.6486 19.2065 20.5573 19.0737 20.4189L15.1807 16.5342L11.2959 20.4272C11.1631 20.5545 11.0026 20.6431 10.8145 20.6929C10.6318 20.7371 10.4465 20.7371 10.2583 20.6929C10.0757 20.6431 9.91797 20.5518 9.78516 20.4189Z"
                fill="#8E8E93"
              />
            </G>
            <Defs>
              <ClipPath id="clip0_324_1968">
                <Rect width="30" height="30" fill="white" />
              </ClipPath>
            </Defs>
          </Svg>
        </Pressable>
      </View>
      <FoodDetailsButtons foodItem={foodItem} />
      <FoodImageModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        image_url={foodItem?.image_url}
      />
    </View>
  );
};

export default FoodDetailsSimpleInfo;

const styles = StyleSheet.create({
  container: { padding: 18 },
  simpleInfoContainer: { flexDirection: "row", alignItems: "center", gap: 15 },
  image: { width: 48, height: 58, borderRadius: 10 },
  foodSupplierText: {
    fontFamily: "Mulish_500Medium",
    fontSize: 16,
    color: COLOURS.tabUnselected,
  },
  foodNameText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 18,
    color: COLOURS.nearBlack,
  },
});
