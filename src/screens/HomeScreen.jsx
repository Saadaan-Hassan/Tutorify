import React, { useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../utils/context/UserContext";
import useRoleBasedUser from "../utils/hooks/useRoleBasedUser";
import SearchBar from "../components/SearchBar";
import CustomButton from "../components/CustomButton";
import CustomLink from "../components/CustomLink";
import TutorCard from "../components/TutorCard";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";

const recommendedUsers = (users, user) => {
	const recommended = users
		.filter((u) =>
			u?.subjects?.some((subject) => user?.subjects?.includes(subject))
		)
		.slice(0, 5)
		.sort(() => Math.random() - 0.5);
	return recommended;
};

const filterUsersByMode = (users, mode) => {
	return users.filter((u) => u.preferredMode === mode);
};

export default function HomeScreen() {
	const navigation = useNavigation();
	const { user, setOtherUsers } = useUser();
	const topTutors = useRoleBasedUser("Student");

	const users = useRoleBasedUser(user?.role);

	useEffect(() => {
		setOtherUsers(users);
	}, [users]);

	const onlineUsers = filterUsersByMode(users, "Online");
	const inPersonUsers = filterUsersByMode(users, "In-person");

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={commonStyles.container}>
				<SearchBar users={users} />
				<View style={[styles.section, styles.flex, styles.bannerSection]}>
					<View style={styles.leftContent}>
						<View>
							{user?.role === "Teacher" ? (
								<View>
									<Text style={[commonStyles.header, styles.bannerText]}>
										Find the right student
									</Text>
									<Text style={commonStyles.para}>
										Help students achieve their academic goals by sharing your
										knowledge
									</Text>
								</View>
							) : (
								<View>
									<Text style={[commonStyles.header, styles.bannerText]}>
										Find the right tutor for you
									</Text>
									<Text style={commonStyles.para}>
										Ace your test and examination by getting the knowledge
										needed
									</Text>
								</View>
							)}
							<CustomButton
								title={user.role === "Teacher" ? "Find Student" : "Find Tutor"}
								styleReverse={true}
								style={styles.bannerButton}
								onPress={() => navigation.navigate("UserSearch")}
							/>
						</View>
					</View>
					<View style={styles.rightContent}>
						<Image source={require("../../assets/img/home.png")} />
					</View>
				</View>
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={commonStyles.header}>Recommended for you</Text>
					</View>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{recommendedUsers(users, user).map((item) => (
							<TutorCard key={item.id} userData={item} />
						))}
					</ScrollView>
				</View>
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={commonStyles.header}>Top tutors</Text>
						{user.role === "Student" && (
							<CustomLink
								text='See all'
								onPress={() => {
									navigation.navigate("Tutors");
								}}
							/>
						)}
					</View>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{topTutors.slice(0, 5).sort(() => Math.random() - 0.5).map((item) => (
							<TutorCard key={item.id} userData={item} />
						))}
					</ScrollView>
				</View>
				{onlineUsers.length > 0 && (
					<View style={styles.section}>
						<View style={styles.sectionHeader}>
							<Text style={commonStyles.header}>
								{user.role === "Teacher" ? "Students" : "Tutors"} Prefer Online
							</Text>
							<CustomLink
								text='See all'
								onPress={() => {
									navigation.navigate(
										user.role === "Teacher" ? "Students" : "Tutors"
									);
								}}
							/>
						</View>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{onlineUsers.slice(0, 5).sort(() => Math.random() - 0.5).map((item) => (
								<TutorCard key={item.id} userData={item} />
							))}
						</ScrollView>
					</View>
				)}
				{inPersonUsers.length > 0 && (
					<View style={styles.section}>
						<View style={styles.sectionHeader}>
							<Text style={commonStyles.header}>
								{user.role === "Teacher" ? "Students" : "Tutors"} Prefer
								In-person
							</Text>
							<CustomLink
								text='See all'
								onPress={() => {
									navigation.navigate(
										user.role === "Teacher" ? "Students" : "Tutors"
									);
								}}
							/>
						</View>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{inPersonUsers.slice(0, 5).sort(() => Math.random() - 0.5).map((item) => (
								<TutorCard key={item.id} userData={item} />
							))}
						</ScrollView>
					</View>
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
	},
	flex: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	section: {
		borderRadius: 20 * scaleFactor,
		marginHorizontal: 10 * scaleFactor,
		marginVertical: 10 * scaleFactor,
	},
	sectionHeader: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	leftContent: {
		flex: 1,
	},
	rightContent: {
		flex: 0.65,
		alignItems: "center",
		justifyContent: "center",
	},
	bannerSection: {
		backgroundColor: commonStyles.colors.primary,
		padding: 20 * scaleFactor,
	},
	bannerText: {
		color: commonStyles.colors.neutral,
		fontSize: responsiveFontSize(8),
	},
	bannerButton: {
		width: 150 * scaleFactor,
		borderRadius: 20 * scaleFactor,
		marginTop: 20 * scaleFactor,
	},
});
