// ScanStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Scan } from '../screens/Scan';
import { SafeAreaView } from 'react-native-safe-area-context';
import FoodDetails from '../screens/FoodDetails';

const Stack = createNativeStackNavigator();

const ScanStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Scan" component={Scan} options={{ headerShown: false }} />
      <Stack.Screen name="FoodDetails" component={FoodDetails} options={{ presentation: 'modal', headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ScanStack;
