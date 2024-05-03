import { TouchableOpacity, View, Text } from "react-native";
import { Avatar, Appbar } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import { commonStyles } from "../styles/commonStyles";

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
					<Appbar.Action
						icon='arrow-left'
						onPress={_goBack}
						iconColor={commonStyles.colors.primary}
						style={{ backgroundColor: commonStyles.colors.secondary }}
					/>
					<Appbar.Action
						icon='heart-outline'
						onPress={_goBack}
						iconColor={commonStyles.colors.primary}
						style={{ backgroundColor: commonStyles.colors.secondary }}
					/>
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
						iconColor={commonStyles.colors.primary}
						style={{ backgroundColor: commonStyles.colors.secondary }}
					/>
					<Appbar.Content title='Profile' style={{ marginHorizontal: "30%" }} />
				</View>
			) : (
				<>
					<Appbar.Content
						title={
							<Text
								style={{
									fontSize: 24,
									fontWeight: "500",
									color: commonStyles.colors.textSecondary,
								}}>
								Welcome{" "}
								<Text style={{ color: commonStyles.colors.textPrimary }}>
									Name
								</Text>
							</Text>
						}
						style={{ marginLeft: 10 }}
					/>
					{/* <Appbar.Action size={35} icon='account' onPress={_handleAccount} /> */}

					<TouchableOpacity onPress={_handleAccount}>
						<Avatar.Image
							size={35}
							source={require("../../assets/img/avatar/user1.png")}
							style={{ marginRight: 10 }}
						/>
					</TouchableOpacity>
				</>
			)}
		</Appbar.Header>
	);
}
