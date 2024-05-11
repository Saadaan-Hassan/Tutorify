import { View } from "react-native";
import React from "react";
import { Avatar, Card, Divider } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import { commonStyles } from "../styles/commonStyles";
import useAuth from "../utils/hooks/useAuth";
import { useUser } from "../utils/context/UserContext";

const LeftContent = (props) => (
	<Avatar.Image
		{...props}
		source={require("../../assets/img/avatar/user1.png")}
		size={80}
	/>
);

export default function ProfileScreen() {
	const { user } = useUser();
	const { logOut } = useAuth();

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
				left={LeftContent}
				leftStyle={{ marginRight: 60 }}
			/>

			<CustomButton title='Edit Profile' style={styles.editButton} />

			<View style={{ marginTop: 20 }}>
				<CustomButton
					icon={"account"}
					title='Account'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					textColor={commonStyles.colors.primary}
				/>
				<Divider />
				<CustomButton
					icon={"lock"}
					title='Password'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					textColor={commonStyles.colors.primary}
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
					icon={"credit-card"}
					title='Payments'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					textColor={commonStyles.colors.primary}
				/>
				<Divider />
				<CustomButton
					icon={"help-circle"}
					title='Help'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					textColor={commonStyles.colors.primary}
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
		</View>
	);
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: commonStyles.colors.neutral,
	},

	editButton: {
		width: "35%",
		fontSize: 18,
		alignSelf: "flex-end",
		marginRight: 20,
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
