import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Badge, Card, Divider, Text } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";
import { useNavigation } from "@react-navigation/native";

const getDate = () => {
	const now = new Date();
	let hours = now.getHours();
	let minutes = now.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12; // 12-hour clock format
	minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero for minutes less than 10
	const time = hours + ":" + minutes + " " + ampm;
	return time;
};

const LeftContent = (props) => (
	<Avatar.Image
		{...props}
		source={require("../../assets/img/avatar/user1.png")}
		size={50}
	/>
);

const RightContent = (props) => (
	<View>
		<Text style={{ color: commonStyles.colors.textSecondary, marginBottom: 5 }}>
			{getDate()}
		</Text>
		<Badge style={{ backgroundColor: commonStyles.colors.tertiary }}>2</Badge>
	</View>
);
export default function ChatCard() {
	const navigation = useNavigation();

	return (
		<TouchableOpacity onPress={() => navigation.navigate("ChatDetail")}>
			<Card mode='contained'>
				<Card.Title
					title='Chinyere Njoku'
					subtitle='Can you please send a direction....'
					titleStyle={{
						fontSize: 20,
						minHeight: 25,
						color: commonStyles.colors.textPrimary,
					}}
					subtitleStyle={{
						fontSize: 16,
						color: commonStyles.colors.textSecondary,
					}}
					left={LeftContent}
					leftStyle={{ marginRight: 25 }}
					right={RightContent}
					rightStyle={{ marginRight: 15 }}
					style={{ backgroundColor: commonStyles.colors.neutral }}
				/>
				<Divider />
			</Card>
		</TouchableOpacity>
	);
}
