import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
} from "react-native";
import {
	SegmentedButtons,
	Avatar,
	Icon,
	ActivityIndicator,
	Menu,
} from "react-native-paper";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";
import CustomButton from "../components/custom/CustomButton";
import CustomInput from "../components/custom/CustomInput";
import LocationSelector from "../components/LocationSelector";
import { useUser } from "../utils/context/UserContext";
import { db } from "../services/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../services/firebase";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SubjectSelector from "../components/SubjectSelector";
import { useLocation } from "../utils/context/LocationContext";

export default function AccountScreen() {
	const { user, setUser } = useUser();
	const navigation = useNavigation();

	const [image, setImage] = useState(user?.profileImage);
	const [username, setUsername] = useState(user?.username);
	const [level, setLevel] = useState(user?.level);
	const [bio, setBio] = useState(user?.bio);
	const [subjects, setSubjects] = useState(user?.subjects || []);
	const [experience, setExperience] = useState(user?.experience);
	const [rate, setRate] = useState(user?.rate);
	const [selectedCity, setSelectedCity] = useState(user?.location?.city);
	const [selectedCountry, setSelectedCountry] = useState(
		user?.location?.country
	);
	const [coordinates, setCoordinates] = useState(user?.location?.coordinates);
	const [preferredMode, setPreferredMode] = useState(user?.preferredMode);

	const [isDragging, setIsDragging] = useState(false);
	const [infoNotEdited, setInfoNotEdited] = useState(true);
	const [visible, setVisible] = useState(false);
	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	const { locationEnabled } = useLocation();

	useEffect(() => {
		if (
			username !== user?.username ||
			level !== user?.level ||
			bio !== user?.bio ||
			subjects !== user?.subjects ||
			selectedCity !== user?.location?.city ||
			selectedCountry !== user?.location?.country ||
			coordinates !== user?.location?.coordinates ||
			preferredMode !== user?.preferredMode
		) {
			setInfoNotEdited(false);
		} else {
			setInfoNotEdited(true);
		}
	}, [
		username,
		level,
		bio,
		subjects,
		selectedCity,
		selectedCountry,
		coordinates,
		preferredMode,
	]);

	const question = {
		question: "Preffered Level of Education:",
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

		await AsyncStorage.setItem(
			"user",
			JSON.stringify({ ...user, profileImage: downloadURL })
		);

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
			!coordinates ||
			subjects.length === 0
		) {
			alert("Please fill in all the fields");

			return;
		}

		if (user?.role === "Teacher" && (!experience || !rate)) {
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
			subjects: subjects,
		};

		if (user?.role === "Teacher") {
			updateUserDocument.experience = experience;
			updateUserDocument.rate = rate;
		}

		await setDoc(userDoc, {
			...user,
			...updateUserDocument,
		});

		await AsyncStorage.setItem(
			"user",
			JSON.stringify({ ...user, ...updateUserDocument })
		);

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
		<ScrollView
			contentContainerStyle={styles.container}
			scrollEnabled={!isDragging}>
			{isLoading && (
				<View style={commonStyles.loadingOverlay}>
					<ActivityIndicator size='large' color={commonStyles.colors.primary} />
				</View>
			)}
			<View style={{ position: "relative" }}>
				<Image
					source={require("../../assets/img/blob1.png")}
					style={{
						alignSelf: "center",
						position: "absolute",
						top: 0,
						zIndex: -1,
					}}
					resizeMode='contain'
				/>
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
							borderWidth: 4 * scaleFactor,
							borderColor: commonStyles.colors.primary,
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
				<Text style={styles.email}>{user?.email}</Text>
				<Text style={styles.role}>
					{user?.role === "Teacher" ? "Tutor" : "Student"}
				</Text>

				<CustomInput
					label='Username:'
					placeholder='Enter your name'
					value={username ? username : ""}
					onChangeText={setUsername}
				/>

				{/* Education Level */}
				<Text style={styles.label}>{question.question}</Text>
				<Menu
					visible={visible}
					// anchorPosition='bottom'
					contentStyle={styles.menuContent}
					onDismiss={closeMenu}
					anchor={
						<CustomButton
							// styleReverse
							icon={visible ? "chevron-up" : "chevron-down"}
							mode='outlined'
							onPress={openMenu}
							title={level ? level : "Select"}
							style={{
								width: 300 * scaleFactor,
								marginBottom: 0,
							}}
						/>
					}>
					{question.options.map((option) => (
						<Menu.Item
							key={option.value}
							onPress={() => {
								setLevel(option.value);
								closeMenu();
							}}
							title={option.label}
							style={{
								backgroundColor:
									option.value === level
										? commonStyles.colors.primary
										: commonStyles.colors.background,
								padding: 0,
								marginHorizontal: 20,
								borderRadius: 20 * scaleFactor,
								alignItems: "center",
							}}
							titleStyle={{
								color:
									option.value === level
										? commonStyles.colors.background
										: commonStyles.colors.primary,
							}}
						/>
					))}
				</Menu>

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

				{/* Subjects */}
				<SubjectSelector
					title={"Subjects:"}
					subtitle={""}
					titleStyle={[
						styles.label,
						{
							alignSelf: "flex-start",
						},
					]}
					subjects={subjects}
					setSubjects={setSubjects}
				/>

				<LocationSelector
					title={"Location:"}
					titleStyle={[
						styles.label,
						{
							alignSelf: "flex-start",
						},
					]}
					selectedCity={selectedCity}
					setSelectedCity={setSelectedCity}
					selectedCountry={selectedCountry}
					setSelectedCountry={setSelectedCountry}
					setCoordinates={setCoordinates}
					hasSwitch={false}
					setIsDragging={setIsDragging}
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
					title='Update Profile'
					onPress={handleUpdateProfile}
					disabled={infoNotEdited || !locationEnabled}
				/>
			</View>

			<Image
				source={require("../../assets/img/blob2.png")}
				style={{
					alignSelf: "center",
					position: "absolute",
					bottom: 0,
					zIndex: -1,
				}}
				resizeMode='contain'
			/>
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
		marginTop: 20 * scaleFactor,
		fontSize: responsiveFontSize(0.5),
	},
	role: {
		color: commonStyles.colors.primary,
		textAlign: "center",
		marginTop: 5 * scaleFactor,
		marginBottom: 20 * scaleFactor,
		fontSize: responsiveFontSize(0.4),
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
		fontSize: responsiveFontSize(0.5),
		fontWeight: "bold",
		marginBottom: 5 * scaleFactor,
		color: commonStyles.colors.primary,
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		gap: 10 * scaleFactor,
		marginTop: 30 * scaleFactor,
	},
	menuContent: {
		width: 300 * scaleFactor,
		backgroundColor: commonStyles.colors.background,
		borderRadius: 20 * scaleFactor,
	},
});
