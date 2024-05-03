import { TouchableOpacity, View } from "react-native";
import { Avatar, Appbar } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function Header() {
	const route = useRoute();
	const navigation = useNavigation();

	const _goBack = () => navigation.goBack();

	const _handleAccount = () => navigation.navigate("Profile");

	const _handleMore = () => console.log("Shown more");

	return (
		<Appbar.Header mode='small'>
			{route.name === "TutorDetail" ? (
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}>
					<Appbar.Action icon='arrow-left' onPress={_goBack} />
					<Appbar.Action icon='heart-outline' onPress={_goBack} />
				</View>
			) : route.name === "Profile" ? (
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}>
					<Appbar.Action
						icon='arrow-left'
						onPress={_goBack}
						style={{ backgroundColor: "lightgreen" }}
					/>
					<Appbar.Content title='Profile' style={{ marginHorizontal: "30%" }} />
				</View>
			) : (
				<>
					<Appbar.Content title='Welcome Name' style={{ marginLeft: 10 }} />
					{/* <Appbar.Action size={35} icon='account' onPress={_handleAccount} /> */}

					<TouchableOpacity onPress={_handleAccount}>
						<Avatar.Image
							size={35}
							source={require("../../assets/img/avatar/avatar.jpg")}
							style={{ marginRight: 10 }}
						/>
					</TouchableOpacity>
				</>
			)}
		</Appbar.Header>
	);
}
