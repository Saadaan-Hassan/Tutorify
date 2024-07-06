import React from "react";
import { View, StyleSheet } from "react-native";
import Mapbox from "@rnmapbox/maps";
import { Text, Button, Switch } from "react-native-paper";
import useLocation from "../utils/hooks/useLocation";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";

const LocationSelector = ({
	title,
	subtitle,
	selectedCity,
	selectedCountry,
	setSelectedCity,
	setSelectedCountry,
	setCoordinates,
	titleStyle,
	hasSwitch = true,
	setIsDragging,
}) => {
	const {
		coordinates,
		locationEnabled,
		setCoordinates: setLocalCoordinates,
		getCurrentLocation,
		reverseGeocodeWithRetry,
		handleLocationToggle,
	} = useLocation(setSelectedCity, setSelectedCountry);

	const handleMarkerDragEnd = async (e) => {
		const newMarkerCoordinates = {
			latitude: e.geometry.coordinates[1],
			longitude: e.geometry.coordinates[0],
		};
		setLocalCoordinates(newMarkerCoordinates);
		setCoordinates(newMarkerCoordinates); // Update the coordinates in the RegistrationScreen
		reverseGeocodeWithRetry(newMarkerCoordinates);
	};

	return (
		<View style={styles.container}>
			<Text style={[styles.title, titleStyle]}>{title || "Add Location"}</Text>
			{subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

			{hasSwitch && (
				<View style={styles.switchContainer}>
					<Text style={styles.switchLabel}>
						Location Services: {locationEnabled ? "On" : "Off"}
					</Text>
					<Switch
						value={locationEnabled}
						onValueChange={handleLocationToggle}
						color={commonStyles.colors.primary}
					/>
				</View>
			)}

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
							zoomLevel={8}
							centerCoordinate={[coordinates.longitude, coordinates.latitude]}
							animationMode='flyTo'
							animationDuration={2000}
						/>
						<Mapbox.PointAnnotation
							id='userLocation'
							title='Your Location'
							coordinate={[coordinates.longitude, coordinates.latitude]}
							draggable
							onDragStart={() => setIsDragging(true)}
							onDragEnd={(e) => {
								handleMarkerDragEnd(e);
								setIsDragging(false);
							}}
						/>
					</Mapbox.MapView>
				)}
			</View>
			<Text style={styles.selectedLocation}>
				{selectedCity || "Unknown"}, {selectedCountry || "Unknown"}
			</Text>

			<Button
				mode='contained'
				onPress={getCurrentLocation}
				style={styles.refreshButton}
				labelStyle={{ fontSize: responsiveFontSize(0.38) }}>
				Refresh Location
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginBottom: scaleFactor * 20,
	},
	title: {
		fontSize: responsiveFontSize(0.5),
		fontWeight: "700",
		color: commonStyles.colors.primary,
		marginBottom: scaleFactor * 20,
		textAlign: "center",
	},
	subtitle: {
		fontSize: responsiveFontSize(0.4),
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
		fontSize: responsiveFontSize(0.4),
		color: commonStyles.colors.primary,
		textAlign: "center",
	},
	switchContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: scaleFactor * 5,
	},
	switchLabel: {
		fontSize: responsiveFontSize(0.45),
		color: commonStyles.colors.primary,
		marginRight: scaleFactor * 10,
	},
	refreshButton: {
		marginTop: scaleFactor * 10,
		backgroundColor: commonStyles.colors.primary,
	},
});

export default LocationSelector;
