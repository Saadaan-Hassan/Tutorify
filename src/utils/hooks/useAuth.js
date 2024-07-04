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
import {
	getFCMRegistrationToken,
	sendNotification,
} from "../../services/notifications2";
import { removeUserPushToken } from "../helpers";

const useAuth = () => {
	const { user, setUser, setOtherUsers, loading, setLoading } = useUser();
	const [error, setError] = useState(null);
	const navigation = useNavigation();

	useEffect(() => {
		const fetchUser = async () => {
			const cachedUser = await AsyncStorage.getItem("user");
			if (cachedUser) {
				setUser(JSON.parse(cachedUser));
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

	const signUp = async (email, password) => {
		try {
			setLoading(true);
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const userDoc = doc(collection(db, "users"), userCredential.user.uid);
			const token = await getFCMRegistrationToken();
			await setDoc(userDoc, {
				uid: userCredential.user.uid,
				email,
				createdAt: new Date(),
				token,
			});
			await notifyOtherUsers(userCredential.user.uid);
			await AsyncStorage.setItem(
				"accessToken",
				userCredential.user.accessToken
			);
			// Store the new user in AsyncStorage
			await AsyncStorage.setItem(
				"user",
				JSON.stringify({
					uid: userCredential.user.uid,
					email,
					createdAt: new Date(),
					token,
				})
			);
			navigation.navigate("Registration");
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const notifyOtherUsers = async (newUserId) => {
		const usersSnapshot = await getDocs(collection(db, "users"));
		const users = usersSnapshot.docs.map((doc) => doc.data());
		await Promise.all(
			users.map(async (user) => {
				if (user.uid !== newUserId && user.token) {
					await sendNotification(
						user.token,
						"New User",
						"A new user has signed up"
					);
				}
			})
		);
	};

	const signIn = async (email, password) => {
		setLoading(true);
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			await AsyncStorage.setItem(
				"accessToken",
				userCredential.user.accessToken
			);
			navigation.navigate("TabNavigator");
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
			await AsyncStorage.removeItem("accessToken");
			await AsyncStorage.removeItem("user");
			await AsyncStorage.removeItem("otherUsers");
			navigation.reset({
				index: 0,
				routes: [{ name: "Auth" }],
			});
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
	};
};

export default useAuth;
