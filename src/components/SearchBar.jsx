import React from "react";
import { Icon, Searchbar } from "react-native-paper";

export default function SearchBar() {
	const [searchQuery, setSearchQuery] = React.useState("");

	return (
		<Searchbar
			placeholder='Search your subject name'
			placeholderTextColor='#0A684790'
			onChangeText={setSearchQuery}
			value={searchQuery}
			style={{
				marginHorizontal: 10,
				marginVertical: 24,
				borderRadius: 20,
				height: 40,
				backgroundColor: "#F6E9B2",
			}}
			inputStyle={{
				color: "#0A6847",
				minHeight: 40,
			}}
			icon='microphone'
			iconColor='#0A6847'
			onIconPress={() => console.log("Searching")}
		/>
	);
}
