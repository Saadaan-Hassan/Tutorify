import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName='Home'
			activeColor='#F3CA52'
			inactiveColor='#F6E9B2'
			activeIndicatorStyle={{ backgroundColor: "#7ABA78" }}
			barStyle={{ backgroundColor: "#0A6847" }}
			screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name='Home'
				component={HomeScreen}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color }) => (
						<AwesomeIcon name='home' color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name='Login'
				component={LoginScreen}
				options={{
					tabBarLabel: "Login",
					tabBarIcon: ({ color }) => (
						<AwesomeIcon name='sign-in' color={color} size={26} />
					),
				}}
			/>
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
