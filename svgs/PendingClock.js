import { View, Text } from "react-native";
import React from "react";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";

const PendingClock = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <G clipPath="url(#clip0_1533_964)">
        <Path
          d="M7.99973 0.5C3.86468 0.5 0.5 3.86441 0.5 8C0.5 12.1356 3.86468 15.5 7.99973 15.5C12.1356 15.5 15.4997 12.1356 15.4997 8C15.4997 3.86441 12.1356 0.5 7.99973 0.5ZM7.99973 14.5001C4.41571 14.5001 1.49995 11.5843 1.49995 8C1.49995 4.41571 4.41598 1.49995 7.99973 1.49995C11.5843 1.49995 14.4998 4.41571 14.4998 8C14.4998 11.5843 11.5846 14.5001 7.99973 14.5001Z"
          fill="#126668"
        />
        <Path
          d="M11.7142 7.45705H8.4999V3.20694C8.4999 2.93075 8.27598 2.70683 8.00006 2.70683C7.72441 2.70683 7.50049 2.93102 7.50049 3.20694V8.45673H11.7142C11.9901 8.45673 12.2141 8.23308 12.2138 7.95689C12.2138 7.68097 11.9896 7.45705 11.7142 7.45705Z"
          fill="#126668"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1533_964">
          <Rect
            width="15"
            height="15"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default PendingClock;
