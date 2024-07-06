import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../../styles/commonStyles";

const Option = ({ option, selected, onPress }) => (
	<TouchableOpacity
		onPress={onPress}
		style={[styles.choice, selected && styles.selectedChoice]}>
		<Text style={styles.text}>{option}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	choice: {
		width: "90%",
		// height: 50 * scaleFactor,
		backgroundColor: "white",
		borderRadius: 50 * scaleFactor,
		marginBottom: 15 * scaleFactor,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1 * scaleFactor,
		borderColor: "transparent",
	},
	selectedChoice: {
		borderColor: commonStyles.colors.primary,
		borderWidth: 2 * scaleFactor,
	},
	text: {
		color: commonStyles.colors.primary,
		textAlign: "center",
		padding: 12 * scaleFactor,
		fontSize: responsiveFontSize(0.5),
		fontWeight: "400",
	},
});

export default Option;
