import React, { useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";
import useSearch from "../utils/hooks/useSearch";

export default function SearchBar({ users, setSearchedUsers }) {
	const {
		searchQuery,
		setSearchQuery,
		searchedUsers,
		handleSearchButtonPress,
	} = useSearch(users);

	useEffect(() => {
		if (setSearchedUsers) setSearchedUsers(searchedUsers);
	}, [searchedUsers, setSearchedUsers]);

	return (
		<Searchbar
			placeholder='Search by your subject name'
			placeholderTextColor={commonStyles.colors.neutralAccent2}
			onChangeText={setSearchQuery}
			value={searchQuery}
			style={{
				marginHorizontal: 10,
				marginVertical: 24,
				borderRadius: 20,
				height: 40,
				backgroundColor: commonStyles.colors.background,
				borderColor: commonStyles.colors.neutralAccent2,
				borderWidth: 2,
			}}
			inputStyle={{
				color: commonStyles.colors.primary,
				minHeight: 20,
			}}
			icon='microphone-outline'
			iconColor={commonStyles.colors.primary}
			onIconPress={() => console.log("Voice search")}
			onSubmitEditing={() => handleSearchButtonPress(searchQuery)}
		/>
	);
}
