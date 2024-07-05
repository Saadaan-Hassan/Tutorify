import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";

export default function MessageBox({ message, userType = "sender", time }) {
	return (
		<View style={[styles.container, styles[userType]]}>
			<Text style={styles.text}>{message}</Text>
			<Text style={styles.time}>{time}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10 * scaleFactor,
		marginHorizontal: 10 * scaleFactor,
		marginBottom: 10 * scaleFactor,
		maxWidth: "80%",
		minWidth: "30%",
		borderRadius: 20 * scaleFactor,
	},
	sender: {
		backgroundColor: commonStyles.colors.secondary2,
		borderBottomRightRadius: 0,
		alignSelf: "flex-end",
	},
	receiver: {
		backgroundColor: commonStyles.colors.neutralAccent,
		borderBottomLeftRadius: 0,
		alignSelf: "flex-start",
	},
	text: {
		fontSize: responsiveFontSize(0.55),
		color: commonStyles.colors.neutral,
	},
	time: {
		color: commonStyles.colors.textSecondary,
		fontSize: responsiveFontSize(0.3),
		textAlign: "right",
		marginTop: 5 * scaleFactor,
	},
});
