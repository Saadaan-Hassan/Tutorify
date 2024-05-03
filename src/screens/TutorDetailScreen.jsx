import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { Card, Icon } from "react-native-paper";

export default function TutorScreen() {
	return (
		<ScrollView contentContainerStyle={styles.contentContainer}>
			<Card.Cover
				source={require("../../assets/img/logo.webp")}
				style={{
					height: "30%",
				}}
			/>

			<View style={styles.container}>
				<View style={styles.sectionHeader}>
					<Text style={styles.header}>Omowumi John</Text>
					<Text style={{ fontSize: 18 }}>
						#1500/ <Text style={{ fontSize: 14 }}>per session</Text>
					</Text>
				</View>

				<View style={styles.ratingContainer}>
					{[...Array(5)].map((_, index) => (
						<Icon key={index} source='star' size={20} color='#FBBB00' />
					))}
					<Text style={{ fontSize: 12, color: "#FBBB00" }}>15 reviews</Text>
				</View>

				{/* About Section */}
				<View style={styles.section}>
					<Text style={styles.title}>About</Text>
					<Text style={[styles.para, { color: "#656466" }]}>
						I am a skilled and professional teacher with over 10 years of
						teaching students and preparing them to ace their final secondary
						school examination. I have worked in over 5 schools including LUTH
						secondary school, Idi-araba, Lagos
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.title}>Subjects</Text>
					<Text style={styles.para}>
						Mathematics, Physics, Chemistry, Biology
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.title}>Location</Text>
					<Text style={styles.para}>Lagos, Nigeria</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.title}>Availability</Text>
					<Text style={styles.para}>Monday - Friday (4pm - 6pm)</Text>
				</View>
				<Text style={styles.title}>Experience</Text>
				<Text style={styles.para}>
					I have been teaching for over 10 years and have prepared over 100
					students for their final year examination
				</Text>

				<View style={styles.section}>
					<Text style={styles.title}>Education</Text>
					<Text style={styles.para}>
						B.Sc in Mathematics, University of Lagos
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.title}>Certifications</Text>
					<Text style={styles.para}>
						Certificate in Education, University of Lagos
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.title}>Reviews</Text>
					<Text style={styles.para}>
						I have been teaching for over 10 years and have prepared over 100
						students for their final year examination
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.title}>Contact</Text>
					<Text style={styles.para}>Email: omowumijohn@gmail.com</Text>
					<Text style={styles.para}>Phone: 08012345678</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.title}>Book a session</Text>
					<CustomButton
						title='Book a session'
						style={{ width: 150, borderRadius: 20, marginTop: 20 }}
						onPress={() => console.log("Book a session pressed")}
					/>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		flexGrow: 1,
		paddingBottom: 250,
	},

	container: {
		padding: 24,
	},

	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	header: {
		fontSize: 20,
		fontWeight: "bold",
		marginVertical: 10,
	},

	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		flexWrap: "wrap",
		width: 160,
		marginVertical: 10,
	},

	section: {
		marginVertical: 16,
	},

	title: {
		fontSize: 18,
		fontWeight: "500",
		marginBottom: 5,
	},

	para: {
		fontSize: 16,

		color: "#656466",
	},
});
