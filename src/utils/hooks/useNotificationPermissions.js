import { useState } from "react";
import { Platform, Alert, Linking } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const useNotificationPermissions = () => {
	const [notificationsEnabled, setNotificationsEnabled] = useState(false);
	const [notificationsPermission, setNotificationsPermission] = useState(null);

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
			setNotificationsEnabled(true);
		} else {
			setNotificationsEnabled(false);
		}
		return permission;
	};

	const toggleNotifications = async (enabled) => {
		if (notificationsPermission === null) {
			await handleNotificationPermission();
		} else if (notificationsPermission) {
			if (enabled) {
				setNotificationsEnabled(true);
			} else {
				setNotificationsEnabled(false);
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

	return {
		notificationsEnabled,
		toggleNotifications,
		handleNotificationPermission,
		notificationsPermission,
	};
};

export default useNotificationPermissions;
