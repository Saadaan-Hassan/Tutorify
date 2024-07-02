// This component uses the google maps API to display a map with markers for nearby users in the production mode. But google maps API is not available right now. So i have created a new compoenet using the rnmapbox/maps that uses the mapbox API to display a map with markers for nearby users. The new component is UserSearchScreen.jsx. The new component is similar to the UserSearchScreen2.jsx but uses the mapbox API instead of the google maps API.

import React, { useEffect, useState, useRef, useMemo } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Text, ActivityIndicator, Divider } from "react-native-paper";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useUser } from "../utils/context/UserContext";
import UserDetailModal from "../components/UserDetailModal";
import { commonStyles } from "../styles/commonStyles";
import { haversineDistance } from "../utils/helpers";
import UserListItem from "../components/UserListItem";
import { Picker } from "@react-native-picker/picker";

const { width } = Dimensions.get("window");
const markerSize = width * 0.1;

const UserSearchScreen = () => {
	const { otherUsers, user } = useUser();
	const location = user?.location?.coordinates || null;
	const [nearbyUsers, setNearbyUsers] = useState([]);
	const [filter, setFilter] = useState("all");
	const [selectedUser, setSelectedUser] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const mapRef = useRef(null);
	const bottomSheetRef = useRef(null);
	const snapPoints = useMemo(() => ["10%", "48%"], []);

	useEffect(() => {
		if (location) {
			setNearbyUsers(
				otherUsers
					.filter((otherUser) => otherUser?.location?.coordinates)
					.map((otherUser) => ({
						...otherUser,
						distance: haversineDistance(
							location,
							otherUser?.location?.coordinates
						),
					}))
					.sort((a, b) => a.distance - b.distance)
			);
		}
	}, [location, otherUsers]);

	const handleUserPress = (user) => {
		setSelectedUser(user);
		mapRef.current.animateToRegion({
			latitude: user.location.coordinates.latitude,
			longitude: user.location.coordinates.longitude,
			latitudeDelta: 0.005,
			longitudeDelta: 0.005,
		});
	};

	const handleMarkerPress = (user) => {
		setSelectedUser(user);
		setModalVisible(true);
	};

	const filterUsers = (users, filter) => {
		if (filter === "all") return users;
		const distanceLimit = parseInt(filter);
		return users.filter((user) => user.distance <= distanceLimit);
	};

	if (!location) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator
					animating={true}
					color={commonStyles.colors.primary}
					size='large'
				/>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.map}
				initialRegion={{
					latitude: location.latitude,
					longitude: location.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}>
				<Marker
					coordinate={{
						latitude: location.latitude,
						longitude: location.longitude,
					}}
					title='You'
				/>
				{nearbyUsers.map((user) => (
					<Marker
						key={user.id}
						coordinate={{
							latitude: user.location.coordinates.latitude,
							longitude: user.location.coordinates.longitude,
						}}
						title={user.username}
						onPress={() => handleMarkerPress(user)}>
						<View
							style={[
								styles.markerContainer,
								{ width: markerSize, height: markerSize },
							]}>
							<Image
								style={[
									styles.markerImage,
									{ width: markerSize, height: markerSize },
								]}
								source={
									user.profileImage
										? { uri: user.profileImage }
										: require("../../assets/img/avatar/avatar.jpg")
								}
							/>
						</View>
					</Marker>
				))}
			</MapView>
			<BottomSheet
				ref={bottomSheetRef}
				index={1}
				snapPoints={snapPoints}
				style={styles.bottomSheet}>
				<View style={styles.contentContainer}>
					<View style={styles.header}>
						<Text variant='headlineMedium' style={styles.drawerTitle}>
							📍 Nearby Users within {filter} km radius
						</Text>
						<Picker
							selectedValue={filter}
							onValueChange={(itemValue) => setFilter(itemValue)}
							style={styles.picker}>
							<Picker.Item label='Anywhere' value='all' />
							<Picker.Item label='Within 5 km' value='5' />
							<Picker.Item label='Within 10 km' value='10' />
							<Picker.Item label='Within 15 km' value='15' />
						</Picker>
					</View>

					<Divider />

					<BottomSheetFlatList
						data={filterUsers(nearbyUsers, filter)}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<UserListItem user={item} onPress={() => handleUserPress(item)} />
						)}
						contentContainerStyle={styles.listContent}
					/>
				</View>
			</BottomSheet>
			<UserDetailModal
				visible={modalVisible}
				user={selectedUser}
				onClose={() => setModalVisible(false)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		flex: 1,
	},
	markerContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	markerImage: {
		borderRadius: 100,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomSheet: {
		flex: 1,
	},
	contentContainer: {
		flex: 1,
	},
	listContent: {
		paddingBottom: 16,
	},
	header: {
		paddingHorizontal: 16,
	},
	picker: {
		height: 50,
		width: "100%",
	},
	drawerTitle: {
		fontSize: 18,
		fontWeight: "bold",
		paddingVertical: 8,
	},
});

export default UserSearchScreen;
