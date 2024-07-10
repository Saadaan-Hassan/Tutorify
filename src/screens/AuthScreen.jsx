import React, { useState, useEffect } from "react";
import {
	SafeAreaView,
	Text,
	View,
	StyleSheet,
	Image,
	Dimensions,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import CustomButton from "../components/custom/CustomButton";
import CustomLink from "../components/custom/CustomLink";
import CustomInput from "../components/custom/CustomInput";
import { Checkbox, ActivityIndicator } from "react-native-paper";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";
import useAuth from "../utils/hooks/useAuth.js";
import { useUser } from "../utils/context/UserContext";

const { width } = Dimensions.get("window");

export default function AuthScreen() {
	const { signUp, signIn, error } = useAuth();
	const { loading } = useUser();

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
			<ScrollView
				style={{ flex: 1, width: "100%" }}
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}>
				{loading && (
					<View style={commonStyles.loadingOverlay}>
						<ActivityIndicator
							size='large'
							color={commonStyles.colors.primary}
						/>
					</View>
				)}
				<Image
					source={require("../../assets/img/logos/beta-logo.png")}
					style={[commonStyles.logo, styles.logo]}
				/>
				<View>
					<Text style={commonStyles.title}>
						{isSignup ? "Create an account" : "Welcome back"}
					</Text>
					<Text style={commonStyles.subtitle}>
						{isSignup
							? "Enter the required details to create an account and find the right tutor for you"
							: "Enter your credentials to access your account and find the right tutor for you"}
					</Text>
				</View>

				<KeyboardAvoidingView behavior='padding'>
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
						<View style={styles.checkboxContainer}>
							<Checkbox
								status={checked ? "checked" : "unchecked"}
								onPress={() => {
									setChecked(!checked);
								}}
								color={commonStyles.colors.primary}
							/>
							<Text style={styles.checkboxText}>
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
				</KeyboardAvoidingView>

				<CustomButton
					title={isSignup ? "Create an account" : "Login"}
					mode='contained-tonal'
					onPress={handleAuth}
					disabled={!isFilled}
					style={{ width: 290 * scaleFactor }}
				/>

				<Text style={commonStyles.orText}>OR</Text>

				<CustomButton
					title={"Continue with Google"}
					mode='outlined'
					icon='google'
					onPress={() => {
						console.log("Continue with Google pressed");
					}}
					style={styles.googleButton}
				/>

				<View style={styles.linkContainer}>
					<CustomLink
						text={
							isSignup ? "I already have an account" : "I don't have an account"
						}
						buttonStyle={styles.linkButton}
						onPress={() => {
							setIsSignup(!isSignup);
							setEmailError(false);
							setPasswordError(false);
							setConfirmPasswordError(false);
						}}
					/>
				</View>
				{error && <Text style={styles.errorText}>{error}</Text>}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: commonStyles.colors.background,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: scaleFactor * 20,
		position: "relative",
	},
	errorText: {
		color: "red",
		marginTop: scaleFactor * 10,
		fontSize: responsiveFontSize(0.5),
	},
	logo: {
		width: width * 0.4,
		height: width * 0.4,
		marginBottom: scaleFactor * 20,
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "90%",
		marginBottom: scaleFactor * 20,
	},
	checkboxText: {
		color: commonStyles.colors.textSecondary,
		fontSize: responsiveFontSize(0.42),
		width: "80%",
		paddingLeft: scaleFactor * 10,
	},
	googleButton: {
		marginTop: scaleFactor * 10,
		width: 290 * scaleFactor,
	},
	linkContainer: {
		position: "relative",
		marginTop: scaleFactor * 20,
	},
	linkButton: {
		textAlign: "center",
	},
	contentContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		padding: scaleFactor * 20,
		paddingTop: scaleFactor * 80,
	},
});
