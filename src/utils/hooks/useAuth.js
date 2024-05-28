import { useState, useEffect } from "react";
import { auth } from "../../services/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updatePassword,
	EmailAuthProvider,
	reauthenticateWithCredential,
} from "firebase/auth";
import { collection, getDoc, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";
import {
	getFCMRegistrationToken,
	sendNotification,
} from "../../services/notifications";

const useAuth = () => {
	const { user, setUser, setOtherUsers } = useUser();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
			try {
				if (authUser) {
					setLoading(true);
					const usersCollection = collection(db, "users");
					const userDoc = doc(usersCollection, authUser.uid);
					const userSnapshot = await getDoc(userDoc);

					if (userSnapshot.exists()) {
						setUser(userSnapshot.data());
					} else {
						console.error("User not found in Firestore database");
					}
				} else {
					setUser(null);
					setOtherUsers([]);
				}
			} catch (error) {
				console.error("Error during authentication state change:", error);
			} finally {
				setLoading(false);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	// Function to handle user signup with email and password
	const signUp = async (email, password) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			// Add user to the Firestore database
			const usersCollection = collection(db, "users");

			const token = await getFCMRegistrationToken();

			await setDoc(doc(usersCollection, userCredential.user.uid), {
				uid: userCredential.user.uid,
				email: userCredential.user.email,
				createdAt: new Date(),
				token: token,
			});

			// Send a notification to all users that a new user has signed up
			const usersSnapshot = await getDocs(usersCollection);
			const users = usersSnapshot.docs.map((doc) => doc.data());

			await Promise.all(
				users.map(async (user) => {
					if (user.uid !== userCredential.user.uid && user.token) {
						await sendNotification(
							user.token,
							"New User",
							"A new user has signed up"
						);
					}
				})
			);

			// Clear the error
			setError(null);

			// Store the access token in AsyncStorage
			await AsyncStorage.setItem(
				"accessToken",
				userCredential.user.accessToken
			);

			// Navigate to the Registration screen
			navigation.navigate("Registration");
		} catch (error) {
			setError(error.message);
		}
	};

	// Function to handle user signin with email and password
	const signIn = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			// Clear the error
			setError(null);

			// Store the access token in AsyncStorage
			await AsyncStorage.setItem(
				"accessToken",
				userCredential.user.accessToken
			);

			// Navigate to the TabNavigator
			if (!loading) navigation.navigate("TabNavigator");
		} catch (error) {
			setError(error.message);
		}
	};

	// Function to handle user signout
	const logOut = async () => {
		try {
			await signOut(auth);
			setUser(null);
			setOtherUsers([]);
			setError(null);

			// Remove the access token from AsyncStorage
			await AsyncStorage.removeItem("accessToken");

			// Navigate to the Auth when the user logs out
			navigation.navigate("Auth");
		} catch (error) {
			setError(error.message);
		}
	};

	// Function to confirm the user's password before proceeding
	const confirmPassword = async (password) => {
		try {
			const user = auth.currentUser;
			const credential = EmailAuthProvider.credential(user.email, password);
			await reauthenticateWithCredential(user, credential);

			setError(null);
			navigation.navigate("Password");
		} catch (error) {
			setError("Incorrect password");
		}
	};

	// Function to handle password reset
	const resetPassword = async (newPassword) => {
		try {
			const user = auth.currentUser;
			await updatePassword(user, newPassword);

			setError(null);
			navigation.navigate("Profile");
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
	};
};

export default useAuth;
