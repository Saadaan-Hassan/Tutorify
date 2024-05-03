import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Appbar } from "react-native-paper";

export default function Header() {
	const _goBack = () => console.log("Went back");

	const _handleAccount = () => console.log("Opening account");

	const _handleMore = () => console.log("Shown more");

	return (
		<Appbar.Header>
			<Appbar.Content title='Welcome Name' />
			<TouchableOpacity onPress={_handleAccount}>
				<Avatar.Image
					size={35}
					source={require("../../assets/img/avatar/avatar.jpg")}
					style={{ marginRight: 10 }}
				/>
			</TouchableOpacity>
			{/* <Appbar.Action size={35} icon='account' onPress={_handleAccount} /> */}
		</Appbar.Header>
	);
}
