import React, { useEffect } from "react";
import { View, StyleSheet, Image, Animated } from "react-native";

const SplashScreen = () => {
	const fadeAnim = new Animated.Value(0);

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 2000, // Adjust the duration as needed
			useNativeDriver: true,
		}).start();
	}, [fadeAnim]);

	return (
		<View style={styles.container}>
			<Animated.Image
				source={require("../../assets/s.png")}
				style={{ ...styles.logo, opacity: fadeAnim }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		width: 200, // Adjust according to your logo size
		height: 200, // Adjust according to your logo size
	},
});

export default SplashScreen;
