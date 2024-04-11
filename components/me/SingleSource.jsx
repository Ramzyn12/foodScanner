import { View, Text } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import ArrowRight from "../../svgs/ArrowRight";

const SingleSource = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        backgroundColor: "white",
        padding: 14,
        alignItems: 'flex-start',
        borderRadius: 14,
      }}
    >
      <Text style={{ flex: 1, color: '#636566'  }}>
        Reaven P, Parthasarathy S, Grasse BJ, Miller E, Steinberg D, Witztum JL.
        Effects of oleate-rich and linoleate-rich diets on the susceptibility of
        low density lipoprotein to oxidative modification in mildly
        hypercholesterolemic subjects. J Clin Irvest. 1993;91(2):668-676.
        doi:10.1172/JCI116247
      </Text>
      <ArrowRight color={'#636566'} />
    </View>
  );
};

export default SingleSource;
