import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import {
	Avatar,
	Button,
	Card,
	ActivityIndicator,
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
import { useLocation } from "../utils/context/LocationContext";
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
	const { user, loading } = useUser();
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
			<Card.Title
				title={user?.username}
				subtitle={user?.level}
				style={{
					marginVertical: 70 * scaleFactor,
				}}
				titleStyle={{
					fontSize: responsiveFontSize(0.65),
					fontWeight: "bold",
					minHeight: 20 * scaleFactor,
					color: commonStyles.colors.primary,
				}}
				subtitleStyle={{
					fontSize: responsiveFontSize(0.4),
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
					labelStyle={{ fontSize: responsiveFontSize(0.5) }}
					textColor={commonStyles.colors.primary}
					onPress={() => navigation.navigate("Account")}
				/>
				<CustomButton
					mode='outline'
					icon={"cog"}
					title='Settings'
					style={styles.button}
					contentStyle={styles.buttonContentStyle}
					labelStyle={{ fontSize: responsiveFontSize(0.5) }}
					textColor={commonStyles.colors.primary}
					onPress={() => navigation.navigate("Settings")}
				/>
				<CustomButton
					mode='outline'
					icon={"lock"}
					title='Password'
					style={styles.button}
					contentStyle={styles.buttonContentStyle}
					labelStyle={{ fontSize: responsiveFontSize(0.5) }}
					textColor={commonStyles.colors.primary}
					onPress={showDialog}
				/>
				<CustomButton
					mode='outline'
					icon={"shield-account"}
					title='Privacy Policy'
					style={styles.button}
					contentStyle={styles.buttonContentStyle}
					labelStyle={{ fontSize: responsiveFontSize(0.5) }}
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
					labelStyle={{ fontSize: responsiveFontSize(0.5) }}
					textColor={commonStyles.colors.tertiary}
					onPress={logOut}
				/>
			</View>

			{/* Modal for confirming password */}
			<Portal>
				<Dialog visible={visible} onDismiss={hideDialog}>
					<Dialog.Title
						style={{
							color: commonStyles.colors.primary,
							fontSize: responsiveFontSize(0.7),
							fontWeight: "semibold",
						}}>
						Confirm Password
					</Dialog.Title>
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
						<Button
							onPress={hideDialog}
							labelStyle={{ fontSize: responsiveFontSize(0.45) }}>
							Cancel
						</Button>
						<Button
							mode='contained'
							onPress={checkPassword}
							labelStyle={{
								fontSize: responsiveFontSize(0.45),
								paddingHorizontal: 10 * scaleFactor,
							}}>
							Confirm
						</Button>
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
		borderColor: commonStyles.colors.secondary,
	},
	buttonContentStyle: {
		justifyContent: "flex-start",
		paddingVertical: 7,
	},
});
