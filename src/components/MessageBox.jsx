import { View, Text } from "react-native";
import React from "react";
import { commonStyles } from "../styles/commonStyles";

export default function MessageBox({ message, userType = "sender", time }) {
	return (
		<View style={[styles.container, styles[userType]]}>
			<Text style={styles.text}>{message}</Text>
			<Text style={styles.time}>{time}</Text>
		</View>
	);
}

const styles = {
	container: {
		padding: 10,
		marginHorizontal: 10,
		marginBottom: 10,
		maxWidth: "80%",
		borderRadius: 20,
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
		fontSize: 18,
		color: commonStyles.colors.neutral,
	},
	time: {
		color: commonStyles.colors.textSecondary,
		fontSize: 12,
		textAlign: "right",
		marginTop: 5,
	},
};
