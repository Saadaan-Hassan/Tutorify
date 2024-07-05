// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const firebaseConfig = {
	apiKey:
		Constants.expoConfig.extra.FIREBASE_API_KEY ?? process.env.FIREBASE_API_KEY,
	authDomain:
		Constants.expoConfig.extra.FIREBASE_AUTH_DOMAIN ??
		process.env.FIREBASE_AUTH_DOMAIN,
	projectId:
		Constants.expoConfig.extra.FIREBASE_PROJECT_ID ??
		process.env.FIREBASE_PROJECT_ID,
	storageBucket:
		Constants.expoConfig.extra.FIREBASE_STORAGE_BUCKET ??
		process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId:
		Constants.expoConfig.extra.FIREBASE_MESSAGING_SENDER_ID ??
		process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId:
		Constants.expoConfig.extra.FIREBASE_APP_ID ?? process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase authentication with AsyncStorage persistence
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore
// const db = getFirestore(app);

// Firestore with experimentalAutoDetectLongPolling
const db = initializeFirestore(app, {
	experimentalAutoDetectLongPolling: true,
});

// Firebase Storage
const storage = getStorage(app);

export { auth, db, storage };
