import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Avatar } from "react-native-paper";
import MessageBox from "../components/MessageBox";
import { commonStyles } from "../styles/commonStyles";
import MessageInput from "../components/MessageInput";
import { db } from "../services/firebase";
import {
	doc,
	getDoc,
	setDoc,
	updateDoc,
	Timestamp,
	onSnapshot,
} from "firebase/firestore";
import { useUser } from "../utils/context/UserContext";
import { getDateString, getTimeString } from "../utils/helpers";

export default function ChatDetailScreen({ route }) {
	const { user, otherUsers } = useUser();
	const [messages, setMessages] = useState([]);
	const chatPartner = route.params.user;
	const chatPartnerData = otherUsers.find((u) => u.uid === chatPartner.uid);
	const sortedUserIds = [user.uid, chatPartner.uid].sort();
	const chatRoomId = `${sortedUserIds[0]}-${sortedUserIds[1]}`;

	// Listen for new messages in the chat room
	useEffect(() => {
		const chatRoomRef = doc(db, "chatRooms", chatRoomId);
		const unsubscribe = onSnapshot(
			chatRoomRef,
			(doc) => {
				if (doc.exists()) {
					setMessages(doc.data().messages || []);
				}
			},
			(error) => {
				console.error("Error fetching chat room messages: ", error);
			}
		);

		return () => {
			unsubscribe();
		};
	}, []);

	// Change the unread status of the chat room to false
	useEffect(() => {
		const chatRoomRef = doc(db, "chatRooms", chatRoomId);
		const updateUnreadStatus = async () => {
			const chatRoomSnapshot = await getDoc(chatRoomRef);
			if (chatRoomSnapshot.exists()) {
				if (chatRoomSnapshot.data().unread) {
					await updateDoc(chatRoomRef, {
						unread: false,
					});
				}
			}
		};

		updateUnreadStatus();
	}, []);

	// Function to send a message
	const sendMessage = async (messageText) => {
		if (!messageText || typeof messageText !== "string" || !messageText.trim())
			return; // Avoid sending empty or invalid messages

		const chatRoomRef = doc(db, "chatRooms", chatRoomId);
		const timestamp = Timestamp.now();
		const newMessage = {
			message: messageText.trim(),
			senderId: user.uid,
			timestamp: timestamp,
		};

		if (messages.length === 0) {
			await setDoc(chatRoomRef, {
				users: sortedUserIds,
				createdAt: timestamp,
				unread: true,
				messages: [newMessage],
			});
		} else {
			await updateDoc(chatRoomRef, {
				messages: [...messages, newMessage],
				unread: true,
			});
		}

		// Send a notification to the chat partner
		const chatPartnerData = otherUsers.find((u) => u.uid === chatPartner.uid);
		if (chatPartnerData.token) {
			const title = "New message";
			const body = `${user.username}: ${messageText}`;
			// sendNotification(chatPartnerData.token, title, body);
		}
	};

	const renderMessageItem = ({ item, index }) => {
		const previousMessage = index > 0 ? messages[index - 1] : null;
		const showTimestamp =
			!previousMessage ||
			item.timestamp.toDate().toDateString() !==
				previousMessage.timestamp.toDate().toDateString();
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
						{getDateString(item.timestamp)}
					</Text>
				)}
				<View
					style={{
						flexDirection: "row",
						justifyContent:
							item.senderId === user.uid ? "flex-end" : "flex-start",
						alignItems: "center",
						marginLeft: item.senderId === user.uid ? 0 : 10,
						marginRight: item.senderId === user.uid ? 10 : 0,
					}}>
					{item.senderId !== user.uid && (
						<Avatar.Image
							source={{ uri: chatPartnerData.profileImage }}
							size={40}
						/>
					)}
					<MessageBox
						message={item.message}
						time={getTimeString(item.timestamp)}
						userType={item.senderId === user.uid ? "sender" : "receiver"}
					/>
				</View>
			</View>
		);
	};

	return (
		<View style={{ flex: 1, backgroundColor: commonStyles.colors.background }}>
			<FlatList
				data={messages}
				renderItem={renderMessageItem}
				keyExtractor={(item) => item.timestamp.toMillis().toString()}
				contentContainerStyle={{
					paddingVertical: 10,
					backgroundColor: commonStyles.colors.background,
				}}
			/>
			<MessageInput onSend={sendMessage} />
		</View>
	);
}
