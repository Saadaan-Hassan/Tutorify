import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import CustomButton from "../components/custom/CustomButton";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";

const NoInternet = ({ onRetry }) => {
	return (
		<View style={styles.container}>
			<LottieView
				source={require("../../assets/animations/no-internet.json")}
				autoPlay
				loop
				style={styles.image}
			/>
			<Text style={styles.title}>No Internet Connection</Text>
			<Text style={styles.subtitle}>
				Please check your internet settings and try again.
			</Text>
			<CustomButton title='Retry' onPress={onRetry} style={styles.button} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: commonStyles.colors.background,
		paddingHorizontal: 20 * scaleFactor,
	},
	image: {
		width: 200 * scaleFactor,
		height: 200 * scaleFactor,
		marginBottom: 20 * scaleFactor,
	},
	title: {
		fontSize: responsiveFontSize(0.75),
		fontWeight: "bold",
		color: commonStyles.colors.textPrimary,
		textAlign: "center",
		marginBottom: 10 * scaleFactor,
	},
	subtitle: {
		fontSize: responsiveFontSize(0.5),
		color: commonStyles.colors.textSecondary,
		textAlign: "center",
		marginBottom: 20 * scaleFactor,
	},
	button: {
		width: Dimensions.get("window").width - 70 * scaleFactor,
		// paddingVertical:  * scaleFactor,
	},
});

export default NoInternet;
