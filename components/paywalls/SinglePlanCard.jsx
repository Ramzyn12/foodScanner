import { View, Text } from "react-native";
import React from "react";
import { themedColours } from "../../constants/themedColours";
import { useColourTheme } from "../../context/Themed";
import { Path, Svg } from "react-native-svg";

const RightArrow = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="13"
      viewBox="0 0 18 13"
      fill="none"
    >
      <Path
        d="M13.528 0.967309C13.2338 0.675726 12.7589 0.677844 12.4673 0.972041C12.1757 1.26624 12.1778 1.74111 12.472 2.03269L14.235 3.78C14.9505 4.48914 15.4413 4.97718 15.7734 5.39071C15.8813 5.52509 15.9655 5.6434 16.0309 5.75L1 5.75C0.585786 5.75 0.25 6.08579 0.25 6.5C0.25 6.91422 0.585786 7.25 1 7.25L16.0309 7.25C15.9655 7.3566 15.8813 7.47491 15.7734 7.60929C15.4413 8.02282 14.9505 8.51086 14.235 9.22L12.472 10.9673C12.1778 11.2589 12.1757 11.7338 12.4673 12.028C12.7589 12.3222 13.2338 12.3243 13.528 12.0327L15.3227 10.2539C15.9987 9.58395 16.5511 9.03641 16.9429 8.54854C17.3504 8.04121 17.6453 7.52628 17.7241 6.90816C17.7414 6.77265 17.75 6.63632 17.75 6.5C17.75 6.36368 17.7414 6.22735 17.7241 6.09184C17.6453 5.47372 17.3504 4.95878 16.9429 4.45146C16.5511 3.96358 15.9987 3.41604 15.3227 2.74609L13.528 0.967309Z"
        fill="#1F2C35"
      />
    </Svg>
  );
};

const SinglePlanCard = ({ price, savePercent, timeframe, subtitle }) => {
  const { theme } = useColourTheme();
  const title =
    timeframe === "ANNUAL"
      ? "Annual"
      : timeframe === "MONTHLY"
      ? "Monthly"
      : "Lifetime";
  const perFrame =
    timeframe === "ANNUAL" ? "/year" : timeframe === "MONTHLY" ? "/month" : "";
    
  return (
    <View
      style={{
        borderColor: themedColours.stroke[theme],
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          flex: 1,
          fontSize: 16,
          fontFamily: "Mulish_700Bold",
          color: themedColours.primaryText[theme],
        }}
      >
        {title}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        <View style={{ gap: 8 }}>
          {savePercent && (
            <View
              style={{
                backgroundColor: themedColours.primary[theme],
                borderRadius: 50,
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignSelf: "flex-end",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Mulish_700Bold",
                  fontSize: 10,
                }}
              >
                {`Save ${savePercent}%`}
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Mulish_700Bold",
                color: themedColours.primaryText[theme],
              }}
            >
              {price}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Mulish_700Bold",
                color: themedColours.secondaryText[theme],
              }}
            >
              {perFrame}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 10,
              fontFamily: "Mulish_700Bold",
              textAlign: "right",
              color: themedColours.secondaryText[theme],
            }}
          >
            {subtitle}
          </Text>
        </View>
        <RightArrow />
      </View>
    </View>
  );
};

export default SinglePlanCard;
