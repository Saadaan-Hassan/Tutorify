import React, { useEffect, useState, useRef, useMemo } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
	Text,
	Button,
	Divider,
	List,
	ActivityIndicator,
	Avatar,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import BottomSheet from "@gorhom/bottom-sheet";
import { useUser } from "../utils/context/UserContext";
import UserDetailModal from "../components/UserDetailModal";
import { commonStyles } from "../styles/commonStyles";

const haversineDistance = (coords1, coords2) => {
	const toRad = (x) => (x * Math.PI) / 180;
	const R = 6371; // Radius of the Earth in km

	const dLat = toRad(coords2.latitude - coords1.latitude);
	const dLon = toRad(coords2.longitude - coords1.longitude);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(coords1.latitude)) *
			Math.cos(toRad(coords2.latitude)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c;

	return distance; // distance in km
};

const { width } = Dimensions.get("window");
const markerSize = width * 0.1;

const UserSearch = () => {
	const { otherUsers, user } = useUser();
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [nearbyUsers, setNearbyUsers] = useState([]);
	const [filter, setFilter] = useState("all");
	const [selectedUser, setSelectedUser] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const mapRef = useRef(null);
	const bottomSheetRef = useRef(null);
	const snapPoints = useMemo(() => ["10%", "48%"], []);
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
			// Fetch nearby users here based on location.coords.latitude and location.coords.longitude
			setNearbyUsers(
				otherUsers
					.filter((user) => user?.location?.coordinates)
					.map((user) => ({
						...user,
						distance: haversineDistance(
							location.coords,
							user?.location?.coordinates
						),
					}))
			);
		})();
	}, []);

	const applyFilter = (filterOption) => {
		setFilter(filterOption);
	};

	const filterUsers = (users, filter) => {
		if (filter === "all") return users;
		const distanceLimit = parseInt(filter);
		return users.filter((user) => user.distance <= distanceLimit);
	};

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

	if (!location) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator
					animating={true}
					color={commonStyles.colors.primary}
					size='large'
				/>
				{errorMsg ? <Text>{errorMsg}</Text> : null}
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.map}
				initialRegion={{
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}>
				<Marker
					coordinate={{
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
					}}
					title='You'
				/>
				{filterUsers(nearbyUsers, filter).map((user) => (
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
				<View style={styles.sheetContent}>
					<Text variant='headlineMedium' style={styles.drawerTitle}>
						📍 Nearby {user?.role === "tutor" ? "Students" : "Tutors"} within{" "}
						{filter} km radius
					</Text>
					<Picker
						selectedValue={filter}
						onValueChange={(itemValue) => applyFilter(itemValue)}
						style={styles.picker}>
						<Picker.Item label='Anywhere' value='all' />
						<Picker.Item label='Within 5 km' value='5' />
						<Picker.Item label='Within 10 km' value='10' />
						<Picker.Item label='Within 15 km' value='15' />
					</Picker>
					<Divider />
					<FlatList
						data={filterUsers(nearbyUsers, filter)}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<List.Item
								title={item.username}
								description={`${item.distance.toFixed(2)} km`}
								left={(props) => (
									<Avatar.Image
										{...props}
										source={{ uri: item.profileImage }}
										size={40}
									/>
								)}
								onPress={() => handleUserPress(item)}
							/>
						)}
						ItemSeparatorComponent={() => <Divider />}
						contentContainerStyle={styles.listContent}
					/>
					{/* <Button
                        onPress={() => bottomSheetRef.current.close()}
                        mode='contained'
                        style={styles.closeButton}>
                        Close
                    </Button> */}
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
	sheetContent: {
		flexGrow: 1,
		padding: 16,
	},
	drawerTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 16,
	},
	picker: {
		height: 50,
		width: "100%",
	},
	closeButton: {
		marginTop: 16,
	},
	listContent: {
		paddingBottom: 16,
	},
});

export default UserSearch;
