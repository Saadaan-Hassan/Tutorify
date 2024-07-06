import { StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { commonStyles } from "../styles/commonStyles";

const NotificationItem = ({ title, body }) => {
	return (
		<List.Item
			title={title}
			description={body}
			titleStyle={styles.title}
			descriptionStyle={styles.body}
			style={styles.notificationItem}
			left={(props) => <List.Icon {...props} icon='bell' />}
		/>
	);
};

const styles = StyleSheet.create({
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

export default NotificationItem;
