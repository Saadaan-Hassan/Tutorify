import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { AppNavigator } from "./src/navigation/Navigation";
import { theme } from "./src/styles/theme";

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<StatusBar style='light' />
			<AppNavigator />
		</PaperProvider>
	);
}
