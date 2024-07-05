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
			navigation.navigate("TabNavigator");
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

	const renderHeaderContent = (title, actionIcon, actionHandler) => (
		<View style={styles.headerContainer}>
			{renderBackButton()}
			<Appbar.Content
				title={title}
				style={[
					styles.profileTitle,
					actionIcon ? {} : { marginLeft: -45 * scaleFactor },
				]}
			/>
			{actionIcon && (
				<Appbar.Action
					icon={actionIcon}
					onPress={actionHandler}
					iconColor={commonStyles.colors.primary}
					style={{ backgroundColor: commonStyles.colors.secondary }}
				/>
			)}
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

	const getHeaderContent = () => {
		switch (route.name) {
			case "TutorDetail":
				return renderHeaderContent(null, "heart-outline", handleMore);
			case "Profile":
			case "Account":
				return renderHeaderContent("Profile");
			case "Password":
				return renderHeaderContent("Password");
			case "Settings":
				return renderHeaderContent("Settings");
			case "PrivacyScreen":
				return renderHeaderContent("Privacy Policy");
			case "ChatDetail":
				return renderHeaderContent(
					route.params.user.username,
					"phone-outline",
					handleMore
				);
			default:
				return renderDefaultHeader();
		}
	};

	return (
		<Appbar.Header mode='small' style={styles.appbarHeader}>
			{getHeaderContent()}
		</Appbar.Header>
	);
}

const styles = StyleSheet.create({
	appbarHeader: {
		backgroundColor: commonStyles.colors.neutral,
	},
	headerContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	profileTitle: {
		alignItems: "center",
		justifyContent: "center",
	},
	welcomeText: {
		fontSize: responsiveFontSize(0.65),
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
