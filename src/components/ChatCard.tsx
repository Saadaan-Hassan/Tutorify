import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar, Card, Divider, Text } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useUser } from "../utils/context/UserContext";
import { getTimeString } from "../utils/helpers";
import { scaleFactor, responsiveFontSize } from "../styles/commonStyles";

interface ChatCardProps {
	chatRoom: {
		users: string[];
		messages: {
			message: string;
			timestamp: {
				toDate: () => Date;
			};
		}[];
		unread: boolean;
	};
}

interface LeftContentProps {
	avatar?: string;
}

interface RightContentProps {
	latestMessageTime?: {
		toDate: () => Date;
	};
	unread: boolean;
}

const LeftContent: React.FC<LeftContentProps> = ({ avatar }) => (
	<Avatar.Image
		source={
			avatar ? { uri: avatar } : require("../../assets/img/avatar/user1.png")
		}
		size={50 * scaleFactor}
	/>
);

console.log("TypeScript Component ChatCard");

const RightContent: React.FC<RightContentProps> = ({
	latestMessageTime,
	unread,
}) => (
	<View>
		<Text
			style={[
				unread
					? { fontWeight: "bold", color: commonStyles.colors.tertiary }
					: { color: commonStyles.colors.textSecondary },
				{
					marginBottom: 20 * scaleFactor,
					fontSize: responsiveFontSize(5),
					marginRight: 20 * scaleFactor,
				},
			]}>
			{latestMessageTime && getTimeString(latestMessageTime)}
		</Text>
	</View>
);

const ChatCard: React.FC<ChatCardProps> = ({ chatRoom }) => {
	const navigation = useNavigation<NavigationProp<any>>();
	const { user, otherUsers } = useUser();
	const chatPartner = chatRoom.users.find((uid) => uid !== user.uid);

	const chatPartnerData = otherUsers.find((u) => u.uid === chatPartner);

	if (!chatPartnerData) {
		return null;
	}

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate("ChatDetail", { user: chatPartnerData })
			}>
			<Card mode='contained' style={styles.cardContainer}>
				<Card.Title
					title={chatPartnerData?.username || "Unknown"}
					subtitle={
						chatRoom.messages[chatRoom.messages.length - 1]?.message || ""
					}
					titleStyle={styles.title}
					subtitleStyle={[
						styles.subtitle,
						{
							color: chatRoom.unread
								? commonStyles.colors.tertiary
								: commonStyles.colors.textSecondary,
						},
					]}
					left={() => <LeftContent avatar={chatPartnerData?.profileImage} />}
					right={() => (
						<RightContent
							latestMessageTime={
								chatRoom?.messages[chatRoom.messages.length - 1]?.timestamp
							}
							unread={chatRoom.unread}
						/>
					)}
				/>
				<Divider />
			</Card>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: commonStyles.colors.neutral,
		marginBottom: 10 * scaleFactor,
	},
	title: {
		color: commonStyles.colors.textPrimary,
		fontSize: responsiveFontSize(9),
		minHeight: 25 * scaleFactor,
		marginLeft: 5 * scaleFactor,
	},
	subtitle: {
		fontSize: responsiveFontSize(7),
		marginLeft: 5 * scaleFactor,
	},
});

export default ChatCard;
