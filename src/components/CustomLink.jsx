import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function CustomLink({ style, text, onPress }) {
	return (
		<Button onPress={onPress} rippleColor={"#F6E9B20D"}>
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
		</Button>
	);
}
