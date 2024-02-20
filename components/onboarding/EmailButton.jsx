import { View, Text, Pressable } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import { Path, Svg } from "react-native-svg";
const EmailButton = ({onPress}) => {
  return (
    <View
      style={{
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLOURS.lightGray,
      }}
    >
      <Pressable
      onPress={onPress}
        style={{
          width: "100%",
          height: 44,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <Path
            d="M13.4134 5.70383L13.296 6.4446L13.296 6.4446L13.4134 5.70383ZM10.2962 2.58663L9.5554 2.70396L9.5554 2.70396L10.2962 2.58663ZM2.79581 14.0338L3.23664 13.4271L2.79581 14.0338ZM1.96619 13.2042L2.57295 12.7634L1.96619 13.2042ZM14.0338 13.2042L13.4271 12.7634L14.0338 13.2042ZM13.2042 14.0338L12.7634 13.4271L13.2042 14.0338ZM13.2042 1.96619L13.645 1.35942L13.2042 1.96619ZM14.0338 2.79581L14.6406 2.35497L14.0338 2.79581ZM2.79581 1.96619L3.23664 2.57295L2.79581 1.96619ZM1.96619 2.79581L2.57295 3.23664L1.96619 2.79581ZM10.25 1.2717L10.2757 0.522136L10.25 1.2717ZM14.7283 5.75L15.4779 5.72432L14.7283 5.75ZM5 8.75C4.58579 8.75 4.25 9.08579 4.25 9.5C4.25 9.91421 4.58579 10.25 5 10.25V8.75ZM11 10.25C11.4142 10.25 11.75 9.91421 11.75 9.5C11.75 9.08579 11.4142 8.75 11 8.75V10.25ZM5 5.75C4.58579 5.75 4.25 6.08579 4.25 6.5C4.25 6.91421 4.58579 7.25 5 7.25V5.75ZM7.25 7.25C7.66421 7.25 8 6.91421 8 6.5C8 6.08579 7.66421 5.75 7.25 5.75V7.25ZM13.5307 4.96307C12.247 4.75975 11.2402 3.75298 11.0369 2.4693L9.5554 2.70396C9.86037 4.62947 11.3705 6.13963 13.296 6.4446L13.5307 4.96307ZM8 14C6.57714 14 5.57025 13.999 4.79373 13.9148C4.03125 13.8322 3.58036 13.6768 3.23664 13.4271L2.35497 14.6406C2.997 15.107 3.74205 15.3097 4.63216 15.4061C5.50823 15.501 6.61056 15.5 8 15.5V14ZM0.5 8C0.5 9.38944 0.498971 10.4918 0.593887 11.3678C0.690324 12.2579 0.892959 13.003 1.35942 13.645L2.57295 12.7634C2.32323 12.4196 2.16777 11.9688 2.08516 11.2063C2.00103 10.4298 2 9.42286 2 8H0.5ZM3.23664 13.4271C2.98196 13.242 2.75799 13.018 2.57295 12.7634L1.35942 13.645C1.63698 14.0271 1.97294 14.363 2.35497 14.6406L3.23664 13.4271ZM14 8C14 9.42286 13.999 10.4298 13.9148 11.2063C13.8322 11.9688 13.6768 12.4196 13.4271 12.7634L14.6406 13.645C15.107 13.003 15.3097 12.2579 15.4061 11.3678C15.501 10.4918 15.5 9.38944 15.5 8H14ZM8 15.5C9.38944 15.5 10.4918 15.501 11.3678 15.4061C12.2579 15.3097 13.003 15.107 13.645 14.6406L12.7634 13.4271C12.4196 13.6768 11.9688 13.8322 11.2063 13.9148C10.4298 13.999 9.42286 14 8 14V15.5ZM13.4271 12.7634C13.242 13.018 13.018 13.242 12.7634 13.4271L13.645 14.6406C14.0271 14.363 14.363 14.0271 14.6406 13.645L13.4271 12.7634ZM12.7634 2.57295C13.018 2.75799 13.242 2.98196 13.4271 3.23664L14.6406 2.35497C14.363 1.97294 14.0271 1.63698 13.645 1.35942L12.7634 2.57295ZM8 0.5C6.61056 0.5 5.50823 0.498971 4.63216 0.593887C3.74205 0.690324 2.997 0.892959 2.35497 1.35942L3.23664 2.57295C3.58036 2.32323 4.03125 2.16777 4.79373 2.08516C5.57025 2.00103 6.57714 2 8 2V0.5ZM2 8C2 6.57714 2.00103 5.57025 2.08516 4.79373C2.16777 4.03125 2.32323 3.58036 2.57295 3.23664L1.35942 2.35497C0.892959 2.997 0.690324 3.74205 0.593887 4.63216C0.498971 5.50823 0.5 6.61056 0.5 8H2ZM2.35497 1.35942C1.97294 1.63698 1.63698 1.97294 1.35942 2.35497L2.57295 3.23664C2.75799 2.98196 2.98196 2.75799 3.23664 2.57295L2.35497 1.35942ZM8 2C8.88084 2 9.60664 2.00009 10.2243 2.02126L10.2757 0.522136C9.62684 0.499906 8.87254 0.5 8 0.5V2ZM10.2243 2.02126C11.6132 2.06884 12.284 2.22465 12.7634 2.57295L13.645 1.35942C12.7675 0.721876 11.6831 0.570355 10.2757 0.522136L10.2243 2.02126ZM9.5 1.2717C9.5 1.92653 9.49819 2.34276 9.5554 2.70396L11.0369 2.4693C11.0028 2.25359 11 1.9815 11 1.27169L9.5 1.2717ZM15.5 8C15.5 7.12746 15.5001 6.37316 15.4779 5.72432L13.9787 5.77568C13.9999 6.39336 14 7.11916 14 8H15.5ZM15.4779 5.72432C15.4296 4.31692 15.2781 3.23248 14.6406 2.35497L13.4271 3.23664C13.7754 3.71604 13.9312 4.3868 13.9787 5.77568L15.4779 5.72432ZM14.7283 5C14.0185 4.99999 13.7464 4.99723 13.5307 4.96307L13.296 6.4446C13.6572 6.50181 14.0735 6.49999 14.7283 6.5L14.7283 5ZM5 10.25H11V8.75H5V10.25ZM5 7.25H7.25V5.75H5V7.25Z"
            fill="#1F2C35"
          />
        </Svg>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Mulish_600SemiBold",
            color: COLOURS.nearBlack,
          }}
        >
          Sign up with email
        </Text>
      </Pressable>
    </View>
  );
};

export default EmailButton;
