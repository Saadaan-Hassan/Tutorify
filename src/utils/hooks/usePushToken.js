import { useState } from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const usePushToken = () => {
	const [expoPushToken, setExpoPushToken] = useState("");

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

	return { expoPushToken, registerForPushNotificationsAsync };
};

export default usePushToken;
