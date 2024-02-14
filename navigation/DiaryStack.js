// DiaryStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Scan } from "../screens/Scan";
import { SafeAreaView } from "react-native-safe-area-context";
import FoodDetails from "../screens/FoodDetails";
import Diary from "../screens/Diary";
import DiaryIcon from "../svgs/DiaryIcon";

const Stack = createNativeStackNavigator();

const DiaryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Diary"
        component={Diary}
        options={{
          headerShown: false,
          
        }}
      />
      <Stack.Screen
        name="FoodDetailsDiary"
        component={FoodDetails}
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DiaryStack;
