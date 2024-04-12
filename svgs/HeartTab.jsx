import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const HeartTab = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="20"
      viewBox="0 0 23 20"
      fill="none"
    >
      <Path
        d="M18.3999 6.77673C18.1931 6.10613 17.8227 5.47603 17.2547 4.91284C16.8074 4.46941 16.3432 4.17698 15.8775 4M9.79923 2.14593C8.12557 1.08425 5.42263 0.0803204 3.08843 2.46071C-2.45257 8.11136 7.04975 19 11.3999 19C15.75 19 25.2524 8.11136 19.7114 2.46072C17.3772 0.0803466 14.6743 1.08427 13.0006 2.14593C12.0549 2.74582 10.7449 2.74582 9.79923 2.14593Z"
        stroke="#1F2C35"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default HeartTab;
