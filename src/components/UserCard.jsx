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
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";
import {
	Placeholder,
	PlaceholderMedia,
	PlaceholderLine,
	Fade,
} from "rn-placeholder";
import { useUser } from "../utils/context/UserContext";
import { getCurrencySymbol } from "../utils/helpers";

const { width } = Dimensions.get("window");

export default function TutorCard({ userData }) {
	const navigation = useNavigation();
	const { loading } = useUser();
	const cardWidth = (width - 50) / 2;

	if (loading) {
		return (
			<Placeholder Animation={Fade} style={styles.placeholder}>
				<View style={[styles.placeholderContent, { width: cardWidth }]}>
					<PlaceholderMedia style={styles.placeholderAvatar} />
					<PlaceholderLine style={styles.placeholderLine} />
					<PlaceholderLine style={styles.placeholderLine} />
					<PlaceholderLine style={styles.placeholderLine} />
					<PlaceholderLine style={styles.placeholderLine} />
					<PlaceholderLine style={styles.placeholderLine} />
				</View>
			</Placeholder>
		);
	}

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
						size={56 * scaleFactor}
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
						<Text style={styles.rate}>
							{" "}
							{getCurrencySymbol(userData?.location?.country)} {userData?.rate}{" "}
							/ Month
						</Text>
					)}
				</Card.Content>
			</Card>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		margin: 7 * scaleFactor,
		backgroundColor: "transparent",
		paddingTop: 30 * scaleFactor,
		height: 230 * scaleFactor,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		marginBottom: 0 * scaleFactor,
	},
	avatar: {
		position: "absolute",
		top: -30 * scaleFactor,
		borderWidth: 2 * scaleFactor,
		borderColor: commonStyles.colors.primary,
		zIndex: 1,
	},
	cardBody: {
		alignItems: "center",
		padding: 10 * scaleFactor,
		paddingTop: 30 * scaleFactor,
		backgroundColor: commonStyles.colors.neutralLight,
		borderRadius: 20 * scaleFactor,
		height: 200 * scaleFactor,
		position: "relative",
	},
	username: {
		fontWeight: "600",
		color: commonStyles.colors.textPrimary,
		marginTop: 10 * scaleFactor,
		fontSize: responsiveFontSize(0.6),
	},
	level: {
		color: commonStyles.colors.textSecondary,
		fontSize: responsiveFontSize(0.45),
	},
	mode: {
		color: commonStyles.colors.tertiary,
		marginBottom: 10 * scaleFactor,
		fontSize: responsiveFontSize(0.4),
	},
	subjectsContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flexWrap: "wrap",
		marginVertical: 10 * scaleFactor,
	},
	subjectChip: {
		backgroundColor: commonStyles.colors.secondary,
		borderRadius: 15 * scaleFactor,
		paddingVertical: 5 * scaleFactor,
		paddingHorizontal: 10 * scaleFactor,
		marginRight: 10 * scaleFactor,
		marginBottom: 5 * scaleFactor,
	},
	subjectText: {
		color: commonStyles.colors.primary,
		fontSize: responsiveFontSize(0.3),
	},
	rate: {
		color: commonStyles.colors.primary,
		position: "absolute",
		bottom: 10 * scaleFactor,
		right: 10 * scaleFactor,
		fontSize: responsiveFontSize(0.3),
	},
	placeholder: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		margin: 10 * scaleFactor,
		marginTop: 40 * scaleFactor,
		height: 230 * scaleFactor,
	},
	placeholderContent: {
		alignItems: "center",
		padding: 10 * scaleFactor,
		paddingTop: 30 * scaleFactor,
		backgroundColor: commonStyles.colors.neutralLight,
		borderRadius: 20 * scaleFactor,
		height: 200 * scaleFactor,
		position: "relative",
	},
	placeholderAvatar: {
		position: "absolute",
		top: -30 * scaleFactor,
		width: 56 * scaleFactor,
		height: 56 * scaleFactor,
		borderWidth: 2 * scaleFactor,
		borderColor: commonStyles.colors.primary,
		borderRadius: 28 * scaleFactor,
	},
	placeholderLine: {
		width: 100 * scaleFactor,
		height: 10 * scaleFactor,
		backgroundColor: commonStyles.colors.neutralLight,
		marginVertical: 5 * scaleFactor,
	},
});
