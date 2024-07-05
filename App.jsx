import "expo-dev-client";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./src/services/firebase.js";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { AppNavigator } from "./src/navigation/Navigation";
import { theme } from "./src/styles/theme";
import { UserProvider } from "./src/utils/context/UserContext.js";
import NoInternet from "./src/screens/NoInternetScreen";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import Mapbox from "@rnmapbox/maps";
import { LocationProvider } from "./src/utils/context/LocationContext";
import { NotificationProvider } from "./src/utils/context/NotificationContext.js";
import Constants from "expo-constants";

// AsyncStorage.clear();

Mapbox.setAccessToken(
	Constants.expoConfig.extra.RN_MAPBOX_ACCESS_TOKEN ??
		process.env.RN_MAPBOX_ACCESS_TOKEN
);

export default function App() {
	const [isConnected, setIsConnected] = useState(true);

	useEffect(() => {
		// Check internet connectivity on app launch
		const checkConnection = async () => {
			const netState = await NetInfo.fetch();
			setIsConnected(netState.isConnected && netState.isInternetReachable);
		};

		// Call checkConnection function initially and set up listener
		checkConnection();

		const unsubscribe = NetInfo.addEventListener((state) => {
			setIsConnected(state.isConnected && state.isInternetReachable);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const handleRetry = () => {
		NetInfo.fetch().then((state) => {
			setIsConnected(state.isConnected && state.isInternetReachable);
		});
	};

	if (!isConnected) {
		return <NoInternet onRetry={handleRetry} />;
	}

	return (
		<UserProvider>
			<NotificationProvider>
				<LocationProvider>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<PaperProvider theme={theme}>
							<StatusBar style='light' />
							<AppNavigator />
						</PaperProvider>
					</GestureHandlerRootView>
				</LocationProvider>
			</NotificationProvider>
		</UserProvider>
	);
}
