import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function CustomButton({
	title,
	mode = "contained-tonal",
	styleReverse = false,
	style,
	onPress,
	icon,
	textColor,
}) {
	const buttonStyles = [
		styles.button,
		mode === "contained-tonal"
			? styleReverse
				? styles.buttonReverse
				: styles.button
			: styles.buttonOutlined,
		style,
	];

	const buttonTextColor =
		textColor ||
		(mode === "contained-tonal"
			? styleReverse
				? "#0A6847"
				: "#F6E9B2"
			: "#0A6847");

	return (
		<Button
			icon={icon}
			mode={mode}
			textColor={buttonTextColor}
			style={buttonStyles}
			onPress={onPress}>
			{title}
		</Button>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 300,
		height: 40,
		backgroundColor: "#0A6847",
		borderRadius: 16,
		marginBottom: 10,
	},
	buttonReverse: {
		backgroundColor: "#F6E9B2",
		borderColor: "#0A6847",
	},
	buttonOutlined: {
		backgroundColor: "#F6E9B2",
		borderColor: "#0A6847",
		borderWidth: 1,
	},
});
