import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";

export default function CustomButton({
	title,
	mode = "contained-tonal",
	styleReverse = false,
	style,
	contentStyle,
	onPress,
	icon,
	textColor,
	disabled,
	loading,
}) {
	const buttonStyles = [
		styles.button,
		mode === "contained-tonal"
			? styleReverse
				? styles.buttonReverse
				: null
			: styles.buttonOutlined,
		style,
		disabled && { backgroundColor: commonStyles.colors.inactivePrimary },
	];

	const buttonTextColor =
		textColor ||
		(mode === "contained-tonal"
			? styleReverse
				? commonStyles.colors.primary
				: commonStyles.colors.secondary
			: commonStyles.colors.primary);

	return (
		<Button
			icon={icon}
			mode={mode}
			textColor={buttonTextColor}
			style={buttonStyles}
			contentStyle={contentStyle}
			onPress={onPress}
			disabled={disabled}
			loading={loading}>
			{title}
		</Button>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 300,
		height: 40,
		backgroundColor: commonStyles.colors.primary,
		borderRadius: 16,
		marginBottom: 10,
	},
	buttonReverse: {
		backgroundColor: commonStyles.colors.neutral,
		borderColor: commonStyles.colors.primary,
	},
	buttonOutlined: {
		backgroundColor: "transparent",
		borderColor: commonStyles.colors.primary,
		borderWidth: 1,
	},
});
