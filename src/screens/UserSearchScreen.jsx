import React, { useEffect, useState, useRef, useMemo } from "react";
import {
	StyleSheet,
	View,
	Image,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import Mapbox from "@rnmapbox/maps";
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
	const cameraRef = useRef(null);
	const bottomSheetRef = useRef(null);
	const snapPoints = useMemo(() => ["10%", "45%"], []);

	useEffect(() => {
		// Filter users based on location and preferred mode
		if (location) {
			const updatedNearbyUsers = otherUsers
				.filter(
					(otherUser) =>
						otherUser?.location?.coordinates &&
						otherUser.preferredMode == "In-person"
				)
				.map((otherUser) => ({
					...otherUser,
					distance: haversineDistance(
						location,
						otherUser?.location?.coordinates
					),
				}))
				.sort((a, b) => a.distance - b.distance);

			setNearbyUsers(updatedNearbyUsers);
		}
	}, [location, otherUsers]);

	// Function to handle selecting a user from the list
	const handleUserPress = (user) => {
		setSelectedUser(user);
		cameraRef.current.setCamera({
			centerCoordinate: [
				user.location.coordinates.longitude,
				user.location.coordinates.latitude,
			],
			zoomLevel: 10,
			animationDuration: 2000,
		});
	};

	const handleMarkerPress = (user) => {
		setSelectedUser(user);
		setModalVisible(true);
	};

	// Function to filter users based on distance
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
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{/* Map */}
			<Mapbox.MapView
				key={nearbyUsers.length}
				ref={mapRef}
				style={styles.map}
				styleURL={Mapbox.StyleURL.Street}
				logoEnabled={false}
				attributionEnabled={false}
				compassEnabled={true}
				compassViewPosition={3}>
				<Mapbox.Camera
					ref={cameraRef}
					centerCoordinate={[location.longitude, location.latitude]}
					zoomLevel={8}
				/>
				<Mapbox.PointAnnotation
					id='userLocation'
					title='You'
					coordinate={[location.longitude, location.latitude]}
				/>
				{nearbyUsers.map((user) => (
					<Mapbox.MarkerView
						key={user.id}
						coordinate={[
							user.location.coordinates.longitude,
							user.location.coordinates.latitude,
						]}>
						<TouchableOpacity onPress={() => handleMarkerPress(user)}>
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
						</TouchableOpacity>
					</Mapbox.MarkerView>
				))}
			</Mapbox.MapView>

			{/* Bottom Sheet */}
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

			{/* User Detail Modal */}
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
