import { View, Text } from "react-native";
import React from "react";
import { themedColours } from "../../constants/themedColours";
import { useColourTheme } from "../../context/Themed";
import ToDoList from "../../svgs/ToDoList";
import SingleBenefitCard from "./SingleBenefitCard";
import CalenderTwenty from "../../svgs/CalenderTwenty";
import TimelineHealth from "../../svgs/TimelineHealth";
import AdvancedFlask from "../../svgs/AdvancedFlask";

const cards = [
  {svg: <ToDoList />, title: 'Track Unlimited Foods', subtitle: 'Track an unlimited number of food items each day by searching or scanning barcodes.'},
  {svg: <CalenderTwenty />, title: 'Unlimited Dietary History ', subtitle: 'Go back in time, as far as you want, to see everything you ate and consumed on previous days.'},
  {svg: <TimelineHealth />, title: 'Health Timeline', subtitle: 'See and track how your health should be changing on a week-by-week basis for extra motivation and drive!'},
  {svg: <AdvancedFlask />, title: 'Advanced Food Insights', subtitle: 'See more than just ingredients: Why you should avoid, additives present, environment impact and more.'}
]

const BenefitCards = () => {
  const { theme } = useColourTheme();
  return (
    <View style={{ gap: 14 }}>
      {cards.map(card => <SingleBenefitCard key={card.title} svg={card.svg} title={card.title} subtitle={card.subtitle} />)}
    </View>
  );
};

export default BenefitCards;
