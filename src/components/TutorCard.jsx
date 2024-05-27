import React from "react";
import { Card, Avatar } from "react-native-paper";
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
	const navigation = useNavigation();

	const cardWidth = (width - 40) / 2;

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("TutorDetail", { user: userData })}>
			<Card
				mode='contained'
				style={[styles.card, { width: cardWidth }]}
				elevation={5}>
				<View style={styles.cardHeader}>
					<Avatar.Image
						source={
							userData?.profileImage
								? { uri: userData?.profileImage }
								: require("../../assets/img/avatar/avatar.jpg")
						}
						size={56}
						style={styles.avatar}
					/>
				</View>
				<Card.Content style={styles.cardBody}>
					<Text style={styles.username}>{userData?.username}</Text>
					<Text style={styles.level}>{userData?.level}</Text>
					<Text style={styles.mode}>{userData?.preferredMode}</Text>
					<View style={styles.subjectsContainer}>
						{userData?.subjects?.slice(0, 2).map((subject, index) => (
							<View key={index} style={styles.subjectChip}>
								<Text style={styles.subjectText}>{subject}</Text>
							</View>
						))}
						{userData?.subjects?.length > 2 && (
							<View style={styles.subjectChip}>
								<Text style={styles.subjectText}>
									+{userData?.subjects?.length - 2}
								</Text>
							</View>
						)}
					</View>
					{userData?.role === "Teacher" && (
						<Text style={styles.rate}>Rs. {userData?.rate} / Month</Text>
					)}
				</Card.Content>
			</Card>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		margin: 10,
		backgroundColor: "transparent",
		paddingTop: 30,
		height: 230,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		marginBottom: 0,
	},
	avatar: {
		position: "absolute",
		top: -30,
		borderWidth: 2,
		borderColor: commonStyles.colors.primary,
		zIndex: 1,
	},
	cardBody: {
		alignItems: "center",
		padding: 10,
		paddingTop: 30,
		backgroundColor: commonStyles.colors.neutralLight,
		borderRadius: 20,
		shadowColor: commonStyles.colors.primary,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.9,
		shadowRadius: 4,
		height: 200,
		position: "relative",
	},
	username: {
		fontSize: 18,
		fontWeight: "bold",
		color: commonStyles.colors.textPrimary,
		marginTop: 10,
	},
	level: {
		fontSize: 16,
		color: commonStyles.colors.textSecondary,
	},
	mode: {
		fontSize: 14,
		color: commonStyles.colors.tertiary,
		marginBottom: 10,
	},
	subjectsContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flexWrap: "wrap",
		marginVertical: 10,
	},
	subjectChip: {
		backgroundColor: commonStyles.colors.secondary,
		borderRadius: 15,
		paddingVertical: 5,
		paddingHorizontal: 10,
		marginRight: 10,
		marginBottom: 5,
	},
	subjectText: {
		fontSize: 12,
		color: commonStyles.colors.primary,
	},
	rate: {
		fontSize: 12,
		color: commonStyles.colors.primary,
		position: "absolute",
		bottom: 10,
		right: 10,
	},
});
