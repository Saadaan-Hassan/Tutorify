// LocationSelector.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import countriesData from "../data/countries.min.json";

export default function LocationSelector({
	title,
	subtitle,
	selectedCountry,
	setSelectedCountry,
	selectedCity,
	setSelectedCity,
}) {
	const countries = Object.keys(countriesData);
	const cities = selectedCountry ? countriesData[selectedCountry] : [];

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title || "Add Location"}</Text>
			<Text style={styles.subtitle}>
				{subtitle || "Add your location to find tutors near you"}
			</Text>
			<View style={styles.dropdownContainer}>
				<View style={styles.dropdown}>
					<Picker
						selectedValue={selectedCountry}
						onValueChange={(itemValue) => setSelectedCountry(itemValue)}>
						<Picker.Item label='Select Country' value='' />
						{countries.map((country) => (
							<Picker.Item key={country} label={country} value={country} />
						))}
					</Picker>
				</View>
				<View style={styles.dropdown}>
					<Picker
						selectedValue={selectedCity}
						onValueChange={(itemValue) => setSelectedCity(itemValue)}
						enabled={selectedCountry !== ""}>
						<Picker.Item label='Select City' value='' />
						{cities.map((city) => (
							<Picker.Item key={city} label={city} value={city} />
						))}
					</Picker>
				</View>
			</View>
			{/* <TouchableOpacity
				style={[
					styles.button,
					!selectedCountry || !selectedCity
						? { backgroundColor: "#b6a6bd" }
						: null,
				]}
				onPress={handleContinue}
				disabled={!selectedCountry || !selectedCity}>
				<Text style={styles.buttonText}>Continue</Text>
			</TouchableOpacity> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		alignItems: "center",
		justifyContent: "center",
		// paddingHorizontal: 20,
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		color: "#5316B6",
		marginBottom: 20,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 16,
		color: "#5316B6",
		textAlign: "center",
		marginBottom: 20,
	},
	dropdownContainer: {
		// flexDirection: "row",
		marginBottom: 20,
	},
	dropdown: {
		// flex: 1,
		width: 350,
		height: 50,
		borderWidth: 2,
		borderColor: "#ccc",
		borderRadius: 10,
		marginHorizontal: 5,
		marginTop: 20,

		paddingHorizontal: 10,
		justifyContent: "center",
	},
	button: {
		width: 350,
		height: 50,
		backgroundColor: "#5316B6",
		borderRadius: 16,
		marginBottom: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});
