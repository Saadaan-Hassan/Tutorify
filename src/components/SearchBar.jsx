import React from "react";
import { Icon, Searchbar } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";

export default function SearchBar() {
	const [searchQuery, setSearchQuery] = React.useState("");

	return (
		<Searchbar
			placeholder='Search your subject name'
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
			onIconPress={() => console.log("Searching")}
		/>
	);
}
