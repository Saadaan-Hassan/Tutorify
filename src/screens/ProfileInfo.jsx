import React from "react";
import { View, StyleSheet } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput"; 

export default function ProfileInfo() {
  return (
    <View style={styles.container}>
      
      <View style={styles.centered}>
        <CustomInput
          label="Name"
          placeholder="Enter your name"
          value=""
          onChangeText={(text) => console.log(text)}
        />
        <CustomInput
          label="Email"
          placeholder="Enter your email"
          value=""
          onChangeText={(text) => console.log(text)}
        />
        <CustomInput
          label="Academic Status"
          placeholder="Enter your academic status"
          value=""
          onChangeText={(text) => console.log(text)}
        />
      </View>
      
      <View style={styles.centered}>
        <CustomButton
          title='Edit Profile'
          style={[styles.editButton]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.colors.neutral,
    // justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20, 
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    width: "35%",
    fontSize: 18,
  },
});
