// GroceriesStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Scan } from "../screens/Scan";
import { SafeAreaView } from "react-native-safe-area-context";
import FoodDetails from "../screens/FoodDetails";
import Diary from "../screens/Diary";
import DiaryIcon from "../svgs/DiaryIcon";
import CreateAccount from "../components/onboarding/CreateAccount";
import Groceries from "../screens/Groceries";

const Stack = createNativeStackNavigator();

const GroceriesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Groceries"
        component={Groceries}
        options={{
          headerShown: false,
          
        }}
      />
      {/* <Stack.Screen
        name="FoodDetailsGroceries"
        component={FoodDetails}
        options={{ presentation: "modal", headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default GroceriesStack;
