import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	FlatList,
	TextInput,
} from "react-native";
import { IconButton, Chip } from "react-native-paper";
import { commonStyles, scaleFactor } from "../styles/commonStyles";
import CustomInput from "./custom/CustomInput";
import CustomButton from "./custom/CustomButton";

const SubjectSelector = ({ subjects, setSubjects }) => {
	const [newSubject, setNewSubject] = useState("");

	const addSubject = () => {
		if (newSubject.trim() !== "" && !subjects.includes(newSubject.trim())) {
			setSubjects([...subjects, newSubject.trim()]);
			setNewSubject("");
		}
	};

	const removeSubject = (subject) => {
		setSubjects(subjects.filter((item) => item !== subject));
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Subjects:</Text>
			<View style={styles.inputContainer}>
				<CustomInput
					inputStyle={styles.input}
					placeholder='Add a subject'
					value={newSubject}
					onChangeText={setNewSubject}
					onSubmitEditing={addSubject}
				/>
				<IconButton
					icon='plus'
					onPress={addSubject}
					iconColor={commonStyles.colors.secondary}
					containerColor={commonStyles.colors.primary}
				/>
			</View>
			<FlatList
				data={subjects}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<Chip style={styles.chip} onClose={() => removeSubject(item)}>
						{item}
					</Chip>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 300 * scaleFactor,
		marginBottom: 20 * scaleFactor,
	},
	label: {
		fontSize: 16 * scaleFactor,
		fontWeight: "bold",
		marginBottom: 5 * scaleFactor,
		color: commonStyles.colors.primary,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	input: {
		width: 260 * scaleFactor,
	},
	chip: {
		marginRight: 5 * scaleFactor,
		backgroundColor: commonStyles.colors.secondary,
		color: commonStyles.colors.primary,
	},
});

export default SubjectSelector;
