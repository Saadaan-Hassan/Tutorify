import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useRoleBasedUser = (loggedInUserRole) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchStoredUsers = async () => {
			const storedUsers = await AsyncStorage.getItem("roleBasedUsers");
			if (storedUsers) {
				setUsers(JSON.parse(storedUsers));
			}
		};

		const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
			const updatedUsers = snapshot.docs
				.map((doc) => ({ id: doc.id, ...doc.data() }))
				.filter((userData) => {
					if (loggedInUserRole === "Student") {
						return userData.role === "Teacher";
					} else if (loggedInUserRole === "Teacher") {
						return userData.role === "Student";
					}
				});

			setUsers(updatedUsers);
			AsyncStorage.setItem("roleBasedUsers", JSON.stringify(updatedUsers));
		});

		fetchStoredUsers();

		return () => unsubscribe();
	}, [loggedInUserRole]);

	return users;
};

export default useRoleBasedUser;
