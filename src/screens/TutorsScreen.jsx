import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import React from "react";
import SearchBar from "../components/SearchBar";
import TutorCard from "../components/TutorCard";

export default function TutorsScreen() {
	return (
		<View style={styles.container}>
			<SearchBar />

			<Text style={styles.heading}>All Tutors</Text>

			<FlatList
				data={[1, 2, 3, 4, 5, 6, 7, 8, 10]}
				renderItem={() => <TutorCard />}
				keyExtractor={(item) => item.toString()}
				numColumns={2}
				contentContainerStyle={styles.flatListContainer}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 10,
	},
	heading: {
		fontSize: 18,
		fontWeight: "bold",
		marginVertical: 10,
		marginLeft: 10,
	},
	flatListContainer: {
		paddingHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 20,
		alignItems: "center",
	},
});
