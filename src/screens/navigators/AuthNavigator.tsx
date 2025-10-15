import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../auth/SignInScreen";
import SignUpScreen from "../auth/SignUpScreen";
import WelcomScreen from "../auth/WelcomScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
