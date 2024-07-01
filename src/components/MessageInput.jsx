import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { IconButton } from "react-native-paper";
import CustomInput from "./custom/CustomInput";
import { scaleFactor } from "../styles/commonStyles";

const { width } = Dimensions.get("window");

export default function MessageInput({ onSend }) {
	const [message, setMessage] = useState("");

	return (
		<View style={styles.container}>
			<IconButton
				icon='paperclip'
				iconColor={commonStyles.colors.primary}
				size={width * 0.06}
				containerColor={commonStyles.colors.neutralLight}
				onPress={() => console.log("Pressed")}
			/>
			<CustomInput
				placeholder='Type a message'
				containerStyle={styles.inputContainer}
				inputStyle={styles.input}
				outlineStyle={styles.outlineStyle}
				value={message}
				onChangeText={setMessage}
				multiline={true}
			/>
			<IconButton
				icon='send'
				iconColor={commonStyles.colors.primary}
				size={width * 0.06}
				containerColor={commonStyles.colors.neutralLight}
				onPress={() => {
					onSend(message);
					setMessage("");
				}}
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
	},
	input: {
		width: "100%",
		height: 55 * scaleFactor,
	},
});
