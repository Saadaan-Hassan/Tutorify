import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import { Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function TutorDetailsScreen() {
	const navigation = useNavigation();

	const handleChatbutton = () => {
		navigation.navigate('ChatDetail');
	};

	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.scrollContentContainer}
				stickyHeaderIndices={[1]}
			>
				<View style={styles.imageContainer}>
					<Image
						source={require("../../assets/img/logo.webp")}
						style={styles.image}
					/>
					<View style={styles.imageOverlay}>
						<View style={styles.overlayContent}>
							<Text style={styles.header}>Omowumi John</Text>
							<Text style={styles.rate}>Rs. 1500 per month</Text>
						</View>
					</View>
				</View>

				<View style={styles.content}>
					{/* About Section */}
					<View style={styles.section}>
						<View style={styles.titleWithIcon}>
							<Text style={styles.title}>About</Text>
							<Icon
								source="information"
								color="#5316B6"
								size={28}
							/>
						</View>
						<Text style={[styles.para, { color: "#656466" }]}>
							I am a skilled and professional teacher with over 10 years of
							teaching students and preparing them to ace their final secondary
							school examination. I have worked in over 5 schools including LUTH
							secondary school, Idi-araba, Lagos
						</Text>
					</View>

					{/* Subjects Section */}
					<View style={styles.section}>
						<View style={styles.titleWithIcon}>
							<Text style={styles.title}>Subjects</Text>
							<Icon
								source="bookshelf"
								color="#5316B6"
								size={28}
							/>
						</View>
						<Text style={styles.para}>
							Mathematics, Physics, Chemistry, Biology
						</Text>
					</View>

					{/* Preferred Mode Section */}
					<View style={styles.section}>
						<View style={styles.titleWithIcon}>
							<Text style={styles.title}>Preferred Mode</Text>
							<Icon
								source="account-box"
								color="#5316B6"
								size={28}
							/>
						</View>
						<Text style={styles.para}>Physical</Text>
					</View>

					{/* Experience Section */}
					<View style={styles.section}>
						<View style={styles.titleWithIcon}>
							<Text style={styles.title}>Experience</Text>
							<Icon
								source="briefcase"
								color="#5316B6"
								size={28}
							/>
						</View>
						<Text style={styles.para}>10+ years</Text>
					</View>

					{/* Location Section */}
					<View style={styles.section}>
						<View style={styles.titleWithIcon}>
							<Text style={styles.title}>Location</Text>
							<Icon
								source="map-marker"
								color="#5316B6"
								size={28}
							/>
						</View>
						<Text style={styles.para}>Lagos, Nigeria</Text>
					</View>
				</View>
			</ScrollView>

			<CustomButton
				title="Chat with me"
				style={styles.button}
				onPress={handleChatbutton}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContentContainer: {
		flexGrow: 1,
		paddingBottom: 430, // Adjust as needed to make sure the button is fully visible
	},
	imageContainer: {
		position: 'relative',
		height: "60%",
	},
	image: {
		height: "100%",
		width: "100%",
		resizeMode: "cover",
	},
	imageOverlay: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "#5316B6", // Transparent background
		padding: 10,
	},
	overlayContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	content: {
		padding: 24,
	},
	section: {
		marginVertical: 14,
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 5,
		color: "#5316B6",
	},
	para: {
		fontSize: 17,
		color: "#656466",
		textAlign: "justify",
	},
	button: {
		width: 200,
		height: 45,
		borderRadius: 20,
		marginVertical: 20,
		marginBottom: 7,
		alignSelf: 'center',
		position: 'absolute',
		bottom: 20,
		backgroundColor: '#5316B6', // Adjust button color as needed
	},
	header: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#fff",
	},
	rate: {
		fontSize: 16,
		color: "#fff",
	},
	titleWithIcon: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});










// import React from "react";
// import { View, Text, ScrollView, StyleSheet } from "react-native";
// import CustomButton from "../components/CustomButton";
// import { Card } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";

// export default function TutorDetailsScreen() {
// 	const navigation = useNavigation();

// 	const handleChatbutton = () => {
// 		navigation.navigate('ChatDetail');
// 	  };
//   return (
//     <View style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContentContainer}
//         stickyHeaderIndices={[1]}
//       >
//         <Card.Cover
//           source={require("../../assets/img/logo.webp")}
//           style={{
//             height: "50%",
//           }}
//         />

//         <View style={styles.content}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.header}>Omowumi John</Text>
//             <Text style={{ marginTop: 4, fontSize: 16, color: "#5316B6", fontWeight: "600" }}>
//               Rs. 1500 <Text style={{ fontSize: 15, color: "#5316B6" }}>per month</Text>
//             </Text>
//           </View>

//           {/* About Section */}
//           <View style={styles.section}>
//             <Text style={styles.title}>About</Text>
//             <Text style={[styles.para, { color: "#656466" }]}>
//               I am a skilled and professional teacher with over 10 years of
//               teaching students and preparing them to ace their final secondary
//               school examination. I have worked in over 5 schools including LUTH
//               secondary school, Idi-araba, Lagos
//             </Text>
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.title}>Subjects</Text>
//             <Text style={styles.para}>
//               Mathematics, Physics, Chemistry, Biology
//             </Text>
//           </View>

// 		  <View style={styles.section}>
//             <Text style={styles.title}>Preferred Mode</Text>
//             <Text style={styles.para}>Physical</Text>
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.title}>Experience</Text>
//             <Text style={styles.para}>10+ years</Text>
//           </View>

// 		  <View style={styles.section}>
//             <Text style={styles.title}>Location</Text>
//             <Text style={styles.para}>Lagos, Nigeria</Text>
//           </View>
//         </View>
//       </ScrollView>

//       <CustomButton
//         title="Chat with me"
//         style={styles.button}
//         onPress={handleChatbutton}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContentContainer: {
//     flexGrow: 1,
//     paddingBottom: 360, // Adjust as needed to make sure the button is fully visible
//   },
//   content: {
//     padding: 24,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginVertical: 10,
//     color: "#5316B6",
//   },
//   section: {
//     marginVertical: 14,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "600",
//     marginBottom: 5,
//     color: "#5316B6",
//   },
//   para: {
//     fontSize: 17,
//     color: "#656466",
// 	textAlign: "justify",
//   },
//   button: {
//     width: 200,
//     height: 45,
//     borderRadius: 20,
//     marginVertical: 20,
// 	marginBottom: 7,
//     alignSelf: 'center',
//     position: 'absolute',
//     bottom: 20,
//     backgroundColor: '#5316B6', // Adjust button color as needed
//   },
// });







// import React from "react";
// import { View, Text, ScrollView, StyleSheet } from "react-native";
// import CustomButton from "../components/CustomButton";
// import { Card } from "react-native-paper";
// import { useUser } from "../utils/context/UserContext";

// export default function TutorDetailsScreen() {
//   const { user } = useUser();

//   return (
//     <ScrollView contentContainerStyle={styles.contentContainer}>
//       <Card.Cover
//         source={{ uri: user?.image }}
//         style={{
//           height: "30%",
//         }}
//       />

//       <View style={styles.container}>
//         <View style={styles.sectionHeader}>
//           <Text style={styles.header}>{user?.name}</Text>
//           <Text style={{ fontSize: 18 }}>
//             #{user?.fees}/ <Text style={{ fontSize: 14 }}>per month</Text>
//           </Text>
//         </View>

//         {/* About Section */}
//         <View style={styles.section}>
//           <Text style={styles.title}>About</Text>
//           <Text style={[styles.para, { color: "#656466" }]}>
//             {user?.about}
//           </Text>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.title}>Subjects</Text>
//           <Text style={styles.para}>{user?.subjects}</Text>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.title}>Location</Text>
//           <Text style={styles.para}>{user?.location}</Text>
//         </View>
//       </View>

//       <CustomButton
//         title="Chat with me"
//         style={{ width: 150, borderRadius: 20, marginVertical: 20, alignSelf: 'center' }}
//         onPress={() => console.log("Chat with me pressed")}
//       />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   contentContainer: {
//     flexGrow: 1,
//     paddingBottom: 250,
//   },
//   container: {
//     padding: 24,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 10,
//   },
//   section: {
//     marginVertical: 16,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "500",
//     marginBottom: 5,
//   },
//   para: {
//     fontSize: 16,
//     color: "#656466",
//   },
// });



