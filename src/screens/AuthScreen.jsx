import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, StyleSheet, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomLink from "../components/CustomLink";
import CustomInput from "../components/CustomInput";
import { Checkbox } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";
import useAuth from "../utils/hooks/useAuth.js";

export default function AuthScreen() {
	const { signUp, signIn, error } = useAuth();

	const [isSignup, setIsSignup] = useState(false);
	const [checked, setChecked] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isFilled, setIsFilled] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [confirmPasswordError, setConfirmPasswordError] = useState(false);

	useEffect(() => {
		checkIsFilled();
	}, [email, password, confirmPassword, checked]);

	// Check if all the input fields are filled
	const checkIsFilled = () => {
		if (isSignup) {
			if (email && password && confirmPassword && checked) {
				setIsFilled(true);
			} else {
				setIsFilled(false);
			}
		} else {
			if (email && password) {
				setIsFilled(true);
			} else {
				setIsFilled(false);
			}
		}
	};

	// Handle authentication (sign up or sign in)
	const handleAuth = async () => {
		if (isSignup && password !== confirmPassword) {
			setConfirmPasswordError(true);
			setPasswordError(true);
			return;
		}

		if (isSignup) {
			await signUp(email, password).catch((error) => {
				if (error.code === "auth/email-already-in-use") {
					setEmailError(true);
				} else {
					setEmailError(false);
					setPasswordError(false);
					setConfirmPasswordError(false);
				}
			});
		} else {
			await signIn(email, password).catch((error) => {
				if (
					error.code === "auth/wrong-password" ||
					error.code === "auth/user-not-found"
				) {
					setPasswordError(true);
					setEmailError(true);
				} else {
					setEmailError(false);
					setPasswordError(false);
					setConfirmPasswordError(false);
				}
			});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Image
				source={require("../../assets/img/logo.webp")}
				style={commonStyles.logo}
			/>
			<View>
				<Text style={styles.title}>
					{isSignup ? "Create an account" : "Welcome back"}
				</Text>
				<Text style={styles.subtitle}>
					{isSignup
						? "Enter the required details to create an account and find the right tutor for you"
						: "Enter your credentials to access your account and find the right tutor for you"}
				</Text>
			</View>

			<CustomInput
				label='Email'
				placeholder='Enter your email'
				type='email'
				value={email}
				onChangeText={(text) => {
					setEmail(text);
					setEmailError(false);
				}}
				error={emailError}
			/>
			<CustomInput
				label='Password'
				placeholder='Enter your password'
				type='password'
				value={password}
				onChangeText={(text) => {
					setPassword(text);
					setPasswordError(false);
				}}
				error={passwordError}
			/>

			{isSignup && (
				<CustomInput
					label='Confirm Password'
					placeholder='Confirm your password'
					type='password'
					value={confirmPassword}
					onChangeText={(text) => {
						setConfirmPassword(text);
						setConfirmPasswordError(false);
					}}
					error={confirmPasswordError}
				/>
			)}

			{isSignup && (
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						width: 300,
						marginBottom: 20,
					}}>
					<Checkbox
						status={checked ? "checked" : "unchecked"}
						onPress={() => {
							setChecked(!checked);
						}}
						color={commonStyles.colors.primary}
					/>
					<Text
						style={{
							color: commonStyles.colors.textSecondary,
							fontSize: 16,
							width: "90%",
							paddingLeft: 10,
						}}>
						By signing up, I understand and agree to{" "}
						<Text
							style={{
								color: commonStyles.colors.primary,
								fontWeight: "bold",
							}}>
							Terms of Service
						</Text>
					</Text>
				</View>
			)}

			<CustomButton
				title={isSignup ? "Create an account" : "Login"}
				mode='contained-tonal'
				onPress={handleAuth}
				disabled={!isFilled}
			/>

			<Text style={styles.orText}>OR</Text>

			<CustomButton
				title={"Continue with Google"}
				mode='outlined'
				icon='google'
				onPress={() => {
					console.log("Continue with Google pressed");
				}}
			/>

			<View style={{ position: "relative", marginTop: 20 }}>
				<CustomLink
					text={
						isSignup ? "I already have an account" : "I don't have an account"
					}
					buttonStyle={{
						textAlign: "center",
					}}
					onPress={() => {
						setIsSignup(!isSignup);
						setEmailError(false);
						setPasswordError(false);
						setConfirmPasswordError(false);
					}}
				/>
			</View>

			{error && <Text style={styles.errorText}>{error}</Text>}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 40,
		position: "relative",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
		color: commonStyles.colors.primary,
	},
	subtitle: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
		color: commonStyles.colors.textSecondary,
	},
	orText: {
		textAlign: "center",
		marginBottom: 10,
		fontSize: 16,
		color: commonStyles.colors.textSecondary,
	},
	errorText: {
		color: "red",
		marginTop: 10,
	},
});
