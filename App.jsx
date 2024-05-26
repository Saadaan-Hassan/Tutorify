import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./src/services/firebase.js";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { AppNavigator } from "./src/navigation/Navigation";
import { theme } from "./src/styles/theme";
import { UserProvider } from "./src/utils/context/UserContext.js";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage.clear();

export default function App() {
	return (
		<UserProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<PaperProvider theme={theme}>
					<StatusBar style='light' />
					<AppNavigator />
				</PaperProvider>
			</GestureHandlerRootView>
		</UserProvider>
	);
}
