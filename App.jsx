import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName='Home'
			screenOptions={{ headerShown: false }}>
			<Tab.Screen name='Home' component={HomeScreen} />
			<Tab.Screen name='Login' component={LoginScreen} />
		</Tab.Navigator>
	);
};

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style='auto' />
			<Stack.Navigator
				initialRouteName='Onboarding'
				screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Onboarding' component={OnboardingScreen} />
				<Stack.Screen name='TabNavigator' component={TabNavigator} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
