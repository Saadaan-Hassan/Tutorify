import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ChatCard from "../components/ChatCard";
import { db } from "../services/firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { useUser } from "../utils/context/UserContext";

export default function ChatScreen() {
	const { user } = useUser();
	const [chatRooms, setChatRooms] = useState([]);

	// Fetch all chat rooms that the current user is a part of
	useEffect(() => {
		const chatRoomsRef = collection(db, "chatRooms");
		const q = query(chatRoomsRef, where("users", "array-contains", user.uid));

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const fetchedChatRooms = [];
			querySnapshot.forEach((doc) => {
				fetchedChatRooms.push({ ...doc.data() });
			});

			setChatRooms(fetchedChatRooms);
		});

		return () => {
			unsubscribe();
		};
	}, [user]);

	return (
		<FlatList
			data={chatRooms}
			keyExtractor={(item) => item.createdAt}
			renderItem={({ item }) => <ChatCard chatRoom={item} />}
		/>
	);
}
