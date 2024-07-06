import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../services/firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [otherUsers, setOtherUsers] = useState([]);

	// Load user from AsyncStorage
	useEffect(() => {
		const loadDataFromStorage = async () => {
			const storedUser = await AsyncStorage.getItem("user");
			if (storedUser) {
				setUser(JSON.parse(storedUser));
			}
			setLoading(false);
		};

		loadDataFromStorage();
	}, []);

	// Fetch role-based users and update AsyncStorage
	useEffect(() => {
		if (user) {
			const unsubscribe = onSnapshot(
				collection(db, "users"),
				(snapshot) => {
					const updatedUsers = snapshot.docs
						.map((doc) => ({ id: doc.id, ...doc.data() }))
						.filter((userData) => {
							if (user.role === "Student") {
								return userData.role === "Teacher";
							} else if (user.role === "Teacher") {
								return userData.role === "Student";
							}
						});

					setOtherUsers(updatedUsers);
				},
				(error) => {
					console.error("Error fetching users: ", error);
				}
			);

			return () => unsubscribe();
		}
	}, [user]);

	return (
		<UserContext.Provider
			value={{ user, setUser, otherUsers, setOtherUsers, loading, setLoading }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
