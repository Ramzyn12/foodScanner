import { View, Text, Pressable } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from "../../constants/colours";

const FilterButton = ({onPress}) => {
  return (
    <Pressable
    onPress={onPress}
      style={{
        height: 36,
        paddingHorizontal: 15,
        gap: 8,
        borderWidth: 1,
        borderColor: COLOURS.lightGray,
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
      >
        <Path
          d="M2.85434 0.75H11.1882C12.3269 0.75 13.25 1.67311 13.25 2.81183C13.25 3.41831 12.983 3.99404 12.52 4.3858L9.87975 6.61985C8.92541 7.42737 8.375 8.61411 8.375 9.86425V11.1997C8.375 11.6996 8.13581 12.1693 7.73152 12.4634L6.27557 13.5222C5.84875 13.8327 5.25 13.5278 5.25 13V9.77463C5.25 8.58333 4.75 7.44672 3.87183 6.64173L1.43239 4.40557C0.997569 4.00699 0.75 3.44421 0.75 2.85434C0.75 1.69215 1.69215 0.75 2.85434 0.75Z"
          stroke="#1F2C35"
        />
      </Svg>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Mulish_600SemiBold",
          color: COLOURS.nearBlack,
        }}
      >
        Filter
      </Text>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
      >
        <Path
          d="M9.14952 1.89597C9.36821 1.67532 9.36662 1.31917 9.14597 1.10048C8.92532 0.881794 8.56917 0.883383 8.35048 1.10403L7.04 2.42626C6.50815 2.96288 6.14212 3.33098 5.83197 3.58005C5.5307 3.822 5.33719 3.90501 5.16388 3.9271C5.05506 3.94097 4.94494 3.94097 4.83612 3.9271C4.66281 3.90501 4.4693 3.822 4.16803 3.58006C3.85788 3.33098 3.49185 2.96288 2.96 2.42626L1.64952 1.10403C1.43083 0.883384 1.07468 0.881795 0.854031 1.10048C0.633383 1.31917 0.631794 1.67532 0.850482 1.89597L2.18457 3.24202C2.68703 3.749 3.09769 4.16335 3.4636 4.45721C3.84409 4.76278 4.23029 4.98398 4.69388 5.04307C4.89715 5.06898 5.10285 5.06898 5.30612 5.04307C5.76971 4.98398 6.15591 4.76278 6.53641 4.45721C6.90231 4.16335 7.31297 3.749 7.81542 3.24202L9.14952 1.89597Z"
          fill="#1F2C35"
        />
      </Svg>
    </Pressable>
  );
};

export default FilterButton;
