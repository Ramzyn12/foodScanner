import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import ArrowDown from '../../svgs/ArrowDown'

const GoToTopButton = ({handleScrollToStart}) => {
  return (
    <Pressable
    onPress={handleScrollToStart}
    style={styles.goToTopButtonContainer}
  >
    <View style={styles.goToTopButton}>
      <ArrowDown size={22} />
    </View>
  </Pressable>
  )
}

export default GoToTopButton

const styles = StyleSheet.create({
  goToTopButtonContainer: {
    position: "absolute",
    bottom: 40,
    zIndex: 3000,
    alignItems: "center",
    width: "100%",
  },
  goToTopButton: {
    width: 44,
    height: 44,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    transform: [{ rotate: "180deg" }],
    shadowColor: "#000", // Since React Native shadowColor doesn't support alpha, we use black color
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
})