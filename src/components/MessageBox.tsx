import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors, scaleFactor, responsiveFontSize } from "../styles/commonStyles";

interface MessageBoxProps {
	message: string;
	userType?: "sender" | "receiver";
	time: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, userType = "sender", time }) => {
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
		backgroundColor: colors.secondary2,
		borderBottomRightRadius: 0,
		alignSelf: "flex-end",
	},
	receiver: {
		backgroundColor: colors.neutralAccent,
		borderBottomLeftRadius: 0,
		alignSelf: "flex-start",
	},
	text: {
		fontSize: responsiveFontSize(7),
		color: colors.neutral,
	},
	time: {
		color: colors.textSecondary,
		fontSize: responsiveFontSize(5),
		textAlign: "right",
		marginTop: 5 * scaleFactor,
	},
});

export default MessageBox;
