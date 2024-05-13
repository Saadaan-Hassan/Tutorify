import React from "react";
import { Card, Icon } from "react-native-paper";
import {
	Text,
	View,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { commonStyles } from "../styles/commonStyles";

const { width } = Dimensions.get("window");

export default function TutorCard({ userData }) {
	console.log(userData);
	const navigation = useNavigation();

	const cardWidth = (width - 70) / 2;

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("TutorDetail", { user: userData })}>
			<Card mode='contained' style={[styles.card, { width: cardWidth }]}>
				<Card.Cover
					source={
						userData?.profileImage
							? { uri: profileImage }
							: require("../../assets/img/avatar/avatar.jpg")
					}
					style={styles.cardImg}
				/>
				<Card.Content style={styles.cardBody}>
					<Text style={styles.title}>{userData?.username}</Text>
					<View style={styles.ratingContainer}>
						{[...Array(5)].map((_, index) => (
							<Icon key={index} source='star' size={20} color='#FBBB00' />
						))}
					</View>
					<View style={styles.subjectsContainer}>
						{userData?.subjects.slice(0, 3).map((subject, index) => (
							<Text key={index} style={styles.subjectText}>
								{subject}
							</Text>
						))}
						{userData?.subjects.length > 3 && (
							<Text style={styles.subjectText}>
								+{userData?.subjects.length - 3}
							</Text>
						)}
					</View>
				</Card.Content>
			</Card>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		height: 183,
		margin: 5,
		marginHorizontal: 8,
		borderRadius: 20,
		backgroundColor: commonStyles.colors.neutralLight,
	},

	cardImg: {
		height: 56,
		width: 56,
		alignSelf: "center",
		marginTop: 16,
		marginBottom: 10,
		borderRadius: 100,
	},

	title: {
		fontSize: 16,
		fontWeight: "bold",
		color: commonStyles.colors.textPrimary,
		textAlign: "center",
	},

	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		flexWrap: "wrap",
		marginVertical: 10,
	},

	subjectsContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		flexWrap: "wrap",
	},

	subjectText: {
		marginRight: 10,
		fontSize: 12,
	},
});
