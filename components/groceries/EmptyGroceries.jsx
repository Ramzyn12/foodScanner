import { View, Text, Pressable } from 'react-native'
import React from 'react'
import AddToBasketIcon from '../../svgs/AddToBasketIcon'
import COLOURS from '../../constants/colours'
const EmptyGroceries = ({onPress}) => {
  return (
    <Pressable
        onPress={onPress}
        style={{ padding: 20, gap: 20, alignItems: "center" }}
      >
        <Text style={{ fontSize: 16, fontFamily: "Mulish_700Bold" }}>
          Groceries
        </Text>
        <View
          style={{
            padding: 20,
            gap: 20,
            alignItems: "center",
            backgroundColor: "#F5F5F5",
            width: "100%",
            borderRadius: 20,
          }}
        >
          <AddToBasketIcon />
          <View
            style={{
              height: 44,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: COLOURS.lightGray,
              backgroundColor: "#FFF",
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 14, fontFamily: "Mulish_600SemiBold" }}>
              Add your first item
            </Text>
          </View>
        </View>
      </Pressable>
  )
}

export default EmptyGroceries