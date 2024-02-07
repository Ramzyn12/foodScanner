import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import FoodDetailsLesson from "./FoodDetailsLesson";

const FoodDetailsLessonCarousel = ({ additives }) => {
  return (
    <>
      {additives?.length > 0 && (
        <View style={styles.container}>
          <Text style={styles.titleText}>Here's why:</Text>
          <ScrollView
            decelerationRate={0.4}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
            horizontal
            snapToAlignment="center"
          >
            {additives.map((additive) => (
              <FoodDetailsLesson key={additive} additive={additive} />
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default FoodDetailsLessonCarousel;

const styles = StyleSheet.create({
  titleText: {
    paddingLeft: 18,
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
    marginBottom: 12,
  },
  container: { marginTop: 25 },
  carouselContainer: { flexDirection: "row", gap: 15, paddingHorizontal: 15 },
});