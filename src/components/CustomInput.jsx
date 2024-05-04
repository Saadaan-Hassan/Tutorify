import { View, Text, TextInput, StyleSheet } from "react-native";
import { commonStyles } from "../styles/commonStyles";

export default function CustomInput({
	label,
	placeholder,
	type = "text",
	value,
	containerStyle,
	inputStyle,
	onChangeText,
}) {
	return (
		<View style={[styles.container, containerStyle]}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={[styles.input, inputStyle]}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				inputMode={type === "password" ? "text" : type}
				secureTextEntry={type === "password"}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
		color: commonStyles.colors.primary,
	},
	input: {
		width: 300,
		height: 40,
		padding: 5,
		paddingLeft: 10,
		borderWidth: 1,
		borderColor: commonStyles.colors.primary,
		borderRadius: 15,
	},
});
