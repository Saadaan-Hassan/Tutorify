import { FlatList } from "react-native";
import React, { Component } from "react";
import ChatCard from "../components/ChatCard";
import { db } from "../services/firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { UserContext } from "../utils/context/UserContext";

interface ChatScreenState {
	chatRooms: Array<any>;
}

export default class ChatScreen extends Component<{}, ChatScreenState> {
	static contextType = UserContext;
	unsubscribe: () => void = () => {};

	constructor(props: {}) {
		super(props);
		this.state = {
			chatRooms: [],
		};
	}

	componentDidMount() {
		const { user } = this.context as { user: any }; // Cast this.context to the appropriate type

		const chatRoomsRef = collection(db, "chatRooms");
		const q = query(chatRoomsRef, where("users", "array-contains", user.uid));

		this.unsubscribe = onSnapshot(q, (querySnapshot) => {
			const fetchedChatRooms: Array<any> = [];
			querySnapshot.forEach((doc) => {
				fetchedChatRooms.push({ ...doc.data() });
			});

			this.setState({ chatRooms: fetchedChatRooms });
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		return (
			<FlatList
				data={this.state.chatRooms}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <ChatCard chatRoom={item} />}
			/>
		);
	}
}
