import React from 'react';
import { Pressable, Text } from 'react-native';
import COLOURS from './constants/colours'
import { themedColours } from './constants/themedColours';

export const toastConfig = {
  groceryToast: ({ text1, text2, props }) => (
    <Pressable
      onPress={() => props.onUndo()}
      style={{
        height: 44,
        width: '90%',
        backgroundColor: props.backgroundColor || COLOURS.nearBlack,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          color: props.textColor || 'white',
          fontFamily: 'Mulish_500Medium',
          fontSize: 14,
        }}
      >
        {text1}
      </Text>
      <Text
        style={{
          color: props.textColor || 'white',
          fontFamily: 'Mulish_600SemiBold',
          fontSize: 14,
        }}
      >
        {text2}
      </Text>
    </Pressable>
  ),
  foodDetailToast: ({ text1, text2, onViewPress, props }) => (
    <Pressable
      onPress={onViewPress}
      style={{
        height: 44,
        width: '90%',
        backgroundColor: COLOURS.nearBlack,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontFamily: 'Mulish_500Medium',
          fontSize: 14,
        }}
      >
        {text1}
      </Text>
      <Text
        style={{
          color: 'white',
          fontFamily: 'Mulish_600SemiBold',
          fontSize: 14,
        }}
      >
        {text2}
      </Text>
    </Pressable>
  ),
  customErrorToast: ({ text1, text2, onViewPress, props }) => (
    <Pressable
      onPress={onViewPress}
      style={{
        height: 44,
        width: '90%',
        backgroundColor: themedColours.danger['light'],
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontFamily: 'Mulish_500Medium',
          fontSize: 14,
        }}
      >
        {text1}
      </Text>
      <Text
        style={{
          color: 'white',
          fontFamily: 'Mulish_600SemiBold',
          fontSize: 14,
        }}
      >
        {text2}
      </Text>
    </Pressable>
  ),
};
