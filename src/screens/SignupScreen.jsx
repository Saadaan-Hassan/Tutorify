import { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomLink from "../components/CustomLink";
import CustomInput from "../components/CustomInput";
import { Checkbox } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";

export default function SignupScreen({ navigation }) {
	const [checked, setChecked] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSignup = () => {
		console.log("Email: ", email);
		console.log("Password: ", password);
		console.log("Confirm Password: ", confirmPassword);
		navigation.navigate("TabNavigator");
	};

	return (
		<SafeAreaView style={styles.container}>
			<Image
				source={require("../../assets/img/logo.webp")}
				style={commonStyles.logo}
			/>
			<View>
				<Text style={styles.title}>Create an account</Text>
				<Text style={styles.subtitle}>
					Enter the required details to create an account and find the right
					tutor for you
				</Text>
			</View>

			<CustomInput label='Email' placeholder='Enter your email' type='email' />
			<CustomInput
				label='Password'
				placeholder='Enter your password'
				type='password'
			/>
			<CustomInput
				label='Confirm Password'
				placeholder='Confirm your password'
				type='password'
			/>

			<View style={styles.section}>
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
						By signing up,I understand and agree to{" "}
						<Text
							style={{
								color: commonStyles.colors.primary,
								fontWeight: "bold",
							}}>
							Terms of Service
						</Text>
					</Text>
				</View>

				<CustomButton
					title='Create an account'
					mode='contained-tonal'
					onPress={() => handleSignup()}
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
						text='I already have an account'
						buttonStyle={{
							textAlign: "center",
							position: "absolute",
							bottom: -50,
							left: "24%",
						}}
						onPress={() => {
							console.log("I already have an account pressed");
							navigation.navigate("Login");
						}}
					/>
				</View>
			</View>
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
});
