import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text style={styles.header}>HomeScreen</Text>
			<TouchableOpacity onPress={() => navigation.navigate("Onboarding")}>
				<Text style={styles.button}>Go to Onboarding</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	header: {
		fontSize: 24,
		fontWeight: "bold",
	},

	button: {
		marginTop: 20,
		backgroundColor: "green",
		color: "white",
		padding: 10,
		borderRadius: 5,
	},
});
