import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomLink from "../components/CustomLink";
import CustomInput from "../components/CustomInput";
import { commonStyles } from "../styles/commonStyles";

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		console.log("Email: ", email);
		console.log("Password: ", password);
		navigation.navigate("TabNavigator");
	};

	return (
		<SafeAreaView style={styles.container}>
			<Image
				source={require("../../assets/img/logo.webp")}
				style={commonStyles.logo}
			/>
			<View>
				<Text style={styles.title}>Welcome back</Text>
				<Text style={styles.subtitle}>
					Enter the required to access your account and find the right tutor for
					you
				</Text>
			</View>

			<CustomInput
				label='Email'
				placeholder='Enter your email'
				value={email}
				type='email'
				onChangeText={setEmail}
			/>
			<CustomInput
				label='Password'
				placeholder='Enter your password'
				type='password'
				value={password}
				onChangeText={setPassword}
			/>

			<View style={styles.section}>
				<CustomLink
					text='Forgot password?'
					labelStyle={{ marginEnd: 5 }}
					onPress={() => console.log("Forgot password pressed")}
				/>

				<CustomButton
					title='Login'
					mode='contained-tonal'
					onPress={() => handleLogin()}
				/>

				<Text style={styles.orText}>OR</Text>

				<CustomButton
					title={"Continue with Google"}
					icon='google'
					mode='outlined'
					onPress={() => {
						console.log("Continue with Google pressed");
					}}
				/>

				<View style={{ position: "relative", marginTop: 20 }}>
					<CustomLink
						text="I don't have an account"
						buttonStyle={{
							textAlign: "center",
							position: "absolute",
							bottom: -100,
							left: "24%",
						}}
						labelStyle={{ fontSize: 18 }}
						onPress={() => {
							navigation.navigate("Signup");
							console.log("I don't have an account pressed");
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
		fontWeight: "bold",
		fontSize: 16,
	},
});
