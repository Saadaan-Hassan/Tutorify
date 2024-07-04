import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../../styles/commonStyles";

export default function CustomInput({
	label,
	placeholder,
	type = "text",
	value,
	containerStyle,
	inputStyle,
	onChangeText,
	onSubmitEditing,
	outlineStyle,
	error = false,
	multiline = false,
}) {
	return (
		<View style={[styles.container, containerStyle]}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				mode='outlined'
				multiline={multiline}
				style={[styles.input, inputStyle]}
				outlineColor={commonStyles.colors.primary}
				outlineStyle={[{ borderRadius: 50 * scaleFactor }, outlineStyle]}
				error={error}
				placeholder={placeholder}
				placeholderTextColor={commonStyles.colors.textSecondary}
				value={value}
				onChangeText={onChangeText}
				inputMode={type}
				secureTextEntry={type === "password"}
				spellCheck={true}
				onSubmitEditing={onSubmitEditing}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 20 * scaleFactor,
	},
	label: {
		fontSize: responsiveFontSize(0.5),
		fontWeight: "bold",
		marginBottom: 5 * scaleFactor,
		color: commonStyles.colors.primary,
	},
	input: {
		width: 300 * scaleFactor,
		height: 40 * scaleFactor,
		lineHeight: 20 * scaleFactor,
		color: commonStyles.colors.textPrimary,
		fontSize: responsiveFontSize(0.4),
	},
});
