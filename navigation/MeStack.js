// HealthStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Health from "../screens/Health";
import UnlockedDetails from "../screens/UnlockedDetails";
import Me from "../screens/Me";
import Settings from "../screens/Settings";
import Account from "../screens/Account";
import Notifications from "../screens/Notifications";

const Stack = createNativeStackNavigator();

const MeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Me" component={Me} />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MeStack;
