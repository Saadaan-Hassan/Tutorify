import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
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
import CustomButton from "../components/custom/CustomButton";
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
		size={100 * scaleFactor}
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
			<Card.Title
				title={user?.username}
				subtitle={user?.level}
				style={{
					marginVertical: 70 * scaleFactor,
				}}
				titleStyle={{
					fontSize: responsiveFontSize(10),
					fontWeight: "bold",
					minHeight: 20 * scaleFactor,
					color: commonStyles.colors.primary,
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
				leftStyle={{ marginRight: 80 * scaleFactor }}
			/>

			<View style={{ marginTop: 50 * scaleFactor }}>
				<CustomButton
					mode='outline'
					icon={"account"}
					title='Account'
					style={styles.button}
					contentStyle={styles.buttonContentStyle}
					labelStyle={{ fontSize: responsiveFontSize(7) }}
					textColor={commonStyles.colors.primary}
					onPress={() => navigation.navigate("Account")}
				/>
				<CustomButton
					mode='outline'
					icon={"lock"}
					title='Password'
					style={styles.button}
					contentStyle={styles.buttonContentStyle}
					labelStyle={{ fontSize: responsiveFontSize(7) }}
					textColor={commonStyles.colors.primary}
					onPress={showDialog}
				/>
				<CustomButton
					mode='outline'
					icon={"shield-account"}
					title='Privacy Policy'
					style={styles.button}
					contentStyle={styles.buttonContentStyle}
					labelStyle={{ fontSize: responsiveFontSize(7) }}
					textColor={commonStyles.colors.primary}
					onPress={() => {
						navigation.navigate("PrivacyScreen");
					}}
				/>
				<CustomButton
					icon={"power"}
					title='Logout'
					style={styles.button}
					contentStyle={styles.buttonContentStyle}
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
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: commonStyles.colors.neutral,
		position: "relative",
	},
	button: {
		width: "100%",
		borderRadius: 0,
		marginBottom: 0,
		height: 50 * scaleFactor,
		backgroundColor: commonStyles.colors.neutral,
		borderWidth: 0,
		borderBottomWidth: 1,
	},
	buttonContentStyle: {
		justifyContent: "flex-start",
		paddingVertical: 7,
	},
});
