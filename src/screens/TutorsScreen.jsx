import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import TutorCard from "../components/TutorCard";
import useRoleBasedUser from "../utils/hooks/useRoleBasedUser";
import { useUser } from "../utils/context/UserContext";

export default function TutorsScreen() {
	const { user } = useUser();
	const users = useRoleBasedUser(user.role);

	const [searchedUsers, setSearchedUsers] = useState(users);

	useEffect(() => {
		setSearchedUsers(users);
	}, [users]);

	return (
		<View style={styles.container}>
			<SearchBar users={users} setSearchedUsers={setSearchedUsers} />

			<Text style={styles.heading}>All Tutors</Text>

			<FlatList
				data={searchedUsers}
				keyExtractor={(item) => item.id}
				numColumns={2}
				contentContainerStyle={styles.flatListContainer}
				renderItem={({ item }) => (
					<TutorCard username={item.username} subjects={item.subjects} />
				)}
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
