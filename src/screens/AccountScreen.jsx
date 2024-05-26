import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import {
	Card,
	SegmentedButtons,
	Avatar,
	Icon,
	ActivityIndicator,
} from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import LocationPicker from "../components/LocationPicker";
import { useUser } from "../utils/context/UserContext";
import { db } from "../services/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../services/firebase";
import * as ImagePicker from "expo-image-picker";

export default function ProfileInfo() {
	const { user, setUser } = useUser();
	const navigation = useNavigation();

	const [username, setUsername] = useState(user?.username);
	const [bio, setBio] = useState(user?.bio);
	const [experience, setExperience] = useState(user?.experience);
	const [rate, setRate] = useState(user?.rate);
	const [selectedCity, setSelectedCity] = useState(user?.location?.city);
	const [selectedCountry, setSelectedCountry] = useState(
		user?.location?.country
	);
	const [preferredMode, setPreferredMode] = useState(user?.preferredMode);
	const [image, setImage] = useState(user?.profileImage);

	const [isLoading, setIsLoading] = useState(false);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			console.log(result.assets[0].uri);
			uploadImage(result.assets[0].uri);
		}
	};

	const uploadImage = async (uri) => {
		setIsLoading(true);
		const response = await fetch(uri);
		const blob = await response.blob();

		const storageRef = ref(storage, `profileImages/${user?.uid}`);
		const uploadTask = uploadBytesResumable(storageRef, blob);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				console.log("Image is uploading...");
			},
			(error) => {
				console.error("Error uploading image: ", error);
				setIsLoading(false);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log("File available at", downloadURL);
					updateUserDocument(downloadURL);
				});
			}
		);
	};

	const updateUserDocument = async (downloadURL) => {
		const usersCollection = collection(db, "users");
		const userDoc = doc(usersCollection, user?.uid);

		console.log("Updating user document with image URL: ", downloadURL);

		await setDoc(userDoc, {
			...user,
			profileImage: downloadURL,
		});

		setUser({
			...user,
			profileImage: downloadURL,
		});
		setImage(downloadURL);
		setIsLoading(false);
		navigation.goBack();
	};

	const handleBioChange = (text) => {
		const CHARACTER_LIMIT = 350;
		if (text.length <= CHARACTER_LIMIT) {
			setBio(text);
		}
	};

	const handleUpdateProfile = async () => {
		const usersCollection = collection(db, "users");
		const userDoc = doc(usersCollection, user?.uid);

		if (
			!username ||
			!bio ||
			!selectedCity ||
			!selectedCountry ||
			!preferredMode
		) {
			alert("Please fill in all the fields");
			return;
		}

		if (user?.role === "tutor" && (!experience || !rate)) {
			alert("Please fill in all the fields");
			return;
		}

		if (username.length < 3) {
			alert("Username must be at least 3 characters long");
			return;
		}

		if (bio.length < 10) {
			alert("Bio must be at least 10 characters long");
			return;
		}

		setIsLoading(true);

		const updateUserDocument = {
			username: username,
			bio: bio,
			location: {
				city: selectedCity,
				country: selectedCountry,
			},
			preferredMode: preferredMode,
		};

		if (user?.role === "tutor") {
			updateUserDocument.experience = experience;
			updateUserDocument.rate = rate;
		}

		await setDoc(userDoc, {
			...user,
			...updateUserDocument,
		});

		setUser({
			...user,
			...updateUserDocument,
		});
		setIsLoading(false);
		navigation.goBack();
	};

	const handleImageChange = () => {
		pickImage();
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{isLoading && (
				<View style={styles.loadingOverlay}>
					<ActivityIndicator size='large' color={commonStyles.colors.primary} />
				</View>
			)}
			<View>
				<View style={styles.avatarContainer}>
					<Avatar.Image
						size={120}
						source={
							image
								? { uri: image }
								: require("../../assets/img/avatar/avatar.jpg")
						}
						style={{ alignSelf: "center", marginTop: 20, marginBottom: -10 }}
					/>
					<TouchableOpacity
						onPress={handleImageChange}
						activeOpacity={0.8}
						style={styles.iconContainer}>
						<Icon
							source={"camera"}
							size={25}
							color={commonStyles.colors.primary}
						/>
					</TouchableOpacity>
				</View>
				<Card.Title subtitle={user?.email} subtitleStyle={styles.email} />

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

				{user?.role === "Teacher" && (
					<View style={{ flexDirection: "row", gap: 5 }}>
						<CustomInput
							label='Experience:'
							placeholder='Enter your Experience'
							value={experience ? experience : ""}
							onChangeText={setExperience}
							inputStyle={{ width: 150 }}
							type='numeric'
						/>
						<CustomInput
							label='Rate / Month:'
							placeholder='Enter your Rate'
							value={rate ? rate : ""}
							onChangeText={setRate}
							inputStyle={{ width: 150 }}
							type='numeric'
						/>
					</View>
				)}

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

			<View style={styles.buttonsContainer}>
				<CustomButton
					title='Cancel'
					style={styles.button}
					mode='outlined'
					onPress={() => {
						setUsername(user?.username);
						setBio(user?.bio);
						setExperience(user?.experience);
						setRate(user?.rate);
						setSelectedCity(user?.location.city);
						setSelectedCountry(user?.location.country);
						setPreferredMode(user?.preferredMode);
						navigation.goBack();
					}}
				/>

				<CustomButton
					title='Update Profile'
					style={styles.button}
					onPress={handleUpdateProfile}
				/>
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
	email: {
		color: commonStyles.colors.textSecondary,
		textAlign: "center",
		marginTop: 0,
	},
	avatarContainer: {
		position: "relative",
		width: 120,
		alignSelf: "center",
	},
	iconContainer: {
		position: "absolute",
		bottom: -10,
		right: -5,
		backgroundColor: commonStyles.colors.secondary,
		borderColor: commonStyles.colors.primary,
		borderWidth: 2,
		borderRadius: 50,
		padding: 5,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
		color: commonStyles.colors.primary,
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		gap: 10,
		marginTop: 20,
	},
	button: {
		width: "41.5%",
		fontSize: 18,
	},
	loadingOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(255, 255, 255, 0.8)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
	},
});
