import { Text, TouchableOpacity } from "react-native";
import React from "react";

export default function CustomLink({ style, text, onPress }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text
				style={{
					color: "#0A6847",
					fontSize: 14,
					fontWeight: "bold",
					marginBottom: 15,
					...style,
				}}>
				{text}
			</Text>
		</TouchableOpacity>
	);
}
