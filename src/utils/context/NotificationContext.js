import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useRef,
} from "react";
import { AppState } from "react-native";
import * as Notifications from "expo-notifications";
import { useUser } from "./UserContext";
import { updateUserPushToken, removeUserPushToken } from "../helpers";
import useNotificationPermissions from "../hooks/useNotificationPermissions";
import usePushToken from "../hooks/usePushToken";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const { user } = useUser();
	const [notification, setNotification] = useState(null);
	const {
		notificationsEnabled,
		toggleNotifications,
		handleNotificationPermission,
		notificationsPermission,
	} = useNotificationPermissions();
	const { expoPushToken, registerForPushNotificationsAsync } = usePushToken();
	const notificationListener = useRef();

	useEffect(() => {
		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		return () => {
			if (notificationListener.current) {
				Notifications.removeNotificationSubscription(
					notificationListener.current
				);
			}
		};
	}, [notification]);

	useEffect(() => {
		const setupNotifications = async () => {
			const permission = await handleNotificationPermission();
			if (permission) {
				const token = await registerForPushNotificationsAsync();
				if (token) {
					toggleNotifications(true);
				}
			} else {
				if (notificationListener.current) {
					Notifications.removeNotificationSubscription(
						notificationListener.current
					);
				}
			}
		};

		setupNotifications();

		const handleAppStateChange = async (nextAppState) => {
			if (nextAppState === "active") {
				const permission = await handleNotificationPermission();
				if (permission) {
					const token = await registerForPushNotificationsAsync();
					if (token) {
						toggleNotifications(true);
					}
				} else {
					toggleNotifications(false);
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

	return (
		<NotificationContext.Provider
			value={{
				expoPushToken,
				notification,
				notificationsEnabled,
				setNotification,
				toggleNotifications,
				registerForPushNotificationsAsync,
			}}>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => useContext(NotificationContext);
