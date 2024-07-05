import { useState, useEffect } from "react";
import { auth, db } from "../../services/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updatePassword,
	EmailAuthProvider,
	reauthenticateWithCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";
import { removeUserPushToken } from "../helpers";
import { notifyOtherUsers } from "../helpers"; // Make sure this helper function exists

const useAuth = () => {
	const { user, setUser, setOtherUsers, loading, setLoading } = useUser();
	const [error, setError] = useState(null);
	const navigation = useNavigation();

	useEffect(() => {
		const fetchUser = async () => {
			const cachedUser = await AsyncStorage.getItem("user");
			if (cachedUser) {
				const parsedUser = JSON.parse(cachedUser);
				setUser(parsedUser);
				if (!parsedUser.isProfileComplete) {
					navigation.navigate("Registration");
				}
			} else {
				setLoading(true);
				auth.onAuthStateChanged(async (currentUser) => {
					if (currentUser) {
						const userRef = doc(db, "users", currentUser.uid);
						const userDoc = await getDoc(userRef);
						if (userDoc.exists()) {
							const userData = userDoc.data();
							setUser(userData);
							await AsyncStorage.setItem("user", JSON.stringify(userData));
							setLoading(false);
						} else {
							setError("User data not found");
							setLoading(false);
						}
					} else {
						setUser(null);
						setLoading(false);
					}
				});
			}
		};

		fetchUser();
	}, []);

	const fetchOtherUsersAndNotify = async (newUserDetails) => {
		try {
			const otherUsersSnapshot = await getDocs(collection(db, "users"));
			const otherUsers = otherUsersSnapshot.docs
				.map((doc) => ({ id: doc.id, ...doc.data() }))
				.filter((userData) => {
					if (newUserDetails.role === "Student") {
						return userData.role === "Teacher";
					} else if (newUserDetails.role === "Teacher") {
						return userData.role === "Student";
					}
				});

			await notifyOtherUsers(
				newUserDetails.uid,
				newUserDetails.role,
				otherUsers
			);
		} catch (error) {
			console.error("Error fetching and notifying other users: ", error);
		}
	};

	const signUp = async (email, password) => {
		try {
			setLoading(true);
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const userDoc = doc(collection(db, "users"), userCredential.user.uid);
			const newUserDetails = {
				uid: userCredential.user.uid,
				email,
				createdAt: new Date(),
				isProfileComplete: false,
			};
			await setDoc(userDoc, newUserDetails);
			await AsyncStorage.setItem("user", JSON.stringify(newUserDetails));
			setUser(newUserDetails);
			navigation.reset({ index: 0, routes: [{ name: "Registration" }] });
			navigation.navigate("Registration");
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const signIn = async (email, password) => {
		setLoading(true);
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const userRef = doc(db, "users", userCredential.user.uid);
			const userDoc = await getDoc(userRef);
			const userData = userDoc.data();
			await AsyncStorage.setItem("user", JSON.stringify(userData));
			setUser(userData);
			if (!userData.isProfileComplete) {
				navigation.navigate("Registration");
			} else {
				navigation.navigate("TabNavigator");
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const logOut = async () => {
		try {
			setLoading(true);
			removeUserPushToken(user.uid);
			await signOut(auth);
			setUser(null);
			setOtherUsers([]);
			await AsyncStorage.removeItem("user");
			navigation.reset({ index: 0, routes: [{ name: "Auth" }] });
			navigation.navigate("Auth");
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const confirmPassword = async (password) => {
		try {
			setLoading(true);
			const user = auth.currentUser;
			const credential = EmailAuthProvider.credential(user.email, password);
			await reauthenticateWithCredential(user, credential);
			setError(null);
			navigation.navigate("Password");
		} catch (error) {
			setError("Incorrect password");
		} finally {
			setLoading(false);
		}
	};

	const resetPassword = async (newPassword) => {
		try {
			const user = auth.currentUser;
			await updatePassword(user, newPassword);
			logOut();
		} catch (error) {
			setError(error.message);
		}
	};

	return {
		user,
		error,
		loading,
		signUp,
		signIn,
		logOut,
		confirmPassword,
		resetPassword,
		fetchOtherUsersAndNotify,
	};
};

export default useAuth;
