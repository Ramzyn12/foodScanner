import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import { themedColours } from "../../constants/themedColours";
import { useColourTheme } from "../../context/Themed";

const TrialTimeline = ({ price }) => {
  const { theme } = useColourTheme();
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          backgroundColor: themedColours.secondaryBackground[theme],
          height: 20,
          width: "100%",
          top: 8,
          borderRadius: 20,
          position: "absolute",
        }}
      >
        <View
          style={{
            backgroundColor: themedColours.primary[theme],
            height: 20,
            width: "15%",
            borderRadius: 20,
          }}
        ></View>
      </View>
      <TimelineItem day={1} description={'Trial Start'} svg={<LockIcon />}/>
      <TimelineItem day={5} description={'Reminder'} svg={<BellIcon />}/>
      <TimelineItem day={7} description={'£39.99'} svg={<TickIcon />}/>
    </View>
  );
};

export default TrialTimeline;

const TimelineItem = ({svg, description, day}) => {
  const { theme } = useColourTheme();

  const circleColour = day === 1 ? themedColours.primary[theme] : themedColours.secondaryBackground[theme]

  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      {/* Circle */}
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 20,
          backgroundColor: circleColour,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {svg}
      </View>
      <Text style={{ marginTop: 14, fontFamily: 'Mulish_800ExtraBold', color: themedColours.primaryText[theme], fontSize: 14 }}>{`Day ${day}`}</Text>
      <Text style={{ marginTop: 6, fontFamily: 'Mulish_400Regular', color: themedColours.primaryText[theme], fontSize: 14 }}>{description}</Text>
    </View>
  );
};

const LockIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
    >
      <Path
        d="M4.45492 20.7553L4.68668 20.042L4.45492 20.7553ZM1.24472 17.5451L1.95801 17.3133L1.24472 17.5451ZM18.7553 17.5451L18.042 17.3133L18.7553 17.5451ZM15.5451 20.7553L15.3133 20.042L15.5451 20.7553ZM15.5451 7.24472L15.3133 7.95801L15.5451 7.24472ZM18.7553 10.4549L18.042 10.6867L18.7553 10.4549ZM4.45492 7.24472L4.68668 7.95801L4.45492 7.24472ZM1.24472 10.4549L1.95801 10.6867L1.24472 10.4549ZM12.55 2.59962C12.8811 2.84843 13.3513 2.78167 13.6001 2.45051C13.8489 2.11935 13.7822 1.64919 13.451 1.40038L12.55 2.59962ZM10.75 12C10.75 11.5858 10.4142 11.25 10 11.25C9.58579 11.25 9.25 11.5858 9.25 12H10.75ZM9.25 16C9.25 16.4142 9.58579 16.75 10 16.75C10.4142 16.75 10.75 16.4142 10.75 16H9.25ZM8 7.75H12V6.25H8V7.75ZM12 20.25H8V21.75H12V20.25ZM8 20.25C6.08034 20.25 5.29839 20.2407 4.68668 20.042L4.22315 21.4686C5.11777 21.7593 6.19709 21.75 8 21.75V20.25ZM0.25 14C0.25 15.8029 0.240747 16.8822 0.531425 17.7768L1.95801 17.3133C1.75925 16.7016 1.75 15.9197 1.75 14H0.25ZM4.68668 20.042C3.39282 19.6216 2.37841 18.6072 1.95801 17.3133L0.531425 17.7768C1.1002 19.5274 2.47263 20.8998 4.22315 21.4686L4.68668 20.042ZM18.25 14C18.25 15.9197 18.2407 16.7016 18.042 17.3133L19.4686 17.7768C19.7593 16.8822 19.75 15.8029 19.75 14H18.25ZM12 21.75C13.8029 21.75 14.8822 21.7593 15.7768 21.4686L15.3133 20.042C14.7016 20.2407 13.9197 20.25 12 20.25V21.75ZM18.042 17.3133C17.6216 18.6072 16.6072 19.6216 15.3133 20.042L15.7768 21.4686C17.5274 20.8998 18.8998 19.5274 19.4686 17.7768L18.042 17.3133ZM12 7.75C13.9197 7.75 14.7016 7.75925 15.3133 7.95801L15.7768 6.53142C14.8822 6.24075 13.8029 6.25 12 6.25V7.75ZM19.75 14C19.75 12.1971 19.7593 11.1178 19.4686 10.2232L18.042 10.6867C18.2407 11.2984 18.25 12.0803 18.25 14H19.75ZM15.3133 7.95801C16.6072 8.37841 17.6216 9.39282 18.042 10.6867L19.4686 10.2232C18.8998 8.47263 17.5274 7.1002 15.7768 6.53142L15.3133 7.95801ZM1.75 14C1.75 12.0803 1.75925 11.2984 1.95801 10.6867L0.531425 10.2232C0.240747 11.1178 0.25 12.1971 0.25 14H1.75ZM4.22315 6.53142C2.47263 7.1002 1.1002 8.47263 0.531425 10.2232L1.95801 10.6867C2.37841 9.39282 3.39282 8.37841 4.68668 7.95801L4.22315 6.53142ZM5.75 7V6H4.25V7H5.75ZM10 0.25C6.82436 0.25 4.25 2.82436 4.25 6H5.75C5.75 3.65279 7.65279 1.75 10 1.75V0.25ZM10 1.75C10.9578 1.75 11.8397 2.06595 12.55 2.59962L13.451 1.40038C12.4898 0.67823 11.2938 0.25 10 0.25V1.75ZM9.25 12V16H10.75V12H9.25ZM8 6.25C6.58853 6.25 5.6278 6.24738 4.8754 6.37414L5.1246 7.85329C5.7222 7.75262 6.52815 7.75 8 7.75V6.25ZM4.8754 6.37414C4.64772 6.4125 4.43257 6.46338 4.22315 6.53142L4.68668 7.95801C4.81685 7.91571 4.95935 7.88113 5.1246 7.85329L4.8754 6.37414ZM4.25 7V7.11372H5.75V7H4.25Z"
        fill="white"
      />
    </Svg>
  );
};
const BellIcon = () => {
  const { theme } = useColourTheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="23"
      viewBox="0 0 18 23"
      fill="none"
    >
      <Path
        d="M12.1831 1.61489C11.4812 1.22405 10.671 1 9.80286 1H8.09995C5.15552 1 2.87737 3.58064 3.24258 6.50234L3.32194 7.13719C3.46808 8.30631 3.04102 9.4741 2.17514 10.2731C0.99242 11.3645 0.663827 13.1016 1.36619 14.5496L1.46954 14.7627C2.13331 16.1311 3.52054 17 5.04144 17H13.2623C14.5656 17 15.7785 16.3342 16.4783 15.2347C17.4661 13.6826 17.2045 11.6465 15.8564 10.3945L15.8125 10.3538C15.3991 9.96984 15.0805 9.50669 14.8697 9C14.7836 8.79308 14.7154 8.5789 14.6662 8.35988M6.18317 20L6.48317 20.4C7.83317 22.2 10.5332 22.2 11.8832 20.4L12.1832 20"
        stroke={themedColours.primary[theme]}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M16.1832 5C16.1832 6.10457 15.2878 7 14.1832 7C13.0787 7 12.1832 6.10457 12.1832 5C12.1832 3.89543 13.0787 3 14.1832 3C15.2878 3 16.1832 3.89543 16.1832 5Z"
        fill={themedColours.primary[theme]}
      />
    </Svg>
  );
};
const TickIcon = () => {
  const { theme } = useColourTheme();

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="13"
      viewBox="0 0 18 13"
      fill="none"
    >
      <Path
        d="M17 1L11.6093 7.46881C9.47319 10.0322 8.40512 11.3139 7 11.3139C5.59488 11.3139 4.52681 10.0322 2.39067 7.46881L1 5.8"
        stroke={themedColours.primary[theme]}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};
