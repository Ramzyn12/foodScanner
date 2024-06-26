import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from "../../constants/colours";
import Animated from "react-native-reanimated";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const Welcome = ({ navigation }) => {
  const { theme } = useColourTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themedColours.primaryBackground[theme] },
      ]}
    >
      <View style={styles.contentContainer}>
        <Svg width="120" height="121" viewBox="0 0 120 121" fill="none">
          <Path
            d="M38 4.55505L35.5625 6.24256C28.8125 11.1176 24.875 18.8051 24.875 27.0551H23C17.1875 27.0551 11.5625 29.8676 8 34.5551L14.5 47.6801L13.625 55.1801H18.5C26 55.1801 33.3125 51.8051 38 45.8051C42.6875 51.8051 50 55.1801 57.5 55.1801H62.375L60.5 47.6801L68 34.5551C64.4375 29.8676 58.8125 27.0551 53 27.0551H51.125C51.125 18.8051 47.1875 11.1176 40.4375 6.24256L38 4.55505Z"
            fill={themedColours.primaryText[theme]}
          />
          <Path
            d="M18.9345 53.1122C18.9726 53.2706 19.0078 53.4368 19.0352 53.6068C24.5094 52.499 29.4466 49.5415 32.9721 45.1767L33.763 44.1974L34.538 45.1894C39.027 50.9354 46.043 54.1801 53.25 54.1801H56.8442L55.2798 47.9226L55.1824 47.5328L55.3817 47.1839L62.5469 34.6448C59.1583 30.5126 54.0294 28.0551 48.75 28.0551H46.875H45.875V27.0551C45.875 20.4345 43.3544 14.1664 38.6486 9.53178C31.4551 13.5762 26.7304 21.1038 25.4907 30.136L25.3122 31.4363L24.1059 30.9191C20.5057 29.3754 17.6261 29.4168 15.5495 30.305C13.4776 31.1912 12.0563 32.9819 11.468 35.251L11.4671 35.2545C11.4137 35.4573 11.4136 35.8633 11.5725 36.5365C11.7249 37.182 11.9954 37.9618 12.3596 38.8484C13.0882 40.622 14.1406 42.7027 15.211 44.7994C15.2726 44.9201 15.3343 45.0408 15.3959 45.1616C16.3948 47.1171 17.3936 49.0725 18.0911 50.7127C18.4611 51.5826 18.7634 52.4026 18.9345 53.1122Z"
            fill={themedColours.primaryBackground[theme]}
            stroke={themedColours.primaryText[theme]}
            stroke-width="2"
          />
          <Path
            d="M35.625 27.0551H31.875L31.875 48.2426C31.875 62.1176 40.6875 74.6801 53.8125 79.3676L55.125 75.8051C43.5 71.6801 35.625 60.6176 35.625 48.2426V27.0551Z"
            fill={themedColours.primaryText[theme]}
          />
          <Path
            d="M46.6875 70.5551L44.4375 73.5551C35.0625 86.8676 30 102.618 30 118.93H33.75C33.75 103.368 38.4375 88.3676 47.4375 75.8051L49.6875 72.8051L46.6875 70.5551Z"
            fill={themedColours.primaryText[theme]}
          />
          <Path
            d="M115.312 5.30507L112.5 4.93007C104.437 3.61757 96.1875 6.24257 90.1875 12.0551L88.875 10.7426C84.75 6.61757 78.75 4.55507 72.9375 5.49257L69 20.1176L62.4375 24.0551L65.8125 27.4301C71.25 32.6801 78.75 35.4926 86.25 34.5551C85.5 42.0551 88.125 49.5551 93.375 54.9926L96.75 58.3676L100.687 51.8051L115.312 47.8676C116.062 42.0551 114.187 36.0551 110.062 31.9301L108.75 30.6176C114.562 24.8051 117.187 16.5551 115.875 8.30507L115.312 5.30507Z"
            fill={themedColours.primaryText[theme]}
          />
          <Path
            d="M65.0074 25.4415C67.1496 27.0042 69.6375 28.6105 72.2187 29.8388C75.374 31.3402 78.5599 32.2241 81.3797 31.8823L82.6511 31.7281L82.4923 32.999C81.594 40.1851 84.1073 47.3805 89.3321 52.6054L91.8014 55.0747L95.08 49.6105L95.2877 49.2643L95.6775 49.1594L109.665 45.3935C110.307 40.1106 108.362 34.714 104.605 30.9571L103.293 29.6446L102.586 28.9375L103.293 28.2304C108.046 23.4773 110.564 17.1786 110.508 10.4959C108.992 9.40939 107.119 9.16347 104.79 9.43702C102.7 9.68262 100.392 10.3253 97.822 11.0408C97.2628 11.1965 96.6911 11.3557 96.1067 11.5149C89.9063 13.2046 82.5326 14.823 74.9647 11.3102C74.5312 12.2014 74.1798 13.3509 73.8479 14.7479C73.6082 15.757 73.3969 16.8046 73.171 17.9246C72.9795 18.8743 72.7774 19.876 72.5387 20.9504L72.4418 21.3862L72.0528 21.6051C71.6267 21.8448 71.2012 22.0856 70.7769 22.3257C68.8047 23.442 66.8596 24.5429 65.0074 25.4415Z"
            fill={themedColours.primaryBackground[theme]}
            stroke={themedColours.primaryText[theme]}
            stroke-width="2"
          />
          <Path
            d="M98.25 19.93L85.125 33.055C71.625 42.055 59.8125 53.1175 50.0625 65.8676L53.0625 68.1176C62.625 55.555 74.25 44.8675 87.375 36.055C87.5625 36.055 87.5625 35.8675 87.75 35.8675L101.063 22.555L98.25 19.93Z"
            fill={themedColours.primaryText[theme]}
          />
          <Path
            d="M95.625 87.0551L93.9375 84.6176C89.0625 77.8676 81.375 73.9301 73.125 73.9301V72.0551C73.125 66.2426 70.3125 60.6176 65.625 57.0551L52.5 64.5551L45 62.6801V67.5551C45 75.0551 48.375 82.3676 54.375 87.0551C48.375 91.7426 45 99.0551 45 106.555V111.43L52.5 109.555L65.625 117.055C70.3125 113.493 73.125 107.868 73.125 102.055V100.18C81.375 100.18 89.0625 96.2426 93.9375 89.4926L95.625 87.0551Z"
            fill={themedColours.primaryText[theme]}
          />
          <Path
            d="M43 102.25V105.844L49.2575 104.28L49.6473 104.182L49.9961 104.382L62.5352 111.547C66.6675 108.158 69.125 103.029 69.125 97.75V95.875V94.875H70.125C76.742 94.875 83.0069 92.3571 87.6408 87.6562C86.6624 86.0213 85.1903 84.3373 83.4018 82.566C81.9123 81.0908 80.2483 79.5973 78.5193 78.0455C77.9099 77.4986 77.2925 76.9444 76.6718 76.3812C72.1858 72.3111 67.5322 67.7839 65.3514 62.5809C65.1224 62.6677 64.8201 62.821 64.4234 63.0733C63.9711 63.361 63.5273 63.6847 63.0331 64.0451C62.6599 64.3173 62.258 64.6104 61.802 64.9248C59.8491 66.2714 57.2462 67.745 54.249 66.968L54.2455 66.9671C52.7128 66.5637 51.8198 66.7953 50.9037 67.0372C50.8853 67.042 50.8668 67.0469 50.8481 67.0519C50.3902 67.173 49.8449 67.3172 49.2411 67.3419C49.0521 67.3497 48.8603 67.3459 48.6642 67.3285C48.7646 68.4537 48.7969 69.5728 48.8153 70.6568C48.8203 70.9513 48.8243 71.2423 48.8282 71.5301C48.8455 72.7866 48.8619 73.9823 48.9575 75.1362C49.1905 77.9465 49.8777 80.2552 52.0033 81.9721L52.9826 82.763L51.9906 83.538C46.2447 88.0271 43 95.043 43 102.25Z"
            fill={themedColours.primaryBackground[theme]}
            stroke={themedColours.primaryText[theme]}
            stroke-width="2"
          />
          <Path
            d="M42.1875 81.2426L39.9375 84.2426C44.25 87.4301 49.125 88.9301 54.375 88.9301H73.125V85.1801H54.375C49.875 85.1801 45.75 83.8676 42.1875 81.2426Z"
            fill={themedColours.primaryText[theme]}
          />
        </Svg>
        <Text
          style={[
            styles.titleText,
            { color: themedColours.primaryText[theme] },
          ]}
        >
          Welcome To Ivy
        </Text>
        <Text
          style={[
            styles.descriptionText,
            { color: themedColours.primaryText[theme] },
          ]}
        >
          Scan and search for foods to check if they are processed, educate
          yourself, see statistical health improvements and more.
        </Text>
        <Pressable
          onPress={() => navigation.navigate("Notifications")}
          style={[
            styles.button,
            { backgroundColor: themedColours.primary[theme] },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              { color: themedColours.primaryBackground[theme] },
            ]}
          >
            Begin
          </Text>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
          >
            <Path
              d="M10.396 0.655536C10.1753 0.436848 9.81917 0.438437 9.60048 0.659085C9.38179 0.879733 9.38338 1.23588 9.60403 1.45457L10.9263 2.76505C11.4629 3.29691 11.831 3.66294 12.0801 3.97308C12.161 4.07387 12.2242 4.16261 12.2732 4.24255L1 4.24255C0.68934 4.24255 0.4375 4.49439 0.4375 4.80505C0.4375 5.11572 0.68934 5.36755 1 5.36755L12.2732 5.36755C12.2242 5.4475 12.161 5.53623 12.0801 5.63702C11.831 5.94717 11.4629 6.3132 10.9263 6.84505L9.60403 8.15554C9.38338 8.37422 9.38179 8.73038 9.60048 8.95102C9.81917 9.17167 10.1753 9.17326 10.396 8.95457L11.742 7.62048C12.249 7.11802 12.6634 6.70736 12.9572 6.34146C13.2628 5.96097 13.484 5.57476 13.5431 5.11118C13.556 5.00954 13.5625 4.9073 13.5625 4.80505C13.5625 4.70281 13.556 4.60057 13.5431 4.49893C13.484 4.03535 13.2628 3.64914 12.9572 3.26865C12.6634 2.90274 12.249 2.49208 11.742 1.98962L10.396 0.655536Z"
              fill={themedColours.primaryBackground[theme]}
            />
          </Svg>
        </Pressable>
      </View>
      <View style={styles.ActionContainer}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Mulish_600SemiBold",
            color: themedColours.primaryText[theme],
          }}
        >
          Already have an account?
        </Text>
        <Pressable
          hitSlop={20}
          onPress={() =>
            navigation.navigate("AuthScreen", { authType: "Log In" })
          }
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
              color: themedColours.primaryText[theme],
            }}
          >
            Log In
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
  },
  contentContainer: {
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 28,
    fontFamily: "Mulish_700Bold",
    color: COLOURS.nearBlack,
  },
  descriptionText: {
    textAlign: "center",
    fontFamily: "Mulish_600SemiBold",
    fontSize: 16,
    color: COLOURS.nearBlack,
  },
  button: {
    backgroundColor: COLOURS.darkGreen,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 44,
    borderRadius: 15,
  },
  buttonText: {
    // color: {themedColours.primaryBackground[theme]},
    fontSize: 14,
    fontFamily: "Mulish_600SemiBold",
  },
  ActionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingBottom: 10,
  },
});
