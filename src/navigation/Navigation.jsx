import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../utils/context/UserContext";
import { commonStyles } from "../styles/commonStyles";
import {
	HomeScreen,
	AuthScreen,
	OnboardingScreen,
	UsersScreen,
	UserDetailScreen,
	ProfileScreen,
	ChatScreen,
	ChatDetailScreen,
	RegistrationScreen,
	AccountScreen,
	PasswordScreen,
	PrivacyScreen,
	UserSearchScreen,
	SettingsScreen,
	NotificationsScreen,
} from "../screens";
import Header from "../components/Header";
import { Icon } from "react-native-paper";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
	const { user } = useUser();

	if (!user) {
		return null;
	}

	return (
		<Tab.Navigator
			initialRouteName='Home'
			activeColor={commonStyles.colors.neutral}
			inactiveColor={commonStyles.colors.inactivePrimary}
			activeIndicatorStyle={{
				backgroundColor: commonStyles.colors.neutralAccent,
			}}
			barStyle={{
				backgroundColor: commonStyles.colors.primary,
				height: 70,
			}}
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
				name={user.role === "Teacher" ? "Students" : "Tutors"}
				component={UsersScreen}
				options={{
					tabBarLabel: user.role === "Teacher" ? "Students" : "Tutors",
					tabBarIcon: ({ color }) => (
						<Icon
							source={user.role === "Teacher" ? "school" : "human-male-board"}
							color={color}
							size={26}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Search'
				component={UserSearchScreen}
				options={{
					tabBarLabel: "Search",
					tabBarIcon: ({ color }) => (
						<Icon source='compass-outline' color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name='Notifications'
				component={NotificationsScreen}
				options={{
					tabBarLabel: "Notifications",
					tabBarIcon: ({ color }) => (
						<Icon source='bell' color={color} size={26} />
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
	const { user } = useUser();
	const [isLoading, setIsLoading] = useState(true);
	const [showOnboarding, setShowOnboarding] = useState(false);

	useEffect(() => {
		const checkOnboardingStatus = async () => {
			try {
				const onboardingStatus = await AsyncStorage.getItem("onboardingStatus");
				setShowOnboarding(onboardingStatus === null);
			} catch (error) {
				console.error("Error retrieving onboarding status:", error);
			} finally {
				setIsLoading(false);
			}
		};

		checkOnboardingStatus();
	}, []);

	const handleOnboardingComplete = async () => {
		try {
			await AsyncStorage.setItem("onboardingStatus", "completed");
			setShowOnboarding(false);
		} catch (error) {
			console.error("Error setting onboarding status:", error);
		}
	};

	if (isLoading) {
		return null;
	}

	return (
		<Stack.Navigator
			initialRouteName={
				showOnboarding ? "Onboarding" : user ? "TabNavigator" : "Auth"
			}
			screenOptions={{
				header: () => <Header />,
			}}>
			<Stack.Screen name='TabNavigator' component={TabNavigator} />
			{user ? (
				<>
					<Stack.Screen name='TutorDetail' component={UserDetailScreen} />
					<Stack.Screen name='UserSearchScreen' component={UserSearchScreen} />
					<Stack.Screen name='ChatDetail' component={ChatDetailScreen} />
					<Stack.Screen name='Profile' component={ProfileScreen} />
					<Stack.Screen name='Account' component={AccountScreen} />
					<Stack.Screen name='Settings' component={SettingsScreen} />
					<Stack.Screen name='Password' component={PasswordScreen} />
					<Stack.Screen name='PrivacyScreen' component={PrivacyScreen} />

					{/* Ensure Registration screen is only used if user is not already logged in */}
					<Stack.Screen
						name='Registration'
						component={RegistrationScreen}
						options={{ headerShown: false }}
					/>
				</>
			) : (
				<>
					<Stack.Screen name='Onboarding' options={{ headerShown: false }}>
						{(props) => (
							<OnboardingScreen
								{...props}
								onComplete={handleOnboardingComplete}
							/>
						)}
					</Stack.Screen>
					<Stack.Screen
						name='Auth'
						component={AuthScreen}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};

export const AppNavigator = () => (
	<NavigationContainer>
		<MainNavigator />
	</NavigationContainer>
);
