import { View, Text } from "react-native";
import React from "react";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";

const ClearIcon = ({size}) => {
  return (
    <Svg width={size || '20'} height={size || '20'} viewBox="0 0 20 20" fill="none">
      <G clipPath="url(#clip0_719_4358)">
        <Path
          d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z"
          fill="#767680"
          fillOpacity="0.12"
        />
        <Path
          d="M6.52311 13.6126C6.43088 13.5204 6.37001 13.4134 6.34049 13.2917C6.31098 13.1662 6.31098 13.0427 6.34049 12.9209C6.37001 12.7992 6.42903 12.694 6.51758 12.6055L9.11294 10.0101L6.51758 7.42029C6.42903 7.33175 6.37001 7.22655 6.34049 7.10482C6.31098 6.98309 6.31098 6.86135 6.34049 6.73962C6.37001 6.61417 6.43088 6.50534 6.52311 6.41311C6.61165 6.32457 6.71681 6.26553 6.83854 6.23602C6.96401 6.20282 7.08754 6.20282 7.20934 6.23602C7.33474 6.26553 7.44174 6.32272 7.53027 6.40757L10.1201 9.00295L12.7155 6.41311C12.804 6.32457 12.9073 6.26553 13.0254 6.23602C13.1471 6.20282 13.2689 6.20282 13.3906 6.23602C13.5161 6.26553 13.6231 6.32641 13.7116 6.41864C13.8075 6.50718 13.8702 6.61417 13.8997 6.73962C13.9293 6.86135 13.9293 6.98309 13.8997 7.10482C13.8702 7.22655 13.8093 7.33175 13.7171 7.42029L11.1328 10.0101L13.7171 12.6055C13.8093 12.694 13.8702 12.7992 13.8997 12.9209C13.9293 13.0427 13.9293 13.1662 13.8997 13.2917C13.8702 13.4134 13.8075 13.5186 13.7116 13.6071C13.6231 13.6994 13.5161 13.7621 13.3906 13.7953C13.2689 13.8248 13.1471 13.8248 13.0254 13.7953C12.9073 13.7658 12.804 13.7049 12.7155 13.6126L10.1201 11.0228L7.53027 13.6182C7.44174 13.703 7.33474 13.7621 7.20934 13.7953C7.08754 13.8248 6.96401 13.8248 6.83854 13.7953C6.71681 13.7621 6.61165 13.7012 6.52311 13.6126Z"
          fill="#8E8E93"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_719_4358">
          <Rect width={size || '20'} height={size || '20'} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ClearIcon;