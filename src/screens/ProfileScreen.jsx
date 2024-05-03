import { View } from "react-native";
import React from "react";
import { Avatar, Button, Card, Divider, Text } from "react-native-paper";
import CustomButton from "../components/CustomButton";

const LeftContent = (props) => (
	<Avatar.Image
		{...props}
		source={require("../../assets/img/avatar/avatar.jpg")}
		size={80}
	/>
);

export default function ProfileScreen() {
	return (
		<View>
			<Card.Title
				title='Damilola John'
				subtitle='High school student'
				style={{
					marginVertical: 20,
				}}
				titleStyle={{ fontSize: 24, fontWeight: "bold", minHeight: 25 }}
				subtitleStyle={{ fontSize: 16, color: "#656466" }}
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
					textColor='#120E1A'
				/>
				<Divider />
				<CustomButton
					icon={"lock"}
					title='Password'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					textColor='#120E1A'
				/>
				<Divider />
				<CustomButton
					icon={"bell"}
					title='Notifications'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					textColor='#120E1A'
				/>
				<Divider />
				<CustomButton
					icon={"credit-card"}
					title='Payments'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					textColor='#120E1A'
				/>
				<Divider />
				<CustomButton
					icon={"help-circle"}
					title='Help'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					textColor='#120E1A'
				/>
				<Divider />
				<CustomButton
					icon={"power"}
					title='Logout'
					style={styles.button}
					contentStyle={{ justifyContent: "flex-start" }}
					textColor='#FF6584'
				/>
			</View>
		</View>
	);
}

const styles = {
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#F6F6F6",
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
		backgroundColor: "#FAF6FD",
	},
};
