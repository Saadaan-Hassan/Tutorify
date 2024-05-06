import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { commonStyles } from "../styles/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-paper";

const questions = [
  {
    id: 1,
    question: 'Are you a student or a teacher?',
    options: ['Student', 'Teacher'],
    multiSelect: false
  },
  {
    id: 2,
    question: 'Select your level of education',
    options: ['Primary School (1-5)', 'Middle School (6-8)', 'Matriculation/O-level', 'Intermediate/A-level'],
    multiSelect: false
  },
  {
    id: 3,
    question: 'Select the subjects you need the tutor for',
    options: ['Maths', 'Science', 'English', 'History', 'Geography', 'Social Studies', 'Other'],
    multiSelect: true
  },
];

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Enable the Continue button if an option is selected
    setIsDisabled(selectedOptionIndex === null && selectedOptions.length === 0);
  }, [selectedOptionIndex, selectedOptions]);

  const handleOptionSelect = (index) => {
    if (currentQuestion.multiSelect) {
      // For questions where multiple selections are allowed
      // Toggle the selection state of the option
      const newSelectedOptions = [...selectedOptions];
      if (newSelectedOptions.includes(index)) {
        // Deselect the option if it's already selected
        newSelectedOptions.splice(newSelectedOptions.indexOf(index), 1);
      } else {
        // Select the option if it's not already selected
        newSelectedOptions.push(index);
      }
      setSelectedOptions(newSelectedOptions);
    } else {
      // For questions where only one selection is allowed
      setSelectedOptionIndex(index);
    }
  };

  const handleQuestionSelect = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedOptions([]);
      setSelectedOptionIndex(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate("EmailVerify");
      console.log("Registration Successful");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleOptionSelect(index)}
          style={[
            styles.choice,
            selectedOptionIndex === index && styles.selectedChoice
          ]}
        >
          <Text style={selectedOptionIndex === index ? styles.selectedText : styles.normalText}>{option}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        disabled={isDisabled}
        onPress={handleQuestionSelect}
        style={[
          styles.button,
          { backgroundColor: isDisabled ? '#b6a6bd' : '#5316B6' }
        ]}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  choice: {
    width: 350,
    height: 50,
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedChoice: {
    borderWidth: 2,
    borderColor: commonStyles.colors.primary,
  },
  normalText: {
    color: commonStyles.colors.primary,
    textAlign: 'center',
    padding: 15,
    fontWeight: "400",
  },
  selectedText: {
    color: commonStyles.colors.primary,
    textAlign: 'center',
    padding: 15,
    fontWeight: "400",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: commonStyles.colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: 350,
    height: 50,
    borderRadius: 16,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



