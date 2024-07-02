// This component uses the google maps API to display a map with markers for nearby users in the production mode. But google maps API is not available right now. So i have created a new compoenet using the rnmapbox/maps that uses the mapbox API to display a map with markers for nearby users. The new component is LocationSelector.jsx. The new component is similar to the LocationSelector2.jsx but uses the mapbox API instead of the google maps API.

import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

export default function LocationSelector({
	title,
	subtitle,
	coordinates,
	setCoordinates,
	selectedCity,
	setSelectedCity,
	selectedCountry,
	setSelectedCountry,
	titleStyle,
}) {
	const getCurrentLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			console.error("Permission to access location was denied");
			return;
		}

		if (coordinates) return;
		let location = await Location.getCurrentPositionAsync({});
		setCoordinates(location.coords);
	};

	useEffect(() => {
		getCurrentLocation();
	}, []);

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
				console.error("Error getting city from coordinates:", error);
			}
		}
	};

	useEffect(() => {
		if (coordinates) {
			reverseGeocodeWithRetry(coordinates);
		}
	}, [coordinates]);

	const handleMarkerDrag = async (e) => {
		const newMarkerCoordinates = e.nativeEvent.coordinate;
		setCoordinates(newMarkerCoordinates);
		reverseGeocodeWithRetry(newMarkerCoordinates);
	};

	return (
		<View style={styles.container}>
			<Text style={[styles.title, titleStyle]}>{title || "Add Location"}</Text>
			{subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
			<View style={styles.mapContainer}>
				{coordinates && (
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: coordinates.latitude,
							longitude: coordinates.longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}>
						<Marker
							coordinate={coordinates}
							draggable
							onDragEnd={handleMarkerDrag}
						/>
					</MapView>
				)}
			</View>
			<Text style={styles.selectedLocation}>
				{selectedCity || "Unknown"}, {selectedCountry || "Unknown"}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginBottom: scaleFactor * 20,
	},
	title: {
		fontSize: responsiveFontSize(10),
		fontWeight: "700",
		color: commonStyles.colors.primary,
		marginBottom: scaleFactor * 20,
		textAlign: "center",
	},
	subtitle: {
		fontSize: responsiveFontSize(6),
		color: commonStyles.colors.primary,
		textAlign: "center",
		marginBottom: scaleFactor * 20,
		paddingHorizontal: 20 * scaleFactor,
	},
	mapContainer: {
		height: 170 * scaleFactor,
		width: 290 * scaleFactor,
		marginBottom: scaleFactor * 20,
		borderWidth: 1 * scaleFactor,
		borderColor: commonStyles.colors.primary,
	},
	map: {
		flex: 1,
	},
	selectedLocation: {
		fontSize: responsiveFontSize(6),
		color: commonStyles.colors.primary,
		textAlign: "center",
	},
});
