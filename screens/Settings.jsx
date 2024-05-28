import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowLeft from "../svgs/ArrowLeft";
import COLOURS from "../constants/colours";
import ProBanner from "../components/settings/ProBanner";
import Divider from "../components/settings/Divider";
import { Path, Svg } from "react-native-svg";
import ArrowRight from "../svgs/ArrowRight";
import SettingOption from "../components/settings/SettingOption";
import ProfileCircle from "../svgs/ProfileCircle";
import NotificationBell from "../svgs/NotificationBell";
import Palette from "../svgs/Palette";
import Vibrate from "../svgs/Vibrate";
import PaperPlane from "../svgs/PaperPlane";
import Star from "../svgs/Star";
import Instagram from "../svgs/Instagram";
import Twitter from "../svgs/Twitter";
import Mail from "../svgs/Mail";
import LoveHearts from "../svgs/LoveHearts";
import HeartIcon from "../svgs/HeartIcon";
import Header from "../components/settings/Header";
import { useColourTheme } from "../context/Themed";
import { themedColours } from "../constants/themedColours";
const Settings = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const {theme} = useColourTheme()
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themedColours.primaryBackground[theme],
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Header headerText={'Settings'} onNavigate={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingBottom: 15, gap: 13 }}>
          {/* Title */}
          <Text style={{ fontSize: 34, fontFamily: "Mulish_700Bold", color: themedColours.primaryText[theme] }}>
            Settings
          </Text>
          <ProBanner />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
              color: themedColours.primary[theme],
              padding: 10,
              textAlign: "center",
            }}
          >
            Restore Purchases
          </Text>
        </View>
        <Divider />
        {/* First options */}
        <View style={{ paddingVertical: 14 }}>
          <SettingOption
            optionText="Account"
            optionSvg={<ProfileCircle color={themedColours.primaryText[theme]} />}
            showArrow={true}
            onPress={() => navigation.navigate('Account')}
          />
          <SettingOption
            optionText="Notifications"
            optionSvg={<NotificationBell color={themedColours.primaryText[theme]} />}
            onPress={() => navigation.navigate('Notifications')}
            showArrow={true}
          />
          <SettingOption
            optionText="Appearance"
            optionSvg={<Palette color={themedColours.primaryText[theme]} />}
            showArrow={false}
            showDropdown={true}
          />
          <SettingOption
            optionText="Haptic Feedback"
            optionSvg={<Vibrate color={themedColours.primaryText[theme]} />}
            showArrow={false}
          />
        </View>
        <Divider />
        {/* Second options */}
        <View style={{ paddingVertical: 14 }}>
          <SettingOption
            optionText="Invite friends & family"
            optionSvg={<PaperPlane color={themedColours.primaryText[theme]} />}
            showArrow={true}
          />
          <SettingOption
            optionText="Loving Ivy? Rate us."
            optionSvg={<Star color={themedColours.primaryText[theme]} />}
            showArrow={true}
          />
          <SettingOption
            optionText="Follow us on Instagram"
            optionSvg={<Instagram color={themedColours.primaryText[theme]} />}
            showArrow={true}
          />
          <SettingOption
            optionText="Follow us on Twitter"
            optionSvg={<Twitter color={themedColours.primaryText[theme]} />}
            showArrow={true}
          />
          <SettingOption
            optionText="Need help? Got a feature request?"
            optionSvg={<Mail color={themedColours.primaryText[theme]} />}
            showArrow={true}
          />
        </View>
        <View
          style={{
            padding: 40,
            justifyContent: "center",
            alignItems: "center",
            gap: 18,
          }}
        >
          <LoveHearts color={themedColours.secondaryText[theme]} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Mulish_600SemiBold",
                color: themedColours.secondaryText[theme],
              }}
            >
              Made with
            </Text>
            <HeartIcon color={themedColours.secondaryText[theme]} width={17} height={14} />
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Mulish_600SemiBold",
                color: themedColours.secondaryText[theme],
              }}
            >
              in England
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
