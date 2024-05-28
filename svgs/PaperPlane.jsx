import { View, Text } from "react-native";
import React from "react";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";

const PaperPlane = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <G clipPath="url(#clip0_1277_2505)">
        <Path
          d="M17.9878 1.81668C18.0756 1.40821 17.6751 1.06378 17.2845 1.21285L0.339317 7.68153C0.135377 7.7594 0.000483898 7.95487 6.20275e-05 8.17315C-0.000359843 8.39147 0.13376 8.58746 0.337418 8.66611L5.09763 10.5046V16.2952C5.09763 16.5395 5.26536 16.7518 5.50302 16.8083C5.73909 16.8644 5.98525 16.7521 6.09592 16.5325L8.06469 12.6257L12.8692 16.1913C13.1615 16.4082 13.5816 16.2703 13.6879 15.9217C18.1738 1.21401 17.9798 1.85363 17.9878 1.81668ZM13.8049 3.67003L5.55023 9.54877L1.9985 8.17705L13.8049 3.67003ZM6.15231 10.4148L13.3476 5.29054C7.15615 11.8222 7.47952 11.4784 7.45252 11.5147C7.4124 11.5687 7.5223 11.3583 6.15231 14.077V10.4148ZM12.8973 14.8988L8.66814 11.7602L16.3149 3.69324L12.8973 14.8988Z"
          fill={color || "#1F2C35"}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1277_2505">
          <Rect width="18" height="18" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default PaperPlane;
