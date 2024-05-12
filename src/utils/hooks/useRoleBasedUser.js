import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";

const useRoleBasedUser = (loggedInUserRole) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
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
		});

		return () => unsubscribe();
	}, [loggedInUserRole]);

	return users;
};

export default useRoleBasedUser;
