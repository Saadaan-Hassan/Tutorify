import { DefaultTheme, overlay } from "react-native-paper";

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#5316B6",
		secondary: "#E1D1FA",
		secondary2: "#A4DCF4",
		tertiary: "#FF6584",

		textPrimary: "#120E1A",
		textSecondary: "#656466",
		inactivePrimary: "#D4C5ED",

		rippleColor: "#E1D1FA00",
		overlay: "#E1D1FA50",

		neutral: "#FAF6FD",
		neutralLight: "#E1D1FA50",
		neutralAccent: "#C2A4F4",
		neutralAccent2: "#CEC2DA",
		background: "#FAF6FD",
	},
};
