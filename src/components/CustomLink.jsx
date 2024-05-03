import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function CustomLink({ buttonStyle, labelStyle, text, onPress }) {
	return (
		<Button
			onPress={onPress}
			rippleColor={"#F6E9B20D"}
			style={{
				marginBottom: 15,
				alignItems: "flex-end",
				...buttonStyle,
			}}
			labelStyle={{
				color: "#0A6847",
				fontWeight: "bold",
				fontSize: 14,
				...labelStyle,
			}}>
			{text}
		</Button>
	);
}
