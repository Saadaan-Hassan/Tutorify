import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";

export default function LoginScreen() {
	return (
		<SafeAreaView
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<View>
				<Text>Welcome back</Text>
				<Text>
					Enter the required to access your account and find the right tutor for
					you
				</Text>
			</View>

			<View>
				<Text>Email</Text>
				<TextInput placeholder='Enter your email' />
			</View>

			<View>
				<Text>Password</Text>
				<TextInput placeholder='Enter your password' />
			</View>

			<View>
				<Text>Forgot password?</Text>

				<TouchableOpacity>
					<Text>Login</Text>
				</TouchableOpacity>

				<Text>OR</Text>

				<TouchableOpacity>
					<Text>Continue with Google</Text>
				</TouchableOpacity>

				<TouchableOpacity>
					<Text>I don't have an account</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
