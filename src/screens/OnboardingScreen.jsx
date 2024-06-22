import React, { useRef, useEffect } from "react";
import {
	View,
	SafeAreaView,
	StyleSheet,
	Dimensions,
	Text,
	TouchableOpacity,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { commonStyles } from "../styles/commonStyles";

const { width } = Dimensions.get("window");

export default function OnboardingScreen({ onComplete }) {
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
		onComplete();
		navigation.navigate("Auth");
	};

	const handleNext = () => {
		if (onboardingRef.current) {
			const nextPageIndex = (onboardingRef.current.state.currentPage + 1) % 3;
			onboardingRef.current.goToPage(nextPageIndex);
		}
	};

	const handleSkip = () => {
		handleDone();
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

	const SkipButton = () => (
		<TouchableOpacity onPress={handleSkip} style={styles.button}>
			<Text style={{ color: commonStyles.colors.neutral, paddingLeft: 20 }}>
				Skip
			</Text>
		</TouchableOpacity>
	);

	const NextButton = () => (
		<TouchableOpacity onPress={handleNext} style={styles.button}>
			<Text style={{ color: commonStyles.colors.neutral, paddingRight: 20 }}>
				Next
			</Text>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<Onboarding
				ref={onboardingRef}
				onDone={handleDone}
				onSkip={handleDone}
				DotComponent={dotButtons}
				bottomBarColor={commonStyles.colors.primary}
				SkipButtonComponent={SkipButton}
				NextButtonComponent={NextButton}
				pages={[
					{
						backgroundColor: commonStyles.colors.background,
						image: (
							<View>
								<LottieView
									source={require("../../assets/img/slides/slide-1.json")}
									autoPlay
									loop
									style={styles.lottie}
								/>
							</View>
						),
						title: (
							<Text style={styles.title}>
								Pass your exams with distinctions
							</Text>
						),
						subtitle: (
							<Text style={styles.subtitle}>
								Go into your exam hall with confidence and the knowledge you
								need to excel. Be the best version of yourself
							</Text>
						),
					},
					{
						backgroundColor: commonStyles.colors.background,
						image: (
							<View>
								<LottieView
									source={require("../../assets/img/slides/slide-2.json")}
									autoPlay
									loop
									style={styles.lottie}
								/>
							</View>
						),
						title: (
							<Text style={styles.title}>
								Build your confidence with the right knowledge
							</Text>
						),
						subtitle: (
							<Text style={styles.subtitle}>
								Gain the knowledge you need to ace your examinations and test
							</Text>
						),
					},
					{
						backgroundColor: commonStyles.colors.background,
						image: (
							<View>
								<LottieView
									source={require("../../assets/img/slides/slide-3.json")}
									autoPlay
									loop
									style={styles.lottie}
								/>
							</View>
						),
						title: (
							<Text style={styles.title}>
								Find the right tutor to teach you
							</Text>
						),
						subtitle: (
							<Text style={styles.subtitle}>
								Find the right tutor to teach you the right knowledge you need
								to excel in your exams
							</Text>
						),
					},
				]}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: commonStyles.colors.background,
	},
	lottie: {
		width: width * 0.9,
		height: width,
	},
	title: {
		fontSize: 24,
		marginBottom: 10,
		fontWeight: "bold",
		color: commonStyles.colors.textPrimary,
	},
	subtitle: {
		fontSize: 16,
		textAlign: "center",
		color: commonStyles.colors.textSecondary,
	},
	button: {
		padding: 10,
	},
});
