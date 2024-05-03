import React from "react";
import { Button } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";

export default function CustomLink({ buttonStyle, labelStyle, text, onPress }) {
	return (
		<Button
			onPress={onPress}
			rippleColor={commonStyles.colors.rippleColor}
			style={{
				marginBottom: 15,
				alignItems: "flex-end",
				...buttonStyle,
			}}
			labelStyle={{
				color: commonStyles.colors.primary,
				fontWeight: "bold",
				fontSize: 14,
				...labelStyle,
			}}>
			{text}
		</Button>
	);
}
