import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style='auto' />
			<Stack.Navigator
				initialRouteName='Onboarding'
				screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Onboarding' component={OnboardingScreen} />
				<Stack.Screen name='Home' component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
