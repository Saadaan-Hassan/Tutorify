import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import useAuth from "../utils/hooks/useAuth";

export default function ProfilePassword() {
	const { resetPassword, error } = useAuth();
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorText, setErrorText] = useState("");

	const handleResetPassword = () => {
		if (newPassword === "" || confirmPassword === "") {
			setErrorText("Please fill in all fields");
			return;
		}

		if (newPassword !== confirmPassword) {
			setErrorText("Passwords do not match");
			return;
		}

		resetPassword(newPassword);

		setNewPassword("");
		setConfirmPassword("");
	};

	return (
		<View style={styles.container}>
			<View style={styles.centered}>
				<Text style={styles.title}>Setup New Password</Text>
			</View>

			<View>
				<CustomInput
					label='New Password'
					placeholder='Enter Your Password'
					value={newPassword}
					error={error}
					onChangeText={setNewPassword}
				/>
				<CustomInput
					label='Confirm Password'
					placeholder='Confirm Your Password'
					value={confirmPassword}
					error={error}
					onChangeText={setConfirmPassword}
				/>
			</View>

			<View style={styles.centered}>
				<CustomButton title='Confirm' onPress={handleResetPassword} />
			</View>

			<View style={styles.centered}>
				<Text style={styles.errorText}>{error || errorText}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: commonStyles.colors.background,
		alignItems: "center",
		paddingTop: 50,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		color: commonStyles.colors.primary,
	},
	centered: {
		marginVertical: 10,
	},
	errorText: {
		color: "red",
	},
});
