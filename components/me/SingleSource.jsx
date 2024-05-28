import { View, Text } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import ArrowRight from "../../svgs/ArrowRight";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const SingleSource = () => {
  const {theme} = useColourTheme()
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        backgroundColor: themedColours.primaryBackground[theme],
        padding: 14,
        alignItems: 'flex-start',
        borderRadius: 14,
      }}
    >
      <Text style={{ flex: 1, color: themedColours.secondaryText[theme]  }}>
        Reaven P, Parthasarathy S, Grasse BJ, Miller E, Steinberg D, Witztum JL.
        Effects of oleate-rich and linoleate-rich diets on the susceptibility of
        low density lipoprotein to oxidative modification in mildly
        hypercholesterolemic subjects. J Clin Irvest. 1993;91(2):668-676.
        doi:10.1172/JCI116247
      </Text>
      <ArrowRight color={themedColours.secondaryText[theme]} />
    </View>
  );
};

export default SingleSource;
