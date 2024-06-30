import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";
import useAuth from "../utils/hooks/useAuth";
import { useUser } from "../utils/context/UserContext";
import { useNavigation } from "@react-navigation/native";

const LeftContent = ({ profileImage }) => (
	<Avatar.Image
		source={
			profileImage
				? { uri: profileImage }
				: require("../../assets/img/avatar/avatar.jpg")
		}
		size={80 * scaleFactor}
		style={{
			borderWidth: 3 * scaleFactor,
			borderColor: commonStyles.colors.primary,
		}}
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
		<ScrollView contentContainerStyle={styles.container}>
			<Card.Title
				title={user?.username}
				subtitle={user?.level}
				style={{
					marginVertical: 20 * scaleFactor,
				}}
				titleStyle={{
					fontSize: responsiveFontSize(8),
					fontWeight: "bold",
					minHeight: 20 * scaleFactor,
					color: commonStyles.colors.textPrimary,
				}}
				subtitleStyle={{
					fontSize: responsiveFontSize(6),
					color: commonStyles.colors.textSecondary,
				}}
				left={() => (
					<LeftContent
						profileImage={user?.profileImage ? user?.profileImage : null}
					/>
				)}
				leftStyle={{ marginRight: 60 * scaleFactor }}
			/>

			<View style={{ marginTop: 20 * scaleFactor }}>
				<CustomButton
					icon={"account"}
					title='Account'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					labelStyle={{ fontSize: responsiveFontSize(7) }}
					textColor={commonStyles.colors.primary}
					onPress={() => navigation.navigate("Account")}
				/>
				<Divider />
				<CustomButton
					icon={"lock"}
					title='Password'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					labelStyle={{ fontSize: responsiveFontSize(7) }}
					textColor={commonStyles.colors.primary}
					onPress={showDialog}
				/>
				<Divider />
				<CustomButton
					icon={"shield-account"}
					title='Privacy Policy'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					labelStyle={{ fontSize: responsiveFontSize(7) }}
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
					labelStyle={{ fontSize: responsiveFontSize(7) }}
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
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: commonStyles.colors.neutral,
	},
	button: {
		width: "100%",
		borderRadius: 0,
		marginTop: 10 * scaleFactor,
		paddingTop: 5 * scaleFactor,
		marginBottom: 0,
		height: 50 * scaleFactor,
		backgroundColor: commonStyles.colors.neutral,
	},
});
