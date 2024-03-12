// HealthStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Scan } from "../screens/Scan";
import { SafeAreaView } from "react-native-safe-area-context";
import FoodDetails from "../screens/FoodDetails";
import Diary from "../screens/Diary";
import DiaryIcon from "../svgs/DiaryIcon";
import CreateAccount from "../components/onboarding/CreateAccount";
import Health from "../screens/Health";
import UnlockedDetails from "../screens/UnlockedDetails";

const Stack = createNativeStackNavigator();

const HealthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Health" component={Health} />
      <Stack.Screen
        name="UnlockedDetails"
        component={UnlockedDetails}
        options={{
          presentation: "fullScreenModal",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HealthStack;
