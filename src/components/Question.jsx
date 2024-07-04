import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-paper";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";

const Question = ({ question, icon }) => {
	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Icon
					source={icon}
					size={responsiveFontSize(2.5)}
					color={commonStyles.colors.primary}
				/>
			</View>
			<Text style={styles.title}>{question}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	iconContainer: {
		backgroundColor: commonStyles.colors.secondary,
		borderRadius: 50 * scaleFactor,
		padding: 15 * scaleFactor,
		marginBottom: 10 * scaleFactor,
	},
	title: {
		fontSize: responsiveFontSize(0.6),
		fontWeight: "700",
		color: commonStyles.colors.primary,
		marginBottom: 20 * scaleFactor,
		textAlign: "center",
	},
});

export default Question;
