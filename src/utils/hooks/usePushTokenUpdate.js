import { useEffect } from "react";
import { updateUserPushToken, removeUserPushToken } from "../services/firebase";

export default usePushTokenUpdate = (
	user,
	expoPushToken,
	notificationsEnabled
) => {
	useEffect(() => {
		const updatePushToken = async () => {
			if (user && expoPushToken && notificationsEnabled) {
				await updateUserPushToken(user.uid, expoPushToken);
			} else if (user && !notificationsEnabled) {
				await removeUserPushToken(user.uid);
			}
		};

		updatePushToken();
	}, [expoPushToken, notificationsEnabled, user]);
};
