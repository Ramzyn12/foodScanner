import { View, Text } from "react-native";
import React from "react";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";

const Clock = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <G clipPath="url(#clip0_1277_2671)">
        <Path
          d="M8.99968 0C4.03762 0 0 4.03729 0 9C0 13.9627 4.03762 18 8.99968 18C13.9627 18 17.9997 13.9627 17.9997 9C17.9997 4.03729 13.9627 0 8.99968 0ZM8.99968 16.8001C4.69886 16.8001 1.19994 13.3011 1.19994 9C1.19994 4.69886 4.69918 1.19994 8.99968 1.19994C13.3011 1.19994 16.7997 4.69886 16.7997 9C16.7997 13.3011 13.3015 16.8001 8.99968 16.8001Z"
          fill="#010002"
        />
        <Path
          d="M13.457 8.34845H9.5998V3.24832C9.5998 2.91689 9.3311 2.64819 9 2.64819C8.66921 2.64819 8.40051 2.91722 8.40051 3.24832V9.54806H13.457C13.7881 9.54806 14.0568 9.27969 14.0565 8.94826C14.0565 8.61715 13.7875 8.34845 13.457 8.34845Z"
          fill="#010002"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1277_2671">
          <Rect width="18" height="18" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Clock;
