import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ChatCard from "../components/ChatCard";
import { db } from "../services/firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { useUser } from "../utils/context/UserContext";
import LottieView from "lottie-react-native";
import { scaleFactor, commonStyles } from "../styles/commonStyles";
import { Text } from "react-native-paper";

export default function ChatScreen() {
	const { user } = useUser();
	const [chatRooms, setChatRooms] = useState([]);

	// Fetch all chat rooms that the current user is a part of
	useEffect(() => {
		if (!user) return; // Ensure user is defined before executing the query

		const chatRoomsRef = collection(db, "chatRooms");
		const q = query(chatRoomsRef, where("users", "array-contains", user.uid));

		const unsubscribe = onSnapshot(
			q,
			(querySnapshot) => {
				const fetchedChatRooms = [];
				querySnapshot.forEach((doc) => {
					fetchedChatRooms.push({ ...doc.data() });
				});

				setChatRooms(fetchedChatRooms);
			},
			(error) => {
				console.error("Error fetching chat rooms: ", error);
			}
		);

		return () => {
			unsubscribe();
		};
	}, [user]);

	return (
		<View style={{ flex: 1 }}>
			{chatRooms.length === 0 ? (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<LottieView
						source={require("../../assets/animations/chat.json")}
						autoPlay
						loop
						style={styles.image}
					/>
					<Text
						style={[
							commonStyles.title,
							{ color: commonStyles.colors.primary },
						]}>
						No chats yet
					</Text>
				</View>
			) : (
				<FlatList
					data={chatRooms}
					keyExtractor={(item) => item.createdAt}
					renderItem={({ item }) => <ChatCard chatRoom={item} />}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		width: 200 * scaleFactor,
		height: 200 * scaleFactor,
		marginBottom: 20 * scaleFactor,
	},
});
