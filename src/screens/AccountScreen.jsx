import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Card, SegmentedButtons, Avatar } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import LocationPicker from "../components/LocationPicker";
import { useUser } from "../utils/context/UserContext";

export default function ProfileInfo() {
	const { user } = useUser();
	const [username, setUsername] = useState(user.username);
	const [bio, setBio] = useState(user.bio);
	const [experience, setExperience] = useState(user.experience);
	const [rate, setRate] = useState(user.rate);
	const [selectedCity, setSelectedCity] = useState(user.location.city);
	const [selectedCountry, setSelectedCountry] = useState(user.location.country);
	const [preferredMode, setPreferredMode] = useState(user.preferredMode);

	const handleBioChange = (text) => {
		const CHARACTER_LIMIT = 150;
		if (text.length <= CHARACTER_LIMIT) {
			setBio(text);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View>
				<Avatar.Image
					size={120}
					source={require("../../assets/img/avatar/user2.png")}
					style={{ alignSelf: "center", marginTop: 20, marginBottom: -10 }}
				/>
				<Card.Title
					subtitle={user.email}
					subtitleStyle={[styles.email, { textAlign: "center" }]}
				/>

				<CustomInput
					label='Username:'
					placeholder='Enter your name'
					value={username ? username : ""}
					onChangeText={setUsername}
				/>

				<CustomInput
					label='Bio:'
					placeholder='Enter your bio'
					multiline={true}
					value={bio ? bio : ""}
					onChangeText={handleBioChange}
					inputStyle={{ height: 100 }}
				/>

				<View style={{ flexDirection: "row", gap: 5 }}>
					<CustomInput
						label='Experience:'
						placeholder='Enter your Experience'
						value={experience ? experience : ""}
						onChangeText={setExperience}
						inputStyle={{ width: 150 }}
					/>
					<CustomInput
						label='Rate / Month:'
						placeholder='Enter your Rate'
						type='number'
						value={rate ? rate : ""}
						onChangeText={setRate}
						inputStyle={{ width: 150 }}
					/>
				</View>

				<LocationPicker
					title={"Location:"}
					subtitle={""}
					titleStyle={[styles.label, { marginBottom: 0, textAlign: "left" }]}
					dropdownStyle={{ width: 300, height: 40, marginTop: 10 }}
					selectedCountry={selectedCountry}
					selectedCity={selectedCity}
					setSelectedCountry={setSelectedCountry}
					setSelectedCity={setSelectedCity}
				/>

				<Text style={styles.label}>Preferred Mode: </Text>
				<SegmentedButtons
					multiSelect
					value={preferredMode}
					onValueChange={setPreferredMode}
					buttons={[
						{
							value: "Online",
							label: "Online",
							icon: "web",
						},
						{
							value: "In-person",
							label: "In-person",
							icon: "home",
						},
					]}
				/>
			</View>

			<View style={styles.centered}>
				<CustomButton title='Edit Profile' style={styles.editButton} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: commonStyles.colors.neutral,
		alignItems: "center",
		paddingHorizontal: 20,
	},
	editButton: {
		width: "35%",
		fontSize: 18,
		marginTop: 20,
	},
	email: {
		color: commonStyles.colors.textSecondary,
		textAlign: "center",
		marginTop: 0,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
		color: commonStyles.colors.primary,
	},
	titleStyle: {
		fontSize: 24,
		fontWeight: "bold",
		minHeight: 25,
		color: commonStyles.colors.textPrimary,
		marginLeft: -15,
	},
	subtitleStyle: {
		fontSize: 16,
		color: commonStyles.colors.textSecondary,
		marginLeft: -5,
	},
	cardTitle: {
		marginVertical: 5,
	},
	inputView: {
		marginTop: -20,
	},
	radioButtonRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	radioButtonLabel: {
		fontSize: 16,
		marginLeft: 8,
	},
});
