import "dotenv/config";
export default {
	expo: {
		name: "tutorify",
		slug: "tutorify",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/img/icons/beta-icon.png",
		userInterfaceStyle: "light",
		splash: {
			image: "./assets/beta-splash.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
		},
		android: {
			package: process.env.ANDROID_PACKAGE,
			googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
			adaptiveIcon: {
				foregroundImage: "./assets/img/icons/beta-adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
		},
		web: {
			favicon: "./assets/img/icons/beta-favicon.png",
		},
		extra: {
			eas: {
				projectId: process.env.EAS_PROJECT_ID,
			},
			FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
			FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
			FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
			FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
			FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
			FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
			EAS_PROJECT_ID: process.env.EAS_PROJECT_ID,
			EXPO_UPDATES_URL: process.env.EXPO_UPDATES_URL,
			RN_MAPBOX_MAPS_DOWNLOAD_TOKEN: process.env.RN_MAPBOX_MAPS_DOWNLOAD_TOKEN,
			RN_MAPBOX_ACCESS_TOKEN: process.env.RN_MAPBOX_ACCESS_TOKEN,
		},
		owner: process.env.EXPO_OWNER,
		runtimeVersion: {
			policy: "appVersion",
		},
		plugins: [
			[
				"@rnmapbox/maps",
				{
					RNMapboxMapsVersion: "11.4.0",
					RNMapboxMapsImpl: "mapbox",
					RNMapboxMapsDownloadToken: process.env.RN_MAPBOX_MAPS_DOWNLOAD_TOKEN,
				},
			],
			[
				"expo-location",
				{
					locationWhenInUsePermission: "Show current location on map.",
				},
			],
		],
	},
};
