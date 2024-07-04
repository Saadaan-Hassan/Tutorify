import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../../styles/commonStyles";

export default function CustomButton({
	title,
	mode = "contained-tonal",
	styleReverse = false,
	style,
	contentStyle,
	labelStyle,
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

	const labelStyling = [styles.label, labelStyle];

	return (
		<Button
			icon={icon}
			mode={mode}
			textColor={buttonTextColor}
			style={buttonStyles}
			contentStyle={contentStyle}
			labelStyle={labelStyling}
			onPress={onPress}
			disabled={disabled}
			loading={loading}>
			{title}
		</Button>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 150 * scaleFactor,
		backgroundColor: commonStyles.colors.primary,
		borderRadius: 50 * scaleFactor,
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
	label: {
		fontSize: responsiveFontSize(0.5),
	},
});
