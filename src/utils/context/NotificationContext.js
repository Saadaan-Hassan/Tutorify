import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useRef,
} from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useUser } from "../context/UserContext";
import { updateUserPushToken, removeUserPushToken } from "../helpers";
import { Platform, Alert, Linking, AppState } from "react-native";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const [expoPushToken, setExpoPushToken] = useState("");
	const [notification, setNotification] = useState(null);
	const [notificationsEnabled, setNotificationsEnabled] = useState(false);
	const [notificationsPermission, setNotificationsPermission] = useState(null);
	const notificationListener = useRef();
	const responseListener = useRef();
	const { user } = useUser();

	const registerForPushNotificationsAsync = async () => {
		const projectId =
			Constants.expoConfig.extra.EAS_PROJECT_ID ?? process.env.EAS_PROJECT_ID;
		if (!projectId) {
			console.error("Project ID not found");
			return;
		}
		try {
			const { data } = await Notifications.getExpoPushTokenAsync({ projectId });
			setExpoPushToken(data);
			return data;
		} catch (e) {
			console.error(e);
		}
	};

	const checkNotificationsPermission = async () => {
		if (Platform.OS === "android") {
			await Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
				sound: "notification.wav",
				enableLights: true,
			});
		}

		if (Device.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;

			if (existingStatus === "undetermined") {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}

			if (finalStatus !== "granted") {
				console.error(
					"Permission not granted to get push token for push notification!"
				);
				return false;
			}
		} else {
			console.error("Must use physical device for push notifications");
			return false;
		}

		return true;
	};

	const handleNotificationPermission = async () => {
		const permission = await checkNotificationsPermission();
		setNotificationsPermission(permission);
		if (permission) {
			const token = await registerForPushNotificationsAsync();
			if (token) {
				setNotificationsEnabled(true);
			}
		} else {
			setNotificationsEnabled(false);
		}
	};

	useEffect(() => {
		const setupNotifications = async () => {
			if (notificationsPermission === null) {
				const permission = await checkNotificationsPermission();
				setNotificationsPermission(permission);
			}

			if (notificationsPermission) {
				const token = await registerForPushNotificationsAsync();
				if (token) {
					setNotificationsEnabled(true);
				}
			} else {
				if (notificationListener.current) {
					Notifications.removeNotificationSubscription(
						notificationListener.current
					);
				}
				if (responseListener.current) {
					Notifications.removeNotificationSubscription(
						responseListener.current
					);
				}
			}
		};

		setupNotifications();

		const handleAppStateChange = async (nextAppState) => {
			if (nextAppState === "active") {
				const permission = await checkNotificationsPermission();
				setNotificationsPermission(permission);
				if (permission) {
					const token = await registerForPushNotificationsAsync();
					if (token) {
						setNotificationsEnabled(true);
					}
				} else {
					setNotificationsEnabled(false);
				}
			}
		};

		const appStateSubscription = AppState.addEventListener(
			"change",
			handleAppStateChange
		);

		return () => {
			if (notificationListener.current) {
				Notifications.removeNotificationSubscription(
					notificationListener.current
				);
			}
			if (responseListener.current) {
				Notifications.removeNotificationSubscription(responseListener.current);
			}
			appStateSubscription.remove();
		};
	}, [notificationsPermission]);

	useEffect(() => {
		const updatePushToken = async () => {
			if (notificationsEnabled && expoPushToken && user) {
				await updateUserPushToken(user.uid, expoPushToken);
			} else if (!notificationsEnabled && user) {
				await removeUserPushToken(user.uid);
			}
		};

		if (notificationsPermission !== null && user) {
			updatePushToken();
		}
	}, [expoPushToken, notificationsEnabled, user, notificationsPermission]);

	const toggleNotifications = async (enabled) => {
		if (notificationsPermission === null) {
			await handleNotificationPermission();
		} else if (notificationsPermission) {
			if (enabled) {
				const token = await registerForPushNotificationsAsync();
				if (token) {
					setNotificationsEnabled(true);
				}
			} else {
				if (user) {
					await removeUserPushToken(user.uid);
					setNotificationsEnabled(false);
				}
			}
		} else {
			Alert.alert(
				"Notifications Disabled",
				"Please enable notifications from the device settings.",
				[
					{
						text: "Open Settings",
						onPress: () => {
							if (Platform.OS === "ios") {
								Linking.openURL("app-settings:"); // Open iOS app settings
							} else {
								Linking.openSettings();
							}
						},
					},
					{
						text: "Cancel",
						style: "cancel",
					},
				]
			);
		}
	};

	return (
		<NotificationContext.Provider
			value={{
				expoPushToken,
				notification,
				notificationsEnabled,
				toggleNotifications,
				registerForPushNotificationsAsync,
			}}>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => useContext(NotificationContext);
