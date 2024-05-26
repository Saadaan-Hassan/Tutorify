import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../utils/context/UserContext";
import useRoleBasedUser from "../utils/hooks/useRoleBasedUser";
import SearchBar from "../components/SearchBar";
import CustomButton from "../components/CustomButton";
import CustomLink from "../components/CustomLink";
import TutorCard from "../components/TutorCard";
import { commonStyles } from "../styles/commonStyles";

// Recommended Users based on the subjects and make them random

const recommendedUsers = (users, user) => {
	const recommended = users
		.filter((u) => {
			return u.subjects.some((subject) => user?.subjects.includes(subject));
		})
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

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.container}>
				{/* Search Section */}
				<SearchBar users={users} />

				<View
					style={[
						styles.section,
						styles.flex,
						{ backgroundColor: commonStyles.colors.primary, padding: 20 },
					]}>
					<View style={styles.leftContent}>
						<View>
							{user?.role === "Teacher" ? (
								<View>
									<Text
										style={[
											styles.header,
											{ color: commonStyles.colors.neutral },
										]}>
										Find the right student
									</Text>
									<Text style={styles.para}>
										Help students achieve their academic goals by sharing your
										knowledge
									</Text>
								</View>
							) : (
								<View>
									<Text
										style={[
											styles.header,
											{ color: commonStyles.colors.neutral },
										]}>
										Find the right tutor for you
									</Text>
									<Text style={styles.para}>
										Ace your test and examination by getting the knowledge
										needed
									</Text>
								</View>
							)}
							<CustomButton
								title={user.role === "Teacher" ? "Find Student" : "Find Tutor"}
								styleReverse={true}
								style={{ width: 150, borderRadius: 20, marginTop: 20 }}
								onPress={() => navigation.navigate("UserSearch")}
							/>
						</View>
					</View>
					<View style={styles.rightContent}>
						<Image source={require("../../assets/img/home.png")} />
					</View>
				</View>

				{/* Recommended For You Section */}
				<View style={[styles.section]}>
					<View style={styles.sectionHeader}>
						<Text style={styles.header}>Recommended for you</Text>
					</View>

					<FlatList
						data={recommendedUsers(users, user)}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <TutorCard userData={item} />}
						horizontal
						showsHorizontalScrollIndicator={false}
					/>
				</View>

				<View style={[styles.section]}>
					<View style={styles.sectionHeader}>
						<Text style={styles.header}>Top tutors</Text>

						{user.role === "Student" && (
							<CustomLink
								text='See all'
								onPress={() => {
									navigation.navigate("Tutors");
								}}
							/>
						)}
					</View>

					<FlatList
						data={topTutors.slice(0, 5).sort(() => Math.random() - 0.5)}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <TutorCard userData={item} />}
						horizontal
						showsHorizontalScrollIndicator={false}
					/>
				</View>

				<View style={[styles.section]}>
					<View style={styles.sectionHeader}>
						<Text style={styles.header}>
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

					<FlatList
						data={filterUsersByMode(users, "Online")
							.slice(0, 5)
							.sort(() => Math.random() - 0.5)}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <TutorCard userData={item} />}
						horizontal
						showsHorizontalScrollIndicator={false}
					/>
				</View>

				<View style={[styles.section]}>
					<View style={styles.sectionHeader}>
						<Text style={styles.header}>
							{user.role === "Teacher" ? "Students" : "Tutors"} Prefer In-person
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

					<FlatList
						data={filterUsersByMode(users, "In-person")
							.slice(0, 5)
							.sort(() => Math.random() - 0.5)}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <TutorCard userData={item} />}
						horizontal
						showsHorizontalScrollIndicator={false}
					/>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
	},
	container: {
		paddingHorizontal: 10,
	},
	flex: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	section: {
		borderRadius: 20,
		marginHorizontal: 10,
		marginVertical: 10,
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
	header: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: commonStyles.colors.textPrimary,
	},
	para: {
		fontSize: 14,
		color: commonStyles.colors.neutral,
	},
});
