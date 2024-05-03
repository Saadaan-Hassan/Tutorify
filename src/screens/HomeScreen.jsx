import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../components/SearchBar";
import CustomButton from "../components/CustomButton";
import CustomLink from "../components/CustomLink";
import TutorCard from "../components/TutorCard";

export default function HomeScreen() {
	const navigation = useNavigation();

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.container}>
				<SearchBar />

				<View
					style={[
						styles.section,
						styles.flex,
						{ backgroundColor: "#F6E9B2", padding: 20 },
					]}>
					<View style={styles.leftContent}>
						<View>
							<Text style={styles.header}>Find the right tutor for you</Text>
							<Text style={styles.para}>
								Ace your test and examination by getting the knowledge needed
							</Text>
							<CustomButton
								title='Find tutor'
								style={{ width: 150, borderRadius: 20, marginTop: 20 }}
								onPress={() => navigation.navigate("Tutors")}
							/>
						</View>
					</View>
					<View style={styles.rightContent}>
						<Image source={require("../../assets/img/home.png")} />
					</View>
				</View>

				{/* Top Tutors Section */}
				<View style={[styles.section]}>
					<View style={styles.sectionHeader}>
						<Text style={styles.header}>Top tutors</Text>
						<CustomLink
							text='See all'
							onPress={() => {
								navigation.navigate("Tutors");
								console.log("I don't have an account pressed");
							}}
						/>
					</View>

					<FlatList
						data={[1, 2, 3, 4, 5]}
						keyExtractor={(item) => item.toString()}
						renderItem={() => <TutorCard />}
						horizontal
						showsHorizontalScrollIndicator={false}
					/>
				</View>

				{/* Recommended For You Section */}
				<View style={[styles.section]}>
					<View style={styles.sectionHeader}>
						<Text style={styles.header}>Recommended for you</Text>
					</View>

					<FlatList
						data={[1, 2, 3, 4, 5]}
						keyExtractor={(item) => item.toString()}
						renderItem={() => <TutorCard />}
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
	},
	para: {
		fontSize: 14,
	},
});
