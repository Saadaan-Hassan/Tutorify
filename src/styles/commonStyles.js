import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const commonStyles = StyleSheet.create({
	colors: {
		primary: theme.colors.primary,
		secondary: theme.colors.secondary,

		textPrimary: theme.colors.textPrimary,
		textSecondary: theme.colors.textSecondary,
		inactivePrimary: theme.colors.inactivePrimary,

		rippleColor: theme.colors.rippleColor,

		neutral: theme.colors.neutral,
		neutralLight: theme.colors.neutralLight,
		neutralAccent: theme.colors.neutralAccent,
		neutralAccent2: theme.colors.neutralAccent2,
		background: theme.colors.background,
	},

	logo: {
		width: 150,
		height: 150,
		alignSelf: "center",
		borderRadius: 100,
		marginBottom: 20,
	},

	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
	orText: {
		textAlign: "center",
		marginBottom: 10,
		fontWeight: "bold",
		fontSize: 16,
	},
});
