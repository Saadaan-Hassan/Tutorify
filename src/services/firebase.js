// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
	FIREBASE_API_KEY,
	FIREBASE_AUTH_DOMAIN,
	FIREBASE_PROJECT_ID,
	FIREBASE_STORAGE_BUCKET,
	FIREBASE_MESSAGING_SENDER_ID,
	FIREBASE_APP_ID,
} from "@env";

// Firebase configuration
const firebaseConfig = {
	apiKey: FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
	authDomain: FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
	projectId: FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
	storageBucket: FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId:
		FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: FIREBASE_APP_ID || process.env.FIREBASE_APP_ID,
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
