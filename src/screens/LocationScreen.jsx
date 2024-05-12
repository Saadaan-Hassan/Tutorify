import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import data from "../data/countries.min.json";

export default function LocationScreen() {
	const navigation = useNavigation();
	const [selectedCountry, setSelectedCountry] = useState("");
	const [selectedCity, setSelectedCity] = useState("");
	const countries = Object.keys(data);
	const cities = selectedCountry ? data[selectedCountry] : [];

	const handleContinue = () => {
		if (selectedCountry && selectedCity) {
			// Perform navigation or any other action
			navigation.navigate("Username");
		} else {
			alert("Please select both country and city.");
		}
	};

	const handleSkip = () => {
		navigation.navigate("Username");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Add Location</Text>
			<Text style={styles.subtitle}>
				Add your location to find tutors near you
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
			<TouchableOpacity
				style={[
					styles.button,
					!selectedCountry || !selectedCity
						? { backgroundColor: "#b6a6bd" }
						: null,
				]}
				onPress={handleContinue}
				disabled={!selectedCountry || !selectedCity}>
				<Text style={styles.buttonText}>Continue</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
				<Text style={styles.skipButtonText}>Skip for now</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
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
		flexDirection: "row",
		marginBottom: 20,
	},
	dropdown: {
		flex: 1,
		height: 50,
		borderWidth: 2,
		borderColor: "#ccc",
		borderRadius: 10,
		marginHorizontal: 5,
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
	skipButton: {
		width: 350,
		height: 50,
		backgroundColor: "transparent",
		borderRadius: 16,
		marginBottom: 10,
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#5316B6",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	skipButtonText: {
		color: "#5316B6",
		fontSize: 16,
		fontWeight: "bold",
	},
});
