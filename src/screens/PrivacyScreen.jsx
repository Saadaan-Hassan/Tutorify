import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { Card, Icon } from "react-native-paper";

export default function ProfilePrivacy() {
    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <View style={styles.sectionHeader}>
                    <Text style={{ fontSize: 12 }}>Version 0.01 • May 5th, 2024</Text>
                </View>
                <View style={styles.sectionHeader}>
                    <Text style={styles.header}>Tutorify Privacy Policy</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Summary in Normal Words</Text>
                    <Text style={[styles.para, { color: "#656466" }]}>
                        This privacy policy outlines how we collect, use, and protect your
                        personal information at Tutorify. We are committed to ensuring your
                        privacy is protected and this policy was created to help you understand
                        what data we collect, why we collect it, and what we do with it.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Intro</Text>
                    <Text style={styles.para}>
                        At Tutorify, your privacy is paramount. This policy details the personal
                        information we collect from you, how we process it, and how we keep it
                        secure. It also describes your rights regarding your personal data.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>What We Collect</Text>
                    <Text style={styles.para}>
                        We collect the following types of information:
                        - Exact location data for matching students with local tutors for physical teaching.
                        - Country and city information for students opting for online teaching.
                        This information helps us tailor our services to best fit your needs and preferences.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>How We Protect Your Information</Text>
                    <Text style={styles.para}>
                        We implement a variety of security measures to maintain the safety of
                        your personal information. These include encryption, firewalls, and secure
                        server facilities. Our security policies are reviewed regularly and updated
                        as necessary to ensure the safety of your data.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Your Rights</Text>
                    <Text style={styles.para}>
                        You have the right to:
                        - Access the personal data we hold about you.
                        - Request the correction of incorrect information we hold about you.
                        - Request the deletion of your data when it is no longer necessary for us to keep it.
                        - Object to the processing of your data where we are relying on a legitimate interest and there is something about your particular situation which makes you want to object.
                        - Request a restriction on the processing of your data.
                        - Request the transfer of your data to another service provider.
                    </Text>
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