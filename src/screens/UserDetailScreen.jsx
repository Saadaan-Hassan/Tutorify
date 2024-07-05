import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import CustomButton from "../components/custom/CustomButton";
import { Avatar, Icon } from "react-native-paper";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getCurrencySymbol } from "../utils/helpers";

export default function TutorDetailsScreen() {
	const navigation = useNavigation();
	const route = useRoute();

	const user = route.params.user;

	const handleChatbutton = () => {
		navigation.navigate("ChatDetail", { user });
	};

	return (
		<View style={styles.container}>
			<Image
				source={require("../../assets/img/blob1.png")}
				style={{
					position: "absolute",
					width: 300 * scaleFactor,
					height: 300 * scaleFactor,
					top: -50,
					right: 0,
					zIndex: -1,
				}}
				resizeMode='contain'
			/>
			<ScrollView
				contentContainerStyle={styles.scrollContentContainer}
				stickyHeaderIndices={[1]}>
				<View style={styles.imageContainer}>
					<Avatar.Image
						source={
							user?.profileImage
								? { uri: user?.profileImage }
								: require("../../assets/img/avatar/avatar.jpg")
						}
						size={200 * scaleFactor}
						style={styles.image}
					/>
				</View>

				<View style={styles.content}>
					{/* About Section */}
					<View style={styles.header}>
						<Text style={styles.username}>{user?.username}</Text>
						<Text style={styles.para}>{user?.bio}</Text>
					</View>

					{/*	Current Education Level & Preferred Mode Section */}
					<View style={styles.row}>
						<View style={styles.section}>
							<View style={styles.titleWithIcon}>
								<View style={styles.iconBackground}>
									<Icon
										source='school-outline'
										color={commonStyles.colors.primary}
										size={responsiveFontSize(0.7)}
									/>
								</View>
								<Text style={styles.title}>
									{user?.role === "Student"
										? "Current Education Level"
										: "Preffered Level to Educate"}
								</Text>
							</View>
							<Text style={styles.para}>{user?.level}</Text>
						</View>

						<View style={styles.section}>
							<View style={styles.titleWithIcon}>
								<View style={styles.iconBackground}>
									<Icon
										source='access-point'
										color={commonStyles.colors.primary}
										size={responsiveFontSize(0.7)}
									/>
								</View>
								<Text style={styles.title}>Preferred Mode</Text>
							</View>
							<Text style={styles.para}>{user?.preferredMode}</Text>
						</View>
					</View>

					{/* Subjects & Location Section */}
					<View style={styles.row}>
						<View style={styles.section}>
							<View style={styles.titleWithIcon}>
								<View style={styles.iconBackground}>
									<Icon
										source='bookshelf'
										color={commonStyles.colors.primary}
										size={responsiveFontSize(0.7)}
									/>
								</View>
								<Text style={styles.title}>Subjects</Text>
							</View>

							{/* Subjects in a horizontal scroll view */}
							<ScrollView horizontal showsHorizontalScrollIndicator={false}>
								{user?.subjects.map((subject, index) => (
									<Text
										key={index}
										style={{
											margin: 2,
											fontSize: responsiveFontSize(0.3),
											backgroundColor: commonStyles.colors.secondary,
											borderRadius: 20,
											paddingVertical: 5,
											paddingHorizontal: 10,
											color: commonStyles.colors.primary,
										}}>
										{subject}
									</Text>
								))}
							</ScrollView>
						</View>

						<View style={styles.section}>
							<View style={styles.titleWithIcon}>
								<View style={styles.iconBackground}>
									<Icon
										source='map-marker'
										color={commonStyles.colors.primary}
										size={responsiveFontSize(0.7)}
									/>
								</View>
								<Text style={styles.title}>Location</Text>
							</View>
							<Text style={styles.para}>
								{user?.location?.city}, {user?.location?.country}
							</Text>
						</View>
					</View>

					{/* Experience Section */}
					{user?.role === "Teacher" && (
						<>
							<View style={styles.row}>
								<View style={styles.section}></View>
								<View style={[styles.section, { alignSelf: "flex-end" }]}>
									<View style={styles.titleWithIcon}>
										<View style={styles.iconBackground}>
											<Icon
												source='briefcase-outline'
												color={commonStyles.colors.primary}
												size={responsiveFontSize(0.7)}
											/>
										</View>
										<Text style={styles.title}>Experience</Text>
									</View>
									<Text style={styles.para}>{user?.experience} years</Text>
								</View>
							</View>

							<View style={styles.row}>
								<View style={styles.section}></View>
								<View style={styles.section}>
									<View style={styles.titleWithIcon}>
										<View style={styles.iconBackground}>
											<Icon
												source='cash-multiple'
												color={commonStyles.colors.primary}
												size={responsiveFontSize(0.7)}
											/>
										</View>
										<Text style={styles.title}>Fee</Text>
									</View>
									<Text style={styles.para}>
										{getCurrencySymbol(user?.location?.country)} {user?.rate} /
										month
									</Text>
								</View>
							</View>
						</>
					)}
				</View>
			</ScrollView>
			<Image
				source={require("../../assets/img/blob2.png")}
				style={{
					position: "absolute",
					width: 300 * scaleFactor,
					height: 300 * scaleFactor,
					bottom: -10,
					zIndex: -1,
				}}
				resizeMode='contain'
			/>
			<CustomButton
				title='Chat with me'
				style={styles.button}
				onPress={handleChatbutton}
				labelStyle={{ fontSize: responsiveFontSize(0.5), height: 40 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: commonStyles.colors.background,
		position: "relative",
	},
	scrollContentContainer: {
		flexGrow: 1,
		paddingBottom: 40 * scaleFactor,
	},
	imageContainer: {
		position: "relative",
		height: 250 * scaleFactor,
		aspectRatio: 1,
		marginTop: 20 * scaleFactor,
		marginHorizontal: "auto",
	},
	image: {
		marginHorizontal: "auto",
		borderRadius: 100 * scaleFactor,
		borderColor: commonStyles.colors.primary,
		borderWidth: 5 * scaleFactor,
	},
	header: {
		marginBottom: 20 * scaleFactor,
		alignItems: "center",
	},
	rate: {
		fontSize: responsiveFontSize(5),
		color: commonStyles.colors.primary,
	},
	content: {
		paddingHorizontal: 24 * scaleFactor,
	},
	row: {
		flexDirection: "row",
		gap: 20 * scaleFactor,
	},
	section: {
		marginVertical: 14 * scaleFactor,
		width: "50%",
	},
	username: {
		fontSize: responsiveFontSize(0.5),
		fontWeight: "600",
		marginBottom: 5 * scaleFactor,
		color: commonStyles.colors.primary,
		marginHorizontal: "auto",
		marginBottom: 20 * scaleFactor,
		backgroundColor: commonStyles.colors.secondary,
		borderRadius: 20 * scaleFactor,
		paddingVertical: 5 * scaleFactor,
		paddingHorizontal: 20 * scaleFactor,
		maxWidth: 200 * scaleFactor,
	},
	title: {
		fontSize: responsiveFontSize(0.4),
		fontWeight: "bold",
	},
	para: {
		fontSize: responsiveFontSize(0.35),
		color: commonStyles.colors.textSecondary,
		textAlign: "justify",
	},
	button: {
		width: "100%",
		height: 40 * scaleFactor,
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
