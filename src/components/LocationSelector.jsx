import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";

export default function LocationSelector({
	title,
	subtitle,
	coordinates,
	setCoordinates,
	selectedCity,
	setSelectedCity,
	titleStyle,
}) {
	const getCurrentLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			console.error("Permission to access location was denied");
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		setCoordinates(location.coords);
	};

	useEffect(() => {
		getCurrentLocation();
	}, []);

	useEffect(() => {
		if (coordinates) {
			(async () => {
				try {
					const reverseGeocode = await Location.reverseGeocodeAsync({
						latitude: coordinates.latitude,
						longitude: coordinates.longitude,
					});
					if (reverseGeocode && reverseGeocode.length > 0) {
						setSelectedCity(reverseGeocode[0].city);
					}
				} catch (error) {
					console.error("Error getting city from coordinates:", error);
				}
			})();
		}
	}, [coordinates]);

	const handleMarkerDrag = async (e) => {
		const newMarkerCoordinates = e.nativeEvent.coordinate;
		setCoordinates(newMarkerCoordinates);

		try {
			const reverseGeocode = await Location.reverseGeocodeAsync({
				latitude: newMarkerCoordinates.latitude,
				longitude: newMarkerCoordinates.longitude,
			});
			if (reverseGeocode && reverseGeocode.length > 0) {
				const city = reverseGeocode[0].city;
				setSelectedCity(city);
			}
		} catch (error) {
			console.error("Error getting city from coordinates:", error);
		}
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
			<Text style={styles.selectedCity}>City {selectedCity || "Unknown"}</Text>
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

	selectedCity: {
		fontSize: responsiveFontSize(6),
		color: commonStyles.colors.primary,
	},
});
