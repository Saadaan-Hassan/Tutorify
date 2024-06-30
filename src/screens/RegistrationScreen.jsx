import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	StyleSheet,
	Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useUser } from "../utils/context/UserContext";
import LocationSelector from "../components/LocationSelector";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";

const { width } = Dimensions.get("window");

const questions = [
	{
		id: 1,
		question: "Are you a student or a teacher?",
		options: ["Student", "Teacher"],
		multiSelect: false,
	},
	{
		id: 2,
		question: "Select your level of education",
		options: [
			"Primary School (1-5)",
			"Middle School (6-8)",
			"Matriculation/O-level",
			"Intermediate/A-level",
		],
		multiSelect: false,
	},
	{
		id: 3,
		question: "Select the subjects you need the tutor for",
		options: [
			"Maths",
			"Science",
			"English",
			"History",
			"Geography",
			"Social Studies",
			"Other",
		],
		multiSelect: true,
	},
	{
		id: 4,
		question: "Preferred Mode of Study",
		options: ["Online", "In-person"],
	},
	{
		id: 5,
		component: true,
	},
	{
		id: 6,
		question: "Username",
		input: true,
	},
];

const Option = ({ option, selected, onPress }) => (
	<TouchableOpacity
		onPress={onPress}
		style={[styles.choice, selected && styles.selectedChoice]}>
		<Text style={styles.text}>{option}</Text>
	</TouchableOpacity>
);

const InputField = ({ value, onChangeText, placeholder }) => (
	<TextInput
		style={styles.input}
		value={value}
		onChangeText={onChangeText}
		placeholder={placeholder}
	/>
);

const RegistrationScreen = () => {
	const { user } = useUser();
	const navigation = useNavigation();

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [isDisabled, setIsDisabled] = useState(true);
	const currentQuestion = questions[currentQuestionIndex];
	const [userDetails, setUserDetails] = useState({});
	const [username, setUsername] = useState("");
	const [coordinates, setCoordinates] = useState(null);
	const [selectedCity, setSelectedCity] = useState("");
	const [selectedCountry, setSelectedCountry] = useState("");

	useEffect(() => {
		setIsDisabled(
			currentQuestion.multiSelect
				? selectedOptions.length === 0 ||
						(currentQuestion.input && username === "") ||
						(currentQuestion.component &&
							(selectedCountry === "" || selectedCity === ""))
				: selectedOptionIndex === null ||
						(currentQuestion.input && username === "") ||
						(currentQuestion.component &&
							(selectedCountry === "" || selectedCity === ""))
		);
	}, [
		selectedOptionIndex,
		selectedOptions,
		username,
		currentQuestion,
		selectedCity,
		selectedCountry,
	]);

	useEffect(() => {
		if (userDetails.role === "Teacher") {
			questions[1].question = "Select the level of education you can teach";
			questions[2].question = "Select the subjects you can teach";
		}
	}, [userDetails]);

	useEffect(() => {
		const unsubscribe = navigation.addListener("beforeRemove", (e) => {
			// Prevent the user from going back
			e.preventDefault();
		});

		return unsubscribe;
	}, [navigation]);

	const handleOptionSelect = (index) => {
		if (currentQuestion.multiSelect) {
			setSelectedOptions((prevSelectedOptions) => {
				const newSelectedOptions = [...prevSelectedOptions];
				const selectedIndex = newSelectedOptions.indexOf(index);
				if (selectedIndex > -1) {
					newSelectedOptions.splice(selectedIndex, 1);
				} else {
					newSelectedOptions.push(index);
				}
				return newSelectedOptions;
			});
		} else {
			setSelectedOptionIndex(index);
		}
	};

	const handleUsernameChange = (text) => {
		setUsername(text);
	};

	const handleQuestionSelect = async () => {
		try {
			let updatedUserDetails = { ...userDetails };

			if (currentQuestion.input) {
				updatedUserDetails = { ...updatedUserDetails, username: username };
			} else if (currentQuestion.component) {
				updatedUserDetails = {
					...updatedUserDetails,
					location: { country: selectedCountry, city: selectedCity },
				};
			} else {
				const selectedOption = getSelectedOption();

				// Assign the selected option to the appropriate attribute based on the question
				switch (currentQuestionIndex) {
					case 0:
						updatedUserDetails.role = selectedOption;
						break;
					case 1:
						updatedUserDetails.level = selectedOption;
						break;
					case 2:
						updatedUserDetails.subjects = selectedOption;
						break;
					case 3:
						updatedUserDetails.preferredMode = selectedOption;
					default:
						break;
				}
			}
			setUserDetails(updatedUserDetails);

			if (currentQuestionIndex < questions.length - 1) {
				setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
			} else {
				const userDocSnapshot = await getDoc(doc(db, "users", user.uid));
				const userDocRef = userDocSnapshot.ref;
				await updateDoc(userDocRef, updatedUserDetails);
				navigation.reset({
					index: 0,
					routes: [{ name: "TabNavigator" }],
				});
				navigation.navigate("Profile");
			}
		} catch (error) {
			console.error("Error updating user data:", error.message);
		}
	};

	const getSelectedOption = () => {
		if (currentQuestion.multiSelect) {
			return selectedOptions.map((index) => currentQuestion.options[index]);
		} else {
			return currentQuestion.options[selectedOptionIndex];
		}
	};

	const handleBackQuestion = () => {
		// Decrease the current question index
		setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
		// Remove the previous question from userDetails
		setUserDetails((prevUserDetails) => {
			const updatedUserDetails = { ...prevUserDetails };
			delete updatedUserDetails[`question${currentQuestionIndex}`];
			return updatedUserDetails;
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{currentQuestion.question}</Text>
			{currentQuestion.options &&
				currentQuestion.options.map((option, index) => (
					<Option
						key={index}
						option={option}
						selected={
							currentQuestion.multiSelect
								? selectedOptions.includes(index)
								: selectedOptionIndex === index
						}
						onPress={() => handleOptionSelect(index)}
					/>
				))}
			{currentQuestion.component && (
				<LocationSelector
					subtitle={`Select your location to find ${
						user.role === "Teacher" ? "students" : "tutors"
					} in your area`}
					coordinates={coordinates}
					setCoordinates={setCoordinates}
					selectedCity={selectedCity}
					setSelectedCity={setSelectedCity}
					selectedCountry={selectedCountry}
					setSelectedCountry={setSelectedCountry}
				/>
			)}
			{currentQuestion.input && (
				<InputField
					value={username}
					onChangeText={handleUsernameChange}
					placeholder='Enter your username'
				/>
			)}
			<View style={styles.buttonContainer}>
				{currentQuestionIndex > 0 && (
					<TouchableOpacity
						onPress={handleBackQuestion}
						style={[
							styles.button,
							{ backgroundColor: commonStyles.colors.secondary },
						]}>
						<Text style={styles.buttonText}>Back</Text>
					</TouchableOpacity>
				)}
				<TouchableOpacity
					disabled={isDisabled}
					onPress={handleQuestionSelect}
					style={[
						styles.button,
						{
							backgroundColor: isDisabled
								? commonStyles.colors.secondary
								: commonStyles.colors.primary,
						},
					]}>
					<Text style={styles.buttonText}>Continue</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20 * scaleFactor,
		justifyContent: "center",
		alignItems: "center",
	},
	choice: {
		width: width - 40 * scaleFactor,
		height: 50 * scaleFactor,
		backgroundColor: "white",
		borderRadius: 16 * scaleFactor,
		marginBottom: 15 * scaleFactor,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1 * scaleFactor,
		borderColor: "transparent",
	},
	selectedChoice: {
		borderColor: commonStyles.colors.primary,
		borderWidth: 2 * scaleFactor,
	},
	text: {
		color: commonStyles.colors.primary,
		textAlign: "center",
		padding: 15 * scaleFactor,
		fontSize: responsiveFontSize(6),
		fontWeight: "400",
	},
	title: {
		fontSize: responsiveFontSize(8),
		fontWeight: "700",
		color: commonStyles.colors.primary,
		marginBottom: 20 * scaleFactor,
		textAlign: "center",
	},
	input: {
		width: width - 40 * scaleFactor,
		height: 50 * scaleFactor,
		backgroundColor: "white",
		borderRadius: 16 * scaleFactor,
		marginBottom: 15 * scaleFactor,
		paddingHorizontal: 15 * scaleFactor,
		borderWidth: 1 * scaleFactor,
		borderColor: "transparent",
		fontSize: responsiveFontSize(6),
	},
	buttonContainer: {
		flexDirection: "row",
		gap: 20 * scaleFactor,
		justifyContent: "space-between",
		marginTop: 10 * scaleFactor,
		marginHorizontal: 10 * scaleFactor,
	},
	button: {
		width: "50%",
		height: 50 * scaleFactor,
		borderRadius: 16 * scaleFactor,
		marginTop: 20 * scaleFactor,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
});

export default RegistrationScreen;
