import { View, Text } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const weightDesc = `Processed foods are engineered to be addictive, often causing you to eat more than intended. \n
These foods quickly elevate blood sugar, leading to inevitable crashes that trigger further hunger pangs, propelling a cycle of overeating.\n 
Additionally, they're rich in omega-6 fatty acids from seed and vegetable oils, which are known to cause inflammation. This inflammation not only harms your overall health but also disrupts your metabolism and the way your body stores fat, making weight management increasingly challenging.\n
The combination of these factors contributes significantly to the rising rates of obesity and related health issues.`;

const energyDesc = `Processed foods often lead to low energy levels due to their high sugar and refined carbohydrate content, which can cause rapid spikes and subsequent crashes in blood sugar.
 
This blood sugar pattern disrupts the body's energy stability, leading to periods of lethargy and fatigue. 

Processed foods typically lack micro-nutrients, which are crucial for sustained energy production and overall metabolic health. 

The absence of these nutrients and the presence of additives and preservatives in processed foods can further strain your body's energy processes.`;

const anxietyDesc = `Eliminating processed foods has been increasingly linked to reductions in anxiety levels, a connection made clear by numerous nutritional studies. 

Processed foods often contain high levels of sugar, unhealthy fats, and artificial additives that can exacerbate stress and anxiety through various biological pathways, including inflammation and blood sugar fluctuations.

By fostering a healthier gut microbiome and promoting the production of neurotransmitters like serotonin, a diet void of processed food can play a crucial role in moderating stress response systems and enhancing overall mental health.`;

const sleepDesc = `Processed foods often lead to low energy levels due to their high sugar and refined carbohydrate content, which can cause rapid spikes and subsequent crashes in blood sugar.
 
This blood sugar pattern disrupts the body's energy stability, leading to periods of lethargy and fatigue. 

Processed foods typically lack micro-nutrients, which are crucial for sustained energy production and overall metabolic health. 

The absence of these nutrients and the presence of additives and preservatives in processed foods can further strain your body's energy processes.`;

const ScientificDescription = ({ metricType }) => {
  const {theme} = useColourTheme()
  const description =
    metricType === "Weight"
      ? weightDesc
      : metricType === "Energy"
      ? energyDesc
      : metricType === "Anxiety"
      ? anxietyDesc
      : sleepDesc;

  return (
    <View
      style={{
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: themedColours.stroke[theme],
        gap: 20,
        backgroundColor: themedColours.primaryBackground[theme],
        // borderRadius: 20,
      }}
    >
      <Text
        style={{
          fontSize: 19,
          fontFamily: "Mulish_700Bold",
          color: themedColours.primaryText[theme],
        }}
      >
        {metricType} and processed food
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Mulish_500Medium",
          color: themedColours.secondaryText[theme],
        }}
      >
        {description}
      </Text>
    </View>
  );
};

export default ScientificDescription;
