import React from "react";
import { View, Text, FlatList } from "react-native";
import { Avatar } from "react-native-paper";
import MessageBox from "../components/MessageBox";
import { commonStyles } from "../styles/commonStyles";
import MessageInput from "../components/MessageInput";

export default function ChatDetailScreen() {
	const messages = [
		{
			id: 1,
			timestamp: "Wed 22 June",
			sender: {
				name: "Sender Name",
				avatar: require("../../assets/img/avatar/user1.png"),
			},
			message:
				"Hello, I will like to tell you that you can message me about anything",
			userType: "sender",
		},
		{
			id: 2,
			timestamp: "Wed 22 June",
			sender: {
				name: "Receiver Name",
				avatar: require("../../assets/img/avatar/user2.png"),
			},
			message:
				"Thank you for reaching out to me, I will let you know if I need any information",
			userType: "receiver",
		},
		{
			id: 3,
			timestamp: "Wed 27 June",
			sender: {
				name: "Receiver Name",
				avatar: require("../../assets/img/avatar/user2.png"),
			},
			message:
				"Can you please send a detailed direction to your house from Oshodi",
			userType: "receiver",
		},
		{
			id: 4,
			timestamp: "Wed 27 June",
			sender: {
				name: "Sender Name",
				avatar: require("../../assets/img/avatar/user1.png"),
			},
			message: "Sure, I will send you the direction to my house from Oshodi",
			userType: "sender",
		},
		{
			id: 5,
			timestamp: "Wed 27 June",
			sender: {
				name: "Sender Name",
				avatar: require("../../assets/img/avatar/user1.png"),
			},
			message:
				"Hello, I will like to tell you that you can message me about anything",
			userType: "sender",
		},
		{
			id: 6,
			timestamp: "Today",
			sender: {
				name: "Receiver Name",
				avatar: require("../../assets/img/avatar/user2.png"),
			},
			message:
				"Thank you for reaching out to me, I will let you know if I need any information",
			userType: "receiver",
		},
		{
			id: 7,
			timestamp: "Today",
			sender: {
				name: "Receiver Name",
				avatar: require("../../assets/img/avatar/user2.png"),
			},
			message:
				"Can you please send a detailed direction to your house from Oshodi",
			userType: "receiver",
		},
		{
			id: 8,
			timestamp: "Today",
			sender: {
				name: "Sender Name",
				avatar: require("../../assets/img/avatar/user1.png"),
			},
			message: "Sure, I will send you the direction to my house from Oshodi",
			userType: "sender",
		},
		{
			id: 9,
			timestamp: "Today",
			sender: {
				name: "Sender Name",
				avatar: require("../../assets/img/avatar/user1.png"),
			},
			message:
				"Hello, I will like to tell you that you can message me about anything",
			userType: "sender",
		},
		{
			id: 10,
			timestamp: "Today",
			sender: {
				name: "Receiver Name",
				avatar: require("../../assets/img/avatar/user2.png"),
			},
			message:
				"Thank you for reaching out to me, I will let you know if I need any information",
			userType: "receiver",
		},
	];

	const renderMessageItem = ({ item, index }) => {
		const previousMessage = index > 0 ? messages[index - 1] : null;
		const showTimestamp =
			!previousMessage || previousMessage.timestamp !== item.timestamp;

		return (
			<View>
				{showTimestamp && (
					<Text
						style={{
							textAlign: "center",
							fontSize: 18,
							marginVertical: 10,
							color: commonStyles.colors.textSecondary,
						}}>
						{item.timestamp}
					</Text>
				)}
				<View
					style={{
						flexDirection: "row",
						justifyContent:
							item.userType === "sender" ? "flex-end" : "flex-start",
						alignItems: "center",
						marginLeft: item.userType === "sender" ? 0 : 10,
						marginRight: item.userType === "sender" ? 10 : 0,
					}}>
					{item.userType === "receiver" && (
						<Avatar.Image source={item.sender.avatar} size={40} />
					)}
					<MessageBox message={item.message} userType={item.userType} />
				</View>
			</View>
		);
	};

	return (
		<>
			<FlatList
				data={messages}
				renderItem={renderMessageItem}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={{
					paddingVertical: 10,
					backgroundColor: commonStyles.colors.background,
				}}
			/>

			<MessageInput />
		</>
	);
}
