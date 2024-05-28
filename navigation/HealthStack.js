// HealthStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Scan } from "../screens/Scan";
import { SafeAreaView } from "react-native-safe-area-context";
import FoodDetails from "../screens/FoodDetails";
import Diary from "../screens/Diary";
import DiaryIcon from "../svgs/DiaryIcon";
import CreateAccount from "../components/onboarding/CreateAccount";
import Health from "../screens/Health";
import WeeklyOverview from "../screens/WeeklyOverview";
import ArrowLeft from "../svgs/ArrowLeft";
import { Pressable } from "react-native";
import COLOURS from "../constants/colours";
import AddNotes from "../screens/AddNotes";
import { useColourTheme } from "../context/Themed";
import { themedColours } from "../constants/themedColours";

const Stack = createNativeStackNavigator();

const HealthStack = () => {
  const {theme} = useColourTheme()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Health"
        component={Health}
        options={{
          headerTitleStyle: {
            fontFamily: "Mulish_700Bold",
            fontSize: 19,
            color: themedColours.primaryText[theme],
          },
          headerStyle: {backgroundColor : themedColours.primaryBackground[theme]},
          headerShadowVisible: false
        }}
      />

      <Stack.Screen
        name="WeeklyOverview"
        component={WeeklyOverview}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddNotes"
        component={AddNotes}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HealthStack;
