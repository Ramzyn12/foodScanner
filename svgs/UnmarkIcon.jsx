import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const UnmarkIcon = ({color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        d="M7.55806 8.53553L7.91161 8.18198L7.55806 7.82843L6.36482 6.63519C6.34041 6.61078 6.34041 6.5712 6.36481 6.5468C6.38922 6.52239 6.4288 6.52239 6.4532 6.5468L7.64645 7.74004L8 8.09359L8.35355 7.74004L9.5468 6.5468C9.5712 6.52239 9.61078 6.52239 9.63518 6.5468C9.65959 6.5712 9.65959 6.61078 9.63518 6.63518L8.44194 7.82843L8.08839 8.18198L8.44194 8.53553L9.63518 9.72878C9.65959 9.75318 9.65959 9.79276 9.63519 9.81716C9.61078 9.84157 9.5712 9.84157 9.5468 9.81717L8.35355 8.62392L8 8.27037L7.64645 8.62392L6.4532 9.81716C6.4288 9.84157 6.38922 9.84157 6.36482 9.81716C6.34041 9.79276 6.34041 9.75318 6.36482 9.72878L7.55806 8.53553ZM8.03394 1.1875C9.42194 1.18749 10.4702 1.18816 11.2938 1.27739C12.1254 1.36749 12.7356 1.5485 13.2409 1.91562C13.5646 2.15078 13.8492 2.43541 14.0844 2.75907C14.4515 3.26437 14.6325 3.8746 14.7226 4.70621C14.8118 5.52975 14.8125 6.57808 14.8125 7.96604V8.03401C14.8125 9.42197 14.8118 10.4703 14.7226 11.2938C14.6325 12.1254 14.4515 12.7356 14.0844 13.2409C13.8492 13.5646 13.5646 13.8492 13.2409 14.0844C12.7356 14.4515 12.1254 14.6325 11.2938 14.7226C10.4703 14.8118 9.42192 14.8125 8.03396 14.8125H7.96599C6.57803 14.8125 5.52974 14.8118 4.70621 14.7226C3.8746 14.6325 3.26437 14.4515 2.75907 14.0844C2.43541 13.8492 2.15078 13.5646 1.91562 13.2409C1.5485 12.7356 1.36749 12.1254 1.27739 11.2938C1.18816 10.4702 1.18749 9.42194 1.1875 8.03394V7.96606C1.18749 6.57806 1.18816 5.52976 1.27739 4.70621C1.36749 3.8746 1.5485 3.26437 1.91562 2.75907C2.15078 2.43541 2.43541 2.15078 2.75907 1.91562C3.26437 1.5485 3.8746 1.36749 4.70621 1.27739C5.52976 1.18816 6.57806 1.18749 7.96606 1.1875H8.03394ZM4.71968 1.40166C3.8987 1.49061 3.31299 1.66769 2.83254 2.01675C2.51949 2.24419 2.24419 2.51949 2.01675 2.83254C1.66769 3.31299 1.49061 3.8987 1.40166 4.71968C1.31258 5.54185 1.3125 6.59259 1.3125 8C1.3125 9.40741 1.31258 10.4581 1.40166 11.2803C1.49061 12.1013 1.66769 12.687 2.01675 13.1675C2.24419 13.4805 2.51949 13.7558 2.83254 13.9833C3.31299 14.3323 3.8987 14.5094 4.71968 14.5983C5.54185 14.6874 6.59259 14.6875 8 14.6875C9.40741 14.6875 10.4581 14.6874 11.2803 14.5983C12.1013 14.5094 12.687 14.3323 13.1675 13.9833C13.4805 13.7558 13.7558 13.4805 13.9833 13.1675C14.3323 12.687 14.5094 12.1013 14.5983 11.2803C14.6874 10.4581 14.6875 9.40741 14.6875 8C14.6875 6.59259 14.6874 5.54185 14.5983 4.71968C14.5094 3.8987 14.3323 3.31299 13.9833 2.83254C13.7558 2.51949 13.4805 2.24419 13.1675 2.01675C12.687 1.66769 12.1013 1.49061 11.2803 1.40166C10.4581 1.31258 9.40741 1.3125 8 1.3125C6.59259 1.3125 5.54185 1.31258 4.71968 1.40166Z"
        stroke={color || "#1F2C35"}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default UnmarkIcon;
