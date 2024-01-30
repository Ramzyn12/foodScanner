// ScanStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginSignUp from '../screens/LoginSignUp';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="auth" component={LoginSignUp} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
