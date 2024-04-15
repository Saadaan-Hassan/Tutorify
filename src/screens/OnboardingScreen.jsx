import { useRef, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
	const navigation = useNavigation();
	const onboardingRef = useRef(null);

	useEffect(() => {
		const autoplayInterval = setInterval(() => {
			if (onboardingRef.current) {
				const nextPageIndex = (onboardingRef.current.state.currentPage + 1) % 3;
				onboardingRef.current.goToPage(nextPageIndex);
			}
		}, 3000);

		return () => clearInterval(autoplayInterval);
	}, []);

	const handleDone = () => {
		navigation.navigate("Home");
	};

	const dotButtons = ({ selected }) => (
		<View
			style={{
				width: selected ? 20 : 5,
				height: 5,
				marginHorizontal: 3,
				backgroundColor: selected ? "#000" : "#c9c9c9",
				borderRadius: 5,
			}}
		/>
	);
	return (
		<SafeAreaView style={styles.container}>
			<Onboarding
				ref={onboardingRef}
				onDone={handleDone}
				onSkip={handleDone}
				DotComponent={dotButtons}
				bottomBarColor='#e9e9e9'
				pages={[
					{
						backgroundColor: "#fff",
						image: (
							<View>
								<LottieView
									source={require("../../assets/slides/slide-1.json")}
									autoPlay
									loop
									style={styles.lottie}
								/>
							</View>
						),
						title: "Pass your exams with distinctions",
						subtitle:
							"Go into your exam hall with confidence and the knowledge you need to excel.Be the best version of yourself ",
					},
					{
						backgroundColor: "#fff",
						image: (
							<View>
								<LottieView
									source={require("../../assets/slides/slide-2.json")}
									autoPlay
									loop
									style={styles.lottie}
								/>
							</View>
						),
						title: "Build your confidence with the right knowledge",
						subtitle:
							"Gain the knowledge you need to ace your examinations and test",
					},
					{
						backgroundColor: "#fff",
						image: (
							<View>
								<LottieView
									source={require("../../assets/slides/slide-3.json")}
									autoPlay
									loop
									style={styles.lottie}
								/>
							</View>
						),
						title: "Find the right tutor to teach you",
						subtitle:
							"Find the right tutor to prepare you for your examination and help you to ace your exam and build your confidence",
					},
				]}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	lottie: {
		width: width * 0.9,
		height: width,
	},
});
