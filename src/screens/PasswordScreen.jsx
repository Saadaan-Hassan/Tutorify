import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { commonStyles, scaleFactor } from "../styles/commonStyles";
import CustomButton from "../components/custom/CustomButton";
import CustomInput from "../components/custom/CustomInput";
import useAuth from "../utils/hooks/useAuth";
import { useUser } from "../utils/context/UserContext";

export default function ProfilePassword() {
	const { resetPassword, error } = useAuth();
	const { loading } = useUser();
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
			{loading && (
				<View style={commonStyles.loadingOverlay}>
					<ActivityIndicator size='large' color={commonStyles.colors.primary} />
				</View>
			)}
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
			<View style={styles.centered}>
				<Text style={commonStyles.title}>Setup New Password</Text>
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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: commonStyles.colors.background,
		alignItems: "center",
		paddingTop: 50 * scaleFactor,
		position: "relative",
	},
	centered: {
		marginVertical: 10 * scaleFactor,
	},
	errorText: {
		color: "red",
	},
});
