// NotificationFunctions.js
import * as Notifications from "expo-notifications";

// Function to get the FCM registration token for the device
export const getFCMRegistrationToken = async () => {
	try {
		// Request permissions if not granted
		const { status } = await Notifications.getPermissionsAsync();
		if (status !== "granted") {
			const { status: newStatus } =
				await Notifications.requestPermissionsAsync();
			if (newStatus !== "granted") {
				throw new Error("Permission not granted for notifications");
			}
		}

		// Get the FCM token
		const tokenObject = await Notifications.getExpoPushTokenAsync();
		const token = tokenObject.data;

		return token;
	} catch (error) {
		console.error("Error getting FCM token:", error);
		throw error;
	}
};

// Function to send a notification to a user
export const sendNotification = async (recipientToken, title, body) => {
	try {
		// Check if the recipient token is valid
		if (!recipientToken) {
			throw new Error("Recipient token is invalid");
		}

		// Set up the notification
		const message = {
			to: recipientToken,
			sound: "default",
			title: title,
			body: body,
			data: { data: "goes here" },
			_displayInForeground: true,
		};

		// Send the notification
		const response = await fetch("https://exp.host/--/api/v2/push/send", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Accept-encoding": "gzip, deflate",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		});

		const data = await response.json();
		if (data.error) {
			throw new Error(`Error sending notification: ${data.error}`);
		}
	} catch (error) {
		console.error("Error sending notification:", error);
		throw error;
	}
};
