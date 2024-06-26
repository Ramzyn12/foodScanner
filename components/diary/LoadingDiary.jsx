import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { Skeleton } from "moti/skeleton";
import { themedColours } from "../../constants/themedColours";
import { useColourTheme } from "../../context/Themed";

const LoadingDiary = () => {
  const { theme } = useColourTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themedColours.primaryBackground[theme],
      }}
    >
      <View style={{ flex: 1, padding: 20 }}>
        <Skeleton
          // key={index}
          colors={[
            themedColours.secondaryBackground[theme],
            themedColours.stroke[theme],
            themedColours.secondaryBackground[theme],
          ]}
          height={42} // Approximate height of your list items
          width={140}
          radius={20}
        />
        <View style={{ flexDirection: "row", marginTop: 14, gap: 8 }}>
          {Array.from({ length: 7 }, (_, index) => (
            <View style={{ flex: 1 }} key={index}>
              <Skeleton
                colors={[
                  themedColours.secondaryBackground[theme],
                  themedColours.stroke[theme],
                  themedColours.secondaryBackground[theme],
                ]}
                height={60} // Approximate height of your list items
                radius={20}
                width={"100%"}
              />
            </View>
          ))}
        </View>
        <View
          style={{
            marginTop: 25,
          }}
        >
          <Skeleton
            colors={[
              themedColours.secondaryBackground[theme],
              themedColours.stroke[theme],
              themedColours.secondaryBackground[theme],
            ]}
            height={130} // Approximate height of your list items
            radius={20}
            width={"100%"}
          />
        </View>

        <View
          style={{
            marginTop: 25,
          }}
        >
          <Skeleton
            colors={[
              themedColours.secondaryBackground[theme],
              themedColours.stroke[theme],
              themedColours.secondaryBackground[theme],
            ]}
            height={150} // Approximate height of your list items
            radius={20}
            width={"100%"}
          />
        </View>

        <View
          style={{
            marginTop: 25,
            flex: 1,
          }}
        >
          <Skeleton
            colors={[
              themedColours.secondaryBackground[theme],
              themedColours.stroke[theme],
              themedColours.secondaryBackground[theme],
            ]}
            height={"100%"} // Approximate height of your list items
            radius={20}
            width={"100%"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoadingDiary;
