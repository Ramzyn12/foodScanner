import { View, Text } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import { useSelector } from "react-redux";
import PalmTree from "../../svgs/PalmTree";
import CarIcon from "../../svgs/CarIcon";

const FoodDetailsEnvironment = () => {
  const currentFood = useSelector((state) => state.food.currentFood);
  
  if (!currentFood.co2Footprint) return null

  return (
    <View
      style={{
        marginTop: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: COLOURS.lightGray,
        borderRadius: 20,
        gap: 20,
      }}
    >
      <View style={{gap: 2}}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Text style={{ fontSize: 19, fontFamily: "Mulish_700Bold" }}>
            Environment
          </Text>
          {currentFood.ecoscore && <View
            style={{
              backgroundColor: "#DB1200",
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 6,
              alignSelf: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Mulish_700Bold",
                color: "white",
              }}
            >
              {currentFood.ecoscore}
            </Text>
          </View>}
        </View>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Mulish_700Bold",
            color: "#636566",
          }}
        >
          How this affects the environment
        </Text>
      </View>
      {currentFood.hasPalmOil &&<View
        style={{ flexDirection: "row", gap: 14, alignContent: "flex-start" }}
      >
        <PalmTree />
        <View style={{ gap: 8, flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Mulish_700Bold",
              color: COLOURS.nearBlack,
            }}
          >
            Contains Palm Oil
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_400Regular",
              color: "#636566",
            }}
          >
            Tropical forests in Asia, Africa and Latin America are destroyed to
            create and expand oil palm tree plantations. The deforestation
            contributes to climate change, and it endangers species such as the
            orangutan, the pigmy elephant and the Sumatran rhino.
          </Text>
        </View>
      </View>}
      {currentFood.co2Footprint[0] && <View
        style={{ flexDirection: "row", gap: 14, alignContent: "flex-start" }}
      >
        <CarIcon />
        <View style={{ gap: 8, flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Mulish_700Bold",
              color: COLOURS.nearBlack,
            }}
          >
            Carbon Footprint
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_400Regular",
              color: "#636566",
            }}
          >
            {`Producing this product generates ${currentFood.co2Footprint[0]} which is equivalent ${currentFood.co2Footprint[1].slice(6)}`}
          </Text>
        </View>
      </View>}

    </View>
  );
};

export default FoodDetailsEnvironment;