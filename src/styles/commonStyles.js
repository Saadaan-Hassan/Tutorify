// commonStyles.js
import { StyleSheet, Dimensions, PixelRatio } from "react-native";
import { theme } from "./theme";

const { width, height } = Dimensions.get("window");

export const scaleFactor = width / 375;

const baseFontSize = 12;

// Function to calculate responsive font size based on screen width
export const responsiveFontSize = (size) => {
	const screenWidth = width > height ? width : height;
	return Math.round((baseFontSize * size * screenWidth) / 375);
};

export const commonStyles = StyleSheet.create({
	colors: {
		primary: theme.colors.primary,
		secondary: theme.colors.secondary,
		secondary2: theme.colors.secondary2,
		tertiary: theme.colors.tertiary,
		textPrimary: theme.colors.textPrimary,
		textSecondary: theme.colors.textSecondary,
		inactivePrimary: theme.colors.inactivePrimary,
		rippleColor: theme.colors.rippleColor,
		overlay: theme.colors.overlay,
		neutral: theme.colors.neutral,
		neutralLight: theme.colors.neutralLight,
		neutralAccent: theme.colors.neutralAccent,
		neutralAccent2: theme.colors.neutralAccent2,
		background: theme.colors.background,
	},

	logo: {
		width: 150 * scaleFactor,
		height: 150 * scaleFactor,
		alignSelf: "center",
		borderRadius: 100 * scaleFactor,
		marginBottom: 20,
	},

	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
		paddingHorizontal: 10 * scaleFactor,
	},

	title: {
		fontSize: baseFontSize * 1.5 * scaleFactor,
		fontWeight: "bold",
		marginBottom: 10 * scaleFactor,
		textAlign: "center",
		color: theme.colors.primary,
	},

	subtitle: {
		fontSize: baseFontSize * scaleFactor,
		textAlign: "center",
		marginBottom: 20 * scaleFactor,
	},

	orText: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: baseFontSize * scaleFactor,
	},

	header: {
		fontSize: baseFontSize * 1.125 * scaleFactor,
		fontWeight: "bold",
		marginBottom: 10 * scaleFactor,
		color: theme.colors.textPrimary,
	},

	para: {
		fontSize: baseFontSize * scaleFactor * 0.9,
		color: theme.colors.neutral,
	},

	loadingOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(255, 255, 255, 0.8)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
	},
});
