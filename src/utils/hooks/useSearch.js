import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { set } from "firebase/database";

const useSearch = (users) => {
	const navigation = useNavigation();
	const route = useRoute();

	const [searchQuery, setSearchQuery] = useState(
		route.params?.searchQuery || ""
	);
	const [searchedUsers, setSearchedUsers] = useState(users);

	useEffect(() => {
		if (route.name !== "Tutors") {
			// No filtering when route is not Tutors
			return;
		}

		const filteredUsers = users.filter((user) =>
			user.subjects.some((subject) =>
				subject.toLowerCase().includes(searchQuery.toLowerCase())
			)
		);

		setSearchedUsers(filteredUsers);
	}, [searchQuery, route.name, users]);

	const handleSearchButtonPress = (searchQuery) => {
		if (route.name !== "Tutors") {
			// Navigate to Tutors screen and pass search query as parameter
			navigation.navigate("Tutors", { searchQuery });
			setSearchQuery("");
		}
	};

	return {
		searchQuery,
		setSearchQuery,
		searchedUsers,
		handleSearchButtonPress,
	};
};

export default useSearch;
