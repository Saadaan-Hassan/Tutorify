import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Linking, Image } from "react-native";
import { Text, List, Switch } from "react-native-paper";
import * as Location from "expo-location";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";
import { useLocation } from "../utils/context/LocationContext";

export default function SettingsScreen() {
	const { locationEnabled, setLocationEnabled } = useLocation();
	const [notificationsEnabled, setNotificationsEnabled] = useState(true);

	const handleLocationToggle = async () => {
		if (locationEnabled) {
			Alert.alert(
				"Disable Location Services",
				"Are you sure you want to disable location services? You will need to disable it from the system settings.",
				[
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "OK",
						onPress: () => {
							Linking.openSettings();
						},
					},
				]
			);
		} else {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status === "granted") {
				setLocationEnabled(true);
			} else {
				Alert.alert(
					"Permission Denied",
					"Please enable location services in the system settings.",
					[
						{ text: "Cancel" },
						{ text: "OK", onPress: () => Linking.openSettings() },
					]
				);
			}
		}
	};

	const handleNotificationsToggle = () => {
		setNotificationsEnabled(!notificationsEnabled);
	};

	return (
		<View style={styles.container}>
			<Image
				source={require("../../assets/img/blob1.png")}
				style={{
					alignSelf: "center",
					position: "absolute",
					top: 0,
					zIndex: -1,
				}}
				resizeMode='contain'
			/>
			<Text style={styles.title}>Settings</Text>
			<List.Section>
				<List.Item
					title='Notifications'
					titleStyle={{ color: commonStyles.colors.primary }}
					right={() => (
						<Switch
							value={notificationsEnabled}
							onValueChange={handleNotificationsToggle}
						/>
					)}
				/>
				<List.Item
					title='Location Services'
					titleStyle={{ color: commonStyles.colors.primary }}
					right={() => (
						<Switch
							value={locationEnabled}
							onValueChange={handleLocationToggle}
						/>
					)}
				/>
			</List.Section>
			<Image
				source={require("../../assets/img/blob2.png")}
				style={{
					alignSelf: "center",
					position: "absolute",
					bottom: 0,
					zIndex: -1,
				}}
				resizeMode='contain'
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: scaleFactor * 16,
		backgroundColor: commonStyles.colors.background,
		position: "relative",
	},
	title: {
		fontSize: responsiveFontSize(12),
		fontWeight: "700",
		color: commonStyles.colors.primary,
		marginBottom: scaleFactor * 20,
		textAlign: "center",
	},
});
