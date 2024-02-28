import { View, Text } from 'react-native'
import React from 'react'

const NativeSearchBar = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        <View style={[styles.inputContainer]}>
          <SearchIcon />
          <TextInput
            autoCorrect={false}
            ref={inputRef}
            placeholderTextColor={"#606060"}
            placeholder="Search food and drink"
            onFocus={handleFocus}
            onChangeText={updateSearch}
            style={{ flex: 1, fontSize: 17, fontFamily: "Mulish_400Regular" }}
          />
          {search.length > 0 && ( // Conditional rendering based on the search content
            <Pressable onPress={handleClearInput}>
              <ClearIcon />
            </Pressable>
          )}
        </View>

        <Animated.View style={[animatedCancelBtnStyle]}>
          <Pressable onPress={handleCancelPress}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Mulish_700Bold",
                color: COLOURS.darkGreen,
              }}
            >
              Cancel
            </Text>
          </Pressable>
        </Animated.View>
      </View>
  )
}

export default NativeSearchBar