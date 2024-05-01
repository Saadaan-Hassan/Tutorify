import { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomLink from "../components/CustomLink";
import CustomInput from "../components/CustomInput";
import { Checkbox } from "react-native-paper";

export default function SignupScreen({ navigation }) {
	const [checked, setChecked] = useState(false);

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.title}>Create an account</Text>
				<Text style={styles.subtitle}>
					Enter the required details to create an account and find the right
					tutor for you
				</Text>
			</View>

			<CustomInput label='Email' placeholder='Enter your email' />
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
						color='#0A6847'
					/>
					<Text
						style={{
							color: "#0A6847",
							fontSize: 16,
							width: "90%",
							paddingLeft: 10,
						}}>
						By signing up,I understand and agree to{" "}
						<Text style={{ color: "#0A6847", fontWeight: "bold" }}>
							Terms of Service
						</Text>
					</Text>
				</View>

				<CustomButton
					title='Create an account'
					textColor='#F6E9B2'
					mode='contained-tonal'
					onPress={() => console.log("Login button pressed")}
				/>

				<Text style={styles.orText}>OR</Text>

				<CustomButton
					title={"Continue with Google"}
					textColor='#0A6847'
					mode='outlined'
					icon='google'
					onPress={() => {
						console.log("Continue with Google pressed");
					}}
				/>

				<View style={{ position: "relative", marginTop: 20 }}>
					<CustomLink
						text='I already have an account'
						style={{
							textAlign: "center",
							fontSize: 18,
							position: "absolute",
							bottom: -100,
							left: "25%",
						}}
						onPress={() => {
							navigation.navigate("Login");
							console.log("I already have an account pressed");
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
		backgroundColor: "#F6E9B269",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
		color: "#0A6847",
	},
	subtitle: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
	orText: {
		textAlign: "center",
		marginBottom: 10,
		fontWeight: "bold",
		fontSize: 16,
	},
});
