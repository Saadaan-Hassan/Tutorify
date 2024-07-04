import { useEffect, useRef } from "react";
import { Notifications } from "expo";
import { registerForPushNotificationsAsync } from "../services/notifications";

export default useNotificationSetup = (
	notificationsEnabled,
	setNotification,
	setExpoPushToken
) => {
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		const setupNotifications = async () => {
			if (notificationsEnabled) {
				const token = await registerForPushNotificationsAsync();
				if (token) {
					notificationListener.current =
						Notifications.addNotificationReceivedListener((notification) => {
							setNotification(notification);
						});

					responseListener.current =
						Notifications.addNotificationResponseReceivedListener(
							(response) => {
								console.log(response);
							}
						);
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

		return () => {
			if (notificationListener.current) {
				Notifications.removeNotificationSubscription(
					notificationListener.current
				);
			}
			if (responseListener.current) {
				Notifications.removeNotificationSubscription(responseListener.current);
			}
		};
	}, [notificationsEnabled]);
};
