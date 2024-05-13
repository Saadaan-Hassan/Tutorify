import React, { useState } from "react";
import { View } from "react-native";
import {
	Avatar,
	Button,
	Card,
	Divider,
	Dialog,
	Portal,
	Text,
	TextInput,
} from "react-native-paper";
import CustomButton from "../components/CustomButton";
import { commonStyles } from "../styles/commonStyles";
import useAuth from "../utils/hooks/useAuth";
import { useUser } from "../utils/context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../services/firebase";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

const LeftContent = ({ profileImage }) => (
	<Avatar.Image
		source={
			profileImage
				? { uri: profileImage }
				: require("../../assets/img/avatar/avatar.jpg")
		}
		size={80}
	/>
);

export default function ProfileScreen() {
	const { user } = useUser();
	const { logOut, confirmPassword, error } = useAuth();
	const navigation = useNavigation();

	const [visible, setVisible] = useState(false);
	const [password, setPassword] = useState("");

	const showDialog = () => setVisible(true);
	const hideDialog = () => setVisible(false);

	const checkPassword = async () => {
		confirmPassword(password);
		if (!error) {
			setPassword("");
			hideDialog();
		}
	};

	return (
		<View style={styles.container}>
			<Card.Title
				title={user?.username}
				subtitle={user?.level}
				style={{
					marginVertical: 20,
				}}
				titleStyle={{
					fontSize: 24,
					fontWeight: "bold",
					minHeight: 25,
					color: commonStyles.colors.textPrimary,
				}}
				subtitleStyle={{
					fontSize: 16,
					color: commonStyles.colors.textSecondary,
				}}
				left={() => <LeftContent profileImage={user.profileImage} />}
				leftStyle={{ marginRight: 60 }}
			/>

			<View style={{ marginTop: 20 }}>
				<CustomButton
					icon={"account"}
					title='Account'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					textColor={commonStyles.colors.primary}
					onPress={() => navigation.navigate("Account")}
				/>
				<Divider />
				<CustomButton
					icon={"lock"}
					title='Password'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					textColor={commonStyles.colors.primary}
					onPress={showDialog}
				/>
				<Divider />
				<CustomButton
					icon={"bell"}
					title='Notifications'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					textColor={commonStyles.colors.primary}
				/>
				<Divider />
				<CustomButton
					icon={"shield-account"}
					title='Privacy Policy'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					textColor={commonStyles.colors.primary}
					onPress={() => {
						navigation.navigate("PrivacyScreen");
					}}
				/>
				<Divider />
				<CustomButton
					icon={"power"}
					title='Logout'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					textColor={commonStyles.colors.tertiary}
					onPress={logOut}
				/>
			</View>

			<Portal>
				<Dialog visible={visible} onDismiss={hideDialog}>
					<Dialog.Title>Confirm Password</Dialog.Title>
					<Dialog.Content>
						<TextInput
							label='Password'
							value={password}
							onChangeText={setPassword}
							secureTextEntry
							autoFocus
						/>
						<Text style={{ color: "red" }}>{error}</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideDialog}>Cancel</Button>
						<Button onPress={checkPassword}>Confirm</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: commonStyles.colors.neutral,
	},
	button: {
		width: "100%",
		borderRadius: 0,
		marginTop: 10,
		paddingTop: 5,
		marginBottom: 0,
		height: 50,
		backgroundColor: commonStyles.colors.neutral,
	},
};
