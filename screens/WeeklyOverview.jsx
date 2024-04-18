import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowLeft from "../svgs/ArrowLeft";
import COLOURS from "../constants/colours";
import OverviewHeader from "../components/WeeklyOverview/OverviewHeader";
import WeekOverviewLines from "../components/WeeklyOverview/WeekOverviewLines";
import DaysLeftCard from "../components/WeeklyOverview/DaysLeftCard";
import DayAccordian from "../components/WeeklyOverview/DayAccordian";
import { useQuery } from "@tanstack/react-query";
import { getTimelineWeek } from "../axiosAPI/timelineAPI";

const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_1126_4878)">
<path d="M6.10492 6.48126L4.02565 6.6419C3.44708 6.68662 2.93179 6.98985 2.61182 7.47383L0.213854 11.1006C-0.0288162 11.4676 -0.067394 11.927 0.110589 12.3293C0.288619 12.7317 0.654475 13.0121 1.08924 13.0795L2.99305 13.3743C3.43841 11.0109 4.50452 8.65329 6.10492 6.48126Z" fill="white"/>
<path d="M10.6256 21.0069L10.9205 22.9107C10.9879 23.3455 11.2683 23.7113 11.6706 23.8893C11.838 23.9634 12.0152 24 12.1915 24C12.4391 24 12.685 23.9278 12.8994 23.7861L16.5262 21.3881C17.0102 21.0681 17.3134 20.5528 17.3581 19.9743L17.5187 17.8951C15.3466 19.4955 12.9891 20.5616 10.6256 21.0069Z" fill="white"/>
<path d="M9.9096 19.6873C9.97569 19.6873 10.0422 19.6819 10.1085 19.6708C11.0987 19.5053 12.053 19.2264 12.9634 18.8613L5.13865 11.0365C4.77359 11.9469 4.49468 12.9012 4.32912 13.8915C4.26387 14.2818 4.39479 14.6794 4.67459 14.9593L9.04068 19.3254C9.27299 19.5576 9.58654 19.6873 9.9096 19.6873Z" fill="white"/>
<path d="M22.0863 10.6407C24.0011 6.93881 24.072 3.02684 23.9719 1.19216C23.9376 0.563527 23.4364 0.0623433 22.8078 0.0280779C22.509 0.0117655 22.155 0 21.7559 0C19.7044 0 16.4583 0.310732 13.3592 1.9137C10.8964 3.18762 7.66683 5.99264 5.76147 9.67896C5.78397 9.69653 5.80596 9.71519 5.82668 9.73591L14.2641 18.1733C14.2848 18.1941 14.3034 18.216 14.321 18.2385C18.0073 16.3331 20.8124 13.1036 22.0863 10.6407ZM13.9545 5.07371C15.3251 3.70305 17.5555 3.70291 18.9262 5.07371C19.5902 5.73769 19.9559 6.62057 19.9559 7.55961C19.9559 8.49865 19.5902 9.38154 18.9262 10.0455C18.241 10.7308 17.3405 11.0735 16.4404 11.0736C15.5399 11.0736 14.6399 10.731 13.9545 10.0455C13.2904 9.38154 12.9247 8.49865 12.9247 7.55961C12.9247 6.62057 13.2904 5.73769 13.9545 5.07371Z" fill="white"/>
<path d="M14.9489 9.05114C15.7713 9.87356 17.1096 9.87361 17.932 9.05114C18.3304 8.6527 18.5498 8.12301 18.5498 7.55958C18.5498 6.99614 18.3304 6.46645 17.932 6.06806C17.5208 5.65683 16.9806 5.45123 16.4404 5.45123C15.9003 5.45123 15.3601 5.65683 14.9489 6.06806C14.5505 6.46645 14.3311 6.99614 14.3311 7.55958C14.3311 8.12301 14.5505 8.65275 14.9489 9.05114Z" fill="white"/>
<path d="M0.717431 19.7782C0.897384 19.7782 1.07734 19.7096 1.21459 19.5722L3.5102 17.2766C3.78479 17.002 3.78479 16.5569 3.5102 16.2823C3.23565 16.0077 2.79043 16.0077 2.51584 16.2823L0.220228 18.5779C-0.0543662 18.8525 -0.0543662 19.2976 0.220228 19.5722C0.357524 19.7095 0.537478 19.7782 0.717431 19.7782Z" fill="white"/>
<path d="M5.61394 18.3861C5.3394 18.1115 4.89418 18.1115 4.61958 18.3861L0.206067 22.7996C-0.0685264 23.0742 -0.0685264 23.5193 0.206067 23.7939C0.343364 23.9312 0.523317 23.9999 0.70327 23.9999C0.883224 23.9999 1.06318 23.9312 1.20043 23.7939L5.6139 19.3804C5.88854 19.1058 5.88854 18.6607 5.61394 18.3861Z" fill="white"/>
<path d="M6.72331 20.4899L4.42775 22.7855C4.15315 23.0601 4.15315 23.5052 4.42775 23.7798C4.56504 23.9171 4.745 23.9858 4.9249 23.9858C5.10481 23.9858 5.28481 23.9172 5.42206 23.7798L7.71767 21.4842C7.99226 21.2096 7.99226 20.7644 7.71767 20.4899C7.44312 20.2153 6.9979 20.2153 6.72331 20.4899Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1126_4878">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

const data = {
  week: 1,
  title: "Strong Cravings",
  subtitle:
    "The hardest week of your journey, where cravings are the strongest.",
  description:
    "Welcome to your first week of eliminating processed foods. It goes without saying that this will be the most difficult week of your journey as your body and mind scream out for refined sugars and processed fats. Dont forget to make good use of our scanner to ensure that what you are eating is not processed. ",
  svg: svgString,
};

const WeeklyOverview = ({ route }) => {
  const insets = useSafeAreaInsets();
  const week = route.params.week;

  const { data: weekData, isLoading } = useQuery({
    queryFn: () => getTimelineWeek({ week }),
    queryKey: ["TimelineWeek", week],
  });

  if (isLoading) return <ActivityIndicator />;



  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: "white" }}>
      <OverviewHeader week={week} title={weekData?.timelineWeek?.title} />
      <ScrollView>
        {/* UPPER */}
        <View style={{ gap: 20, padding: 20 }}>
          <View>
            <Text
              style={{
                marginBottom: 2,
                fontSize: 11,
                fontFamily: "Mulish_800ExtraBold",
                color: COLOURS.darkGreen,
              }}
            >
              WEEK {week}
            </Text>
            <Text
              style={{
                marginBottom: 14,
                fontSize: 34,
                fontFamily: "Mulish_700Bold",
                color: COLOURS.nearBlack,
              }}
            >
              {weekData?.timelineWeek?.title}
            </Text>
            <DaysLeftCard week={week} daysPassed={weekData?.daysPassed} />
            {/* Description */}
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Mulish_400Regular",
                color: COLOURS.nearBlack,
              }}
            >
              {weekData?.timelineWeek?.description}
            </Text>
          </View>
          {/* ACCORDIANS */}
          <View style={{ gap: 20 }}>
            {weekData?.weeksData?.map((dayData, index) => (
              <DayAccordian key={dayData.date} day={(index + 1) +( 7 * (week - 1))} dayData={dayData}/>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WeeklyOverview;
