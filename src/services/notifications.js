import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

async function sendPushNotification(expoPushToken) {
	const message = {
		to: expoPushToken,
		sound: "default",
		title: "Original Title",
		body: "And here is the body!",
		data: { someData: "goes here" },
	};

	await fetch("https://exp.host/--/api/v2/push/send", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Accept-Encoding": "gzip, deflate",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	});
}

function handleRegistrationError(errorMessage) {
	alert(errorMessage);
	console.error(errorMessage);
	throw new Error(errorMessage);
}

export async function registerForPushNotificationsAsync() {
	if (Platform.OS === "android") {
		Notifications.setNotificationChannelAsync("default", {
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
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			handleRegistrationError(
				"Permission not granted to get push token for push notification!"
			);
			return;
		}

		const projectId =
			Constants.expoConfig.extra.EAS_PROJECT_ID ?? process.env.EAS_PROJECT_ID;
		if (!projectId) {
			handleRegistrationError("Project ID not found");
		}
		try {
			const pushTokenString = (
				await Notifications.getExpoPushTokenAsync({ projectId })
			).data;
			console.log(pushTokenString);
			return pushTokenString;
		} catch (e) {
			handleRegistrationError(`${e}`);
		}
	} else {
		handleRegistrationError("Must use physical device for push notifications");
	}
}

export default function Push() {
	const [expoPushToken, setExpoPushToken] = useState("");
	const [notification, setNotification] = useState(null); // Fixed useState call
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync()
			.then((token) => setExpoPushToken(token ?? ""))
			.catch((error) => setExpoPushToken(`${error}`));

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

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
	}, []);

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
			<Text>Your Expo push token: {expoPushToken}</Text>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<Text>
					Title: {notification && notification.request.content.title}{" "}
				</Text>
				<Text>Body: {notification && notification.request.content.body}</Text>
				<Text>
					Data:{" "}
					{notification && JSON.stringify(notification.request.content.data)}
				</Text>
			</View>
			<Button
				title='Press to Send Notification'
				onPress={async () => {
					if (expoPushToken) {
						await sendPushNotification(expoPushToken);
					} else {
						alert("No Expo push token available");
					}
				}}
			/>
		</View>
	);
}
