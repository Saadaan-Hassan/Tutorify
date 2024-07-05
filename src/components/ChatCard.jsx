import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar, Badge, Card, Divider, Text } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../utils/context/UserContext";
import { getTimeString } from "../utils/helpers";
import { scaleFactor, responsiveFontSize } from "../styles/commonStyles";

const LeftContent = (props) => (
	<Avatar.Image
		{...props}
		source={
			props.avatar
				? { uri: props.avatar }
				: require("../../assets/img/avatar/avatar.jpg")
		}
		size={50 * scaleFactor}
	/>
);

const RightContent = (props) => (
	<View>
		<Text
			style={[
				props.unread
					? { fontWeight: "bold", color: commonStyles.colors.tertiary }
					: { color: commonStyles.colors.textSecondary },
				{
					marginBottom: 20 * scaleFactor,
					fontSize: responsiveFontSize(0.4),
					marginRight: 20 * scaleFactor,
				},
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
}

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: commonStyles.colors.neutral,
		marginBottom: 10 * scaleFactor,
	},
	title: {
		color: commonStyles.colors.textPrimary,
		fontSize: responsiveFontSize(0.65),
		minHeight: 25 * scaleFactor,
		marginLeft: 5 * scaleFactor,
	},
	subtitle: {
		fontSize: responsiveFontSize(0.4),
		marginLeft: 5 * scaleFactor,
	},
});
