import { View, Text } from "react-native";
import React from "react";
import { commonStyles } from "../styles/commonStyles";

export default function MessageBox({ message, userType = "sender" }) {
	return (
		<View style={[styles.container, styles[userType]]}>
			<Text style={styles.text}>{message}</Text>
		</View>
	);
}

const styles = {
	container: {
		padding: 10,
		marginHorizontal: 10,
		marginBottom: 10,
		maxWidth: "75%",
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
};
