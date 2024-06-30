import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import { useUser } from "../utils/context/UserContext";
import CustomButton from "../components/CustomButton";
import { Picker } from "@react-native-picker/picker";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";

export default function TutorsScreen() {
	const { otherUsers, user } = useUser();

	const [searchedUsers, setSearchedUsers] = useState(otherUsers);
	const [filters, setFilters] = useState([]);
	const [selectedSubject, setSelectedSubject] = useState("");
	const [selectedMode, setSelectedMode] = useState("");

	const width = Dimensions.get("window").width;
	const filterWidth = width / 2 - 20;

	const filterUsers = (users, filters) => {
		return users.filter((user) => {
			return filters.every((filter) => {
				// Check if the filter is for subjects
				if (filter.type === "subject") {
					return user.subjects.some((subject) => {
						return subject.toLowerCase().includes(filter.value.toLowerCase());
					});
				}
				// Check if the filter is for preferred mode
				else if (filter.type === "mode") {
					return user.preferredMode === filter.value;
				}
				return true;
			});
		});
	};

	useEffect(() => {
		setSearchedUsers(filterUsers(otherUsers, filters));
	}, [filters, otherUsers]);

	// Function to handle selecting a filter from the Picker
	const handleSelectFilter = (filter) => {
		if (filter) {
			setFilters((prev) => [
				...prev,
				{
					label: filter,
					value: filter,
					type:
						filter === "Online" || filter === "In-person" ? "mode" : "subject",
				}, // Adjust the value to lowercase and include type
			]);
		}
	};

	return (
		<View style={styles.container}>
			<SearchBar users={otherUsers} setSearchedUsers={setSearchedUsers} />

			<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
				<Text style={styles.heading}>Filters:</Text>
				{filters.map((filter, index) => (
					<View key={index} style={styles.filter}>
						<Text style={{ color: commonStyles.colors.neutral }}>
							{filter.label}
						</Text>
						<Text
							style={{ color: "white", marginLeft: 5, cursor: "pointer" }}
							onPress={() => {
								setFilters((prev) => prev.filter((f) => f !== filter));
							}}>
							&times;
						</Text>
					</View>
				))}
			</View>

			<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
				{/* Dropdown for subjects */}
				<Picker
					style={{ width: filterWidth }}
					selectedValue={selectedSubject}
					onValueChange={(itemValue) => {
						setSelectedSubject(itemValue);
						handleSelectFilter(itemValue);
					}}>
					<Picker.Item label='Subjects' value='' />
					<Picker.Item label='Math' value='Math' />
					<Picker.Item label='English' value='English' />
					<Picker.Item label='Urdu' value='Urdu' />
					<Picker.Item label='Geography' value='Geography' />
					<Picker.Item label='History' value='History' />
				</Picker>

				{/* Dropdown for preferred mode */}
				<Picker
					style={{ width: filterWidth }}
					selectedValue={selectedMode}
					onValueChange={(itemValue) => {
						setSelectedMode("online");
						handleSelectFilter(itemValue);
					}}>
					<Picker.Item label='Mode' value='' />
					<Picker.Item label='Online' value='Online' />
					<Picker.Item label='In-person' value='In-person' />
				</Picker>
			</View>
			{/* Clear Filters button */}
			<CustomButton
				title='Clear Filters'
				onPress={() => {
					setFilters([]);
					setSelectedSubject("");
					setSelectedMode("");
				}}
				style={{ width: width - 20, marginVertical: 10 }}
			/>
			<View
				style={{
					flexDirection: "row",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "space-between",
				}}>
				<Text style={styles.heading}>
					{user.role === "Teacher" ? "Students" : "Tutors"}
				</Text>
				<Text style={[styles.heading, { marginRight: 10 * scaleFactor }]}>
					Available: {searchedUsers.length}
				</Text>
			</View>

			<FlatList
				data={searchedUsers}
				keyExtractor={(item) => item.id}
				numColumns={2}
				contentContainerStyle={styles.flatListContainer}
				renderItem={({ item }) => <UserCard userData={item} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 10 * scaleFactor,
	},
	heading: {
		fontSize: responsiveFontSize(7),
		fontWeight: "bold",
		marginVertical: 10 * scaleFactor,
		marginLeft: 10 * scaleFactor,
	},
	flatListContainer: {
		paddingTop: 10 * scaleFactor,
		paddingBottom: 20 * scaleFactor,
		display: "flex",
		justifyContent: "space-between",
	},
	filter: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: commonStyles.colors.primary,
		paddingHorizontal: 10 * scaleFactor,
		paddingVertical: 5 * scaleFactor,
		borderRadius: 20 * scaleFactor,
		margin: 5 * scaleFactor,
	},
});
