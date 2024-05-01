import { View, Text, TextInput, StyleSheet } from "react-native";

export default function CustomInput({
	label,
	placeholder,
	type = "text",
	value,
	onChangeText,
}) {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
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
		color: "#0A6847",
	},
	input: {
		width: 300,
		height: 40,
		padding: 5,
		paddingLeft: 10,
		borderWidth: 1,
		borderColor: "#0A6847",
		borderRadius: 15,
	},
});