import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';

export default function UsernameScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');

  const handleContinue = () => {
    // Handle continue button press
    if (username.trim() === '') {
      Alert.alert('Error', 'Please enter a username');
    } else {
      navigation.navigate('TabNavigator');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What should we call you?</Text>
      <CustomInput
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity
        style={[styles.button, !username.trim() && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!username.trim()}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#5316B6',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: 300,
	height: 45,
	padding: 5,
	paddingLeft: 10,
    backgroundColor: '#5316B6',
    borderRadius: 16,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#b6a6bd',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
