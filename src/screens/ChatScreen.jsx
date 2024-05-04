import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ChatCard from "../components/ChatCard";

export default function ChatScreen() {
	const navigation = useNavigation();
	return (
		<View>
			<ChatCard />
			<ChatCard />
			<ChatCard />
			<ChatCard />
		</View>
	);
}
