import React from "react";
import {
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
	Dimensions,
} from "react-native";
import { Avatar, Appbar } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
	commonStyles,
	scaleFactor,
	responsiveFontSize,
} from "../styles/commonStyles";
import { useUser } from "../utils/context/UserContext";

const windowWidth = Dimensions.get("window").width;

export default function Header() {
	const route = useRoute();
	const navigation = useNavigation();
	const { user } = useUser();

	const goBack = () => {
		if (route.name === "Profile") {
			navigation.navigate("Home");
		} else {
			navigation.goBack();
		}
	};
	const handleAccount = () => navigation.navigate("Profile");
	const handleMore = () => console.log("Shown more");

	const renderBackButton = () => (
		<Appbar.Action
			icon='arrow-left'
			onPress={goBack}
			iconColor={commonStyles.colors.primary}
			style={{ backgroundColor: commonStyles.colors.secondary }}
		/>
	);

	const renderProfileHeader = () => (
		<View style={styles.headerContainer}>
			{renderBackButton()}
			<Appbar.Content title='Profile' style={styles.profileTitle} />
		</View>
	);

	const renderTutorDetailHeader = () => (
		<View style={styles.headerContainer}>
			{renderBackButton()}
			<Appbar.Action
				icon='heart-outline'
				onPress={handleMore}
				iconColor={commonStyles.colors.primary}
				style={{ backgroundColor: commonStyles.colors.secondary }}
			/>
		</View>
	);

	const renderChatHeader = () => (
		<View style={styles.headerContainer}>
			{renderBackButton()}
			<Appbar.Content title='Chat' style={styles.profileTitle} />
			<Appbar.Action
				icon='phone-outline'
				onPress={handleMore}
				iconColor={commonStyles.colors.primary}
				style={{ backgroundColor: commonStyles.colors.secondary }}
			/>
		</View>
	);

	const renderDefaultHeader = () => (
		<View style={styles.headerContainer}>
			<Appbar.Content
				title={
					<Text style={styles.welcomeText}>
						Welcome <Text style={styles.nameText}>{user?.username}</Text>
					</Text>
				}
				style={styles.defaultContent}
			/>
			<TouchableOpacity onPress={handleAccount}>
				<Avatar.Image
					size={windowWidth * 0.12}
					source={
						user?.profileImage
							? { uri: user?.profileImage }
							: require("../../assets/img/avatar/avatar.jpg")
					}
					style={styles.avatar}
				/>
			</TouchableOpacity>
		</View>
	);

	return (
		<Appbar.Header
			mode='small'
			style={{ backgroundColor: commonStyles.colors.background }}>
			{route.name === "TutorDetail" && renderTutorDetailHeader()}
			{(route.name === "Profile" ||
				route.name === "Account" ||
				route.name === "Password") &&
				renderProfileHeader()}
			{route.name === "ChatDetail" && renderChatHeader()}
			{route.name !== "TutorDetail" &&
				route.name !== "Profile" &&
				route.name !== "Account" &&
				route.name !== "Password" &&
				route.name !== "ChatDetail" &&
				renderDefaultHeader()}
		</Appbar.Header>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	profileTitle: {
		marginHorizontal: windowWidth * 0.3,
	},
	welcomeText: {
		fontSize: responsiveFontSize(8.5),
		fontWeight: "500",
		color: commonStyles.colors.textSecondary,
	},
	nameText: {
		color: commonStyles.colors.textPrimary,
	},
	defaultContent: {
		marginLeft: 10 * scaleFactor,
	},
	avatar: {
		marginRight: 10 * scaleFactor,
	},
});
