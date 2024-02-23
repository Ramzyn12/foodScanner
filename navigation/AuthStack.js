// ScanStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSignUp from "../screens/LoginSignUp";
import Welcome from "../screens/onboarding/Welcome";
import Notifications from "../screens/onboarding/Notifications";
import InfoOne from "../screens/onboarding/InfoOne";
import InfoTwo from "../screens/onboarding/InfoTwo";
import MakeChange from "../screens/onboarding/MakeChange";
import QuestionIntro from "../screens/onboarding/QuestionIntro";
import BirthQuestion from "../screens/onboarding/BirthQuestion";
import GenderQuestion from "../screens/onboarding/GenderQuestion";
import HeartAnimation from "../screens/onboarding/HeartAnimation";
import ConsumptionQuestion from "../screens/onboarding/ConsumptionQuestion";
import MedicalQuestion from "../screens/onboarding/MedicalQuestion";
import MotivationQuestion from "../screens/onboarding/MotivationQuestion";
import ExcitementQuestion from "../screens/onboarding/ExcitementQuestion";
import AuthScreen from "../screens/onboarding/AuthScreen";
import CreateAccount from "../components/onboarding/CreateAccount";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InfoOne"
        component={InfoOne}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InfoTwo"
        component={InfoTwo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MakeChange"
        component={MakeChange}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HeartAnimation"
        component={HeartAnimation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuestionIntro"
        component={QuestionIntro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BirthQuestion"
        component={BirthQuestion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GenderQuestion"
        component={GenderQuestion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConsumptionQuestion"
        component={ConsumptionQuestion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MedicalQuestion"
        component={MedicalQuestion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MotivationQuestion"
        component={MotivationQuestion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExcitementQuestion"
        component={ExcitementQuestion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{ presentation: "modal", headerShown: false }}
      /> */}
      {/* <Stack.Screen name="auth" component={LoginSignUp} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
