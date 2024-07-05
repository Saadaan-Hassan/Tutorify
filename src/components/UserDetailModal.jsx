import React from "react";
import {
	View,
	Modal,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { Text, Avatar, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "./custom/CustomButton";
import {
	commonStyles,
	responsiveFontSize,
	scaleFactor,
} from "../styles/commonStyles";

const { width } = Dimensions.get("window");

const UserDetailModal = ({ visible, user, onClose }) => {
	const navigation = useNavigation();

	if (!user) {
		return null;
	}

	const onChatPress = () => {
		onClose();
		navigation.navigate("ChatDetail", { user });
	};

	const onProfilePress = () => {
		onClose();
		navigation.navigate("TutorDetail", { user });
	};

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={visible}
			onRequestClose={onClose}>
			<View style={styles.modalContainer}>
				<View style={styles.modalView}>
					<TouchableOpacity onPress={onClose} style={styles.closeButton}>
						<IconButton
							icon='close'
							size={20}
							style={{
								backgroundColor: commonStyles.colors.secondary,
							}}
							iconColor={commonStyles.colors.primary}
						/>
					</TouchableOpacity>
					<View style={styles.profileHeader}>
						<Avatar.Image
							source={{ uri: user.profileImage }}
							size={80 * scaleFactor}
							style={styles.avatar}
						/>
						<Text style={styles.username}>{user.username}</Text>
					</View>
					<View style={styles.infoContainer}>
						<View style={styles.infoItem}>
							<Text style={styles.infoLabel}>Level</Text>
							<Text style={styles.infoText}>{user.level}</Text>
						</View>
						<View style={styles.infoItem}>
							<Text style={styles.infoLabel}>Mode</Text>
							<Text style={styles.infoText}>{user.preferredMode}</Text>
						</View>
					</View>
					<View style={styles.infoContainer}>
						<View style={styles.infoItem}>
							<Text style={styles.infoLabel}>Subjects</Text>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={styles.subjectList}>
								{user.subjects.map((subject, index) => (
									<View key={index} style={styles.subjectChip}>
										<Text style={styles.subjectText}>{subject}</Text>
									</View>
								))}
							</ScrollView>
						</View>
						<View style={styles.infoItem}>
							<Text style={styles.infoLabel}>Distance</Text>
							<Text style={styles.infoText}>{user.distance.toFixed(2)} km</Text>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<CustomButton
							title='View Profile'
							onPress={onProfilePress}
							style={styles.btn}
							mode='outlined-tonal'
						/>
						<CustomButton
							title='Chat'
							onPress={onChatPress}
							style={styles.btn}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: commonStyles.colors.overlay,
	},
	modalView: {
		width: width * 0.9,
		backgroundColor: commonStyles.colors.neutral,
		borderRadius: 10 * scaleFactor,
		padding: 20 * scaleFactor,
		alignItems: "center",
		shadowColor: commonStyles.colors.primary,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		position: "relative",
	},
	profileHeader: {
		alignItems: "center",
		marginBottom: 15 * scaleFactor,
	},
	avatar: {
		position: "absolute",
		top: -50 * scaleFactor,
		borderWidth: 3 * scaleFactor,
		borderColor: commonStyles.colors.primary,
	},
	username: {
		marginTop: 50 * scaleFactor,
		fontSize: responsiveFontSize(0.7),
		fontWeight: "bold",
	},
	infoContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10 * scaleFactor,
		width: "100%",
	},
	infoLabel: {
		fontWeight: "bold",
		marginRight: 5 * scaleFactor,
		marginBottom: 2 * scaleFactor,
	},
	infoText: {
		marginBottom: 5 * scaleFactor,
	},
	subjectList: {
		flexDirection: "row",
		alignItems: "center",
	},
	subjectChip: {
		backgroundColor: commonStyles.colors.secondary,
		borderRadius: 15 * scaleFactor,
		paddingVertical: 5 * scaleFactor,
		paddingHorizontal: 10 * scaleFactor,
		marginRight: 10 * scaleFactor,
	},
	subjectText: {
		fontSize: responsiveFontSize(0.3),
		color: commonStyles.colors.primary,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginTop: 20 * scaleFactor,
	},
	btn: {
		width: "48%",
	},
	closeButton: {
		position: "absolute",
		top: 10 * scaleFactor,
		right: 10 * scaleFactor,
	},
});

export default UserDetailModal;
