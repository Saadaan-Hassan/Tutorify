import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";

export default function CustomInput({
	label,
	placeholder,
	type = "text",
	value,
	containerStyle,
	inputStyle,
	onChangeText,
	error,
}) {
	return (
		<View style={[styles.container, containerStyle]}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				mode='outlined'
				style={[styles.input, inputStyle]}
				outlineStyle={{ borderRadius: 16 }}
				error={error}
				placeholder={placeholder}
				placeholderTextColor={commonStyles.colors.textSecondary}
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
		color: commonStyles.colors.textPrimary,
	},
});
