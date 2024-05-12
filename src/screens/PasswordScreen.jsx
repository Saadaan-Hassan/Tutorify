import React from "react";
import { View, StyleSheet} from "react-native";
import { Appbar } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { Avatar, Button, Card, Divider, Text, Dialog, Portal, TextInput } from 'react-native-paper';


export default function ProfilePassword() {
return (
	<View style={styles.container}>
		<View>
		
			<CustomInput
				label="New Password"
				placeholder="Enter Your Password"
				value=""
				onChangeText={(text) => console.log(text)}
			/>
			<CustomInput
				label="Confirm Password"
				placeholder="Confirm Your Password"
				value=""
				onChangeText={(text) => console.log(text)}
			/>
		</View>

		<View style={styles.centered}>
			<CustomButton
				title='Confirm'
				style={styles.editButton}
			/>
		</View>
	</View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.colors.neutral,
    alignItems: "center",
	// justifyContent: "center",
    paddingHorizontal: 20,
  },
  editButton: {
    width: "35%",
    fontSize: 18,
  },
  emailTitle: {
    color: commonStyles.colors.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
    textAlign: "center",
    flexGrow: 1,
  },
});
