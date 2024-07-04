// useLocation.js
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

const useLocation = (setSelectedCity, setSelectedCountry) => {
	const [coordinates, setCoordinates] = useState(null);
	const [locationEnabled, setLocationEnabled] = useState(false);

	const requestLocationPermission = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				"Location Permission Required",
				"Please enable location services to select a location from the settings.",
				[{ text: "OK" }]
			);
			return false;
		}
		setLocationEnabled(true);
		return true;
	};

	const getCurrentLocation = async () => {
		if (await requestLocationPermission()) {
			if (coordinates) return;
			let location = await Location.getCurrentPositionAsync({});
			setCoordinates(location.coords);
		}
	};

	const reverseGeocodeWithRetry = async (coords, retries = 0) => {
		try {
			const reverseGeocode = await Location.reverseGeocodeAsync(coords);
			if (reverseGeocode && reverseGeocode.length > 0) {
				setSelectedCity(reverseGeocode[0].city);
				setSelectedCountry(reverseGeocode[0].country);
			}
		} catch (error) {
			if (retries < MAX_RETRIES) {
				setTimeout(() => {
					reverseGeocodeWithRetry(coords, retries + 1);
				}, RETRY_DELAY);
			} else {
				Alert.alert(
					"Error",
					"Failed to retrieve location details. Please try again later.",
					[{ text: "OK" }]
				);
			}
		}
	};

	const handleLocationToggle = async () => {
		if (locationEnabled) {
			Alert.alert(
				"Disable Location Services",
				"Are you sure you want to disable location services? You will need to disable it from the system settings.",
				[
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "OK",
						onPress: () => {
							Linking.openSettings();
						},
					},
				]
			);
		} else {
			const granted = await requestLocationPermission();
			if (!granted) {
				Alert.alert(
					"Permission Denied",
					"Please enable location services in the system settings.",
					[
						{ text: "Cancel" },
						{ text: "OK", onPress: () => Linking.openSettings() },
					]
				);
			}
		}
	};

	useEffect(() => {
		getCurrentLocation();
	}, []);

	useEffect(() => {
		if (coordinates) {
			reverseGeocodeWithRetry(coordinates);
		}
	}, [coordinates]);

	return {
		coordinates,
		locationEnabled,
		setCoordinates,
		getCurrentLocation,
		reverseGeocodeWithRetry,
		handleLocationToggle,
	};
};

export default useLocation;
