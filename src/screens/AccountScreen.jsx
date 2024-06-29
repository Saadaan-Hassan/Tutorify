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
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import LocationSelector from "../components/LocationSelector";
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
	const [level, setLevel] = useState(user?.level);
	const [bio, setBio] = useState(user?.bio);
	const [experience, setExperience] = useState(user?.experience);
	const [rate, setRate] = useState(user?.rate);
	const [selectedCity, setSelectedCity] = useState(user?.location?.city);
	const selectedCountry = user?.location?.country || "Pakistan";
	const [coordinates, setCoordinates] = useState(user?.location?.coordinates);
	const [preferredMode, setPreferredMode] = useState(user?.preferredMode);
	const [image, setImage] = useState(user?.profileImage);

	const question = {
		question: "Select your level of education",
		options: [
			{
				value: "Primary School (1-5)",
				label: "Primary School (1-5)",
			},
			{
				value: "Middle School (6-8)",
				label: "Middle School (6-8)",
			},
			{
				value: "Matriculation/O-level",
				label: "Matriculation/O-level",
			},
			{
				value: "Intermediate/A-level",
				label: "Intermediate/A-level",
			},
		],
		multiSelect: false,
	};

	const [isLoading, setIsLoading] = useState(false);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
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
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(error) => {
				console.error("Error uploading image: ", error);
				setIsLoading(false);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					updateUserDocument(downloadURL);
				});
			}
		);
	};

	const updateUserDocument = async (downloadURL) => {
		const usersCollection = collection(db, "users");
		const userDoc = doc(usersCollection, user?.uid);

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
			!level ||
			!bio ||
			!selectedCity ||
			!selectedCountry ||
			!preferredMode ||
			!coordinates
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
			level: level,
			bio: bio,
			location: {
				city: selectedCity,
				country: selectedCountry,
				coordinates: coordinates,
			},
			preferredMode: preferredMode,
		};

		if (user?.role === "Teacher") {
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
				<View style={commonStyles.loadingOverlay}>
					<ActivityIndicator size='large' color={commonStyles.colors.primary} />
				</View>
			)}
			<View>
				<View style={styles.avatarContainer}>
					<Avatar.Image
						size={120 * scaleFactor}
						source={
							image
								? { uri: image }
								: require("../../assets/img/avatar/avatar.jpg")
						}
						style={{
							alignSelf: "center",
							marginTop: 20 * scaleFactor,
							marginBottom: -10 * scaleFactor,
						}}
					/>
					<TouchableOpacity
						onPress={handleImageChange}
						activeOpacity={0.8}
						style={[
							styles.iconContainer,
							{ bottom: -10 * scaleFactor, right: -5 * scaleFactor },
						]}>
						<Icon
							source={"camera"}
							size={25 * scaleFactor}
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

				{/* Education Level */}
				<Text style={styles.label}>{question.question}</Text>
				<SegmentedButtons
					multiSelect={question.multiSelect}
					buttons={question.options}
					value={level}
					onValueChange={setLevel}
				/>

				<CustomInput
					label='Bio:'
					placeholder='Enter your bio'
					multiline={true}
					value={bio ? bio : ""}
					onChangeText={handleBioChange}
					outlineStyle={{ borderRadius: 20 * scaleFactor }}
					containerStyle={{ marginTop: 20 * scaleFactor }}
					inputStyle={{ height: 100 * scaleFactor }}
				/>

				{user?.role === "Teacher" && (
					<View style={{ flexDirection: "row", gap: 5 * scaleFactor }}>
						<CustomInput
							label='Experience:'
							placeholder='Enter your Exp'
							value={experience ? experience : ""}
							onChangeText={setExperience}
							inputStyle={{
								width: 150 * scaleFactor,
							}}
							type='numeric'
						/>
						<CustomInput
							label='Rate / Month:'
							placeholder='Enter your Rate'
							value={rate ? rate : ""}
							onChangeText={setRate}
							inputStyle={{
								width: 150 * scaleFactor,
							}}
							type='numeric'
						/>
					</View>
				)}

				<LocationSelector
					title={"Location:"}
					subtitle={""}
					titleStyle={[
						styles.label,
						{
							alignSelf: "flex-start",
						},
					]}
					dropdownStyle={{
						width: 300 * scaleFactor,
						height: 40 * scaleFactor,
						marginTop: 10 * scaleFactor,
					}}
					coordinates={coordinates}
					setCoordinates={setCoordinates}
					selectedCity={selectedCity}
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
					labelStyle={{ color: commonStyles.colors.primary }}
					mode='outlined'
					onPress={() => {
						setUsername(user?.username);
						setBio(user?.bio);
						setExperience(user?.experience);
						setRate(user?.rate);
						setSelectedCity(user?.location.city);
						setPreferredMode(user?.preferredMode);
						navigation.goBack();
					}}
				/>

				<CustomButton title='Update Profile' onPress={handleUpdateProfile} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: commonStyles.colors.neutral,
		alignItems: "center",
		paddingHorizontal: 20 * scaleFactor,
	},
	email: {
		color: commonStyles.colors.textSecondary,
		textAlign: "center",
		marginTop: 0,
		fontSize: responsiveFontSize(6),
	},
	avatarContainer: {
		position: "relative",
		width: 120 * scaleFactor,
		alignSelf: "center",
	},
	iconContainer: {
		position: "absolute",
		backgroundColor: commonStyles.colors.secondary,
		borderColor: commonStyles.colors.primary,
		borderWidth: 2 * scaleFactor,
		borderRadius: 50 * scaleFactor,
		padding: 5 * scaleFactor,
	},
	label: {
		fontSize: responsiveFontSize(7),
		fontWeight: "bold",
		marginBottom: 5 * scaleFactor,
		color: commonStyles.colors.primary,
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		// width: "100%",
		gap: 10 * scaleFactor,
		marginTop: 20 * scaleFactor,
	},
});
