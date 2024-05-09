import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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
		question: "Username",
		input: true, // Indicate that it's an input field
	},
];

export default function RegistrationScreen() {
	const navigation = useNavigation();
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [username, setUsername] = useState(""); // State for username input
	const [isDisabled, setIsDisabled] = useState(true);
	const currentQuestion = questions[currentQuestionIndex];

	useEffect(() => {
		// Enable the Continue button if an option is selected or username is entered
		setIsDisabled(
			currentQuestion.multiSelect
				? selectedOptions.length === 0
				: selectedOptionIndex === null && username === ""
		);
	}, [selectedOptionIndex, selectedOptions, username, currentQuestion]);

	const handleOptionSelect = (index) => {
		if (currentQuestion.multiSelect) {
			// For questions where multiple selections are allowed
			// Toggle the selection state of the option
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
			// For questions where only one selection is allowed
			setSelectedOptionIndex(index);
		}
	};

	const handleUsernameChange = (text) => {
		setUsername(text);
	};

	const handleQuestionSelect = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setSelectedOptions([]);
			setSelectedOptionIndex(null);
			setUsername(""); // Clear username input on proceeding to the next question
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
		} else {
			navigation.navigate("Profile");
			console.log("Registration Successful");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{currentQuestion.question}</Text>
			{currentQuestion.options &&
				currentQuestion.options.map((option, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => handleOptionSelect(index)}
						style={[
							styles.choice,
							currentQuestion.multiSelect &&
								selectedOptions.includes(index) &&
								styles.selectedChoice,
							!currentQuestion.multiSelect &&
								selectedOptionIndex === index &&
								styles.selectedChoice,
						]}>
						<Text style={styles.text}>{option}</Text>
					</TouchableOpacity>
				))}
			{currentQuestion.input && (
				<TextInput
					style={styles.input}
					onChangeText={handleUsernameChange}
					value={username}
					placeholder='Enter your username'
				/>
			)}
			<TouchableOpacity
				disabled={isDisabled}
				onPress={handleQuestionSelect}
				style={[
					styles.button,
					{ backgroundColor: isDisabled ? "#b6a6bd" : "#5316B6" },
				]}>
				<Text style={styles.buttonText}>Continue</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	choice: {
		width: 350,
		height: 50,
		backgroundColor: "white",
		borderRadius: 16,
		marginBottom: 15,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "transparent",
	},
	selectedChoice: {
		borderColor: "#5316B6",
		borderWidth: 2,
	},
	text: {
		color: "#5316B6",
		textAlign: "center",
		padding: 15,
		fontWeight: "400",
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		color: "#5316B6",
		marginBottom: 20,
		textAlign: "center",
	},
	input: {
		width: 350,
		height: 50,
		backgroundColor: "white",
		borderRadius: 16,
		marginBottom: 15,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: "transparent",
	},
	button: {
		width: 350,
		height: 50,
		borderRadius: 16,
		marginTop: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});
