import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const AddLogIcon = ({ color, size }) => {
  return (
    <Svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25068 4.27864C0.5 6.68824 0.5 10.1255 0.5 17C0.5 23.8745 0.5 27.3118 2.25068 29.7214C2.81607 30.4996 3.50043 31.1839 4.27864 31.7493C6.68824 33.5 10.1255 33.5 17 33.5C23.8745 33.5 27.3118 33.5 29.7214 31.7493C30.4996 31.1839 31.1839 30.4996 31.7493 29.7214C33.5 27.3118 33.5 23.8745 33.5 17C33.5 10.1255 33.5 6.68824 31.7493 4.27864C31.1839 3.50043 30.4996 2.81607 29.7214 2.25068C27.3118 0.5 23.8745 0.5 17 0.5C10.1255 0.5 6.68824 0.5 4.27864 2.25068C3.50043 2.81607 2.81607 3.50043 2.25068 4.27864ZM18.375 11.5C18.375 10.7406 17.7594 10.125 17 10.125C16.2406 10.125 15.625 10.7406 15.625 11.5V15.625H11.5C10.7406 15.625 10.125 16.2406 10.125 17C10.125 17.7594 10.7406 18.375 11.5 18.375H15.625V22.5C15.625 23.2594 16.2406 23.875 17 23.875C17.7594 23.875 18.375 23.2594 18.375 22.5V18.375H22.5C23.2594 18.375 23.875 17.7594 23.875 17C23.875 16.2406 23.2594 15.625 22.5 15.625H18.375V11.5Z"
        fill={color || "#1F2C35"}
      />
    </Svg>
  );
};

export default AddLogIcon;
