import React, { useEffect, useState } from "react";
import { View, StyleSheet, RefreshControl, FlatList } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";

const NotificationsScreen = () => {
	const [notifications, setNotifications] = useState([]);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchNotifications();
	}, []);

	const fetchNotifications = async () => {
		try {
			// Mock data for demonstration
			const mockNotifications = [
				{
					id: "1",
					title: "New Message",
					body: "You have a new message from John Doe",
				},
				{
					id: "2",
					title: "New Tutor",
					body: "A new tutor has signed up on Tutorify",
				},
				{
					id: "3",
					title: "Profile Update",
					body: "Your profile has been updated successfully",
				},
			];
			setNotifications(mockNotifications);
		} catch (error) {
			console.error("Error fetching notifications:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleRefresh = async () => {
		setIsRefreshing(true);
		await fetchNotifications();
		setIsRefreshing(false);
	};

	const renderNotificationItem = ({ item }) => (
		<List.Item
			title={item.title}
			description={item.body}
			titleStyle={styles.title}
			descriptionStyle={styles.body}
			style={styles.notificationItem}
			left={(props) => <List.Icon {...props} icon='bell' />}
		/>
	);

	return (
		<View style={styles.container}>
			{loading ? (
				<ActivityIndicator size='large' color={commonStyles.colors.primary} />
			) : (
				<FlatList
					data={notifications}
					renderItem={renderNotificationItem}
					keyExtractor={(item) => item.id}
					refreshControl={
						<RefreshControl
							refreshing={isRefreshing}
							onRefresh={handleRefresh}
						/>
					}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: commonStyles.colors.background,
		paddingTop: 10,
	},
	notificationItem: {
		backgroundColor: commonStyles.colors.cardBackground,
		marginVertical: 5,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		color: commonStyles.colors.textPrimary,
	},
	body: {
		fontSize: 14,
		color: commonStyles.colors.textSecondary,
	},
});

export default NotificationsScreen;
