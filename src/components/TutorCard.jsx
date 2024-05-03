import React from "react";
import { Card, Avatar, Button, Icon } from "react-native-paper";
import { Text, View, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function TutorCard() {
	const cardWidth = (width - 70) / 2;

	return (
		<Card mode='contained' style={[styles.card, { width: cardWidth }]}>
			<Card.Cover
				source={require("../../assets/img/logo.webp")}
				style={styles.cardImg}
			/>
			<Card.Content style={styles.cardBody}>
				<Text style={styles.title}>Omowumi John</Text>
				<View style={styles.ratingContainer}>
					{[...Array(5)].map((_, index) => (
						<Icon key={index} source='star' size={20} color='#F3CA52' />
					))}
				</View>
				<View style={styles.subjectsContainer}>
					<Text style={styles.subjectText}>Mathematics</Text>
					<Text style={styles.subjectText}>Biology</Text>
					<Text style={styles.subjectText}>Physics</Text>
				</View>
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		margin: 5,
		marginHorizontal: 8,
		borderRadius: 20,
		backgroundColor: "#F6E9B2",
	},

	cardImg: {
		height: 56,
		width: 56,
		alignSelf: "center",
		marginTop: 16,
		marginBottom: 10,
		borderRadius: 100,
	},

	title: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#0A6847",
		textAlign: "center",
	},

	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		flexWrap: "wrap",
		marginVertical: 10,
	},

	subjectsContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		flexWrap: "wrap",
	},

	subjectText: {
		marginRight: 10,
		fontSize: 12,
	},
});
