import React from "react";
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	Dimensions,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { Icon } from "react-native-paper";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function TutorDetailsScreen() {
	const navigation = useNavigation();
	const route = useRoute();

	const user = route.params.user;

	const handleChatbutton = () => {
		navigation.navigate("ChatDetail", { user });
	};

	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.scrollContentContainer}
				stickyHeaderIndices={[1]}>
				<View style={styles.imageContainer}>
					<Image
						source={
							user?.profileImage
								? { uri: user?.profileImage }
								: require("../../assets/img/avatar/avatar.jpg")
						}
						style={styles.image}
					/>
				</View>

				<View style={styles.headerContainer}>
					<View style={styles.header}>
						<Text style={styles.headerTitle}>{user?.username}</Text>

						{user?.role === "Teacher" && (
							<Text style={styles.rate}>Rs. {user?.rate} / Month</Text>
						)}
					</View>
				</View>

				<View style={styles.content}>
					{/* About Section */}
					<View style={styles.section}>
						<View style={styles.titleWithIcon}>
							<View style={styles.iconBackground}>
								<Icon
									source='information-outline'
									color={commonStyles.colors.primary}
									size={responsiveFontSize(9)}
								/>
							</View>
							<Text style={styles.title}>About</Text>
						</View>
						<Text style={[styles.para]}>{user?.bio}</Text>
					</View>

					{/* Current Education Level Section */}
					<View style={styles.section}>
						<View style={styles.titleWithIcon}>
							<View style={styles.iconBackground}>
								<Icon
									source='school-outline'
									color={commonStyles.colors.primary}
									size={responsiveFontSize(9)}
								/>
							</View>
							<Text style={styles.title}>Current Education Level</Text>
						</View>
						<Text style={styles.para}>{user?.level}</Text>
					</View>

					{/* Subjects Section */}
					<View style={styles.section}>
						<View style={styles.titleWithIcon}>
							<View style={styles.iconBackground}>
								<Icon
									source='bookshelf'
									color={commonStyles.colors.primary}
									size={responsiveFontSize(9)}
								/>
							</View>
							<Text style={styles.title}>Subjects</Text>
						</View>
						<Text style={styles.para}>
							{user?.subjects.map((subject, index) => {
								return index === user?.subjects.length - 1
									? subject
									: `${subject}, `;
							})}
						</Text>
					</View>

					{/* Preferred Mode Section */}
					<View style={styles.section}>
						<View style={styles.titleWithIcon}>
							<View style={styles.iconBackground}>
								<Icon
									source='access-point'
									color={commonStyles.colors.primary}
									size={responsiveFontSize(9)}
								/>
							</View>
							<Text style={styles.title}>Preferred Mode</Text>
						</View>
						<Text style={styles.para}>{user?.preferredMode}</Text>
					</View>

					{user?.role === "Teacher" && (
						<>
							{/* Experience Section */}
							<View style={styles.section}>
								<View style={styles.titleWithIcon}>
									<View style={styles.iconBackground}>
										<Icon
											source='briefcase-outline'
											color={commonStyles.colors.primary}
											size={responsiveFontSize(9)}
										/>
									</View>
									<Text style={styles.title}>Experience</Text>
								</View>
								<Text style={styles.para}>{user?.experience} years</Text>
							</View>

							{/* Location Section */}
							<View style={styles.section}>
								<View style={styles.titleWithIcon}>
									<View style={styles.iconBackground}>
										<Icon
											source='map-marker'
											color={commonStyles.colors.primary}
											size={responsiveFontSize(9)}
										/>
									</View>
									<Text style={styles.title}>Location</Text>
								</View>
								<Text style={styles.para}>
									{user?.location?.city}, {user?.location?.country}
								</Text>
							</View>
						</>
					)}
				</View>
			</ScrollView>

			<CustomButton
				title='Chat with me'
				style={styles.button}
				onPress={handleChatbutton}
				labelStyle={{ fontSize: responsiveFontSize(7), height: 40 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContentContainer: {
		flexGrow: 1,
		paddingBottom: 40 * scaleFactor,
	},
	imageContainer: {
		position: "relative",
		height: 300 * scaleFactor,
	},
	image: {
		height: "100%",
		width: "100%",
		resizeMode: "cover",
	},

	headerContainer: {
		backgroundColor: commonStyles.colors.secondary,
		paddingHorizontal: 24 * scaleFactor,
		paddingVertical: 10 * scaleFactor,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerTitle: {
		fontSize: responsiveFontSize(8),
		fontWeight: "bold",
		color: commonStyles.colors.primary,
	},
	rate: {
		fontSize: responsiveFontSize(5),
		color: commonStyles.colors.primary,
	},
	content: {
		padding: 24 * scaleFactor,
	},
	section: {
		marginVertical: 14 * scaleFactor,
	},
	title: {
		fontSize: responsiveFontSize(7),
		fontWeight: "600",
		marginBottom: 5 * scaleFactor,
		color: commonStyles.colors.primary,
	},
	para: {
		fontSize: responsiveFontSize(6),
		color: commonStyles.colors.textSecondary,
		textAlign: "justify",
	},
	button: {
		width: "100%",
		height: 60 * scaleFactor,
		paddingVertical: 10 * scaleFactor,
		borderRadius: 0,
		marginBottom: 0,
		alignSelf: "center",
		position: "absolute",
		bottom: 0,
		backgroundColor: commonStyles.colors.primary,
	},
	titleWithIcon: {
		flexDirection: "row",
		alignItems: "center",
		columnGap: 10 * scaleFactor,
		marginBottom: 10 * scaleFactor,
	},
	iconBackground: {
		backgroundColor: commonStyles.colors.secondary,
		borderRadius: 50 * scaleFactor,
		padding: 3 * scaleFactor,
	},
});
