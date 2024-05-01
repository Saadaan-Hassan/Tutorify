import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function CustomButton({
	title,
	mode = "contained-tonal",
	style,
	textColor = "#F6E9B2",
	onPress,
}) {
	return (
		<Button
			style={[
				mode === "contained-tonal" ? styles.button : styles.buttonOutlined,
				style,
			]}
			textColor={textColor}
			mode={mode}
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
	buttonOutlined: {
		width: 300,
		height: 40,
		backgroundColor: "#F6E9B2",
		borderRadius: 16,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#0A6847",
	},
});
