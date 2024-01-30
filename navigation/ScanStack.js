// ScanStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Scan } from '../screens/Scan';
import ModalScreen from '../screens/FoodInfoModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const ScanStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Scan" component={Scan} options={{ headerShown: false }} />
      {/* <Stack.Screen name="ModalScreen" component={ModalScreen} options={{ presentation: 'modal' }} /> */}
    </Stack.Navigator>
  );
};

export default ScanStack;
