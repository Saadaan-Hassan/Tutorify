import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Badge, Card, Divider, Text } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../utils/context/UserContext";
import { getTimeString } from "../utils/helpers";

const LeftContent = (props) => (
	<Avatar.Image
		{...props}
		source={
			props.avatar
				? { uri: props.avatar }
				: require("../../assets/img/avatar/user1.png")
		}
		size={50}
	/>
);

const RightContent = (props) => (
	<View>
		<Text
			style={[
				props.unread
					? { fontWeight: "bold", color: commonStyles.colors.tertiary }
					: { color: commonStyles.colors.textSecondary },
				{ marginBottom: 20 },
			]}>
			{getTimeString(props.latestMessageTime)}
		</Text>
		{/* <Badge style={{ backgroundColor: commonStyles.colors.tertiary }}>2</Badge> */}
	</View>
);

export default function ChatCard({ chatRoom }) {
	const navigation = useNavigation();
	const { user, otherUsers } = useUser();
	const chatPartner = chatRoom.users.find((uid) => uid !== user.uid);

	const chatPartnerData = otherUsers.find((u) => u.uid === chatPartner);

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate("ChatDetail", { user: chatPartnerData })
			}>
			<Card mode='contained'>
				<Card.Title
					title={chatPartnerData?.username || "Unknown"}
					subtitle={
						chatRoom.messages[chatRoom.messages.length - 1]?.message || ""
					}
					titleStyle={{
						fontSize: 20,
						minHeight: 25,
						color: commonStyles.colors.textPrimary,
					}}
					subtitleStyle={{
						fontSize: 16,
						color: chatRoom.unread
							? commonStyles.colors.tertiary
							: commonStyles.colors.textSecondary,
					}}
					left={() => <LeftContent avatar={chatPartnerData?.profileImage} />}
					leftStyle={{ marginRight: 25 }}
					right={() => (
						<RightContent
							latestMessageTime={
								chatRoom?.messages[chatRoom.messages.length - 1]?.timestamp
							}
							unread={chatRoom.unread}
						/>
					)}
					rightStyle={{ marginRight: 15 }}
					style={{ backgroundColor: commonStyles.colors.neutral }}
				/>
				<Divider />
			</Card>
		</TouchableOpacity>
	);
}
