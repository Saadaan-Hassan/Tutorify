import { useState, useEffect } from "react";
import { auth } from "../../services/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
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
					setUser(authUser);
					await AsyncStorage.setItem("accessToken", authUser.accessToken);
					console.log("User is signed in:", authUser.email);
				} else {
					setUser(null);
					await AsyncStorage.removeItem("accessToken");
					console.log("User is signed out");
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
			setUser(userCredential.user);
			setError(null);
			await AsyncStorage.setItem(
				"accessToken",
				userCredential.user.accessToken
			);

			// Navigate to the TabNavigator
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
			setUser(userCredential.user);
			setError(null);
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
			// Remove user token from AsyncStorage
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
