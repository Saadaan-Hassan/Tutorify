import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useUser } from "../utils/context/UserContext";
import Question from "../components/Question";
import Options from "../components/Options";
import CustomInput from "../components/custom/CustomInput";
import CustomButton from "../components/custom/CustomButton";
import LocationSelector from "../components/LocationSelector";
import { commonStyles, scaleFactor } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../utils/hooks/useAuth";

const questions = [
	{
		id: 1,
		icon: "account-tie",
		question: "Are you a student or a teacher?",
		options: ["Student", "Teacher"],
		multiSelect: false,
	},
	{
		id: 2,
		icon: "school",
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
		icon: "book",
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
		icon: "laptop",
		question: "Preferred Mode of Study",
		options: ["Online", "In-person"],
	},
	{
		id: 5,
		icon: "map",
		component: true,
	},
	{
		id: 6,
		icon: "account",
		question: "Username",
		input: true,
	},
];

const RegistrationScreen = () => {
	const { user, setUser } = useUser();
	const { fetchOtherUsersAndNotify } = useAuth();
	const navigation = useNavigation();

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [isDisabled, setIsDisabled] = useState(true);
	const currentQuestion = questions[currentQuestionIndex];
	const [userDetails, setUserDetails] = useState({});
	const [username, setUsername] = useState("");
	const [coordinates, setCoordinates] = useState({
		latitude: 0,
		longitude: 0,
	});
	const [selectedCity, setSelectedCity] = useState("");
	const [selectedCountry, setSelectedCountry] = useState("");

	useEffect(() => {
		const isLocationQuestion = currentQuestion.component;
		const isInputQuestion = currentQuestion.input;
		const isMultiSelectQuestion = currentQuestion.multiSelect;

		let isContinueDisabled = false;

		if (isLocationQuestion) {
			isContinueDisabled =
				selectedCountry === "" ||
				selectedCity === "" ||
				coordinates.latitude === 0 ||
				coordinates.longitude === 0;
		} else if (isInputQuestion) {
			isContinueDisabled = username === "";
		} else if (isMultiSelectQuestion) {
			isContinueDisabled = selectedOptions.length === 0;
		} else {
			isContinueDisabled = selectedOptionIndex === null;
		}

		setIsDisabled(isContinueDisabled);
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
			questions[2].question = "Select the subjects you prefer to teach";
		} else {
			questions[1].question = "Select your level of education";
			questions[2].question = "Select the subjects you need the most help with";
		}
	}, [userDetails]);

	useEffect(() => {
		const unsubscribe = navigation.addListener("beforeRemove", (e) => {
			e.preventDefault();
		});

		return unsubscribe;
	}, [navigation]);

	// Function to handle selecting an option
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

	// Function to handle selecting a question
	const handleQuestionSelect = async () => {
		try {
			let updatedUserDetails = { ...userDetails };

			if (currentQuestion.input) {
				updatedUserDetails = { ...updatedUserDetails, username: username };
			} else if (currentQuestion.component) {
				updatedUserDetails = {
					...updatedUserDetails,
					location: {
						country: selectedCountry,
						city: selectedCity,
						coordinates: {
							latitude: coordinates.latitude,
							longitude: coordinates.longitude,
						},
					},
				};
			} else {
				const selectedOption = getSelectedOption();

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
						break;
					default:
						break;
				}
			}

			setUserDetails(updatedUserDetails);

			if (currentQuestionIndex < questions.length - 1) {
				setCurrentQuestionIndex(currentQuestionIndex + 1);
				setSelectedOptionIndex(null);
				setSelectedOptions([]);
			} else {
				// If all questions are answered, update user details in the database
				const updatedUserDetails = {
					...user,
					...userDetails,
					...updatedUserDetails,
					isProfileComplete: true,
				};

				await updateDoc(doc(db, "users", user.uid), updatedUserDetails);

				await AsyncStorage.setItem("user", JSON.stringify(updatedUserDetails));

				// Fetch other users based on the new user's role and notify them
				await fetchOtherUsersAndNotify(updatedUserDetails);

				// Update user context and navigate to Profile
				setUser(updatedUserDetails);

				navigation.navigate("Profile");
			}
		} catch (error) {
			console.error("Error updating user details: ", error);
		}
	};

	const getSelectedOption = () => {
		if (currentQuestion.multiSelect) {
			return currentQuestion.options.filter((_, index) =>
				selectedOptions.includes(index)
			);
		} else {
			return currentQuestion.options[selectedOptionIndex];
		}
	};

	const handleBack = () => {
		setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
	};

	return (
		<View style={styles.container}>
			<Question
				question={currentQuestion.question}
				icon={currentQuestion.icon}
			/>
			{currentQuestion.input && (
				<CustomInput
					value={username}
					onChangeText={handleUsernameChange}
					placeholder='Enter your username'
				/>
			)}
			{currentQuestion.options && (
				<Options
					options={currentQuestion.options}
					selectedOptions={
						currentQuestion.multiSelect ? selectedOptions : selectedOptionIndex
					}
					multiSelect={currentQuestion.multiSelect}
					onPress={handleOptionSelect}
				/>
			)}
			{currentQuestion.component && (
				<LocationSelector
					subtitle={`Select your location to find ${
						user.role === "Teacher" ? "students" : "tutors"
					} in your area. Your location will only be shared if you select to ${
						user.role === "Teacher" ? "teach" : "learn"
					} in-person. Press and hold the marker to drag it to your location.`}
					selectedCity={selectedCity}
					setSelectedCity={setSelectedCity}
					selectedCountry={selectedCountry}
					setSelectedCountry={setSelectedCountry}
					setCoordinates={setCoordinates}
					setIsDragging={(isDragging) => setIsDisabled(isDragging)}
				/>
			)}

			<View style={styles.buttonContainer}>
				{currentQuestionIndex > 0 && (
					<CustomButton
						onPress={handleBack}
						title='Back'
						disabled={false}
						style={{ backgroundColor: commonStyles.colors.inactivePrimary }}
						styleReverse
					/>
				)}
				<CustomButton
					onPress={handleQuestionSelect}
					title='Continue'
					disabled={isDisabled}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 16 * scaleFactor,
		backgroundColor: commonStyles.colors.background,
	},
	buttonContainer: {
		flexDirection: "row",
		gap: 20 * scaleFactor,
		justifyContent: "space-between",
		marginTop: 10 * scaleFactor,
	},
});

export default RegistrationScreen;
