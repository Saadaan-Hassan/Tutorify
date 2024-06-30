import React from "react";
import { List, Avatar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

const UserListItem = ({ user, onPress }) => (
	<>
		<List.Item
			title={user.username}
			description={`${user.distance.toFixed(2)} km`}
			left={(props) => (
				<Avatar.Image
					{...props}
					source={{ uri: user.profileImage }}
					size={40}
				/>
			)}
			onPress={onPress}
			style={styles.listItem}
		/>
		<Divider />
	</>
);

const styles = StyleSheet.create({
	listItem: {
		paddingVertical: 8,
	},
});

export default UserListItem;
