import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Icon } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import SignupScreen from "../screens/SignupScreen";
import TutorsScreen from "../screens/TutorsScreen";
import TutorDetialScreen from "../screens/TutorDetailScreen";
import ProfileInfo from '../screens/ProfileInfo';  
import Header from "../components/Header";
import ProfileScreen from "../screens/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatDetailScreen from "../screens/ChatDetailScreen";
import ProfilePassword from "../screens/ProfilePassword";
import ProfilePrivacy from "../screens/ProfilePrivacy";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName='Home'
			activeColor={commonStyles.colors.neutral}
			inactiveColor={commonStyles.colors.inactivePrimary}
			activeIndicatorStyle={{
				backgroundColor: commonStyles.colors.neutralAccent,
			}}
			barStyle={{ backgroundColor: commonStyles.colors.primary, height: 70 }}
			screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name='Home'
				component={HomeScreen}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color }) => (
						<Icon source='home' color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name='Tutors'
				component={TutorsScreen}
				options={{
					tabBarLabel: "Tutors",
					tabBarIcon: ({ color }) => (
						<Icon source='compass-outline' color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name='Chat'
				component={ChatScreen}
				options={{
					tabBarLabel: "Chat",
					tabBarIcon: ({ color }) => (
						<Icon source='message-text' color={color} size={26} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const MainNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName='Onboarding'
			screenOptions={{
				header: () => <Header />,
			}}>
			<Stack.Screen
				name='Onboarding'
				component={OnboardingScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Login'
				component={LoginScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Signup'
				component={SignupScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name='TabNavigator' component={TabNavigator} />
			<Stack.Screen name='TutorDetail' component={TutorDetialScreen} />
			<Stack.Screen name='ProfileInfo' component={ProfileInfo} />
			<Stack.Screen name='ProfilePassword' component={ProfilePassword} />
			<Stack.Screen name='ProfilePrivacy' component={ProfilePrivacy} />
			<Stack.Screen name='Profile' component={ProfileScreen} />
			<Stack.Screen name='ChatDetail' component={ChatDetailScreen} />
		</Stack.Navigator>
	);
};

export const AppNavigator = () => {
	return (
		<NavigationContainer>
			<MainNavigator />
		</NavigationContainer>
	);
};
