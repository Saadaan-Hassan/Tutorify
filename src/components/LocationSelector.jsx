import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Mapbox from "@rnmapbox/maps";
import * as Location from "expo-location";
import { Text } from "react-native-paper";
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

	const handleMarkerDragEnd = async (e) => {
		const newMarkerCoordinates = {
			latitude: e.geometry.coordinates[1],
			longitude: e.geometry.coordinates[0],
		};
		setCoordinates(newMarkerCoordinates);
		reverseGeocodeWithRetry(newMarkerCoordinates);
	};

	return (
		<View style={styles.container}>
			<Text style={[styles.title, titleStyle]}>{title || "Add Location"}</Text>
			{subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
			<View style={styles.mapContainer}>
				{coordinates && (
					<Mapbox.MapView
						style={styles.map}
						styleURL={Mapbox.StyleURL.Street}
						logoEnabled={false}
						attributionEnabled={false}
						compassEnabled={true}
						compassViewPosition={3}>
						<Mapbox.Camera
							zoomLevel={11}
							centerCoordinate={[coordinates.longitude, coordinates.latitude]}
							animationMode='flyTo'
							animationDuration={2000}
						/>
						<Mapbox.PointAnnotation
							id='userLocation'
							title='Your Location'
							coordinate={[coordinates.longitude, coordinates.latitude]}
							draggable
							onDragEnd={handleMarkerDragEnd}
						/>
					</Mapbox.MapView>
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
		height: 290 * scaleFactor,
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
