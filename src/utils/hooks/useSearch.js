import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "../context/UserContext";

const useSearch = (users) => {
	const { user } = useUser();
	const navigation = useNavigation();
	const route = useRoute();

	const [searchQuery, setSearchQuery] = useState(
		route?.params?.searchQuery || ""
	);
	const [searchedUsers, setSearchedUsers] = useState(users);

	useEffect(() => {
		const filteredUsers = users.filter((user) =>
			user.subjects.some((subject) =>
				subject.toLowerCase().includes(searchQuery.toLowerCase())
			)
		);
		setSearchedUsers(filteredUsers);
	}, [searchQuery, route.name, users]);

	const handleSearchButtonPress = (searchQuery) => {
		if (route.name !== "Tutors" || route.name !== "Students") {
			// Navigate to Tutors screen and pass search query as parameter
			navigation.navigate(user.role === "Teacher" ? "Students" : "Tutors", {
				searchQuery: searchQuery.trim(),
			});
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
