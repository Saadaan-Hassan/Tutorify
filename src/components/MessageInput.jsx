import React from "react";
import { View, StyleSheet } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { IconButton } from "react-native-paper";
import CustomInput from "./CustomInput";

export default function MessageInput() {
	return (
		<View style={styles.container}>
			<IconButton
				icon='paperclip'
				iconColor={commonStyles.colors.primary}
				size={20}
				containerColor={commonStyles.colors.neutralLight}
				onPress={() => console.log("Pressed")}
			/>
			<CustomInput
				placeholder='Type a message'
				containerStyle={styles.inputContainer}
				inputStyle={styles.input}
			/>
			<IconButton
				icon='send'
				iconColor={commonStyles.colors.primary}
				size={20}
				containerColor={commonStyles.colors.neutralLight}
				onPress={() => console.log("Pressed")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		backgroundColor: commonStyles.colors.background,
	},
	inputContainer: {
		width: "70%",
		// backgroundColor: "red",
	},
	input: {
		width: "100%",
	},
});
