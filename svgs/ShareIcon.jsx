import { View, Text } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const ShareIcon = ({size, colour}) => {
  return (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || "16"}
        height={size || "16"}
        viewBox="0 0 16 16"
        fill="none"
      >
        <Path
          d="M4.41337 14.7038L4.29604 15.4446L4.29605 15.4446L4.41337 14.7038ZM1.29617 11.5866L0.555402 11.704L0.555402 11.704L1.29617 11.5866ZM14.7038 11.5866L15.4446 11.704L15.4446 11.704L14.7038 11.5866ZM11.5866 14.7038L11.704 15.4446L11.704 15.4446L11.5866 14.7038ZM14.5999 6.79956C14.3512 6.46837 13.881 6.40156 13.5498 6.65032C13.2187 6.89909 13.1518 7.36924 13.4006 7.70043L14.5999 6.79956ZM2.5994 7.70043C2.84817 7.36924 2.78135 6.89909 2.45016 6.65032C2.11897 6.40156 1.64882 6.46837 1.40005 6.79956L2.5994 7.70043ZM7.25 11.75C7.25 12.1642 7.58579 12.5 8 12.5C8.41421 12.5 8.75 12.1642 8.75 11.75H7.25ZM4.41232 3.78403C4.15497 4.1086 4.20946 4.58034 4.53403 4.83768C4.8586 5.09503 5.33034 5.04054 5.58768 4.71597L4.41232 3.78403ZM6.04839 2.92777L5.4607 2.4618L5.4607 2.4618L6.04839 2.92777ZM9.95162 2.92777L10.5393 2.4618L10.5393 2.4618L9.95162 2.92777ZM10.4123 4.71597C10.6697 5.04054 11.1414 5.09503 11.466 4.83768C11.7905 4.58034 11.845 4.1086 11.5877 3.78403L10.4123 4.71597ZM7.812 1.26492L7.694 0.524259L7.69399 0.524259L7.812 1.26492ZM8.188 1.26492L8.30601 0.524259L8.30601 0.524259L8.188 1.26492ZM14 9.5V10.25H15.5V9.5H14ZM10.25 14H5.75V15.5H10.25V14ZM2 10.25V9.5H0.5V10.25H2ZM5.75 14C5.02459 14 4.7492 13.9977 4.53069 13.9631L4.29605 15.4446C4.66054 15.5023 5.0819 15.5 5.75 15.5V14ZM0.5 10.25C0.5 10.9181 0.497672 11.3395 0.555402 11.704L2.03694 11.4693C2.00233 11.2508 2 10.9754 2 10.25H0.5ZM4.5307 13.9631C3.24702 13.7597 2.24025 12.753 2.03693 11.4693L0.555402 11.704C0.860374 13.6295 2.37053 15.1396 4.29604 15.4446L4.5307 13.9631ZM14 10.25C14 10.9754 13.9977 11.2508 13.9631 11.4693L15.4446 11.704C15.5023 11.3395 15.5 10.9181 15.5 10.25H14ZM10.25 15.5C10.9181 15.5 11.3395 15.5023 11.704 15.4446L11.4693 13.9631C11.2508 13.9977 10.9754 14 10.25 14V15.5ZM13.9631 11.4693C13.7598 12.753 12.753 13.7597 11.4693 13.9631L11.704 15.4446C13.6295 15.1396 15.1396 13.6295 15.4446 11.704L13.9631 11.4693ZM15.5 9.5C15.5 8.48782 15.1649 7.55173 14.5999 6.79956L13.4006 7.70043C13.7772 8.20176 14 8.82377 14 9.5H15.5ZM2 9.5C2 8.82377 2.22284 8.20176 2.5994 7.70043L1.40005 6.79956C0.835078 7.55173 0.5 8.48782 0.5 9.5H2ZM8.75 11.75V2H7.25V11.75H8.75ZM5.58768 4.71597L6.63607 3.39374L5.4607 2.4618L4.41232 3.78403L5.58768 4.71597ZM9.36393 3.39374L10.4123 4.71597L11.5877 3.78403L10.5393 2.4618L9.36393 3.39374ZM6.63607 3.39374C7.06549 2.85216 7.34846 2.49713 7.584 2.26067C7.81621 2.02757 7.90874 2.00896 7.93001 2.00558L7.69399 0.524259C7.20574 0.602051 6.83451 0.887643 6.5213 1.20206C6.21143 1.51313 5.86735 1.94893 5.4607 2.4618L6.63607 3.39374ZM10.5393 2.4618C10.1327 1.94893 9.78857 1.51313 9.4787 1.20206C9.1655 0.887643 8.79426 0.602051 8.30601 0.524259L8.06999 2.00558C8.09126 2.00896 8.1838 2.02757 8.416 2.26068C8.65155 2.49713 8.93452 2.85216 9.36393 3.39374L10.5393 2.4618ZM7.93001 2.00558C7.95354 2.00183 7.97687 2 8 2V0.5C7.89755 0.5 7.7953 0.508119 7.694 0.524259L7.93001 2.00558ZM8 2C8.02313 2 8.04646 2.00183 8.07 2.00558L8.30601 0.524259C8.2047 0.508119 8.10246 0.5 8 0.5V2ZM8.75 2V1.25H7.25V2H8.75Z"
          fill={colour || "#2D264B"}
        />
      </Svg>
  )
}

export default ShareIcon