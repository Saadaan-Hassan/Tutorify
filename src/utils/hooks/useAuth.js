import { useState, useEffect } from "react";
import { auth } from "../../services/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { collection, getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";

const useAuth = () => {
	const { user, setUser } = useUser();
	const [error, setError] = useState(null);
	const navigation = useNavigation();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
			try {
				if (authUser) {
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
				}
			} catch (error) {
				console.error("Error during authentication state change:", error);
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

			await setDoc(doc(usersCollection, userCredential.user.uid), {
				uid: userCredential.user.uid,
				email: userCredential.user.email,
				createAt: new Date(),
			});

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
			navigation.navigate("TabNavigator");
		} catch (error) {
			setError(error.message);
		}
	};

	// Function to handle user signout
	const logOut = async () => {
		try {
			console.log("Logging out...");
			await signOut(auth);
			setUser(null);
			setError(null);

			// Remove the access token from AsyncStorage
			await AsyncStorage.removeItem("accessToken");

			// Navigate to the Auth
			navigation.navigate("Auth");
		} catch (error) {
			setError(error.message);
		}
	};

	return { user, error, signUp, signIn, logOut };
};

export default useAuth;
