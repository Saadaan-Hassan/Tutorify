import "dotenv/config";

export default {
	expo: {
		name: "tutorify",
		slug: "tutorify",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/beta-icon.png",
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
			adaptiveIcon: {
				foregroundImage: "./assets/beta-adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
		},
		web: {
			favicon: "./assets/beta-favicon.png",
		},
		extra: {
			eas: {
				projectId: process.env.EAS_PROJECT_ID,
			},
		},
		owner: "coding-nerd",
		runtimeVersion: {
			policy: "appVersion",
		},
		updates: {
			url: process.env.EXPO_UPDATES_URL,
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
