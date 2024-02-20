import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const HeartIcon = ({color, size}) => {
  return (
    <Svg
      width="21"
      height="18"
      viewBox="0 0 21 18"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.19925 1.14593C7.52559 0.084255 4.82266 -0.91968 2.48845 1.46071C-3.05255 7.11136 6.44977 18 10.7999 18C15.1501 18 24.6524 7.11136 19.1114 1.46072C16.7772 -0.919653 14.0743 0.0842676 12.4006 1.14593C11.455 1.74582 10.1449 1.74582 9.19925 1.14593ZM15.5439 2.29891C15.1567 2.15178 14.7235 2.34638 14.5764 2.73358C14.4292 3.12078 14.6238 3.55395 15.011 3.70109C15.3717 3.83816 15.7483 4.07039 16.1266 4.44544C16.6083 4.92308 16.9132 5.44658 17.0832 5.99774C17.2052 6.39356 17.6251 6.61548 18.0209 6.49343C18.4167 6.37137 18.6386 5.95154 18.5166 5.55572C18.2729 4.76568 17.837 4.02899 17.1827 3.38024C16.6664 2.86843 16.1146 2.51581 15.5439 2.29891Z"
        fill={color}
      />
    </Svg>
  );
};

export default HeartIcon;
